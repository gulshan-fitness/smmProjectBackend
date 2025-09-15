const mongoose = require('mongoose');

const RiddlesSchema = new mongoose.Schema(
    {

  question:{type:String,
    required:true
  },

    answer:{type:String,
    required:true
  },


  clue:{
type:String,
required:true
  },

  
  type:{
type:String,
required:true
  },


},
{timestamps:true}
);

module.exports = mongoose.model('Riddles', RiddlesSchema);
