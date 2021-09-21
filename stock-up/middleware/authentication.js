//import React from 'react'
const User = require('../model/User.js');
const jwt = require('jsonwebtoken')

const authentication = async( req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootUser){throw new Error('User not found')}
        
        req.token=token;
        req.rootUser = rootUser;
        req.userID= rootUser._id;

        next();
    }catch(err){
        res.status(401).send('unauthorized');
        console.log(err)
    }
}

module.exports = authentication
