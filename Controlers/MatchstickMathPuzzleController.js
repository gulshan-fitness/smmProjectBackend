

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
