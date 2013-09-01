'use strict';

var panelController = source('controllers/panelController');
var PanelModel = source('models/panelModel');

describe('panelController', function(){

  var res;

  beforeEach(function(){
    res = { json: sinon.stub() };
  });

  describe('create method', function(){

    var req = { body: { foo: 'bar' } };

    it('should send the correct response when the model is created', function(){
      sinon.stub(PanelModel.prototype, 'create', function(model, fn){
        fn(null, model);
      });
      panelController.create(req, res);
      expect(res.json.args[0]).to.eql([ 200, { foo: 'bar' } ]);
      PanelModel.prototype.create.restore();
    });

    it('should send the correct response when model creation fails', function(){
      sinon.stub(PanelModel.prototype, 'create', function(model, fn){
        fn({ statusCode: 400, message: 'Panel not created' });
      });
      panelController.create(req, res);
      expect(res.json.args[0]).to.eql([ 400, { message: 'Panel not created' } ]);
      PanelModel.prototype.create.restore();
    });

  });

  describe('destroy method', function(){

    var req = { params: { id: -1 } };

    it('should send the correct response if the model wasn\'t found', function(){
      sinon.stub(PanelModel.prototype, 'destroy', function(id, fn){
        fn({ statusCode: 404, message: 'Panel ' + id + ' does not exist' });
      });
      panelController.destroy(req, res);
      expect(res.json.args[0]).to.eql([ 404, { message: 'Panel -1 does not exist' } ]);
      PanelModel.prototype.destroy.restore();
    });

    it('should send the correct response when the model is destroyed', function(){
      sinon.stub(PanelModel.prototype, 'destroy', function(id, fn){
        fn(null);
      });
      panelController.destroy(req, res);
      expect(res.json.args[0]).to.eql([ 204, {} ]);
      PanelModel.prototype.destroy.restore();
    });

  });

});