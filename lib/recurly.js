var api = require('./api');

var Recurly = module.exports = function(key) {
  this.API_KEY = key;

  this.api = new api(key);

  this.account = require('./controllers/Account')(this);

  this.transaction = require('./controllers/Transaction')(this);
};


