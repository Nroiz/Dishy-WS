'use strict';
var fs              = require('fs');
var ctrl            = require('../controllers/accounts.ctrl.js');

module.exports = function(app){
    
//    app.all('*', function(req,res,next){
//        if (req.user) { 
//            console.log('Logged In!');
//            return next(); 
//        }else {
//            res.status(401);
//            res.send('authentication problem - you need to login first');
//        }
//    });

    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;
        var name = file.substr(0, file.lastIndexOf('.'));
        require('./' + name)(app);
    });
}