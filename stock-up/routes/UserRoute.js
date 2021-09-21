const express = require('express');
const User = require( '../model/User.js');
const {registerValidation,loginValidation} = require('../model/LoginValidation.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const PersonalRecipe = require('../model/Inventory.js');
const {all} = require('../controller/StockUpController.js')



router.post('/register',   async(req, res) => {

    //checking whether the user fills all the fields or not
    const {name, email, password}= req.body;
    if(!name || !email ||!password){
        return res.status(422).json({error: "Please filled the field properly"});
    }

    //valiodate the data before a creating a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist)return res.status(400).send('Email already exist');

    // //Hash passwords
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password , salt);

    //create a new user
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        //pre saved method
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);

    }
});

//LOGIN
router.post('/login',async (req,res)=>{
    //checking whether the user enter each fields
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"Please fill the fields"});
    }
    //validate the data before use
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking whether the email exist or not
    const user = await User.findOne({email: req.body.email});
    if(!user)return res.status(400).send('Invalid email');

    //Check password is correct
    const validPass = await bcrypt.compare(password, user.password);

    //generate a token and stored cookie after the password match
    const token = await user.generateAuthToken();
  

    res.cookie("jwtoken",token, {
       expires:new Date(Date.now() + 2589200000000),
        httpOnly:true
     });

    if(!validPass) 
        return res.status(400).send('Invalid password');
    else
        res.json({message: "user Signin Successfully"})
    
    //Create and assign a token
    //const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    // create token
    
    // res.header('auth-token', token).send(token);
   
});

module.exports = router;