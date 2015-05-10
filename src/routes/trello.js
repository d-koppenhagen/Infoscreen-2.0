http = require('http');
url = require('url');
OAuth = require('oauth').OAuth;

var OAuth,
accessURL,
appName,
authorizeURL,
cb,
domain,
http,
key,
login,
loginCallback,
oauth,
oauth_secrets,
port,
requestURL,
secret,
url;

domain="127.0.0.1";
port = 7799;

requestURL = "https://trello.com/1/OAuthGetRequestToken";
accessURL = "https://trello.com/1/OAuthGetAccessToken";
authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";

appName = "Doerki.com - Trello Connect";
key = "12f45ac93b038c1916d0cbe250da9c62";
secret = "1e0dfe588305d9bf46769d9ed6c9d11cc5cb88326b3a6bff18855824c7316a59";

oauth_secrets = {};

exports.login = function(req, res) {
    var query = url.parse(req.url, true).query;
    loginCallback = query.redirectUrl;
    console.log(Date(),"new authorisation Request - redirect URL is", loginCallback);
    oauth = new OAuth(requestURL, accessURL, key, secret, "1.0", loginCallback, "HMAC-SHA1");
    return oauth.getOAuthRequestToken((function(_this) {
      return function(error, token, tokenSecret, results) {
        oauth_secrets[token] = tokenSecret;
        res.writeHead(302, {
          'Location': authorizeURL + "?oauth_token=" + token + "&name=" + appName
        });
        return res.end();
      };
    })(this));
};

/*
cb = function(req, res) {
    var query, token, tokenSecret, verifier;
    query = url.parse(req.url, true).query;
    token = query.oauth_token;
    tokenSecret = oauth_secrets[token];
    verifier = query.oauth_verifier;
    return oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results) {
      return oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response) {
        return res.end(data);
      });
    });
};
*/
