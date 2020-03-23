const mongoose = require('mongoose');
const Schema = mongoose.Schema


const roleSchema = new Schema({
    
    role:{ 
        type: String, 
        required: true,
        unique:true
        }
   
}, {
    timestamps: true,
    collection: 'role'
});


const Role = mongoose.model ('Role', roleSchema);
module.exports = Role;

