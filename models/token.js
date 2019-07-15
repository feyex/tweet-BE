const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema ({
       token_number : { type: Number, required: true}

}, {
    timestamps: true
});

module.exports = mongoose.model('token', tokenSchema)

