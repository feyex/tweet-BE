const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sentimentSchema = new Schema ({
    tweetId: { type: Schema.Types.ObjectId, required: true, ref: 'tweet'},
    score: {type: Number},
    polarity: {type: String}   
}, {
    timestamps: true
});

module.exports = mongoose.model('sentiment', sentimentSchema)

