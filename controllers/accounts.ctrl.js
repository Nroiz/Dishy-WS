'use strict';
var GoogleStrategy  = require('passport-google-oauth2').Strategy;
var config          = require('../assets/oauth.js');
var Account         = require('../models/account.js');
var Business        = require('../models/business.js');

module.exports.auth = function(passport){
    passport.serializeUser(function(user, done) {
      console.log('serializeUser: ' + user.id);
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      Account.findById(id, function(err, account){
          if(!err) done(null, account);
          else done(err, null);
        });
    });

    passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
      },
      function(request, accessToken, refreshToken, profile, done) {
        Account.findOne({ oauthID: profile.id }, function(err, account) {
          if(err) {
            console.log(err);  // handle errors!
          }
          if (!err && account !== null) {
              console.log('user exist')
            done(null, account);
          } else {
            
            account = new Account({
                oauthID: profile.id,
                displayName: profile.displayName,
                created: Date.now(),
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.email,
                gender: profile.gender,
                type: 'person'
            });
            account.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
              } else {
                console.log("saving user ...");
                done(null, account);
              }
            });
          }
        });
      }
    ));
}

class Accounts{
    constructor(){}
    
    createBusiness(accountID, details, callback){
        console.log('>>createBusiness');
        var busi,query;
    
        Account.findOne({_id:accountID}, function(err, doc){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            if(!doc) {
                console.log('There is no account with this id: '+ accountID);
                return callback('no id error',null);
            }
            busi = new Business(details);
            query = doc.update({
                $set: {
                    type: 'business',
                    businessDetails: busi
                }
            });
            query.exec(function(err, result){
                if(err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log('got data!');
                callback(null, result);
                console.log('<<createBusiness');
            });
        });
    }
    getAccountInfo(key, callback){
        console.log('>>getAccountInfo');
        Account.findOne({_id:key}, function(err, doc){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            if(!doc) {
                console.log('There is no account with this id: '+ key);
                return callback('no id error',null);
            }
            console.log('got data!');
                callback(null, doc);
                console.log('<<getAccountInfo');
            });
    }
    
    popAccountExp(accountID, callback){
        console.log('>>popAccountExp');
    
        Account.findOne({_id:accountID}, function(err, doc){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            if(!doc) {
                console.log('There is no account with this id: '+ accountID);
                return callback('no id error',null);
            }
            var query = doc.update({
                $inc: {
                    exp: 25
                }
            });
            query.exec(function(err, result){
                if(err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log('got data!');
                callback(null, result);
                console.log('<<popAccountExp');
            });
        });
    }
}

module.exports.api = Accounts;
