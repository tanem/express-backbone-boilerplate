'use strict';

var PanelModel = require('../models/panelModel');

var PanelController = module.exports = function PanelController(panelModel){
  if (!(panelModel instanceof PanelModel)) {
    throw new Error('panelModel instance must be injected');
  }
  this.panelModel = panelModel;
};

PanelController.inject = ['panelModel'];

PanelController.prototype.create = function(req, res){
  this.panelModel.create(req.body, function(err, panel){
    if (err) return res.json(err.statusCode, { message: err.message });
    res.json(200, panel);
  });
};

PanelController.prototype.destroy = function(req, res){
  this.panelModel.destroy(req.params.id, function(err){
    if (err) return res.json(err.statusCode, { message: err.message });
    res.json(204, {});
  });
};