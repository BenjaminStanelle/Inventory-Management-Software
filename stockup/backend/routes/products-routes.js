const express = require('express');
const { check } = require('express-validator');

const productsControllers = require('../controllers/products-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', productsControllers.getProducts);

router.get('/:pid', productsControllers.getProductById);

router.get('/user/:uid', productsControllers.getProductsByUserId);

router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('storage_location')
      .not()
      .isEmpty()
  ],
  productsControllers.createProduct
);

router.patch(
  '/:pid',
  [
    check('name')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  productsControllers.updateProduct
);

router.delete('/:pid', productsControllers.deleteProduct);

module.exports = router;