

const RiddleScoreModel = require("../models/RiddleScoreModel");



class RiddleScoreController {


    
  add(data) {

  
    
    return new Promise(async (resolve, reject) => {

      

      try {

     
        const existScore= await RiddleScoreModel.findOne(
          {user_id:data?.user_id,
          Riddle_id:data?.Riddle_id}
        )



        if(existScore){

             await RiddleScoreModel.updateOne({_id:existScore?._id},{$set:{
              score:data?.score
             }})

            resolve({
              msg: `Score Submited`,
              status: 1,
            });


        }
     
        else{
          
             const riddleScore = RiddleScoreModel(data);

            await riddleScore.save();
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
              const riddleScore = await RiddleScoreModel.findOne({
          _id: id,
        
        });

  resolve({ msg: "riddleScore finded", status: 1 ,riddleScore});
        }
      
else{
                  const riddleScore = await RiddleScoreModel.find();

  resolve({ msg:"riddleScore finded", status: 1 ,riddleScore});
}

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }




   delete(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await RiddleScoreModel.deleteOne({
          _id: id,
        });

  resolve({ msg: "riddleScore deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }






}

module.exports = RiddleScoreController;
