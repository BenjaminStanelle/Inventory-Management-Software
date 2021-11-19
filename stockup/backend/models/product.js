const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
<<<<<<< HEAD
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
=======
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
>>>>>>> ee84e8444bea950a3ac82d09c684f9f8d67aa4e1
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);
