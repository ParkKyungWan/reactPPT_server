const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        chat: String, //메세지 내용
        user: {  //누가 보냈는지 유저 정보 
            id: {
                type: mongoose.Schema.ObjectId, //id
                ref: "User",
            },
            name: String, //이름
            color: String, //시그니처 색
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("Chat", chatSchema);