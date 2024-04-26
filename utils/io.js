const chatController = require("../Controllers/chat.controller");
let userController = require("../Controllers/user.controller");
module.exports = (io) => {
    
    //emit, on의 조합. on 은 듣는거, emit은 말하는거
    io.on("connection", async( socket )=>{
        //연결됐을 때 socket 매개변수로 정보 가져올 수 있음
        console.log("client is connected", socket.id );

        socket.on("sendMessage", async(message, cb) => {
            try{
                // cb({ok:true, data:newMessage}) 이렇게 콜백 때려서 되는게 아니라, 다른 애들한테도 다 보내줘야함 
                io.emit("message", message);
                cb({ok:true})
            }catch(error){
                cb({ok:false,error:error.message});
            }

        })
    });

}