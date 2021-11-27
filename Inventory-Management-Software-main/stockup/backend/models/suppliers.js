const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const suppliersSchema = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Suppliers', suppliersSchema);
