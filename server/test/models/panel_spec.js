var Panel = require('../../src/models/panel'),
  noop = function(){};

describe('Models / Panel', function(){

  beforeEach(function(){
    this.noop = function(){};
  });

  afterEach(function(){
    Panel.reset(this.noop);
    delete this.noop;
  });

  it('should correctly return an array of all panels in the DB', function(){
    new Panel().save(this.noop);
    new Panel().save(this.noop);
    Panel.all(function(err, arr){
      expect(err).toBeNull();
      expect(arr.length).toEqual(2);
      expect(arr[0].id).toEqual(1);
      expect(arr[1].id).toEqual(20);
    });
  });

  it('should correctly create a panel in the DB', function(){
    var panel = new Panel();
    expect(panel.id).toEqual(1);
    expect(panel.createdAt).toEqual(jasmine.any(Date));
    panel.save(function(){
      Panel.all(function(err, arr){
        expect(err).toBeNull();
        expect(arr.length).toEqual(1);
        expect(arr[0].id).toEqual(1);
      });
    });
  });

  it('should correctly delete a panel by ID from the DB', function(){
    new Panel().save(this.noop);
    Panel.destroy(1, function(err){
      expect(err).toBeUndefined();
      Panel.all(function(err, arr){
        expect(err).toBeNull();
        expect(arr.length).toEqual(0);
      });
    });
  });

});