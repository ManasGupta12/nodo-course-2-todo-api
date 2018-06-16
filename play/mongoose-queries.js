const {ObjectID}=require('mongodb');



const {mon}=require('./../server/mongoose');
const {todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');

// var id='5b24bb121bf2fb24d4d3035911';
//  if(!ObjectID.isValid(id)){
// console.log('id is not valid');}// todo.find({
// 	_id: id
// }).then((todos)=>{
// 	console.log('todo',todos);
// });


// todo.findOne({
// 	_id:id
// }).then((todo)=>{
// 	console.log('todo',todo);
// });

// todo.findById(id).then((todo)=>{
// 	if(!todo){
// 		return console.log('id not found')
// 	}
// 	console.log('todo by id ',todo);
// }).catch((e)=>console.log(e));

var id='5b234f8c6ff1480f2c534154';
user.findById(id).then((user)=>{
	if(!user){
		return console.log('id not found')
	}
	console.log('User by id ',user);
}).catch((e)=>console.log(e));
