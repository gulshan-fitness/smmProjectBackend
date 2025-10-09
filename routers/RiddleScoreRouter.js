




const authenticateToken = require("../Authentication")


const express = require("express")

const RiddleScoreController = require("../Controlers/RiddleScoreController")




const RiddleScoreRouter=express.Router()


RiddleScoreRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new RiddleScoreController().add(req.body)

result.then(

    (succes)=>{

res.send(succes)
    }
)




.catch(
    (error)=>{
        res.send(error)

    }
)

    }
)


RiddleScoreRouter.get(

    "/read/:id?",

    (req,res)=>{


        const result= new RiddleScoreController().read(req.params.id??null)

result.then(
    (succes)=>{

res.send(succes)
    }
)
.catch(
    (error)=>{
        res.send(error)

    }
)

    }
)



RiddleScoreRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new RiddleScoreController().delete(req.params.id)

result.then(
    (succes)=>{

res.send(succes)
    }
)
.catch(
    (error)=>{
        res.send(error)

    }
)

    }
)




module.exports=RiddleScoreRouter