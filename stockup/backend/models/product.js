const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  length: { type: int, required: true },
  width: { type: int, required: true },
  height: { type: int, required: true },
  description: { type: String, required: true },
  store_location: { type: String, required: true },
//   location: {
//     lat: { type: Number, required: true },
//     lng: { type: Number, required: true }
//   },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);
