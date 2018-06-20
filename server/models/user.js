var mongoose=require('mongoose');


// {
// 	email:'manas@example.com',
// 	password:'andrew123',
// 	tokens:[{
// 		access:'auth',
// 		token:'bnjhyhytry'
// 	}]
// }
var user=mongoose.model('user',{
email:{
	type:String,
	required:true,
	minlength:1,
	trim:true,
	
}
});
var t=new user({
	email:'  me@example.com '
});
t.save().then((docs)=>{
 //console.log('saved your data',docs);
},(e)=>{
//console.log('unable to fetch data');
});
module.exports={user};