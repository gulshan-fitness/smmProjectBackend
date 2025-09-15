




const authenticateToken = require("../Authentication")


const express = require("express")

const RiddlesController = require("../Controlers/RiddlesController")


const RiddlesRouter=express.Router()


RiddlesRouter.post(
    "/add",
    authenticateToken,
    (req,res)=>{

 const result= new RiddlesController().add(req.body)

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


RiddlesRouter.get(

    "/read/:id?",

    (req,res)=>{
        const result= new RiddlesController().read(req.params.id??null,req.query)

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


RiddlesRouter.post(

    "/answerVerify/:id/:answer",

    (req,res)=>{
        

     const result= new RiddlesController().answerVerify(req.params.id,req.params.answer)


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


RiddlesRouter.put(

    "/edit/:id/:User_id",

    (req,res)=>{
        const result= new RiddlesController().edit(req.body,req.params.id,req.params.User_id)

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

RiddlesRouter.delete(

    "/delete/:id",
      authenticateToken,

    (req,res)=>{


        const result= new RiddlesController().delete(req.params.id)

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




module.exports=RiddlesRouter