const express = require('express');
const controller = require('../controllers/toyController');
const upload = require('../middleware/fileUpload');
const router = express.Router();
const multer = require('multer');




//GET /toys/new: send form to add new toy
router.get('/new', controller.new);

//POST /toys: post a new toy
router.post('/', upload.single('image'), controller.create);

//POST /toys/search: search for toys
router.post('/search', controller.search);

//GET /toys/:id/edit: send form to edit existing toy
router.get('/:id/edit', controller.edit);

//PUT /toys/:id: update the toy based on id
router.put('/:id', upload.single('image'), controller.update);

//DELETE /toys/:id: delete toy based on id
router.delete('/:id', controller.delete);

//GET /toys: send all toys to user
router.get('/', controller.index);

//GET /toys/:id: send details of toy based on id
router.get('/:id', controller.show);



module.exports = router;