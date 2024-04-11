const Toy = require('../models/toy');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
}

//check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
}

//check if user is seller of the toy
exports.isSeller = (req, res, next) =>{
    let id = req.params.id;
/*     if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid toy id');
        err.status = 400;
        return next(err);
    } */
    Toy.findById(id)
    .then(toy=>{
        if(toy) {
            if(toy.seller == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a toy with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};