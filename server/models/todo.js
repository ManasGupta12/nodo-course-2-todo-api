var mongoose=require('mongoose');
var todo=mongoose.model('todo',{
text:{
	type:String,
	required:true,
	minlength:1,
	trim:true
},completed:
{
  type:Boolean,
  default:false
}
,completedAt:{
	type:Number,
	default:null
}
});
var to=new todo({
	text:'cook dinner'
});
to.save().then((doc)=>{
console.log('saved todo',doc)
},(e)=>{
	console.log('unable to save todo')
});
module.exports={todo};
