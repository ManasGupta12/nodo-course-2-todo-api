const {ObjectID}=require('mongodb');


const {todo}=require('./../../models/todo');

const {User}=require('./../../models/user');
const jwt=require('jsonwebtoken');

const useroneId=new ObjectID();
const usertwoId=new ObjectID();
const users=[{
	_id:useroneId,
	email:'manas12@example.com',
	password:'useronepass',
	tokens:[{
		access:'auth',
		token:jwt.sign({_id:useroneId,access:'auth'},'abc123').toString()

	}]
},{_id:usertwoId,
	email:'mananbhai@example.com',
	password:'usertwopass'
	
	}];

///////todos
const todos=[{
	_id:new ObjectID(),
	text:'first test todo'
},{
	_id:new ObjectID(),
	text:'second test todo',completed:true,
	completedAt:12545
}];

const populateTodos=(done)=>{
	todo.remove({}).then(()=> {return todo.insertMany(todos);}).then(()=>done());
};
const populateusers=(done)=>{
	User.remove({}).then(()=>{
    var userOne=new User(users[0]).save();
	var userTwo=new User(users[1]).save();

	return Promise.all([userOne,userTwo])
	}).then(()=>done());
};

module.exports={todos,populateTodos,users,populateusers};