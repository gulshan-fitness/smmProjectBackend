const mongoose = require("mongoose");



const MatchstickMathPuzzleScoreSchema = new mongoose.Schema({


  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  
  MatchstickMathPuzzle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MatchstickMathPuzzle',
    required: true,
  },


  score: {
    type: Number,
    default: 0,
  },


}, { timestamps: true });

module.exports = mongoose.model("MatchstickMathPuzzleScore", MatchstickMathPuzzleScoreSchema);
