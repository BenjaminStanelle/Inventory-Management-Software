const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
<<<<<<< HEAD
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
=======
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }]
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
