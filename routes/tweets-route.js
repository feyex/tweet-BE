const express = require('express');
const app = express();
const router = express.Router();
const tweetController = require ('../controllers/tweets');

    router.get('/tweets', tweetController.listTweet);

    router.get('/user', tweetController.listUserTweet);
  
    router.get('/tweets/:id', tweetController.getTweet);
  
    router.post('/tweets', tweetController.createTweet);
  
    router.put('/tweets/:id', tweetController.updateTweet);
  
    router.delete('/tweets/:id', tweetController.removeTweet);

    router.post('/sentiment', tweetController.saveSentiment);

    router.post('/calcSentiment', tweetController.calcSentiment);

    router.get('/sentiment', tweetController.getSentiment);
  
  
    module.exports = router;
  