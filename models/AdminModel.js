const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const adminSchema = new Schema({
    
    name: {
        type: String,
        required: true
     },

    email: {
        type: String,
        required: true,
        unique: true
    },

    contact: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;