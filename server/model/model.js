const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: 'string',
        
    },
    email: {
        type: 'string',
       
        unique: true
    },
    gender: 'string',
    status: 'string'
})


const Userdb = mongoose.model('Userdb', schema);

module.exports = Userdb;
