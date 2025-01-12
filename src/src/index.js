require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

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
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// Routes (placeholder)
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Socket.IO connection
const ChatMessage = require('./models/ChatMessage');

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a chat room
    socket.on('join_room', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Handle sending a message
    socket.on('send_message', async (data) => {
        const { roomId, sender, message } = data;

        // Save the message in the database
        try {
            const chatMessage = new ChatMessage({ roomId, sender, message });
            await chatMessage.save();
            console.log(`Message saved: ${message}`);

            // Broadcast the message to the room
            io.to(roomId).emit('receive_message', { sender, message, timestamp: new Date() });
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
