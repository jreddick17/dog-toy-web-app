const model = require('../models/toy');


//GET /toys: send all toys to user
exports.index = (req,res) => {
    let toys = model.find();
    toys.sort((a, b) => a.price - b.price);
    res.render('./toy/index', {toys});
};

//GET /toys/new: send form to add new toy
exports.new = (req, res)=>{
    res.render('./toy/new');
};

//POST /toys: post a new toy
exports.create = (req, res) => {
    let toy = req.body;

    if (req.file) {
        toy.image = '/images/' + req.file.filename;
    }

    model.save(toy);

    res.redirect('/toys');
};

//GET /toys/:id: send details of toy based on id
exports.show = (req, res, next)=>{
    let id = req.params.id;
    let toy = model.findById(id);
    if(toy) {
        res.render('./toy/show', {toy});
    } else {
        let err = new Error('Cannot find a toy with id ' + id);
        err.status = 404;
        next(err);
    }
};

//GET /toys/:id/edit: send form to edit existing toy
exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let toy = model.findById(id);
    if(toy) {
        res.render('./toy/edit', {toy});
    } else {
        let err = new Error('Cannot find a toy with id ' + id);
        err.status = 404;
        next(err);
    }
};

//PUT /toys/:id: update the toy based on id
exports.update = (req, res, next)=>{
    let id = req.params.id;
    let toy = req.body;
    let currentImage = req.body.currentImage; // get current image URL

    if (req.file) {
        toy.image = '/image/' + req.file.filename;
    } else {
        toy.image = currentImage;
    }

    if (model.updateById(id, toy)) {
        res.redirect('/toys/' +id);
    } else {
        let err = new Error('Cannot find a toy with id ' + id);
        err.status = 404;
        next(err);
    }
};

//DELETE /toys/:id: delete toy based on id
exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/toys');
    } else {
        let err = new Error('Cannot find a toy with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.search = (req, res, next) => {
    let searchTerm = req.body.search;
    console.log(req.body.search);
    let toys = model.searchByTerm(searchTerm); // Assuming this returns an array of toys
    if (toys && toys.length > 0) {
        res.render('./toy/index', { toys }); 
    } else {
        res.render('./toy/index', { toys: [], message: 'No toys found matching your search' });
    }
};