const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./../server');
const {todo}=require('./../models/todo');

const todos=[{
	_id:new ObjectID(),
	text:'first test todo'
},{
	_id:new ObjectID(),
	text:'second test todo'
}]

beforeEach((done)=>{
	todo.remove({}).then(()=> {return todo.insertMany(todos);}).then(()=>done());
});

describe('POST/todos',()=>{
	it('should create a new todo',(done)=>{
   var text='test a todo text';
   request(app)
   .post('/todos')
   .send({text})
   .expect(200)
   .expect((res)=>{
   expect(res.body.text).toBe(text);
	})
	.end((err,res)=>{
		if(err)
			{return done(err);
			}

    todo.find({text}).then((todos)=>{
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(text);
    done();
    })
    .catch((e)=>done(e));

    });
	});
	it('should not create todo',(done)=>{
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
	    .end((err,res)=>{
			if(err){
				return done(err);
			}
			todo.find().then((todos)=>{
             expect(todos.length).toBe(2);
             done();
			}).catch((e)=>done(e));
		});
	});
});
describe('GET/todos',()=>{
	it('should get all  todo',(done)=>{
   
   request(app)
   .get('/todos')
   
   .expect(200)
   .expect((res)=>{
   expect(res.body.todos.length).toBe(2);
	})
	.end(done);
});
});
describe('GET/todos/:id',()=>{
	it('should return todo doc',(done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
   .expect((res)=>{
     expect(res.body.todo.text).toBe(todos[0].text);
	})
	.end(done);
	});
});
it('should return 404 if todo not found',(done)=>{
	var hexid=new ObjectID().toHexString();
	request(app)
	.get(`/todos/${hexid}`)
	.expect(404)
	.end(done)
});
it('should return 404 for non-objects id',(done)=>{
	request(app)
	.get(`/todos/123abc`)
	.expect(404)
	.end(done)
});
