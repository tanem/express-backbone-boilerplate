'use strict';

var PanelController = source('controllers/panelController'),
  PanelModel = source('models/panelModel');

describe('panelController', function(){
  
  var panelController, panelModel, res;

  beforeEach(function(){
    panelModel = new PanelModel();
    res = { json: sinon.stub() };
  });

  describe('create method', function(){

    var req = { body: { foo: 'bar' } };

    it('should send the correct response when the model is created', function(){
      panelModel.create = function(model, fn){
        fn(null, model);
      };
      panelController = new PanelController(panelModel);

      panelController.create(req, res);

      expect(res.json.args[0]).to.eql([ 200, { foo: 'bar' } ]);
    });

    it('should send the correct response when model creation fails', function(){
      panelModel.create = function(model, fn){
        fn({ statusCode: 400, message: 'Panel not created' });
      };
      panelController = new PanelController(panelModel);

      panelController.create(req, res);

      expect(res.json.args[0]).to.eql([ 400, { message: 'Panel not created' } ]);
    });

  });

  describe('destroy method', function(){

    var req = { params: { id: -1 } };

    it('should send the correct response if the model wasn\'t found', function(){
      panelModel.destroy = function(id, fn){
        fn({ statusCode: 404, message: 'Panel ' + id + ' does not exist' });
      };
      panelController = new PanelController(panelModel);

      panelController.destroy(req, res);

      expect(res.json.args[0]).to.eql([ 404, { message: 'Panel -1 does not exist' } ]);
    });

    it('should send the correct response when the model is destroyed', function(){
      panelModel.destroy = function(id, fn){
        fn(null);
      };
      panelController = new PanelController(panelModel);

      panelController.destroy(req, res);

      expect(res.json.args[0]).to.eql([ 204, {} ]);
    });

  });

});