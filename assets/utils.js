'use strict';
var Account         = require('../models/account.js');

module.exports.wsPath = 'http://fast-castle-79738.herokuapp.com/'; //heroku ws
//module.exports.wsPath = 'http://127.0.0.1:1337/'; //local ws

module.exports.clientPath = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_180/#/'; //yonit client
//module.exports.clientPath = 'http://mighty-dusk-71375.herokuapp.com/'; //heroku client
//module.exports.clientPath = 'http://localhost:8000/'; //local client

module.exports.loggedIn = function(req, res, next) {
   console.log(req.isAuthenticated());
    if (req.user) {
        console.log('connected as '+ req.user.displayName);
        next();
    } else {
        res.status(401);
        res.send('authentication problem - you need to login first');
    }
};

module.exports.ensureAuth = function(req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.json({ error: 'No credentials sent!' });
  } else {
    var encoded = req.headers.authorization.split(' ')[1];
    var decoded = new Buffer(encoded, 'base64').toString('utf8');
 
    Account.findOne({ _id: encoded }, function(err, account) {
          if(err) {
            console.log(err);  // handle errors!
          }
          if (!err && account !== null) {
              next();
          } 
    });
  }
}

module.exports.sortBy = (function () {

  //cached privated objects
  var _toString = Object.prototype.toString,
      //the default parser function
      _parser = function (x) { return x; },
      //gets the item to be sorted
      _getItem = function (x) {
        return this.parser((x !== null && typeof x === "object" && x[this.prop]) || x);
      };

  // Creates a method for sorting the Array
  // @array: the Array of elements
  // @o.prop: property name (if it is an Array of objects)
  // @o.desc: determines whether the sort is descending
  // @o.parser: function to parse the items to expected type
  return function (array, o) {
    if (!(array instanceof Array) || !array.length)
      return [];
    if (_toString.call(o) !== "[object Object]")
      o = {};
    if (typeof o.parser !== "function")
      o.parser = _parser;
    o.desc = !!o.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = _getItem.call(o, a);
      b = _getItem.call(o, b);
      return o.desc * (a > b ? -1 : +(a < b));
    });
  };

}());