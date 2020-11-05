const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({ 
  // name: String, 
  // desc: String, 
  src: String,
  contentType: String,
  imgType: String
  // { 
  //     data: Buffer, 
  //     contentType: String 
  // } 
}); 

const accessorySchema = new mongoose.Schema(
    {
      accessoryName: String,
      // accessoryCondition: String,
      // doWant: Boolean,
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
    //   doWant: Boolean,
      doHave: Boolean,
      accessories: [accessorySchema],
      image: [imageSchema]
    },
    { timestamps: true }
  );

  const Accessory = mongoose.model('Accessory', accessorySchema);
  // const Image = mongoose.model('Image', imageSchema);
  const ActionFigure = mongoose.model('ActionFigure', figureSchema);
// module.exports = { ActionFigure, Accessory , Image };
module.exports = { ActionFigure, Accessory };