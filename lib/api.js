var request = require('request');

var xml2js = require('xml2js');
xml2js = new xml2js.Parser({
    mergeAttrs: true,
    attrkey: '#',
    charkey: '#',
    explicitArray: false,
    explicitRoot: false
  });

var xml = xml2js.parseString;

var BASE = 'https://api.recurly.com/v2/';

var api = module.exports = function(key) {
  this.API_KEY = key;
};

api.prototype.get = function(route, params, cb) {
  var self = this;

  if (!cb) {
    cb = params;
    params = null;
  }

  request({
    url: BASE+route,
    auth: {
      username: self.API_KEY,
      password: ''
    },
    qs: params,
    headers: {
      'Accept': 'application/xml',
      'Content-Type': 'application/xml; charset=utf-8'
    }
  },function(e,r,body) {

    xml(body,function(e,data) {
      if (r.statusCode > 299) {
        // non 200 status code :(
        // see http://docs.recurly.com/api/basics/status-codes
        return cb(r.statusCode, self.parse(data));
      }
      cb(null,self.parse(data));
    });

  });
};

api.prototype.parse = function(data) {
  var self = this;

  for (var i in data) {
    if (!data.hasOwnProperty(i)) continue;

    var o = data[i];


    switch(o.type) {
      case 'datetime':
        o = new Date(o['#']);
        break;

      case 'integer':
        o = +o['#'];
        break;

      case 'boolean':
        o = (o['#'] === 'true');
        break;

      default:
        if (o['#']) o = o['#'];

    }
    data[i] = o;


    if (typeof o == 'object') {
      if (o.nil) {
        data[i] = null;
        continue;
      }
      data[i] = self.parse(o);
      continue;
    }
    // if (o === 'nil') {
    //   data[i] = null;
    // }
  }
  return data;

};
