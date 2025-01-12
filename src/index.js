require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for now
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes (placeholder)
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for a "join_room" event
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    // Listen for a "send_message" event
    socket.on('send_message', (data) => {
        const { room, message, sender } = data;
        console.log(`Message from ${sender} in room ${room}: ${message}`);
        io.to(room).emit('receive_message', data); // Broadcast to everyone in the room
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
