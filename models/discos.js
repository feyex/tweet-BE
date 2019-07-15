const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discosSchema = new Schema ({
    amount : { type: Number, required: true},
    name: {
        type: String,
        default: 'Abuja Disco'},
    acronym: String,
    state: {
        type: String,
        default: 'Abuja'}
    
}, {
    timestamps: true
});

module.exports = mongoose.model('discos', discosSchema)

