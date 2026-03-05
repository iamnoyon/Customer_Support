require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'mongodb+srv://noyon:674@cluster0.k7dhsag.mongodb.net/?appName=Cluster0',
};

module.exports = config;