
const socket_io = require("socket.io");


let io;


const initSocket = (server) => {
    
    
    io = socket_io(server, {
        cors: {
            origin: "*",
        },
    });


    io.on("connection", (socket) => {

     







socket.on("JoinOrderUpdateRoom",( id)=>{


            const room = `Order:${id}`;
            socket.join(room);

            
        


})




socket.on("JoinDeliveryPartnerLocationRoom",( id)=>{


    const room = `Location:${id}`;
    socket.join(room);

  


})





        

        socket.on("disconnect", () => {


           



        });
    });
};

const getIO = () => {


    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

module.exports = { initSocket, getIO };
