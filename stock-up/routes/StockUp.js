const mongoose = require( 'mongoose');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../model/User.js');
const authentication = require('../middleware/authentication.js');




 module.exports = router;