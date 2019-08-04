const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discosSchema = new Schema ({
    disco: {
        type: String, required: true},
    state: {
        type: String, required: true},
    
}, {
    timestamps: true
});

module.exports = mongoose.model('discos', discosSchema)

