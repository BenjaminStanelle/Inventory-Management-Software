const mongoose =require( 'mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const Inventory = require('../model/Inventory.js');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],

    Inventory: [{
        type: Schema.Types.ObjectId,
        ref: "UserInventory"
    }],

    item: [{
        item: {
            type: String,
            required: false
        },
        info: {
            type: String,
            required: false
        }
    }],
  
    date: {
        type: Date,
        default: Date.now
    }
    
});

//Hashing password
userSchema.pre('save', async function(next){
    //check whether user changed the field password
    if(this.isModified('password')){
        this.password =  await bcrypt.hash(this.password, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.TOKEN_SECRET);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("User",userSchema);
