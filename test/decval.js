/**
 * ./node_modules/.bin/mocha -u tdd test/decval.js
 */

var should = require('should');
var decval = require('../index');

describe('Validation tests', function () {

  it('basic numbers should be ok', function (done) {
    var ok = decval.validate('123.45');
    ok.should.be.true();
    ok = decval.validate('9.12');
    ok.should.be.true();
    ok = decval.validate('9.00');
    ok.should.be.true();
    ok = decval.validate('999.99');
    ok.should.be.true();
    ok = decval.validate('0.00');
    ok.should.be.true();
    done();
  });

  it('not a number should not be ok', function (done) {
    var ok = decval.validate('123.4f');
    ok.should.be.false();
    ok = decval.validate('a123.45');
    ok.should.be.false();
    ok = decval.validate('23a.45');
    ok.should.be.false();
    done();
  });

  it('not enough decimals should not be ok', function (done) {
    var ok = decval.validate('123.4');
    ok.should.be.false();
    done();
  });

  it('too large or negative number should not be ok', function (done) {
    var ok = decval.validate('1000.00');
    ok.should.be.false();
    var ok = decval.validate('-23.45');
    ok.should.be.false();
    var ok = decval.validate('-0.00');
    ok.should.be.false();
    var ok = decval.validate('0.0');
    ok.should.be.false();
    done();
  });

  it('not a string should not be ok', function (done) {
    var ok = decval.validate(123.45);
    ok.should.be.false();
    done();
  });

  it('basic numbers with integrals should be ok', function (done) {
    var ok = decval.validate('123.45', 3);
    ok.should.be.true();
    ok = decval.validate('9.12', 1);
    ok.should.be.true();
    ok = decval.validate('9.00', 2);
    ok.should.be.true();
    ok = decval.validate('9999.99', 4);
    ok.should.be.true();
    ok = decval.validate('12345.00', 6);
    ok.should.be.true();
    done();
  });

  it('too short numbers with integrals should not be ok', function (done) {
    var ok = decval.validate('123.45', 2);
    ok.should.be.false();
    ok = decval.validate('9999.99', 1);
    ok.should.be.false();
    ok = decval.validate('12345.00', 4);
    ok.should.be.false();
    done();
  });

  it('basic numbers with integrals and fractionals should be ok', function (done) {
    var ok = decval.validate('123.45', 3, 2);
    ok.should.be.true();
    ok = decval.validate('9.12', 1, 2);
    ok.should.be.true();
    ok = decval.validate('9.00', 2, 2);
    ok.should.be.true();
    ok = decval.validate('9.123', 1, 3);
    ok.should.be.true();
    ok = decval.validate('9.1234567890', 2, 10);
    ok.should.be.true();
    done();
  });

  it('too short numbers with fractionals should not be ok', function (done) {
    var ok = decval.validate('123.45', 3, 1);
    ok.should.be.false();
    ok = decval.validate('9999.99', 4, 1);
    ok.should.be.false();
    ok = decval.validate('12345.000', 5, 2);
    ok.should.be.false();
    done();
  });

  it('not a number with decimals and fractionals should not be ok', function (done) {
    var ok = decval.validate('123.4f', 3, 2);
    ok.should.be.false();
    ok = decval.validate('a123.45', 3, 2);
    ok.should.be.false();
    ok = decval.validate('23a.45', 3, 2);
    ok.should.be.false();
    done();
  });

  it('too short integrals or fractionals should not be ok', function (done) {
      (function () {
          decval.validate('123.45', 0);
      }).should.throw('Integrals and fractionals must be at least 1');
      (function () {
          decval.validate('123.45', 1, 0);
      }).should.throw('Integrals and fractionals must be at least 1');
    done();
  });
});
