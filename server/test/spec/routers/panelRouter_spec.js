'use strict';

var panelRouter = source('routers/panelRouter');

describe('panelRouter', function(){

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