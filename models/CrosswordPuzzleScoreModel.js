const mongoose = require('mongoose');

const CrosswordPuzzleScoreSchema = new mongoose.Schema(
  {
    crosswordPuzzle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crosswordpuzzle',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // or String if you use another ID format
      required: true,
    },

    currentScore: {
      type: Number,
      default: 0,
    },

    answersGrid: [[String]], // Student's current filled answers grid

  },
  { timestamps: true }
);

module.exports = mongoose.model('CrosswordPuzzleScore', CrosswordPuzzleScoreSchema);
