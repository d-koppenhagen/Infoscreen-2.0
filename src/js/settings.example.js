var config = {
    wlan:  {
        name: "WLANNAME",  // "WLANNAME"
        key: "WLANKEY"    // "WLANKEY"
    },
    lvb: {
        stations : [  // array with hfas-IDs
            "13247","11563"
        ],
        max_stations : "10",
        clientID : generateClientID()
    }
}

function generateClientID (){
    var clientID ="";
    for(var i = 0; i < 23; i++){
        clientID += Math.floor(Math.random()*10);
    }
    console.log("generating new clientID...", clientID);
    return clientID;
}
