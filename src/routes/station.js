var http = require('http');

exports.getStationInfo = function(req, res) {
    var id = req.params.id;
    var clientid = generateID ();

    var options = {
        method: 'GET',
        host : 'hn1.the-agent-factory.de',
        path: '/easygo2/rest/regions/MDV/modules/stationmonitor?con10=1&con01=1&sm10=0&sm01=0&source=HISTORY&cStyle=0&transportFilter=00011111&mode=DEP&hafasID='+id,
        headers: {
            'EasyGO-Client-ID': clientid,
            'Accept': 'application/json',
            'user-agent': 'easy.GO Client Android v4.0.3_easyGO_4.0.7 Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36;'
        }
    };

    http.get(options, function(result) {
        var responseParts = [];
        result.setEncoding('utf8');
        result.on("data", function(chunk) {
            //add this chunk to the output to send
            responseParts.push(chunk);
        });
        result.on("end", function(){
            //now send your complete response
            res.end(responseParts.join(''));
        });
    });

};

function generateID (){
    var clientID ="";
    for(var i = 0; i < 23; i++){
        clientID += Math.floor(Math.random()*10);
    }
    return clientID;
}
