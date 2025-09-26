
const authenticateToken = require("../Authentication")


const express = require("express")



const MatchstickMathPuzzleController = require("../Controlers/MatchstickMathPuzzleController")



const MatchstickMathPuzzleRouter=express.Router()

MatchstickMathPuzzleRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new MatchstickMathPuzzleController().add(req.body)

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


MatchstickMathPuzzleRouter.get(

    "/read/:id?",

    (req,res)=>{


        const result= new MatchstickMathPuzzleController().read(req.params.id??null)

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
MatchstickMathPuzzleRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new MatchstickMathPuzzleController().delete(req.params.id)

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




module.exports=MatchstickMathPuzzleRouter