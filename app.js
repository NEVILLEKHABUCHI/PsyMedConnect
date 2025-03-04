const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});


// Import routes
const clientRoutes = require('./routes/clientRoutes');

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// static files (CSS, images)
app.use(express.static('public'));

// Middleware for parsing request bodies
app.use(bodyParser.json()); //For parsing application/json
app.use(bodyParser.urlencoded({extended: true})); 

// Setting up sessions and flash middleware
app.use(session({
    secret: process.env.SESSIONS_PASSWORD,
    resave: false,
    saveUninitialized: true
}));

// Using flash for flash messages
app.use(flash());

// Middleware to make flash messages available in templates
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
})

// Use routes
app.use('/', clientRoutes);

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost: {3000}`);
})