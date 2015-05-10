var config = {
    "wlan":  {
        "name": "Gast",  // "WLANNAME"
        "key": "hftl_kmi12"    // "WLANKEY"
    },
    "lvb": {
        "stations" : [  // array with hfas-IDs
            "13247","11563"
        ],
        "max_stations" : "8",
        "clientID" : generateID()
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
            "REST" : "http://5.45.102.135:7333/gallery",
            "apikey": "yu3NL40yHk4f8Tk5ybtVhaj7DlJFe3X0"
        },
        {
            "name"  : "shoppingList",
            "REST" : "http://5.45.102.135:3000/list"
        }
    ],
    "rssFeeds" : [
        {
            "id" : generateID(),
            "title": "Postillon",
            "url": "http://feeds.feedburner.com/blogspot/rkEL",
        }
    ]
}

function generateID (){
    var clientID ="";
    for(var i = 0; i < 23; i++){
        clientID += Math.floor(Math.random()*10);
    }
    return clientID;
}

