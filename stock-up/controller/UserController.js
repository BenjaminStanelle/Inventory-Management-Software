var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let UserModel = require("../model/User.js");
const {registerValidation} = require('../model/LoginValidation.js');
//const StockUp = require("../model/StockUp.js");

let UserController = {
    // finds a single user
    find: async (req, res) => {
        let found = await UserModel.find({name: req.params.username});
        res.json(found);
    },

    findByEmail: async (req, res) => {
        let found = await UserModel.find({email: req.params.email});
        res.json(found);
    },

    // finds all users
    all: async (req, res) => {
        let allUsers = await UserModel.find();
        res.json(allUsers);
    },

    // create a new user
    create: async(req, res) => {

        //checking whether the user fills all the fields or not
        const {name, email, password}= req.body;
        if(!name || !email ||!password){
            return res.status(422).json({error: "Please fill the field properly"});
        }

        //valiodate the data before a creating a user
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        //checking if the user is already in the database
        const emailExist = await UserModel.findOne({email: req.body.email});
        if(emailExist)return res.status(400).send('Email already exist');

        //create a new user
        const user = new UserModel({
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
    },

    // get all items
    getItems: async(req, res) => {
        let foundItems = await UserModel.find({name: req.params.username}, 'items');
        res.json(foundItems)
    },

    // gets the Count
    getCount: async (req, res) => {
        let foundCounts = await UserModel.find({name: req.params.username}, 'counts');
        res.json(foundCounts);
    },

    addToItems: async (req, res) => {
        try{

            let item = await UserModel.findOne({name: req.params.username}, 'items');
            
            // Code to check if ingredient already exists
            if(req.body !== null) {
                req.body.forEach(reqItems => {
                    let duplicate = false;

                    // Loops through the items array for duplicates
                    item.item.map(reqItems => {
                        if(reqItems.item === reqItems.item)
                        {
                            duplicate = true;
                            reqItems.info = reqItems.info;
                        }
                    });

                    // Pushes to items if it is does not exist
                    if(!duplicate)
                    {
                        item.item.push({
                            'item': reqItems.item,
                            'info': reqItems.info
                        });
                    }
                });
            }

            //pre saved method
            UserModel.findOneAndUpdate({name: req.params.username}, 
                {$set: item}, function(err) {console.log(err)});

            res.json(item);
            
        }catch(err){
            res.status(400).send(err);
        }
    }
}

module.exports = UserController;