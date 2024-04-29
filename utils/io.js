const chatController = require("../Controllers/chat.controller");
let userController = require("../Controllers/user.controller");

let clients = [];
module.exports = (io) => {
    
    //emit, on의 조합. on 은 듣는거, emit은 말하는거
    io.on("connection", async( socket )=>{

        //연결됐을 때 socket 매개변수로 정보 가져올 수 있음
        console.log("client is connected", socket.id );

        //유저 로그인 시 정보 추가
        socket.on('login', async(userName) =>  {
            let clientInfo = new Object();
            clientInfo.userName = userName;
            clientInfo.id = socket.id;
            clients.push(clientInfo);
            console.log(clients);
        });

        //유저가 메세지 보내면 전달
        socket.on("sendMessage", async(message, userName, cb) => {
            try{

                // 클라이언트 소켓 아이디를 통해서 그 소켓을 가진 클라이언트에만 메세지를 전송
                for (let i=0; i < clients.length; i++) {
                    let client = clients[i];
                    if (client.userName == userName) {
                        console.log(userName);
                        io.to(client.id).emit("message",message);
                        break;
                    }
                }

                cb({ok:true});
            }catch(error){
                cb({ok:false,error:error.message});
            }

        })

        socket.on('disconnect', function() {
            for (let i=0; i < clients.length; i++) {
                let client = clients[i];
                if (client.id == socket.id) {
                    clients.splice(i, 1);
                    break;
                }
            }
            console.log('user disconnected');
        });
        socket.on('logout', function() {
            for (let i=0; i < clients.length; i++) {
                let client = clients[i];
                if (client.id == socket.id) {
                    clients.splice(i, 1);
                    break;
                }
            }
            console.log('someone logout');
        });
    });

}