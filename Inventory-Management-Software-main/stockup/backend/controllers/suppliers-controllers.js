const fs = require('fs');

const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Suppliers = require('../models/suppliers');

const getSuppliers = async (req, res, next) => {
  
    // let products;
    let supplier;

    try {
      supplier = await Suppliers.find({});
    } catch (err) {
      const error = new HttpError(
        'Fetching suppliers failed, please try again later.',
        500
      );
      return next(error);
    }

    if (!supplier || supplier.length === 0) {

      return next(
        new HttpError('There are no suppliers.', 404)
      );
    }
  
    res.json({ supplier: supplier.map(suppliers => suppliers.toObject({ getters: true })) });
  };
  
exports.getSuppliers = getSuppliers;
