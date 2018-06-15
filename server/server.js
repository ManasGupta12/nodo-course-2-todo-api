var express=require('express');

var body=require('body-parser');


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


app.listen(3000,()=>{
	console.log('started on port 3000');
});
module.exports={app};