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
    ],
    "rssFeeds" : [
        {
            "id" : generateID(),
            "title": "Postillon",
            "url": "http://feeds.feedburner.com/blogspot/rkEL",
        }
    ],
    "gallery" : {
        "credentials": {
            "user": "USERNAME",
            "pass": "PASSWORD"
        }
    }
}
