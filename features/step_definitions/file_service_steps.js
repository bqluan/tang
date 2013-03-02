var should = require('should');

module.exports = function() {
  this.World = require('../support/file_service_world').World;

  this.Before(function(done) {
    this.startServer(done);
  });

  this.After(function(done) {
    this.stopServer(done);
  });

  this.Given(/^I don't have any file$/, function(done) {
    this.rmF('/file.txt', done);
  });

  this.Given(/^I have file (.*)$/, function(filename, done) {
    this.writeFile(filename, filename, done);
  });

  this.When(/^I read directory (.*)$/, function(path, done) {
    this.get(path, done);
  });

  this.When(/^I read file (.*)$/, function(filename, done) {
    this.get(filename, done);
  });

  this.When(/^I stat file (.*)$/, function(filename, done) {
    this.head(filename, done);
  });

  this.When(/^I upload file (.*)$/, function(filename, done) {
    this.upload(filename, done);
  });

  this.Then(/^I should have file (.*)$/, function(filename, done) {
    this.shouldExists(filename, done);
  });

  this.Then(/^I should see status code (\d+)$/, function(statusCode, done) {
    this.res.should.have.status(parseInt(statusCode));
    done();
  });

  this.Then(/^I should see content type json$/, function(done) {
    this.res.should.be.json;
    this.body = JSON.parse(this.body);
    done();
  });

  this.Then(/^I should see \[\]$/, function(done) {
    this.body.should.have.length(0);
    done();
  });

  this.Then(/^I should see \[file\.txt\]$/, function(done) {
    this.body.should.have.length(1).and.include('file.txt');
    done();
  });

  this.Then(/^I should see stats$/, function(done) {
    this.res.should.have.header('x-stats-mode')
      .and.have.header('x-stats-size')
      .and.have.header('x-stats-mtime');
    done();
  });

  this.Then(/^I should see the content of (.*)$/, function(filename, done) {
    this.res.body.should.equal(filename);
    done();
  });

  this.Then(/^I should see errno (\d+)$/, function(errno, done) {
    this.res.should.have.header('x-error-errno', errno);
    done();
  });

  this.Then(/^I should see error code (.*)$/, function(code, done) {
    this.res.should.have.header('x-error-code', code);
    done();
  });

  this.Then(/^I should not see message\-body in response$/, function(done) {
    this.res.should.not.have.property('body');
    done();
  });
};
