'use strict';
module.exports.loggedIn = function(req, res, next) {
   console.log(req.isAuthenticated());
    if (req.user) {
        console.log('connected as '+ req.user.displayName);
        next();
    } else {
        res.status(401);
        res.send('authentication problem - you need to login first');
        //res.redirect('/auth/google');
    }
};

module.exports.ensureAuth = function(req, res) {
  if (!req.headers.authorization) {
    res.json({ error: 'No credentials sent!' });
  } else {
    var encoded = req.headers.authorization.split(' ')[1];
    var decoded = new Buffer(encoded, 'base64').toString('utf8');
 
    res.json({
      id: decoded.split(':')[0],
      secret: decoded.split(':')[1],
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