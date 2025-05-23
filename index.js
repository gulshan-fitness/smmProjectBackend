
const express  = require ("express")
const http = require("http");  // Needed for WebSocket server
const cors = require("cors")
const mongoose =require ("mongoose");
const{ initSocket}=require("./Socket")

const user_router = require("./routers/User_router");


const otp_router = require("./routers/Otp_router");
const AdminRouter = require("./routers/AdminRouter");
const CrosswordpuzzleRouter = require("./routers/CrosswordPuzzleRouter");
const CrosswordpuzzleScoreRouter = require("./routers/CrosswordPuzzleScoreRouter");
const SudokoRouter = require("./routers/SudokoRouter");
const SudokoScoreRouter = require("./routers/SudokoScoreRouter");





const app = express();


const server=http.createServer(app) 



app.use(express.json());


app.use(express.static("public"))


require('dotenv').config()


app.use(cors(
    {
  origin: 'https://smmprojectfrontendre.onrender.com',
  credentials: true
}
))






app.get('/', (req, res) => {
    res.send('Backend is running');
  })




app.use("/user",user_router)



app.use("/otp",otp_router)

app.use("/admin",AdminRouter)
app.use("/crosswordpuzzle",CrosswordpuzzleRouter)
app.use("/crosswordpuzzlescore",CrosswordpuzzleScoreRouter)
app.use("/sudoko",SudokoRouter)
app.use("/sudokoscore",SudokoScoreRouter)






mongoose.connect(
    
    process.env.MONGODB_URL,

    {dbName:process.env.DB_NAME}
)
.then(

    ()=>{
        console.log("db conected")

        server.listen( process.env.PORT,()=>{

            initSocket(server)
            console.log("server started")
            

        })

    }

)

.catch(
    
    (error)=>{

        console.log(error); 

        console.log("db not conected ")
       

    }
)


