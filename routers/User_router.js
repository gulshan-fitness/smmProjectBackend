



const authenticateToken = require("../Authentication")
const user_controller = require("../Controlers/User_controller")


express = require("express")


const User_router = express.Router()



User_router.post(
    "/sign_up",
(req,res)=>{
    
    

        const result = new user_controller().sign_up(req.body)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)

User_router.post(
    "/login",

(req,res)=>{
    
    

        const result = new user_controller().login(req.body)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)



User_router.post(
    "/loginWithOtp",

(req,res)=>{
    

        const result = new user_controller().loginWithOtp(req.body)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)



User_router.get(
    "/userverify/:id",
    authenticateToken,

(req,res)=>{
    
    

        const result = new user_controller().userverify(req.params.id)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)


<<<<<<< HEAD
module.exports= User_router 
=======
module.exports= User_router 
>>>>>>> d767b3f5eb3cbf4621e94793660e271c09cb7cc8
