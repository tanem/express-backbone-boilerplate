'use strict';

var _ = require('lodash');

var PanelModel = module.exports = function PanelModel(date, db) {
  this.date = date;
  this.db = db;
  this.ids = 0;
};

PanelModel.infect = ['date', 'db'];

PanelModel.prototype.create = function(attrs, fn){
  var panelModel = _.extend({
    createdAt: this.date.now(),
    id: ++this.ids
  }, attrs);
  this.db[this.ids] = panelModel;
  fn(null, panelModel);
};

PanelModel.prototype.findAll = function(fn){
  fn(null, _.values(this.db));
};

PanelModel.prototype.destroy = function(id, fn){
  if (this.db[id]) {
    delete this.db[id];
    fn(null);
  } else {
    fn({
      statusCode: 404,
      message: 'Panel ' + id + ' does not exist'
    });
  }
};