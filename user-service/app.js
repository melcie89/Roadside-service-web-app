const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));