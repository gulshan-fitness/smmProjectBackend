

const { default: mongoose } = require("mongoose");

const SudokoModel = require("../models/SudokoModel");



class SudokoController {

    
  add(data) {

   
    
    return new Promise(async (resolve, reject) => {

      

      try {
     

      

     
            const Sudoko = SudokoModel(data);

            await Sudoko.save();

      

            resolve({
              msg: `Sudoko added`,
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

    
      
            

const Sudoko = await SudokoModel.aggregate([
  {
    $match: { _id: new mongoose.Types.ObjectId(id) }
  },
  {
    $lookup: {
      from: 'sudokuscores',
      localField: '_id',
      foreignField: 'Sudoko_id',
      as: 'scores'
    }
  },
  {
    $addFields: {
      filteredScore: {
        $filter: {
          input: '$scores',
          as: 'score',
          cond: {
            $eq: ['$$score.user_id', new mongoose.Types.ObjectId(user_id)]
          }
        }
      }
    }
  },
  {
    $addFields: {
      userScore: {
        $cond: {
          if: { $gt: [{ $size: '$filteredScore' }, 0] },
          then: { $arrayElemAt: ['$filteredScore', 0] },
          else: null
        }
      }
    }
  },
  {
    $project: {
      scores: 0,
      filteredScore: 0
    }
  }
]);




  resolve({ msg: "Sudoko finded", status: 1 ,Sudoko});
        }
      
else{

  const Sudoko = await SudokoModel.find();

  resolve({ msg: "Sudoko finded", status: 1 ,Sudoko});
}

      } catch (error) {
          
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }

       edit(id,data) {
      return new Promise(async (resolve, reject) => {
        try {
             await SudokoModel.updateOne({
            _id: id,
          },data);
    resolve({ msg: "Update Succcesfully", status: 1 });
        } catch (error) {
          reject({ msg: "internel error", status: 0 });
        }
      });
    }

   delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
           await SudokoModel.deleteOne({
          _id: id,
        });

  resolve({ msg: "Sudoko deleted", status: 1 });
        

      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }


}

module.exports = SudokoController;
