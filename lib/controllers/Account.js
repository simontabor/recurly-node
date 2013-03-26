var Recurly;

var Account = module.exports = function(id) {
  var self = this;

  self.id = id;
};

Account.prototype.fetch = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id,function(err, data) {
    self.data = data;
    if (cb) cb(err, data);
  });
};

Account.prototype.invoices = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id+'/invoices',function(err, data) {
    if (cb) cb(err, data.invoice || data);
  });
};

Account.prototype.subscriptions = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id+'/subscriptions',function(err, data) {
    data = data.subscription;
    if (!Array.isArray(data)) {
      data = [data];
    }
    if (cb) cb(err, data);
  });
};

Account.prototype.transactions = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id+'/transactions',function(err, data) {
    if (cb) cb(err, data.transaction || data);
  });
};

Account.prototype.redemption = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id+'/redemption',function(err, data) {
    if (cb) cb(err, data);
  });
};

Account.prototype.billing_info = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id+'/billing_info',function(err, data) {
    if (cb) cb(err, data);
  });
};

Account.prototype.adjustments = function(cb) {
  var self = this;

  Recurly.api.get('accounts/'+self.id+'/adjustments',function(err, data) {
    if (cb) cb(err, data.adjustment || data);
  });
};







module.exports = function(r) {
  Recurly = r;
  return Account;
};

