const {ObjectID}=require('mongodb');



const {mon}=require('./../server/mongoose');
const {todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');

// todo.remove({}).then((result)=>{
// console.log(result);
// });

todo.findOneAndRemove({_id:'5b275ef535df0a443c742728'}).then((res)=>{

});
todo.findByIdAndRemove('5b275ef535df0a443c742728').then((res)=>
{
	console.log(res);
});