const {createServer} = require("http")
const app = require("./app")
const {Server} = require("socket.io")
require("dotenv").config();

const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin: "http://218.52.173.181:3000"
    }
})

require("./utils/io")(io); //utils.io에 io를 넘겨주자

httpServer.listen(process.env.PORT, ()=>{
    console.log("server listening on port", process.env.PORT);
})