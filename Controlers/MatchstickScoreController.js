

const MatchistickScoreModel = require("../models/MatchStickScoreModel");



class MatchistickScoreController {


    
  add(data) {

  
    
    return new Promise(async (resolve, reject) => {

      

      try {
     
        const exist_user= await MatchistickScoreModel.findOne({user_id:data?.user_id})



        if(exist_user){


             await MatchistickScoreModel.updateOne({user_id:data?.user_id},data)
             

            resolve({
              msg: `Score Submited`,
              status: 1,
            });


        }
     
        else{
             const MatchistickScore = MatchistickScoreModel(data);

            await MatchistickScore.save();

      

            resolve({
              msg: `Score Submited`,
              status: 1,
            });

        }
           
          


        
      } catch (error) {
          
        console.log(error);
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }

  read(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
        
        if(id){
              const MatchistickScore = await MatchistickScoreModel.findOne({
          _id: id,
        
        });

  resolve({ msg: "MatchistickScore finded", status: 1 ,MatchistickScore});
        }
      
else{
                  const MatchistickScore = await MatchistickScoreModel.find();

  resolve({ msg:"MatchistickScore finded", status: 1 ,MatchistickScore});
}

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }




   delete(id) {

    

    return new Promise(async (resolve, reject) => {
      try {
       
           await MatchistickScoreModel.deleteOne({
          _id: id,
        });

  resolve({ msg: "MatchistickScore deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }






}

module.exports = MatchistickScoreController;
