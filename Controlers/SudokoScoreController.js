

const SudokoScoreModel = require("../models/SudokoScoreModel");








class SudokoScoreController {

    
  add(data) {

  
    
    return new Promise(async (resolve, reject) => {

      

      try {
     
        const existScore= await SudokoScoreModel.findOne({user_id:data?.user_id,Sudoko_id:data?.Sudoko_id})

        if(existScore){

             await  SudokoScoreModel.updateOne({_id:existScore?._id},{$set:{
              score:data?.score
             }})
             
            resolve({
              msg: `Score Submited`,
              status: 1,
            });

        }
     
        else{
             const SudokoScore = SudokoScoreModel(data);

            await SudokoScore.save();

      

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
              const SudokoScore = await SudokoScoreModel.findOne({
          _id: id,
        
        });

  resolve({ msg: "SudokoScore finded", status: 1 ,SudokoScore});
        }
      
else{
                  const SudokoScore = await SudokoScoreModel.find();

  resolve({ msg: "SudokoScore finded", status: 1 ,SudokoScore});
}

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }




   delete(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await SudokoScoreModel.deleteOne({
          _id: id,
        
        });

  resolve({ msg: "SudokoScore deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }



}

module.exports = SudokoScoreController;
