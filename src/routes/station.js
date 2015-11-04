var vbb = require('vbb');
var Promise = require('bluebird');

exports.getStationInfo = function(req, res) {
    var client = vbb('6d293143-1988-41a1-9bca-b0b6be98822e');

    var stationID = req.params.id;

    client.departures(stationID, {   // `id` for S Beusselstraße
        results: 20
    }).then(function (results) {
        res.send(results);
    });
};
