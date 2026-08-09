const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/users', userRoutes);
app.get('/health', (req, res) => {
    res.send(`Server is running on port ${process.env.PORT || 5000}`)
});
module.exports = app;