var config = {
    "wlan":  {
        "name": "WLANNAME",  // "WLANNAME"
        "key": "WLANKEY"    // "WLANKEY"
    },
    "stations" : [  // array with hfas-IDs
        "13247","11563"
    ],
    "weather": {
        "location" : "2879139"
    },
    "rssFeeds" : [
        {
            "id" : generateID(),
            "title": "Postillon",
            "url": "http://feeds.feedburner.com/blogspot/rkEL",
        }
    ],
    "apikey": "YOURAPIKEY", //same key like in /src/config.js
    "trello_redirect_uri": "http://YOURAPPURL/#/tasks" // redirect URI after trello login was successful
}
