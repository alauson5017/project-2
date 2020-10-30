const mongoose = require('mongoose');
const accessorySchema = new mongoose.Schema(
    {
      accessoryName: String,
      accessoryCondition: String,
      doWant: Boolean,
      doHave: Boolean,
    },
    { timestamps: true }
  );

  const figureSchema = new mongoose.Schema(
    {
      name: String,
      year: String, 
      condition: String,
      toyLine: String,
      hasPackaging: Boolean,
    //   doWant: Boolean,
      doHave: Boolean,
      accessories: [accessorySchema],
    },
    { timestamps: true }
  );

const ActionFigure = mongoose.model('ActionFigure', figureSchema);
const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = { ActionFigure, Accessory };