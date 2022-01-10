const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema ({
    message: { type: String, required: true},
    source: { type: String},
    area: { type: String},
    sentiment: {type: Number},
    polarity: {type: String}     
}, {
    timestamps: true
});

module.exports = mongoose.model('tweet', tweetSchema)
