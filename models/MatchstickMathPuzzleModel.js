const mongoose = require('mongoose');

const MatchstickMathPuzzleSchema = new mongoose.Schema(
{
  game: {
    type: [
      {
        id: { type: String, enum: ['number','operator',"equals","result"], required: true },

        value: { type: String, required: true },
        
        matchsticks: [
          {
            id: { type: String, required: true },
            status: { type: Boolean, default: true },
          }
        ]
      }
    ],
    required: true
  },





  level: {
    type: Number,
    required: true
  },

  move: {
    type: Number,
    required: true
  },

   hint: {
    type: String,
    required: true
  },


  submitedAnswer: {
      type: [
        {
          id: { type: String, enum: ["number","operator","equals", "result"], required: true },

          value: { type: String, required: true },

          matchsticks: [
            {
              id: { type: String, required: true },
              status: { type: Boolean, default: true },
            },
          ],

        },
      ],
      required: false,
    },

  result: {
    type: [
      {
        id: { type: String, enum: ['number', 'operator',"equals","result"], required: true },
      
        value: { type: String, required: true },
        matchsticks: [
          {
            id: { type: String, required: true },
            status: { type: Boolean, default: true },
          }
        ]
      }
    ],


  
    required: true
  }
}, 
{
  timestamps: true
});

module.exports = mongoose.model('MatchstickMathPuzzle', MatchstickMathPuzzleSchema);
