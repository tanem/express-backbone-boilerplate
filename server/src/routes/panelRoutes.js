'use strict';

module.exports = {

  'post /api/panels': {
    controller: 'panelController',
    action: 'create'
  },

  'delete /api/panels/:id': {
    controller: 'panelController',
    action: 'destroy'
  }

};