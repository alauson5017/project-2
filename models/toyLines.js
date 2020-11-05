const mongoose = require('mongoose');
const toyLineSchema = new mongoose.Schema(
    {
      name: String,
      years: [String],
    },
  );

const ToyLine = mongoose.model('ToyLine', toyLineSchema);
module.exports = { ToyLine };