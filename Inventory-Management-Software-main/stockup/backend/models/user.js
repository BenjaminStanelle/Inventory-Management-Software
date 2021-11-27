const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  pnumber: {type: String, required: true, minlength: 10},
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }]
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
