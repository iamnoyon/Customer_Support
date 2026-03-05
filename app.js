const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user.route');

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use('/api/v1', userRouter);


// client error handler
app.use((req, res, next)=>{
    res.status(404).json({
        success: false,
        message: 'Resource not found'
    })
})

// server error handler
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    })
});


// Export the app for use in other files (like server.js)
module.exports = app;