




const authenticateToken = require("../Authentication")


const express = require("express")



const SudokoController = require("../Controlers/SudokoController")

 
const SudokoRouter=express.Router()


SudokoRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new SudokoController().add(req.body)

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


SudokoRouter.get(

    "/read/:id?/:user_id?",

    (req,res)=>{
        const result= new SudokoController().read(req.params.id??null,req.params.user_id??null)

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

SudokoRouter.put(

    "/edit/:id",
      authenticateToken,

    (req,res)=>{


        const result= new SudokoController().edit(req.params.id,req.body)

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


SudokoRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new SudokoController().delete(req.params.id)

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




module.exports=SudokoRouter