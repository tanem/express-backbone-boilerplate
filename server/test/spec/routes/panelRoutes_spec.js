'use strict';

var panelRoutes = source('routes/panelRoutes');

describe('panelRoutes', function(){

  it('"post /api/panels" should call the controller "create" method', function(){
    var route = panelRoutes['post /api/panels'];
    expect(route.controller).to.be('panelController');
    expect(route.action).to.be('create');
  });

  it('"delete /api/panels/:id" should call the controller "destroy" method', function(){
    var route = panelRoutes['delete /api/panels/:id'];
    expect(route.controller).to.be('panelController');
    expect(route.action).to.be('destroy');
  });

});