'use strict';

// id is used as the label at the moment.
// db is a fake db.

var ids = 0,
  db = {};

var Panel = module.exports = function Panel() {
  this.id = ++ids;
  this.createdAt = new Date();
};

Panel.prototype.save = function(fn){
  db[this.id] = this;
  fn();
};

// Returns an array of all the panels in the DB.
module.exports.all = function(fn){

  var arr = Object.keys(db).reduce(function(arr, id){
    arr.push(db[id]);
    return arr;
  }, []);
    
  fn(null, arr);

};

// Remove a panel by id.
module.exports.destroy = function(id, fn){
  if (db[id]) {
    delete db[id];
    fn();
  } else {
    fn(new Error('Panel ' + id + ' does not exist'));
  }
};

// Clears all objects in the DB.
module.exports.reset = function(fn){
  db = {};
  ids = 0;
  fn();
};