var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const {registerValidation} = require('../model/LoginValidation.js');
const Recipe = require("../model/Inventory.js");
const User = require('../model/User');
const Inventory = require('../model/Inventory.js');

let StockUpController = {
    // finds a single Inventory
    find: async (req, res) => {
        let found = await Inventory.find({item: req.params.item});
        res.json(found);
    },

    // finds all items
    all: async (req, res) => {
        let allItems = await Inventory.find();
        res.json(allIItems);
    },

    // Create a recipe
    create: async(req, res) => {
        //checking whether the user fills all the fields or not
        const {item, Id, cost,items, notes}= req.body;
        if(!item || !Id ||!cost || !items ||  !notes ){
            return res.status(422).json({error: "Please filled the field properly"});
        }

        //create a new recipe
        const inventory = new Inventory({
            item: req.body.item,
            vendor_info: req.body.vendor_info,
            Id: req.body.Id,
            cost: req.body.cost,
            cuisine_type: req.body.cuisine_type,
            items: req.body.items,
            notes: req.body.notes 
        });
        
        try{
            await inventory.save();     
            
            //pre saved method
            let userInventory = await User.findOne({name: req.body.vendor_info}, 'inventories');
            
            userInventory.inventories.push(inventory._id);

            //pre saved method
            User.findOneAndUpdate({name: req.body.vendor_info}, 
                {$set: userInventory}, function(err) {console.log(err)});

            res.json(userInventory);
            res.status = 200;

        }catch(err){
            res.status(400).send(err);

        }
    }
}

module.exports = StockUpController;