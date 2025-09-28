

const { default: mongoose } = require("mongoose");

const MatchstickMathPuzzleModel = require("../models/MatchstickMathPuzzleModel");








class MatchstickMathPuzzleController {

    
  add(data) {


    
    return new Promise(async (resolve, reject) => {

      

      try {
    
            const MatchstickMathPuzzle = MatchstickMathPuzzleModel(data);

            await MatchstickMathPuzzle.save();

      

            resolve({
              msg: `MatchstickMathPuzzle added`,
              status: 1,
            });
          


        
      } catch (error) {
          console.log(error);
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }

  read(id,user_id) {

    

    return new Promise(async (resolve, reject) => {
      try {

        if(id){

      

const MatchstickMathPuzzle = await MatchstickMathPuzzleModel.findById(id)



  resolve({ msg: "MatchstickMathPuzzle finded", status: 1 ,MatchstickMathPuzzle});
        }
      
else{

  const MatchstickMathPuzzle = await MatchstickMathPuzzleModel.find();

  resolve({ msg: "MatchstickMathPuzzle finded", status: 1 ,MatchstickMathPuzzle});
}

      } catch (error) {
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


  edit(id,data) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await MatchstickMathPuzzleModel.updateOne({
          _id: id,
      
        },data);

  resolve({ msg: "update Succesfully", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


  resultVerify(id,data){
    console.log(data);
    

    return new Promise(async (resolve, reject) => {
      try {
       
           await MatchstickMathPuzzleModel.updateOne({
          _id: id,
      
        },{ $set:{submitedAnswer:data?.submitedAnswer }});
        
          // Fetch the updated puzzle
    const puzzle = await MatchstickMathPuzzleModel.findById(id);
if (!puzzle) {
    reject({ msg: "Puzzle not found", status: 0 })
}



const areAnswersEqual = (result, submittedAnswer) => {
        if (result.length !== submittedAnswer.length) return false;

        for (let i = 0; i < result.length; i++) {
          const rItem = result[i];
          const sItem = submittedAnswer[i];

          if (rItem.id !== sItem.id || rItem.value !== sItem.value) return false;

          if (rItem.matchsticks.length !== sItem.matchsticks.length) return false;

          for (let j = 0; j < rItem.matchsticks.length; j++) {
            const rMatch = rItem.matchsticks[j];
            const sMatch = sItem.matchsticks[j];
            if (rMatch.id !== sMatch.id || rMatch.status !== sMatch.status) return false;
          }
        }
        return true;
      };

      // Compare submitted answer with result
      const matched = areAnswersEqual(puzzle?.result, puzzle?.submitedAnswer);


     

        if(matched) resolve({ msg: "Answer Is right", status: 1 });

        else  resolve({ msg: "Answer Is wrong", status:0});

        
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


   delete(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await MatchstickMathPuzzleModel.deleteOne({
          _id: id,
        
        });

  resolve({ msg: "MatchstickMathPuzzle deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


}

module.exports = MatchstickMathPuzzleController;
