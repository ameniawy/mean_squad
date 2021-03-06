var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    ejsLayouts = require("express-ejs-layouts"),
    expressValidator = require('express-validator'),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    passport = require("passport"),
    Strings = require('./controllers/helpers/strings'),
    dotenv = require('dotenv'),
    compression = require('compression');

dotenv.load();

//Setting password strength module
var owasp = require('owasp-password-strength-test');
owasp.config({
    allowPassphrases: true,
    maxLength: 128,
    minLength: 8,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4,
});

// Models we are using to communicate with the DB
require('./models/user')
require('./models/business')
require('./models/businessOperator')
require('./models/client')
require('./models/payment')
require('./models/day')
require('./models/activity')
require('./models/promotion')
require('./models/reservation')
require('./models/clientRateActivity')


// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());


// Compressing Requests
app.use(compression());


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            type: Strings.INVALID_INPUT,
            msg: msg,
        };
    }
}));


// Passport init
app.use(passport.initialize());


//static file server directory
app.use(express.static(__dirname + '/public'));


//set view engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);


// Connecting to the mongoDB with the DB 'guc'
var DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI);


// Set up passport
var setUpPassport = require("./config/setupPassport");
setUpPassport();


// ALLOWING FRONT END TO COMMUNICATE
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});


// SERVER ROUTES
var businessOperatorRoutes = require('./routes/businessOperatorRoutes');
var searchRoutes = require('./routes/searchRoutes');
var visitorRoutes = require('./routes/visitorRoutes');
var userRoutes = require('./routes/userRoutes');
var businessRoutes = require('./routes/businessRoutes');
var clientRoutes = require('./routes/clientRoutes');
var adminRoutes = require('./routes/adminRoutes');
var authRoutes = require('./routes/authRoutes');
var activityRoutes = require('./routes/activityRoutes');

app.use('/', visitorRoutes);
app.use('/login', authRoutes);
app.use('/user', userRoutes);
app.use('/businessoperator', businessOperatorRoutes);
app.use('/search', searchRoutes);
app.use('/business', businessRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/activity', activityRoutes);

// 404 for any other route
app.use(function(req, res, next) {
    if(!res.headersSent){
        res.status(404).json({
            status:'failed',
            message: 'The requested route was not found.'
        });
    }

    next();
});

module.exports = app;


// Server init
app.listen(port);
console.log('Server running on port %s', port);