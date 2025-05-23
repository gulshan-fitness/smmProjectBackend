const mongoose = require('mongoose');

const SudokuSchema = new mongoose.Schema({
  title: String,
  type: String, // e.g., 'classic'
  size: Number, // 4, 9, 16
  difficulty: String, // 'easy', 'medium', 'hard'
  puzzle: [[Number]], // 2D array
  solution: [[Number]],
},

{timestamps:true}

);

module.exports = mongoose.model('Sudoku', SudokuSchema);
