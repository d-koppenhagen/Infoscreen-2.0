exports.apikey = "YOURAPIKEY";
exports.port = 3000;

// set to true to use minified version (you have to run gulp compress before)
exports.minified = false;

exports.mysqlGBcred = {
  host     : 'SERVER',
  database : 'DATABASE',
  user     : 'USERNAME',
  password : 'PASSWORD'
};

exports.shoppinglist_db = 'mongodb://localhost/shoppinglist';
exports.guestbook_db = 'mongodb://localhost/guestbook';

/* openweather configuration */
exports.weather = {
    apikey  : 'YOURAPIKEY',  //set openweather.com API key if you have one
    culture : 'de', //set the culture (de, fr, etc.)
    forecastType: '' //set the forecast type (daily, etc.); or '' for 3 hours forecast
};
