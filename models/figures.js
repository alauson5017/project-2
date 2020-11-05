const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({ 
  src: String,
  contentType: String,
  imgType: String
}); 

const accessorySchema = new mongoose.Schema(
    {
      accessoryName: String,
      doHave: Boolean,
      image: [imageSchema]
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
      doHave: Boolean,
      accessories: [accessorySchema],
      image: [imageSchema]
    },
    { timestamps: true }
  );

  const Accessory = mongoose.model('Accessory', accessorySchema);
  const ActionFigure = mongoose.model('ActionFigure', figureSchema);
module.exports = { ActionFigure, Accessory };