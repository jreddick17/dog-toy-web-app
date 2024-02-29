//test the push
const express = require('express');
const morgan = require('morgan');
const toyRoutes = require('./routes/toyRoutes');
const methodOverride = require('method-override');
const toys = require('./models/toy');
const fs = require('fs');

//create app
const app = express();

//config app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/toys', toyRoutes);

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

//start server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
