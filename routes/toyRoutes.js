const express = require('express');
const controller = require('../controllers/toyController');
const upload = require('../middleware/fileUpload');
const router = express.Router();
const multer = require('multer');
const {isLoggedIn, isSeller} = require('../middleware/auth');
const {validateId} = require('../middleware/validator');

//GET /toys/new: send form to add new toy
router.get('/new', isLoggedIn, controller.new);

//POST /toys: post a new toy
router.post('/', isLoggedIn, upload.single('image'), controller.create);

//POST /toys/search: search for toys
router.get('/search', controller.search);

//GET /toys/:id/edit: send form to edit existing toy
router.get('/:id/edit',  validateId, isLoggedIn, isSeller, controller.edit);

//PUT /toys/:id: update the toy based on id
router.put('/:id', validateId, isLoggedIn, isSeller, upload.single('image'), controller.update);

//DELETE /toys/:id: delete toy based on id
router.delete('/:id', validateId, isLoggedIn, isSeller, controller.delete);

//GET /toys: send all toys to user
router.get('/', controller.index);

//GET /toys/:id: send details of toy based on id
router.get('/:id', validateId, controller.show);



module.exports = router;