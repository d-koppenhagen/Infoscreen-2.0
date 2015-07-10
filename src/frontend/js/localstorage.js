if (!(localStorage.getItem("lvb_station_ids"))){
    localStorage.setItem("lvb_station_ids", "["+config.stations+"]")
}
if (!(localStorage.getItem("max_stations"))){
    localStorage.setItem("max_stations", "10")
}
if (!(localStorage.getItem("max_gb"))){
    localStorage.setItem("max_gb", "10")
}
if (!(localStorage.getItem("weather_location"))){
    localStorage.setItem("weather_location", config.weather.location)
}
if (!(localStorage.getItem("rssFeeds"))){
    localStorage.setItem("rssFeeds", JSON.stringify(config.rssFeeds))
}
if (!(localStorage.getItem("max_feed"))){
    localStorage.setItem("max_feed", "10")
}
