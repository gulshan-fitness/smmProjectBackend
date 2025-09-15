




const authenticateToken = require("../Authentication")


const express = require("express")

const CrosswordPuzzleScoreController = require("../Controlers/CrossWordScoreController")


const CrosswordpuzzleScoreRouter=express.Router()


CrosswordpuzzleScoreRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new CrosswordPuzzleScoreController().add(req.body)

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


CrosswordpuzzleScoreRouter.get(

    "/read/:id?",

    (req,res)=>{


        const result= new CrosswordPuzzleScoreController().read(req.params.id??null)

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
CrosswordpuzzleScoreRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new CrosswordPuzzleScoreController().delete(req.params.id)

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




module.exports=CrosswordpuzzleScoreRouter