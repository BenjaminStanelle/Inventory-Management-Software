const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  length: { type: String, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  description: { type: String, required: true },
  store_location: { type: String, required: true },
  // location: {
  //   lat: { type: Number, required: true },
  //   lng: { type: Number, required: true }
  // },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);
