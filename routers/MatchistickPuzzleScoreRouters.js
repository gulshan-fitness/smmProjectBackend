




const authenticateToken = require("../Authentication")


const express = require("express")

const MatchistickScoreController = require("../Controlers/MatchstickScoreController")




const MatchistickScoreScoreRouter=express.Router()


MatchistickScoreScoreRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new MatchistickScoreController().add(req.body)

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


MatchistickScoreScoreRouter.get(

    "/read/:id?",

    (req,res)=>{


        const result= new MatchistickScoreController().read(req.params.id??null)

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



MatchistickScoreScoreRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new MatchistickScoreController().delete(req.params.id)

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




module.exports=MatchistickScoreScoreRouter