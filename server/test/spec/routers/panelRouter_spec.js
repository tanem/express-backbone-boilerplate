'use strict';

describe('panelRouter', function(){

  var infector, panelRouter;

  beforeEach(function(){
    infector = new Infector({
      panelRouter: { value: source('routers/panelRouter') }
    });
    panelRouter = infector.get('panelRouter');
  });

  describe('post /api/panels', function(){
    it('should call the controller "create" method', function(){
      var route = panelRouter['post /api/panels'];
      expect(route.controller).to.be('panelController');
      expect(route.action).to.be('create');
    });
  });

  describe('delete /api/panels', function(){
    it('should call the controller "destroy" method', function(){
      var route = panelRouter['delete /api/panels/:id'];
      expect(route.controller).to.be('panelController');
      expect(route.action).to.be('destroy');
    });
  });

});