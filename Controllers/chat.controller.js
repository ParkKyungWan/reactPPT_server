const Chat = require("../Models/chat")
const chatController = {}

chatController.saveChat = async(message, user)=>{
    //메세지 내용, 유저 정보(이름,아이디)
    const newMessage = new Chat({
        chat: message,
        user: {
            id: user._id, //몽고디비에서 데이터가 생길때마다 주민번호 같은 걸 부여함
            name:user.name,
            color: user.color,
        }
    })
    await newMessage.save();
    return newMessage;
}

chatController.getRecentChat = async()=>{
    try{
        recentChats = await Chat.find().sort({ createdAt: -1 }).limit(30);
    }catch (error) {
        console.error("Error fetching chats:", error);
        throw error;
    }
    return recentChats;
    
}


module.exports = chatController;