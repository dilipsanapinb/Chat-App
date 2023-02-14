const express=require("express");
const {Server}=require("socket.io");
const http=require("http");
require('dotenv').config();
const app=express()

const httpServer=http.createServer(app)

const port=process.env.port || 3000;



httpServer.listen(port,()=>{
    console.log(`Server listening port ${port}`);
})

app.use(express.static(__dirname + '/Public'))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

const io= new Server(httpServer);

io.on("connection",(socket)=>{
    console.log('Connected...to socket.io');

    socket.on("message",(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})