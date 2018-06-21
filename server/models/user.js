var mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');

var UserSchema = new mongoose.Schema({
	email:{
	type:String,
	required:true,
	minlength:1,
	trim:true,
	unique:true,
	validate:{
	validator:validator.isEmail,
	message:'{VALUE} is not a valid email '
    }
  },
  password:{
  	type:String,
	required:true,
	minlength:6

  },
  tokens:[{
  	access:{
    type:String,
	required:true
  	},
  	token:{
    type:String,
	required:true
  	}
  }]
});
UserSchema.methods.toJSON=function(){ // to overwrite the specific details sent back to the user
  var user=this;
  var userobject=user.toObject();

  return _.pick(userobject,['_id','email']); 
};
UserSchema.methods.generateAuthToken = function(){
 var user=this;
 var access='auth';
 var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

 user.tokens=user.tokens.concat([{access,token}]);

return  user.save().then(()=>{  
 	return token;
 })
};
var User=mongoose.model('user',UserSchema);
// var t=new user({
// 	email:'  me@example.com '
// });
// t.save().then((docs)=>{
//  //console.log('saved your data',docs);
// },(e)=>{
// //console.log('unable to fetch data');
// });
module.exports={User};