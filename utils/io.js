const chatController = require("../Controllers/chat.controller");
let userController = require("../Controllers/user.controller");
module.exports = (io) => {
    
    //emit, on의 조합. on 은 듣는거, emit은 말하는거
    io.on("connection", async( socket )=>{
        //연결됐을 때 socket 매개변수로 정보 가져올 수 있음
        console.log("client is connected", socket.id );

        socket.on("login", async(userName,userColor, cb)=>{
            //유저 정보를 저장
            try{
                const user = await userController.saveUser(userName, userColor, socket.id);
                const welcomeMsg = {
                    chat: `${user.name} is joined to this room`,
                    user: {id:null, name: "system"},
                };
                io.emit("message", welcomeMsg);

                const recentChats = await chatController.getRecentChat();
                for( let i = 0; i < recentChats.length ; i ++ ){
                    socket.emit('message', recentChats[i]);
                }

                cb({ok:true,data:user});
            } catch(error){
                cb({ok:false,error:error.message});
            }
        })

        socket.on("sendMessage", async(message, cb) => {
            try{
                //소켓 id 로 유저 찾기 
                const user = await userController.checkUser(socket.id);
                //메세지 저장
                const newMessage = await chatController.saveChat(message, user);
                // cb({ok:true, data:newMessage}) 이렇게 콜백 때려서 되는게 아니라, 다른 애들한테도 다 보내줘야함 
                io.emit("message", newMessage);
                cb({ok:true})
            }catch(error){
                cb({ok:false,error:error.message});
            }

        })
        socket.on("disconnect", ()=>{
            console.log("user is disconnected");
        })
    });

}