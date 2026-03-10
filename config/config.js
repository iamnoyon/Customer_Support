require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'mongodb+srv://noyon:674@cluster0.k7dhsag.mongodb.net/?appName=Cluster0',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3001',
    SMTP_USERNAME: process.env.SMTP_USERNAME || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || ''
};

module.exports = config;