const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // or "*" for all origins
    methods: ["GET", "POST"],
     credentials: true
  }
});

// socket.id= it refers to unique identifaction of user
const users={};
io.on('connection',socket=>{   // this is for connection
    socket.on('new_user',(name)=>{
        console.log("New User",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);          // ye jisne chat join kri usko chorkr sbko event emit kr deta h

    });
    socket.on('send',message=>{
        console.log("message :",message);
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    });
socket.on('disconnect',message=>{       //  This is for disconnection
    socket.broadcast.emit('user_left',users[socket.id]);
    delete users[socket.id];
})


});


server.listen(8000, () => {
  console.log('listening on *:8000');
});