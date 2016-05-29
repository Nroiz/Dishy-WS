var passport            = require('passport');
var bodyParser          = require('body-parser');
var Account             = require('../models/account.js');
var utils               = require('../assets/utils.js');
var AccountsCtrl        = require('../controllers/accounts.ctrl.js').api;
var accountsApi         = new AccountsCtrl();
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var jsonParser          = bodyParser.json();
var jwt             = require('jsonwebtoken');

function generateToken(req, res, next) {  
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresInMinutes: 120
  });
  next();
}

function respond(req, res) {  
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

function serialize(req, res, next) {  
  req.user = {
      id: user.id
    };
    next();
}

module.exports = function(app){
    app.get('/newAccount', utils.loggedIn, function(req, res, next){
        Account.findById(req.session.passport.user, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log('new account');
                req.logIn(req.user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    //delete private data from user before sending
                    // res.json(200, user);
                    res.render('account', { user: req.user });
                });
                //res.render('account', { user: req.user });
            }
        });
    });

    app.post('/auth', passport.authenticate('google', { 
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]}
    ), serialize, generateToken, respond);
    
    app.get('/auth/google', passport.authenticate('google', { 
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]}
    ));

    app.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect('/newAccount');
      });

    app.get('/logout', utils.loggedIn, function(req, res){
        console.log('logout from ' + req.user.displayName);
      req.logout();
      res.redirect('/');
    });

    //when auth works - delete the key
    app.get('/getAccountInfo/:key', function(req, res){
        // accountsApi.getAccountInfo(req.user._id, function(err,data){
        accountsApi.getAccountInfo(req.params.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    //auth error!!!!
    app.put('/createBusiness', jsonParser, function(req, res){
        accountsApi.createBusiness(req.body.key, req.body, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    //auth error!!!!
    app.put('/popAccountExp', jsonParser, function(req, res){
        console.log(req.body);
        accountsApi.popAccountExp(req.body.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });  
    
}