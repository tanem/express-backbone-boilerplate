'use strict';

describe('panelController', function(){
  
  var infector, panelController, panelModel, res;

  beforeEach(function(){
    infector = new Infector({
      panelController: { type: source('controllers/panelController') }
    });
    panelModel = {};
    res = { json: sinon.stub() };
  });

  it('should send the correct response when panel creation is successful', function(){
    panelModel.create = function(attrs, fn){ fn(null, { foo: 'bar' }); };
    infector.register({ panelModel: { value: panelModel } });
    panelController = infector.get('panelController');

    panelController.create({ body: { foo: 'bar' } }, res);

    expect(res.json.args[0]).to.eql([200, { foo: 'bar' }]);
  });

  it('should send the correct response when panel creation is unsuccessful', function(){
    panelModel.create = function(attrs, fn){
      fn({ statusCode: 400, message: 'Panel not created' });
    };
    infector.register({ panelModel: { value: panelModel } });
    panelController = infector.get('panelController');

    panelController.create({ body: null }, res);

    expect(res.json.args[0]).to.eql([400, { message: 'Panel not created' }]);
  });

  it('should send the correct response when panel destruction is successful', function(){
    panelModel.destroy = function(id, fn){ fn(null); };
    infector.register({ panelModel: { value: panelModel } });
    panelController = infector.get('panelController');

    panelController.destroy({ params: { id: 1 } }, res);

    expect(res.json.args[0]).to.eql([204, {}]);
  });

  it('should send the correct response when panel destruction is unsuccessful', function(){
    panelModel.destroy = function(id, fn){
      fn({ statusCode: 404, message: 'Panel ' + id + ' does not exist' });
    };
    infector.register({ panelModel: { value: panelModel } });
    panelController = infector.get('panelController');

    panelController.destroy({ params: { id: -1 } }, res);

    expect(res.json.args[0]).to.eql([404, { message: 'Panel -1 does not exist' }]);
  });

});