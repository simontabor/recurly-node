var should = require('should');
var Recurly = require('../lib/recurly');
var recurly = new Recurly(process.env.KEY);


describe("Account", function(){

  var user = new recurly.account(process.env.ACCOUNT || 1);

  it("instantiates", function(done){
    user.should.be.instanceOf(recurly.account);
    done();
  });

  it("fetches account details", function(done) {
    user.fetch(function(err, account) {
      should.not.exist(err);
      account.should.have.property('account_code');
      done();
    });
  });

  it("gets invoices", function(done) {
    user.invoices(function(err, invoices) {
      should.not.exist(err);
      invoices.should.be.instanceOf(Array);
      done();
    });
  });

  it("gets subscriptions", function(done) {
    user.subscriptions(function(err, subscriptions) {
      should.not.exist(err);
      subscriptions.should.be.instanceOf(Array);
      done();
    });
  });

  it("gets transactions", function(done) {
    user.transactions(function(err, transactions) {
      should.not.exist(err);
      transactions.should.be.instanceOf(Array);
      done();
    });
  });

  it("gets redemption", function(done) {
    user.redemption(function(err, redemption) {
      should.not.exist(err);
      redemption.should.be.a('object');
      done();
    });
  });

  it("gets billing info", function(done) {
    user.billing_info(function(err, billing_info) {
      should.not.exist(err);
      billing_info.should.be.a('object');
      done();
    });
  });

  it("gets adjustments", function(done) {
    user.adjustments(function(err, adjustments) {
      should.not.exist(err);
      adjustments.should.be.instanceOf(Array);
      done();
    });
  });


});
