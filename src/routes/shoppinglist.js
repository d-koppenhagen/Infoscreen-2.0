var mongoose = require('mongoose');
var config = require('../config.js');

mongoose.connect(config.shoppinglist_db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('opened database');
});

var itemSchema = mongoose.Schema({
    name: String,
    quantity: String,
    checked: Boolean,
    description: String
});
var listItem = mongoose.model('listItem', itemSchema);

exports.findById = function(req, res) {
    var id = req.params.id;
    listItem.findOne({'_id': id}, function(err, item) {
        res.send(item);
    });
};

exports.findAll = function(req, res) {
    listItem.find('', function(err, items) {
        console.log(items);
        res.send(items);
    });
};

exports.add = function(req, res) {
    var item = new listItem(req.body);

    item.save(function (err, item) {
      if (err) return res.send({'error':'An error has occurred'});
      res.send('success');
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var item = req.body;

    console.log('Updating item: ' + id);
    console.log(item);
    listItem.findOneAndUpdate({_id: id}, item, function(err, data) {
      if (err) return res.send(500, { error: err });
      return res.send("succesfully edited");
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting Item: ' + id);
    listItem.remove({'_id': id}, function(err, data) {
      if (err) return res.send(500, { error: err });
      return res.send("succesfully removed");
    });
}

exports.deleteAll = function(req, res) {
    var id = req.params.id;
    console.log('Deleting Item: ' + id);
    listItem.remove({}, function(err, data) {
      if (err) return res.send(500, { error: err });
      return res.send("All items succesfully removed");
    });
}
