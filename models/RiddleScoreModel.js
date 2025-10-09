const mongoose = require("mongoose");



const RiddleScoreSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  
  Riddle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Riddles',
    required: true,
  },


  score: {
    type: Number,
    default: 0,
  },


}, { timestamps: true });

module.exports = mongoose.model("RiddleScore", RiddleScoreSchema);
