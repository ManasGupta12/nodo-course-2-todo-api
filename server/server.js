require('./config/config.js');


const _=require('lodash');

var express=require('express');

const bodyparser=require('body-parser');

const {ObjectID}=require('mongodb');

var {mongoose}=require('./mongoose.js')

var{todo}=require('./models/todo.js');

var{User}=require('./models/user.js');

var{authenticate}=require('./middleware/authenticate');

var app=express();
const port=process.env.PORT ;
app.use(bodyparser.json());

app.post('/todos',(req,res)=>{
  var tod=new todo({
	text:req.body.text
});
tod.save().then((doc)=>{
res.send(doc);
},(e)=>{
	res.status(400).send(e);
});
});
app.get('/todos',(req,res)=>{
   todo.find().then((todos)=>{
    res.send({todos});
   },(e)=>{
    res.status(400).send(e);
   });
});

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
return res.status(404).send();
}
todo.findById(id).then((todo)=>{
	if(!todo){
		return res.status(404).send();
	}
	res.send({todo});
}).catch((e)=>{
	res.status(400).send()
});
});
app.delete('/todos/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	todo.findByIdAndRemove(id).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.status(200).send({todo});
	
	}).catch((e)=>{
		res.status(400).send();
	});

});
   
app.patch('/todos/:id',(req,res)=>{
	var id=req.params.id;
	var body=_.pick(req.body,['text','completed']);
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	if(_.isBoolean(body.completed)&& body.completed){
     body.completedAt = new Date().getTime();
	}
	else
	{
     body.completed=false;
     body.completedAt=null;

	}
	todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.status(200).send({todo});
	
	}).catch((e)=>{
		res.status(400).send();
	})

	});


//signup


app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user=new User(body);
user.save().then((user)=>{
return user.generateAuthToken();
}).then((token)=>{
	res.header('x-auth',token).send(user);  //x- is custom header
}).catch((e)=>{
	res.status(400).send(e);

});
});


//private route

app.get('/users/me',authenticate,(req,res)=>{
	      res.send(req.user);
});
//login
app.post('/users/login',(req,res)=>{
	var body=_.pick(req.body,['email','password']);
	User.findByCredentials(body.email,body.password).then((user)=>{
    user.generateAuthToken().then((token)=>{
    res.header('x-auth',token).send(user);	
});
	}).catch((e)=>{
    res.status(400).send();
	});
});
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  
  }).catch((e)=>{
  	res.status(400).send(e)
  });
});

app.listen(port,()=>{
	console.log(`started on port ${port}`);
});
module.exports={app};