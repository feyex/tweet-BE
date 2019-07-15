const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema ({
    fullname: { type: String, required: true},
    email: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    message:{ type: String, required: true},
    status: {
        type: String,
        enum: ['new', 'resolved', 'completed'], 
        default: 'new'},

}, {
    timestamps: true
});

module.exports = mongoose.model('contact', contactSchema)

