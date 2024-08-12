const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let chatRooms = {
    general: [],
    sports: [],
    technology: [],
    random: [],
};

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.emit('chatHistory', chatRooms[room]);
    });

    socket.on('chatMessage', (data) => {
        const { room, message, username } = data;
        chatRooms[room].push({ message, username });
        io.to(room).emit('chatMessage', { message, username });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
