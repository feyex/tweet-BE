const express = require('express');
const app = express();
const router = express.Router();
const tweetController = require ('../controllers/tweets');

    router.get('/tweets', tweetController.listTweet);
  
    router.get('/tweets/:id', tweetController.getTweet);
  
    router.post('/tweets', tweetController.createTweet);
  
    router.put('/tweets/:id', tweetController.updateTweet);
  
    router.delete('/tweets/:id', tweetController.deleteTweet);
  
    module.exports = router;
  