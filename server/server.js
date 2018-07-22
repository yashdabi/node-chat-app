const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const pathJoin = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
app.use(express.static(pathJoin));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('socket connect');

    socket.emit('newMessage', generateMessage('Admin', 'welcome chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user add'));

    socket.on('createMessage', (message, callback)=>{
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('from server callback message');

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (message, callback)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', message.lat, message.lng));
        callback('server location');
    });


    socket.on('disconnect', ()=>{
        console.log('disconnect server');
    });

});


server.listen(port, ()=>{
    console.log('server is up on 3000');
})
