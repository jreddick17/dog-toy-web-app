const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Get the current timestamp
        const extname = path.extname(file.originalname); // Get the file extension
        cb(null, `${file.fieldname}-${timestamp}${extname}`); // Construct the filename
    },
});

const fileFilter = (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (mimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpeg, png, or gif are allowed'));
    }
};

// multer middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // limit file size to 5MB
});

module.exports = upload;