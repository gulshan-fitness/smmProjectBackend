

const CrosswordPuzzleScoreModel = require("../models/CrosswordPuzzleScoreModel");








class CrosswordPuzzleScoreController {

    
  add(data) {

  
    
    return new Promise(async (resolve, reject) => {

      

      try {
     
        const exist_user= await CrosswordPuzzleScoreModel.findOne({user_id:data?.user_id})

        if(exist_user){

             await  CrosswordPuzzleScoreModel.updateOne({user_id:data?.user_id},data)
             
            resolve({
              msg: `Score Submited`,
              status: 1,
            });

        }
     
        else{
             const CrosswordpuzzleScore = CrosswordPuzzleScoreModel(data);

            await CrosswordpuzzleScore.save();

      

            resolve({
              msg: `Score Submited`,
              status: 1,
            });

        }
           
          


        
      } catch (error) {
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }

  read(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
        
        if(id){
              const CrosswordpuzzleScore = await CrosswordPuzzleScoreModel.findOne({
          _id: id,
        
        });

  resolve({ msg: "CrosswordpuzzleScore finded", status: 1 ,CrosswordpuzzleScore});
        }
      
else{
                  const CrosswordpuzzleScore = await CrosswordPuzzleScoreModel.find();

  resolve({ msg: "CrosswordpuzzleScore finded", status: 1 ,CrosswordpuzzleScore});
}

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


   delete(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await CrosswordPuzzleScoreModel.deleteOne({
          _id: id,
        
        });

  resolve({ msg: "CrosswordpuzzleScore deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }



}

module.exports = CrosswordPuzzleScoreController;
