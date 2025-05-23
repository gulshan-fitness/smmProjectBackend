




const authenticateToken = require("../Authentication")


const express = require("express")
const CrosswordpuzzleController = require("../Controlers/CrosswordPuzzleController")

const CrosswordpuzzleRouter=express.Router()


CrosswordpuzzleRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new CrosswordpuzzleController().add(req.body)

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


CrosswordpuzzleRouter.get(

    "/read/:id?/:user_id?",

    (req,res)=>{


        const result= new CrosswordpuzzleController().read(req.params.id??null,req.params.user_id??null )

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

CrosswordpuzzleRouter.put(

    "/edit/:id",
      authenticateToken,

    (req,res)=>{


        const result= new CrosswordpuzzleController().edit(req.params.id,req.body)

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

CrosswordpuzzleRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new CrosswordpuzzleController().delete(req.params.id)

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




module.exports=CrosswordpuzzleRouter