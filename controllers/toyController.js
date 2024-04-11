const model = require('../models/toy');

//GET /toys: send all toys to user
exports.index = (req, res, next) => {
    model.find()
    .then((toys)=>{
        toys.sort((a, b) => a.price - b.price);
        res.render('./toy/index', {toys});
    })
    .catch(err=>next(err));
};

//GET /toys/new: send form to add new toy
exports.new = (req, res)=>{
    res.render('./toy/new');
};

//POST /toys: post a new toy
exports.create = (req, res, next) => {
    let toy = new model(req.body); //create a new toy doc
    toy.seller = req.session.user;

    if (req.file) {
        toy.image = '/images/' + req.file.filename;
    }

    toy.save()
    .then((toy)=>{
        res.redirect('/toys');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
};

//GET /toys/:id: send details of toy based on id
exports.show = (req, res, next)=>{
    let id = req.params.id;

    model.findById(id).populate('seller', 'firstName lastName')
    .then(toy=>{
        if(toy) {
            console.log(toy);
            return res.render('./toy/show', {toy});
        } else {
            let err = new Error('Cannot find a toy with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


//GET /toys/:id/edit: send form to edit existing toy
exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(toy=>{
        if(toy) {
            return res.render('./toy/edit', {toy});
        } else {
            let err = new Error('Cannot find a toy with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//PUT /toys/:id: update the toy based on id
exports.update = (req, res, next)=>{
    let id = req.params.id;
    let toy = req.body;
    let currentImage = req.body.currentImage; // get current image URL

    if (req.file) {
        toy.image = '/images/' + req.file.filename;
    } else {
        toy.image = currentImage;
    }

    model.findByIdAndUpdate(id, toy, {useFindAndModify: false, runValidators: true})
    .then(toy=>{
        if(toy) {
            res.redirect('/toys/' +id);
        } else {
            let err = new Error('Cannot find a toy with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

//DELETE /toys/:id: delete toy based on id
exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id)
    .then(toy => {
        if (toy) {
            req.flash('success', 'Toy deleted successfully'); // Optional: Adding success message
            res.redirect('/toys');
        } else {
            let err = new Error('Cannot find a toy with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};


exports.search = (req, res, next) => {
    let searchTerm = req.query.search; 
    model.find({
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } }, 
            { seller: { $regex: searchTerm, $options: 'i' } }, 
            { description: { $regex: searchTerm, $options: 'i' } } 
        ]
    })
    .then((toys) => {
        if (toys && toys.length > 0) {
            res.render('./toy/index', { toys }); 
        } else {
            res.render('./toy/index', { toys: [], message: 'No toys found matching your search' });
        }
    })
    .catch(err => next(err));
};
