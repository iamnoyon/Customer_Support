const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user.route');
const { authRouter } = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// all routes
app.use('/api/v1', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);


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