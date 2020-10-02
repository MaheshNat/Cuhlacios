const mongoose = require('mongoose');
const roastSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roast: String
});
module.exports = mongoose.model('Roast', roastSchema);
