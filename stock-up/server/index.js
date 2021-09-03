const express = require("express");
const mongoose = require("mongoose");
const app = express() 
const StockUpModel = require("./models/StockUp")
//get all info in json format 
app.use(express.json())

//what mongodb and database we try to talk to 
mongoose.connect(
    "mongodb+srv://tu-mai:123Qwe@crud.xwprk.mongodb.net/StockUp?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
    }
);
app.get("/", async (req, res) => {
    const stockUp = new StockUpModel({firstName: "Tu", lastName: "Mai"});
    try{
        await stockUp.save();
        res.send("inserted data");
    } catch (err){
        console.log(err);
    
    }
})
app.listen(3001, ()=>{
    console.log('Server running on port 3001...');
})