'use strict';

var _ = require('lodash'),
  ids = 0,
  db = {};

var PanelModel = module.exports = function PanelModel() {};

PanelModel.prototype.create = function(attrs, fn){
  var panelModel = new PanelModel();
  _.extend(panelModel, {
    createdAt: Date.now(),
    id: ++ids
  }, attrs);
  db[ids] = panelModel;
  fn(null, panelModel);
};

PanelModel.prototype.findAll = function(fn){
  var arr = Object.keys(db).reduce(function(arr, id){
    arr.push(db[id]);
    return arr;
  }, []);
  fn(null, arr);
};

PanelModel.prototype.destroy = function(id, fn){
  if (db[id]) {
    delete db[id];
    fn(null);
  } else {
    fn({
      statusCode: 404,
      message: 'Panel ' + id + ' does not exist'
    });
  }
};

PanelModel.prototype.reset = function(fn){
  db = {};
  ids = 0;
  fn(null);
};