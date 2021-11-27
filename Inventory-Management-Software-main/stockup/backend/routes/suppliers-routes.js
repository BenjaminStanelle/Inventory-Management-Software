const express = require('express');
const { check } = require('express-validator');

const suppliersControllers = require('../controllers/suppliers-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/all', suppliersControllers.getSuppliers);

router.use(checkAuth);

module.exports = router;