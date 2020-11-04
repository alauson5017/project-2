const mongoose = require('mongoose'); 
  
var imageSchema = new mongoose.Schema({  
    src: String,
    contentType: String,
    imgType: String
  });
  
//Image is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('Image', imageSchema); 