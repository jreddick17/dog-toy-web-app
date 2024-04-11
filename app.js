const express = require('express');
const morgan = require('morgan');
const toyRoutes = require('./routes/toyRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const toys = require('./models/toy');
const fs = require('fs');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const MongoStore = require('connect-mongo');


//create app
const app = express();

//config app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nbda-project3')
.then(()=>{
    //start app
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middlware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/nbda-project3'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//routes
app.get('/', (req, res)=>{
    res.render('index');
});

//get the sign up form
app.get('/new', (req, res)=>{
    res.render('user/new');
});

app.use('/toys', toyRoutes);

app.use('/users', userRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

}); 

app.use((err, req, res, next)=> {
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
        console.error(err.stack);
    }

    res.status(err.status);
    res.render('error', {error: err});
});


