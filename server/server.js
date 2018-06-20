var env=process.env.NODE_ENV || 'development' ;

if(env==='development'){
process.env.PORT=3000;
process.env.MONGODB_URI='mongodb://localhost:27017/Todoapp';
}
else if(env==='test'){
process.env.PORT=3000;
process.env.MONGODB_URI='mongodb://localhost:27017/TodoappTest';
}

const _=require('lodash');

var express=require('express');

const bodyparser=require('body-parser');

const {ObjectID}=require('mongodb');

var {mongoose}=require('./mongoose.js')

var{todo}=require('./models/todo.js');

var{user}=require('./models/user.js');


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


app.listen(port,()=>{
	console.log(`started on port ${port}`);
});
module.exports={app};