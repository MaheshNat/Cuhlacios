const mongoose = require('mongoose');

const ddSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  price2: { type: Number, required: false },
  type: { type: String, required: true },
  expirationDate: { type: Date, required: true }
});

module.exports = mongoose.model('DD', ddSchema);
