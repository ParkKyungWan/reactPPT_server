const User = require("../Models/user")
const userController = {}

userController.saveUser = async(userName, userColor, sid)=>{ //sid = socket id
    //name, token 필요
    //재방문은 새로운 정보 안 만들어도 됨
    //이미 있는 유저인지 확인
    let user = await User.findOne({ name: userName });
    //없다면 새로 유저정보 만들기
    if(!user){
        user = new User({
            name:userName,
            color:userColor,
            token:sid,
            online: true,
        });
    }

    //이미 있는 유저는  token 이랑 color 다시 설정해주자
    user.token = sid;
    user.online=true;
    user.color = userColor;

    await user.save();
    return user;
}

userController.checkUser=async(sid)=>{
    const user = await User.findOne({token:sid})
    if(!user) throw new Error("user not found");
    return user;
}


module.exports = userController;