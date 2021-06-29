const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema ({
    message: { type: String, required: true},
    source: { type: String}  
}, {
    timestamps: true
});

module.exports = mongoose.model('tweet', tweetSchema)
