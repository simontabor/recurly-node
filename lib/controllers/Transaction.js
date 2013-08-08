var Recurly;

var Transaction = module.exports = function(id) {
  var self = this;

  self.id = id;
};

Transaction.prototype.getAll = function(cb) {
  Recurly.api.getAll('transactions',function(err,data) {
    cb(err, data);
  });
};


module.exports = function(r) {
  Recurly = r;
  return Transaction;
};

