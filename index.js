var express         = require('express');
var path            = require('path');
var port            = process.env.PORT || 1337;
var mongoose        = require('mongoose');
var consts          = require('./assets/consts.js');
var passport        = require('passport');
var config          = require('./assets/oauth.js');
var GoogleStrategy  = require('passport-google-oauth2').Strategy;
var session         = require('express-session');
var Account         = require('./models/account.js');
var accountsAuth     = require('./controllers/accounts.ctrl.js').auth;

var app             = express();
var db              = mongoose.connect(consts.MLAB_KEY);
var conn            = mongoose.connection;


app.use('/assets', express.static(__dirname + '/public'));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session()); 

app.use(function (req, res, next) {

    // allowed websites to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

conn.on('error', function(err){
    console.log('connection error - ' + err);
});

conn.once('open', function(){
    console.log('connected to mongo!');
});

accountsAuth(passport);

require('./routes')(app);

app.listen(port);
console.log("connected to port " + port);