'use strict';

var PanelController = module.exports = function PanelController(panelModel){
  this.panelModel = panelModel;
};

PanelController.infect = ['panelModel'];

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