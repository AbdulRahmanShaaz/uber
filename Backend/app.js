const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/health', (req, res) => {
    res.send(`Server is running on port ${process.env.PORT || 5000}`)
});
module.exports = app;