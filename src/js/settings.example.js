var config = {
    "wlan":  {
        "name": "WLANNAME",  // "WLANNAME"
        "key": "WLANKEY"    // "WLANKEY"
    },
    "lvb": {
        "stations" : [  // array with hfas-IDs
            "13247","11563"
        ],
        "max_stations" : "8",
        "clientID" : generateClientID()
    },
    "gb": {
        "max_entries" : "8"
    },
    "weather": {
        "location" : "2879139"
    },
    "restServices": [
        {
            "name"  : "imageServer",
            "REST" : "//DOMAIN:PORT/api/images",
            "rootPath"  : "//DOMAIN:PORT/images"
        }
    ]
}

function generateClientID (){
    var clientID ="";
    for(var i = 0; i < 23; i++){
        clientID += Math.floor(Math.random()*10);
    }
    console.log("generating new clientID...", clientID);
    return clientID;
}
