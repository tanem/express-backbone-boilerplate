// id is used as the label at the moment.
// db is a fake db, could use local store or something else instead?

var ids = 0,
    db = {};

var Panel = module.exports = function Panel() {
    this.id = ++ids;
    this.createdAt = new Date();
};

Panel.prototype.save = function (fn) {
    db[this.id] = this;
    fn();
};

Panel.prototype.destroy = function (fn) {
    exports.destroy(this.id, fn);
};

/*
Panel.prototype.update = function (data, fn) {
    this.updatedAt = new Date;
    for (var key in data) {
        if (undefined != data[key]) {
            this[key] = data[key];
        }
    }
    this.save(fn);
};
*/

module.exports.count = function (fn) {
    fn(null, Object.keys(db).length);
};

// Returns an array of all the panels in the DB.
module.exports.all = function (fn) {
    
    var arr = Object.keys(db).reduce(function (arr, id) {
        arr.push(db[id]);
        return arr;
    }, []);
    
    fn(null, arr);

};

// Get a panel by id.
module.exports.get = function (id, fn) {
    fn(null, db[id]);
};

// Remove a panel by id.
module.exports.destroy = function (id, fn) {
    if (db[id]) {
        delete db[id];
        fn();
    } else {
        fn(new Error('Panel ' + id + ' does not exist'));
    }
};