'use strict';

var PanelModel = require('../models/panelModel');

module.exports = {

  create: function(req, res){
    var panelModel = new PanelModel();
    panelModel.save(function(err){
      if (err) throw err;
      res.send(panelModel);
    });
  },

  destroy: function(req, res){
    var id = req.params.id;
    PanelModel.destroy(id, function(err){
      if (err) throw err;
      console.log('Panel [%s] deleted.', id);
      res.send('');
    });
  }

};