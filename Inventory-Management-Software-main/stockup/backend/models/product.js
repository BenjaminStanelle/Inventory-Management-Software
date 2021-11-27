const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  vendorInfo: { type: String, required: true },
  description: { type: String, required: true },
  storage_location: { type: String, required: true },
  image: { type: String, required: true },
  // location: {
  //   lat: { type: Number, required: true },
  //   lng: { type: Number, required: true }
  // },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);
