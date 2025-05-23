const mongoose = require('mongoose');

const CrosswordpuzzleSchema = new mongoose.Schema(
    {

  title: String,

  grid: [[String]], // 2D array for crossword layout
  
  layout: [[Boolean]], // same 2D grid, true for active cells, false for black cells

 clues: {
    across: [
      {
        number: Number,
        clue: String,
        row: Number,
        col: Number,
        answer: String,
      },
    ],
    down: [
      {
        number: Number,
        clue: String,
        row: Number,
        col: Number,
        answer: String,
      },
    ],
  },
  
},
{timestamps:true}
);

module.exports = mongoose.model('Crosswordpuzzle', CrosswordpuzzleSchema);
