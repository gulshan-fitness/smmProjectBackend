

const { default: mongoose } = require("mongoose");
const CrosswordpuzzleModel = require("../models/CrosswordPuzzleModel");








class CrosswordpuzzleController {

    
  add(data) {


    
    return new Promise(async (resolve, reject) => {

      

      try {
     

      

    

     
            const Crosswordpuzzle = CrosswordpuzzleModel(data);

            await Crosswordpuzzle.save();

      

            resolve({
              msg: `puzzles added`,
              status: 1,
            });
          


        
      } catch (error) {
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }

  read(id,user_id) {

    

    return new Promise(async (resolve, reject) => {
      try {

        if(id){

      

const Crosswordpuzzle = await CrosswordpuzzleModel.aggregate([
  // Match the crossword puzzle by its _id
  { $match: { _id: new mongoose.Types.ObjectId(id) } },

  // Lookup score details from CrosswordPuzzleScore collection
  {
    $lookup: {
      from: 'crosswordpuzzlescores',
      localField: '_id',
      foreignField: 'crosswordPuzzle_id',
      as: 'scores',
    },
  },

  // Filter scores array to only include the score by the userId
  {
    $addFields: {
      filteredScore: {
        $filter: {
          input: '$scores',
          as: 'score',
          cond: { $eq: ['$$score.user_id', new mongoose.Types.ObjectId(user_id)] },
        },
      },
    },
  },

  // Conditionally add userScore if it exists
  {
    $addFields: {
      userScore: {
        $cond: {
          if: { $gt: [{ $size: '$filteredScore' }, 0] },
          then: { $arrayElemAt: ['$filteredScore', 0] },
          else: '$$REMOVE' // this removes the field if condition is false
        },
      },
    },
  },

  // Cleanup
  {
    $project: {
      scores: 0,
      filteredScore: 0,
    },
  },
]);



  resolve({ msg: "puzzle finded", status: 1 ,Crosswordpuzzle});
        }
      
else{

  const Crosswordpuzzle = await CrosswordpuzzleModel.find();

  resolve({ msg: "puzzle finded", status: 1 ,Crosswordpuzzle});
}

      } catch (error) {
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


  edit(id,data) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await CrosswordpuzzleModel.updateOne({
          _id: id,
      
        },data);

  resolve({ msg: "update Succesfully", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


   delete(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await CrosswordpuzzleModel.deleteOne({
          _id: id,
        
        });

  resolve({ msg: "puzzle deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


}

module.exports = CrosswordpuzzleController;
