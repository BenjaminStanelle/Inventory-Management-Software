const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    
});

const Users = mongoose.model("StockUp",UsersSchema)
module.exports = Users 