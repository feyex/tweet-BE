const Tweet = require ('../models/tweet');
const Sentiment = require ('../models/sentiment');
let scores  = [];

module.exports.createTweet=(req, res)=>{
	var tweet = new Tweet( 
		req.body
	   
	  );

	  tweet.save(function(err, resp) {
	  if (err) {
		console.log(err);
		res.json({
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

module.exports.listUserTweet=(req, res)=>{
	Tweet.find({'userId': req.params.id}).sort({_id: -1})
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

module.exports.removeTweet = (req, res) => {
	Tweet.remove(req.params._id)
		.then(result => {
			res.status(200)
				.json({
					status: true,
					message:'record deleted successfully'
				})
		})
		.catch (err => {
			res.status(400)
				.send(err)
		})
}

module.exports.saveSentiment = (req, res) => {
	let sentimentScore = new Sentiment(
		req.body
	)
	sentimentScore.save((err, resp) => {
		if (err){
			res.send({
				message: 'Unable to save sentiment score'
				});
			  } else {
				console.log(sentimentScore, 'got here')
				this.calculateSentiment(sentimentScore.tweetId);
				res.send({
				status:true,
				message: 'the Sentiment score has been saved'
				});
			  }
	})
}

module.exports.getOccurrence = (arr, val) => {
	console.log(val, 'lkc')
	return arr.filter((value) => value.score === val).length
}

module.exports.calculateSentiment = async (req, res) => {
	// do a find by tweetId and then fetch the score and check for most common value

	await Sentiment.find({'tweetId': req})
		.then(result => {
			// console.log(scores, 'result', result[0], result[0].score)
			result.forEach((val) => {
				// console.log(val.score),
				scores.push({
					'score': val.score
				})
			})

			let sentimentScore;
			let polarity;
			let finalRes;
			
			// console.log('scores', scores)
			if (result.length > 1){
				let neutral = this.getOccurrence(scores, 1);
				let negative = this.getOccurrence(scores, 2);
				let positive = this.getOccurrence(scores, 4);

				maximum = Math.max(neutral, negative, positive);
				if(neutral === negative || neutral === positive || negative === positive){
					sentimentScore = 0;
					polarity = 'conflict'
				}
				else{
					if(neutral === maximum){
						sentimentScore = 1;
						polarity = 'neutral';
					}
					else if(negative === maximum){
						sentimentScore = 2;
						polarity = 'negative';
					}
					else if(positive === maximum){
						sentimentScore = 4;
						polarity = 'positive';
					}
				}	
			}
			else{
				sentimentScore = result[0].score;
			}
			requests = {
				id: req,
				sentiment: sentimentScore,
				polarity
			}
			console.log(requests, 'request')
			Tweet.find({_id: requests.id}, async function (err, tweetRes) {
				tweetRes = tweetRes[0];

				tweetRes.sentiment = requests.sentiment;
				tweetRes.polarity = requests.polarity;
			
				await tweetRes.save(function (err, result) {
					if(err) {
						console.error('ERROR!');
						return 'error' + err
					}
					finalRes = result;
					console.log(finalRes)
					return finalRes;
				});
			});

		})
		.catch(err => res.send(err))

}

module.exports.getSentiment = (req, res)=> {
	Sentiment.find({})
		.then(Tweet => res.json(Tweet))
		.catch(err => res.send(err))
}

module.exports.calcSentiment = async (req, res) => {
	const tweetId = req.body.tweetId;
    await this.calculateSentiment(tweetId);
	return res.status(200)
		.json({
			status: true,
			message:'sentiment calculated successfully'
		})
}



	
