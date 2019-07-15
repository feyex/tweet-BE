const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electricitiesSchema = new Schema ({
    user_id : {type: Schema.Types.ObjectId, ref: 'users', required:true},
    meter_number : { type: Number, required: true},
    amount: { type: Number, required: true},
    disco_id: {type: Schema.Types.ObjectId, ref: 'discos', required:true},
    token_id:{type: Schema.Types.ObjectId, ref: 'token', required:true},
   
}, {
    timestamps: true
});

module.exports = mongoose.model('electricities', electricitiesSchema)

