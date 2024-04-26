const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config() //이걸 써둬야 process.env사용 가능
const cors = require("cors") //접근 제어
const app = express();
const corsOptions={
    origin: '*',
    credentials:true,
}
app.use(cors(corsOptions));//접근 허용

/*
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true, //db연결 옵션
        useUnifiedTopology: true,
    })
    .then(()=>console.log("connected to database"));
*/
module.exports = app;