var express=require('express');

var body=require('body-parser');

const {ObjectID}=require('mongodb');

var {mongoose}=require('./mongoose.js')

var{todo}=require('./models/todo.js');

var{user}=require('./models/user.js');


var app=express();

app.use(body.json());

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

   


app.listen(3000,()=>{
	console.log('started on port 3000');
});
module.exports={app};