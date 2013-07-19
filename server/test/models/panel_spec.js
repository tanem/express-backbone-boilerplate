'use strict';

var expect = require('expect.js'),
  Panel = require('../../src/models/panel'),
  noop = function(){};

describe('Models / Panel', function(){

  afterEach(function(){
    Panel.reset(noop);
  });

  it('should correctly return an array of all panels in the DB', function(){
    new Panel().save(noop);
    new Panel().save(noop);
    Panel.all(function(err, arr){
      expect(err).to.be(null);
      expect(arr).to.have.length(2);
      expect(arr[0].id).to.be(1);
      expect(arr[1].id).to.be(2);
    });
  });

  it('should correctly create a panel in the DB', function(){
    var panel = new Panel();
    expect(panel.id).to.be(1);
    expect(panel.createdAt).to.be.a(Date);
    panel.save(function(){
      Panel.all(function(err, arr){
        expect(err).to.be(null);
        expect(arr).to.have.length(1);
        expect(arr[0].id).to.be(1);
      });
    });
  });

  it('should correctly delete a panel by ID from the DB', function(){
    new Panel().save(noop);
    Panel.destroy(1, function(err){
      expect(err).to.be(undefined);
      Panel.all(function(err, arr){
        expect(err).to.be(null);
        expect(arr).to.have.length(0);
      });
    });
  });

  it('should throw an error if an attempt is made to delete a non-existent panel', function(){
    Panel.destroy(1, function(err){
      expect(err.message).to.equal('Panel 1 does not exist');
    });
  });

});