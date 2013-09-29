'use strict';

describe('panelModel', function(){

  var infector, panelModel;

  beforeEach(function(){
    infector = new Infector({
      panelModel: { type: source('models/panelModel') },
      db: { value: {} },
      date: { value: { now: function(){ return 1000; } } }
    });
    panelModel = infector.get('panelModel');
  });

  it('should correctly return an array of all panels in the DB', function(done){
    panelModel.create({}, noop);
    panelModel.create({}, noop);
    panelModel.findAll(function(err, arr){
      expect(err).to.be(null);
      expect(arr).to.have.length(2);
      expect(arr[0].id).to.be(1);
      expect(arr[1].id).to.be(2);
      done();
    });
  });

  it('should correctly create a panel in the DB', function(done){
    panelModel.create({}, function(err){
      expect(err).to.be(null);
      panelModel.findAll(function(err, arr){
        expect(err).to.be(null);
        expect(arr).to.have.length(1);
        expect(arr[0].id).to.be(1);
        expect(arr[0].createdAt).to.be(1000);
        done();
      });
    });
  });

  it('should correctly delete a panel by ID from the DB', function(done){
    panelModel.create({}, noop);
    panelModel.destroy(1, function(err){
      expect(err).to.be(null);
      panelModel.findAll(function(err, arr){
        expect(err).to.be(null);
        expect(arr).to.have.length(0);
        done();
      });
    });
  });

  it('should throw an error if an attempt is made to delete a non-existent panel', function(done){
    panelModel.destroy(1, function(err){
      expect(err.message).to.equal('Panel 1 does not exist');
      done();
    });
  });

});