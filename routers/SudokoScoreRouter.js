




const authenticateToken = require("../Authentication")


const express = require("express")
const SudokoScoreController = require("../Controlers/SudokoScoreController")




const SudokoScoreRouter=express.Router()


SudokoScoreRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new SudokoScoreController().add(req.body)

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


SudokoScoreRouter.get(

    "/read/?:id",

    (req,res)=>{


        const result= new SudokoScoreController().read(req.params.id??null)

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
SudokoScoreRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new SudokoScoreController().delete(req.params.id)

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




module.exports=SudokoScoreRouter