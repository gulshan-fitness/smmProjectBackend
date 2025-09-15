const authenticateToken = require("../Authentication")
const AdminController = require("../Controlers/AdminController")


express = require("express")


const AdminRouter = express.Router()





AdminRouter.post(

    "/sign_up",

(req,res)=>{

 

        const result = new AdminController().sign_up(req.body)
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



AdminRouter.post(
    "/login",

    (req,res)=>{
    
       
    
            const result = new AdminController().login(req.body)
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

AdminRouter.get(
    "/AdminVerify/:id",
    authenticateToken,

    (req,res)=>{
    
       
    
            const result = new AdminController().AdminVerify(req.params.id)
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












module.exports= AdminRouter  