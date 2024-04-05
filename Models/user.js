const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: { //유저 이름
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    color: { //유저 시그니처 색
        type: String,
        required: [true, "User must type color"],
        unique: false,
    },
    token: {//이 유저가 어떤 연결 id를 가지고 접근 했는지
        type: String,
    },
    online: {//지금은 딱히 필요 없다. 
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose.model("User", userSchema);
/* schema = 데이터의 설계도 같은 느낌이다. 엑셀처럼 규칙도 있고 정갈하게 들어가야 하니까
내 데이터가 어떻게 생겨야된다를 설명해놓는 그런 곳이라고 생각하면 된다*/