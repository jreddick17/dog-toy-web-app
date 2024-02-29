const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images');
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`);
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
    limits: { fileSize: 1024 * 1024 * 5 } // limit file size to 5MB - its what the vid told you to do for stuff like this
});

module.exports = upload;