const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../model/User');

const inventorySchema = new Schema({
    item: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },

    vendor_info: {
        type:String,
        required: true,
        min: 5,
        max: 255

    },

    Id: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },

    cost:{
        type: String,
        required:true,
        min:0,

    },
   
    items: [{
        item: {
            type: String,
            required: true
        },
        info: {
            type: String,
            required: true
        }
    }],

    notes: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model("UserInventory", inventorySchema);
