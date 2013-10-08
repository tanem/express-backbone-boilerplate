'use strict';

var PanelModel = require('../models/panelModel'),
  panelModel = new PanelModel();

module.exports = {

  create: function(req, res){
    panelModel.create(req.body, function(err, panel){
      if (err) return res.json(err.statusCode, { message: err.message });
      res.json(200, panel);
    });
  },

  destroy: function(req, res){
    panelModel.destroy(req.params.id, function(err){
      if (err) return res.json(err.statusCode, { message: err.message });
      res.json(204, {});
    });
  }

};
