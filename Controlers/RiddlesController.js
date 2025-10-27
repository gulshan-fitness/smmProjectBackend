

const { default: mongoose } = require("mongoose");
const RiddlesModel = require("../models/RiddlesModel");








class RiddlesController {

    
  add(data) {


    
    return new Promise(async (resolve, reject) => {

      

      try {
     
     
            const Riddles = RiddlesModel(data);

            await Riddles.save();

      

            resolve({
              msg: `Riddles added`,
              status: 1,
            });
          


        
      } catch (error) {
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }




  read(id,query) {

    console.log(query);
    

    return new Promise(async (resolve, reject) => {
      try {

        if(id){

      

  const Riddles = await RiddlesModel.findOne({_id:id});
// const Crosswordpuzzle = await RiddlesModel.aggregate([
//   // Match the crossword puzzle by its _id
//   { $match: { _id: new mongoose.Types.ObjectId(id) } },

//   // Lookup score details from CrosswordPuzzleScore collection
//   {
//     $lookup: {
//       from: 'crosswordpuzzlescores',
//       localField: '_id',
//       foreignField: 'crosswordPuzzle_id',
//       as: 'scores',
//     },
//   },

//   // Filter scores array to only include the score by the userId
//   {
//     $addFields: {
//       filteredScore: {
//         $filter: {
//           input: '$scores',
//           as: 'score',
//           cond: { $eq: ['$$score.user_id', new mongoose.Types.ObjectId(user_id)] },
//         },
//       },
//     },
//   },

//   // Conditionally add userScore if it exists
//   {
//     $addFields: {
//       userScore: {
//         $cond: {
//           if: { $gt: [{ $size: '$filteredScore' }, 0] },
//           then: { $arrayElemAt: ['$filteredScore', 0] },
//           else: '$$REMOVE' // this removes the field if condition is false
//         },
//       },
//     },
//   },

//   // Cleanup
//   {
//     $project: {
//       scores: 0,
//       filteredScore: 0,
//     },
//   },
// ]);



  resolve({ msg: "Riddles finded", status: 1 ,Riddles});
        }
      
else{

const filter={}

if(query.type){

filter.type=query.type

}

  const Riddles = await RiddlesModel.find(filter);

  resolve({ msg: "Riddles finded", status: 1 ,Riddles});



}

      } 
      catch (error) {   

        reject({ msg: "internel error", status: 0 });


      }



    });
  }


 async answerVerify(id,ans){


try {
  const  normalize=(text)=> {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\b(the|a|an)\b/g, "")   // remove 'the', 'a', 'an'
    .replace(/\s+/g, " ")            // collapse multiple spaces
    .trim();                         // trim leading/trailing spaces
}
  const riddle=await RiddlesModel.findOne({

    _id:id, 

  })



 const riddle_answer=normalize(riddle.answer) 

 const given_answer=normalize(ans)


 if(riddle_answer==given_answer) return{  msg:"correct Answer", status:1}
  else return{  msg:"wrong Answer", status:0}
} catch (error) {
  return{  msg:error.message, status:0}
}
 }

  edit(data,id) {

    return new Promise(async (resolve, reject) => {
      try {
       
           await RiddlesModel.updateOne({
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
       
           await RiddlesModel.deleteOne({
          _id: id,
        
        });

  resolve({ msg: "riddles deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }




}

module.exports = RiddlesController;
