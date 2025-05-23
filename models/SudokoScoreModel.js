const mongoose = require("mongoose");

const SudokuScoreSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Sudoko_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sudoku',
    required: true,
  },
  userGrid: {
    type: [[Number]],
    default: [], // User’s current grid state
  },
  timeTaken: {
    type: Number, // seconds
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("SudokuScore", SudokuScoreSchema);
