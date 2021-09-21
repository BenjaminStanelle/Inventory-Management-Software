const dotenv = require('dotenv');
const express = require('express');
const userRoute = require( './routes/UserRoute.js'); 
const mongoose = require( 'mongoose');
const bodyParser = require( 'body-parser');
const cors = require('cors');
const stockUpRoute = require('./routes/StockUp.js');

const app = express();
//secure the mongodb connection
dotenv.config({path:'./config.env'});
const PORT = process.env.PORT;

//calling a connection.js file to 
require('./database/connection');

app.use(express.json());


//size of the downloaded images are limited
app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));
app.use('/stockup', stockUpRoute);
app.use('/api/user', userRoute); 

//Routes middleware
app.use(cors());

const UserController = require('./controller/UserController.js');

// Get request for user to recieve information from db
app.get("/users", UserController.all);
app.post("/users/create", UserController.create);
app.get("/users/:username", UserController.find);
app.get("/users/email/:email", UserController.findByEmail);
app.get("/users/:username/items", UserController.getItems);
app.get("/users/:username/count", UserController.getCount);

const StockUpController = require('./controller/StockUpController.js');

// Get request for recipes
app.get("/items", StockUpController.all);
app.get("/items/:item_name", StockUpController.find);

// Create a new recipe
app.post("/items/create", StockUpController.create);
