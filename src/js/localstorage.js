if (!(localStorage.getItem("lvb_station_ids"))){
    localStorage.setItem("lvb_station_ids", "["+config.lvb.stations+"]")
}
if (!(localStorage.getItem("max_stations"))){
    localStorage.setItem("max_stations", config.lvb.max_stations)
}
if (!(localStorage.getItem("max_gb"))){
    localStorage.setItem("max_gb", config.gb.max_entries)
}
if (!(localStorage.getItem("weather_location"))){
    localStorage.setItem("weather_location", config.weather.location)
}
