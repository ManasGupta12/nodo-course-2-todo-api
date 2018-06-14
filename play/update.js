const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Todoapp',(err,client)=>{
	if(err){
		return console.log('unable to connect to mongodb  server');
	}
	console.log('connected to mongoDB server');
	const db=client.db('Todoapp')
	db.collection('insert').findOneAndUpdate({_id:new ObjectID('5b22150fa7d014829d695e15')},{
		$set:{
			name:'MANAS GUPTA'
		},
		$inc:{ 
			age:1
		}
	},
		{ 
		  returnOriginal:false
	
	}).then((results)=>{
		console.log(results);
	});
//client.close();
});