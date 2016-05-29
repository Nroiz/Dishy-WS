var passport            = require('passport');
var bodyParser          = require('body-parser');
var Account             = require('../models/account.js');
var utils               = require('../assets/utils.js');
var AccountsCtrl        = require('../controllers/accounts.ctrl.js').api;
var accountsApi         = new AccountsCtrl();
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var jsonParser          = bodyParser.json();

module.exports = function(app){
    app.get('/newAccount', function(req, res, next){
        Account.findById(req.session.passport.user, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                req.logIn(req.user, function(err) {
                    if (err) return next(err);
                    res.render('account', { key: req.user.id });
                });
            }
        });
    });
    
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

    app.get('/logout', utils.ensureAuth, function(req, res){
        console.log('logout from ' + req.user.displayName);
        req.logout();
        res.redirect('/');
    });

    //when auth works - delete the key
    app.get('/getAccountInfo/:key', utils.ensureAuth, function(req, res){
        // accountsApi.getAccountInfo(req.user._id, function(err,data){
        accountsApi.getAccountInfo(req.params.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    //auth error!!!!
    app.put('/createBusiness', utils.ensureAuth, jsonParser, function(req, res){
        accountsApi.createBusiness(req.body.key, req.body, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    //auth error!!!!
    app.put('/popAccountExp', utils.ensureAuth, jsonParser, function(req, res){
        console.log(req.body);
        accountsApi.popAccountExp(req.body.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });  
    
}