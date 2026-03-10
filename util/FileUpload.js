const multer = require('multer');

// Configure multer storage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

// File filter to allow only specific file types    
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(new Error('Unsupported file type'), false);
//     }
// }

// // Create the multer upload instance
// const upload = multer({
//     storage: fileStorage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
//     }
// });

// export the multer upload instance
module.exports = {
    fileStorage
}