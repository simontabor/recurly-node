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

  if (!params) params = {};

  var getRes = false;
  if (params.getRes) {
    getRes = true;
    delete params.getRes;
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
      if (getRes) {
        return cb(null, r, self.parse(data));
      }
      cb(null,self.parse(data));
    });

  });
};

api.prototype.getAll = function(route, params, cb) {
  var self = this;

  var allData = [];

  if (!cb) {
    cb = params;
    params = null;
  }
  var doGet = function(cursor,cb) {
    var p = {getRes: true, per_page: 200, cursor: cursor};
    if (!cursor) {
      delete p.cursor;
    }
    self.get(route, p, cb);
  };

  var cbf = function(e,r,data) {
    allData = allData.concat(data.transaction);

    var link = r.headers.link;
    link = link.split(',');
    link = link.pop();

    if (link.indexOf('rel="next"') === -1) {
      return cb(allData);
    }

    var c = link.match(/cursor=(.*?)(>|&)/);

    console.log('CMATCH:',c);

    doGet(c[1], cbf);
  };

  doGet(0, cbf);

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
