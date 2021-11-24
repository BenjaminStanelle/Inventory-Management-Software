const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Product = require('../models/product');
const User = require('../models/user');
const product = require('../models/product');

const getProductById = async (req, res, next) => {
    const productId = req.params.pid;
  
    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a product.',
        500
      );
      return next(error);
    }
  
    if (!product) {
      const error = new HttpError(
        'Could not find product for the provided id.',
        404
      );
      return next(error);
    }
  
    res.json({ product: product.toObject({ getters: true }) });
  };

const getProductsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
  
    // let products;
    let userWithProducts;
    try {
        userWithProducts = await User.findById(userId).populate('products');
    } catch (err) {
      const error = new HttpError(
        'Fetching products failed, please try again later.',
        500
      );
      return next(error);
    }
  
    // if (!products || products.length === 0) {
    if (!userWithProducts || userWithProducts.products.length === 0) {
      return next(
        new HttpError('Could not find products for the provided user id.', 404)
      );
    }
  
    res.json({
        products: userWithProducts.products.map(product =>
        product.toObject({ getters: true })
      )
    });
  };

  const getProducts = async (req, res, next) => {
  
    // let products;
    let products;

    try {
      products = await Product.find({});
    } catch (err) {
      const error = new HttpError(
        'Fetching products failed, please try again later.',
        500
      );
      return next(error);
    }
  
    // if (!products || products.length === 0) {
    if (!products || products.length === 0) {

      return next(
        new HttpError('There are no products.', 404)
      );
    }
  
    res.json({ products: products.map(product => product.toObject({ getters: true })) });
  };
  

  const createProduct = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { name, length, width, height, description, storage_location,count } = req.body;
  
    // let coordinates;
    // try {
    //   coordinates = await getCoordsForAddress(address);
    // } catch (error) {
    //   return next(error);
    // }

    if(length <= 0 || width <= 0 || height <= 0) {
      return next(
        new HttpError('Invalid dimensions passed, cannot be less than 1.', 422)
      );
    }

    if(count <= 0) {
      return next(
        new HttpError('Invalid value for count passed, cannot be less than 1.', 422)
      );
    }

    
  
    const createdProduct = new Product({
        name, 
        length, 
        width, 
        height,
        description,
        storage_location,
        count,
        image: req.file.path,

        creator: req.userData.userId
    });
  
    let user;
    try {
      user = await User.findById(req.userData.userId);
    } catch (err) {
      const error = new HttpError(
        'Creating Product failed, please try again.',
        500
      );
      return next(error);
    }
  
    if (!user) {
      const error = new HttpError('Could not find user for provided id.', 404);
      return next(error);
    }
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdProduct.save({ session: sess });
      user.products.push(createdProduct);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Creating Product failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({ product: createdProduct });
  };
  const updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { name, description, storage_location, count, length, width, height } = req.body;
    const productId = req.params.pid;
  
    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update product.',
        500
      );
      return next(error);
    }
  
    if (product.creator.toString() !== req.userData.userId) {
      const error = new HttpError('You are not allowed to edit this product.', 401);
      return next(error);
    }

    if(count <= 0) {
      return next(
        new HttpError('Invalid value for count passed, cannot be less than 1.', 422)
      );
    }
  
    product.name = name;
    product.description = description;
    product.storage_location = storage_location;
    product.count = count;

    if(length && width && height) {

      if(length <= 0 || width <= 0 || height <= 0) {
        return next(
          new HttpError('Invalid dimensions passed, cannot be less than 1.', 422)
        );
      }

      product.length = length;
      product.width = width;
      product.height = height;
    }
  
    try {
      await product.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update product.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ product: product.toObject({ getters: true }) });
  };

  const deleteProduct = async (req, res, next) => {
    const productId = req.params.pid;
  
    let product;
    try {
        product = await Product.findById(productId).populate('creator');
        
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete product.',
        500
      );
      return next(error);
    }

    if (!product) {
      const error = new HttpError('Could not find product for this id.', 404);
      return next(error);
    }
  
    if (product.creator.id !== req.userData.userId) {
      const error = new HttpError(
        'You are not allowed to delete this product.',
        401
      );
      return next(error);
    }
  
    // const imagePath = place.image;
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await product.remove({ session: sess });
      product.creator.products.pull(product);
      await product.creator.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete product.',
        500
      );
      return next(error);
    }
  
    // fs.unlink(imagePath, err => {
    //   console.log(err);
    // });
  
    res.status(200).json({ message: 'Deleted product.' });
  };
  
  
exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProducts = getProducts;
