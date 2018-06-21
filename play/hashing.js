const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');


var data={id:4};

var token=jwt.sign(data,'123abc');
console.log(token);

var verify=jwt.verify(token,'123abc')
console.log('decoded',verify);


// var message='I am user no.12';
// var hash=SHA256(message).toString();


// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data={id:4};

// var token={
// 	data,
// 	hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// // token.data.id=5;
// // token.hash=SHA256(JSON.stringify(token.data)).toString();


// var reshash=SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(reshash==token.hash)
// console.log('data was not changed');
// else
// console.log('data was vb changed .Dont trust ');
