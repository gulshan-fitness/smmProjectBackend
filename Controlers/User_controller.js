const user_model= require("../models/User_model")
const jwt = require("jsonwebtoken")
const  OtpModel= require("../models/Otp_model")

const Cryptr = require('cryptr');
const passwordcrypter = new Cryptr('blablagym');

class user_controller {



    sign_up(data){
      
        
   

        return new Promise(
            async(resolve, reject) => {
                
            try {
                
        
                    const exits_email = await user_model.findOne({email:data.email})
        const phone=await user_model.findOne({phone:data.phone})
        
                    if(exits_email){
                        reject( { msg: "This email addres already registered", status: 0 })  
                    }

                    else if(phone){
                        reject( { msg: "This contact number already registered", status: 0 })  
                    }
        
                    else{

                        if(data.password == data.confirm_password){
        
                            const encryptedpassword=passwordcrypter.encrypt(data.password);
                            
                            const user= user_model(
                                
                                {
                                    name:data.name,
                                    email:data.email,
                                    phone: data.phone,
                                    password:encryptedpassword,
                                  
                            
                                }
                            )
                           
        
                              await user.save()
                              
           const token = jwt.sign({ user: user }, process.env.TOKEN_KEY, { expiresIn: '10y' });
              
                         const{password,...userdata}=user.toObject()                      
           
           resolve(

                                        { msg: "User login succesfully", status: 1,user:userdata,token }

                                       )    
                            
                        }
                
                else{
                    reject( { msg: "password and confirm_password is not matching", status: 0 })
                }
                
                    }
        
        
               
                
  
                
            } 
            catch (error) {
                
                
               
                reject(
                    
                    { msg: "internal error", status: 0 }
                   )
            }
        
            
        })
        }


 async read(id){
      
        
   

      
            try {
                
                if(id){
              const user = await user_model.findOne({_id:id})

  return { msg: "User Finded", status: 1 ,user}

                }
        
      
        
                  

        
                    else{


             const user = await  user_model.find()

  return { msg: "User Finded ", status: 1 ,user}

                
                    }
        
        
               
                
  
                
            } 
            catch (error) {
                
                
               
                reject(
                    
                    { msg: "internal error", status: 0 }
                   )
            }}
        
     


        login(data){
    
   
            return new Promise(
                async(resolve, reject) => {
                try {
        
        
        
        
            const user= await user_model.findOne({email:data.email})
            const phone = await user_model.findOne({phone:data.phone})

            

        
            if(user || phone){
            
        
            
            const decrypted_password = passwordcrypter.decrypt(user? user.password: phone.password);
           
        if(decrypted_password == data.password){

            
            const token = jwt.sign({ user: user?user:phone }, process.env.TOKEN_KEY, { expiresIn: '10y' });

const userdefine=user?user:phone

         const{password,...userdata}=userdefine.toObject() 
            resolve(
        
                
        
               {msg:" login succesfull" , status: 1, user:userdata,token
                
               
            }
        
            )
        
        }
        else{
        
        reject(
                  
                { msg:"password is worng" ,status: 0 }
               ) 
        }
        
        
        
            }
        
          else{
              reject(
                  
                  { msg: " dont have any account with this email or contact Number", status: 0 }
                 )
          }
        }
        
             
                 
                    
                
                catch (error) {

                      
                  
                    
                    
                   
                    reject(
                        
                        { msg: "internal error", status: 0 }
                       )
                }
            
                
            })
        
            }
              
            loginWithOtp(data){
                
              
               
                            return new Promise(
                                async(resolve, reject) => {
                                try {
                        
                           
                            const exitContact=await user_model.findOne({phone:data.phone})
                           
                            if(exitContact){
                            
                    const user=exitContact
            
                      const otp_verify = await OtpModel.findOne({
                                phone: data.phone,
                                otp: data.otp,
                              });
                      
        
            

                        if(otp_verify){

                            const token = jwt.sign({ user: user?user:phone }, process.env.TOKEN_KEY, { expiresIn: '10y' });

                         const{password,...userdata}=user.toObject()

                            resolve(
                                {msg:" login succesfull" , status: 1, user:userdata,token    
                             }
                         
                             )
            
                        }
                      
                           
                        
                     else{
                        reject(
                                  
                            { msg: " otp is not correct", status: 0 }
                           )
                     }
                        
                        
                        
                            }
                        
                          else{
                              reject(
                                  
                                  { msg: " dont have any account with this Phone Number", status: 0 }
                                 )
                          }
                        }
                        
                             
                                 
                                    
                                
                                catch (error) {
                                   
                                    reject(
                                        
                                        { msg: "internal error", status: 0 }
                                       )
                                }
                            
                                
                            })
                        
                            }


          


  
  userverify(id){
    
   
            return new Promise(
                async(resolve, reject) => {
                try {
        
        
        
        
            const existuser= await user_model.findOne({_id:id})
           

            

        
            if(existuser){
            
        
            
          
           
      

            
            const token = jwt.sign({ user: existuser }, process.env.TOKEN_KEY, { expiresIn: '10y' });

const{password,...userdata}=existuser.toObject()
         
            resolve(
        
                
        
               {msg:" verify done" , status: 1, user:userdata,token
                
               
            }
        
            )
        
        }


        else     reject(
                        
                        { msg: "verification Failed", status: 0 }
                       )

        }
        
             
                 
                    
                
                catch (error) {

                      
                    
                    
                   
                    reject(
                        
                        { msg: "internal error", status: 0 }
                       )
                }
            
                
            })
        
            }


             delete(id){
    
   
            return new Promise(
                async(resolve, reject) => {
                try {
        
        
        
        
             await user_model.deleteOne({_id:id})
           
 resolve(
                        
                        { msg: "delete succesfully", status: 1 }
                       )
            
                    }
        
    
        
             
                 
                    
                
                catch (error) {

                      
                    
                    
                   
                    reject(
                        
                        { msg: "internal error", status: 0 }
                       )
                }
            
                
            })
        
            }


      async top10User(){

                try {
const topStudents = await user_model.aggregate([
  { $match: {} },

  // Lookup all score collections
  {
    $lookup: {
      from: 'riddlescores',
      localField: '_id',
      foreignField: 'user_id',
      as: 'riddleScores',
    },
  },
  {
    $lookup: {
      from: 'sudokuscores',
      localField: '_id',
      foreignField: 'user_id',
      as: 'sudokuScores',
    },
  },
  {
    $lookup: {
      from: 'matchstickmathpuzzlescores',
      localField: '_id',
      foreignField: 'user_id',
      as: 'matchstickScores',
    },
  },
  {
    $lookup: {
      from: 'crosswordpuzzlescores',
      localField: '_id',
      foreignField: 'user_id',
      as: 'crosswordScores',
    },
  },

  // Calculate total score = sum of all scores
  {
    $project: {
      name: 1,
      email: 1,
      totalScore: {
        $sum: [
          { $sum: '$riddleScores.score' },
          { $sum: '$sudokuScores.score' },
          { $sum: '$matchstickScores.score' },
          { $sum: '$crosswordScores.currentScore' },
        ]
      }
    }
  },

  // Only users who played at least one game
  { $match: { totalScore: { $gt: 0 } } },

  // Sort by totalScore descending
  { $sort: { totalScore: -1 } },

  // Add rank
  {
    $setWindowFields: {
      sortBy: { totalScore: -1 },
      output: { rank: { $rank: {} } }
    }
  },

  // Top 10
  { $limit: 10 },

  // Final output
  {
    $project: {
      _id: 1,
      name: 1,
      email: 1,
      totalScore: 1,
      rank: 1
    }
  }
]);


return{msg:"top 10 students Finded",topStudents,status:1}
                    
                } catch (error) {
                    return{msg:error,status:0}
                }

            }




  }


  module.exports = user_controller
