const mongoose = require('mongoose');
const toyLineSchema = new mongoose.Schema(
    {
      name: String,
      years: [String],
    },
  );

//   const toyLineSchema = new mongoose.Schema(
//     {
//       name: String,
//       year: String, 
//       condition: String,
//       toyLine: String,
//       hasPackaging: Boolean,
//     //   doWant: Boolean,
//       doHave: Boolean,
//       accessories: [accessorySchema],
//     },
//     { timestamps: true }
//   );

const ToyLine = mongoose.model('ToyLine', toyLineSchema);
module.exports = { ToyLine };