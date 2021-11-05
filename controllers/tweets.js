const Tweet = require ('../models/tweet');


module.exports.createTweet=(req, res)=>{
	var tweet = new Tweet( 
		req.body
	   
	  );

	  tweet.save(function(err, resp) {
	  if (err) {
		console.log(err);
		res.send({
		message: 'something went wrong'
		});
	  } else {
		res.send({
		status:true,
		message: 'the Tweet has been saved'
		});
	  }
	
	  });
	}
		
module.exports.listTweet=(req, res)=>{
			Tweet.find({}).sort({_id: -1})
			.then(Tweet => res.status(200)
			.json({status:true,
				message:(Tweet)}))
			.catch(err => res.send(err));
		}

module.exports.getTweet=(req, res)=> {
			const { id } = req.params;
			Tweet.findById(id)
				.then(Tweet => res.json(Tweet))
				.catch(err => res.send(err))
		}
	
module.exports.updateTweet=(req, res)=> {
			Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true })
				.then(updatedTweet => res.json(updatedTweet))
				.catch(err => res.send(err))
		}
	
module.exports.deleteTweet=(req, res)=> {
	const id  = req.params.id;
	Tweet.deleteOne({'_id': id })
   .then(response =>{
	 if (response){
	   res.status(200)
		 .json({
		   status:true,message:"success"
		 })
	 }
	 else{
	   res.status(201)
		 .json({
		   status:false,message:"failed"
		 })
	 }
   })
   .catch(err => res.send(err))
   
}
		
	
