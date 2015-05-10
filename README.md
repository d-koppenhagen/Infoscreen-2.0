# Infoscreen-2.0
## About
This the new version of my WG-Screen WebApp using NodeJS and AngularJS.
([old](https://github.com/Doerki/wgmonitor) version)

## Freatures (some are already in development)
- Departure Monitor for Tram (EasyGo)
- Weather- and News-Toolbar
- Gallery
- Shopping List
- Guestbook
- Calendar
- RSS Feeds-Reader

## What you need
- [NodeJS](https://nodejs.org)
- [MongoDB](https://www.mongodb.org/) for the shopping list
- [MySQL](https://www.mysql.de/) for the guestbook page

## How to setup
1. clone this project and run the app with `node server.js`
2. open the url in your browser (http://localhost:3000)

- maybe you should configure a proxy in apache like that:
```
<VirtualHost *:80>
    ServerAdmin admin@site.com
    ServerName test.site.com
    ServerAlias www.site.com

    ProxyRequests off

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    <Location />
        ProxyPass http://test.site.com:8080/
        ProxyPassReverse http://test.site.com:8080/
    </Location>
</VirtualHost>
```

## Configuration
- move file from the folder '/src/config.example.js' to '/src/config.js' and configure it
- move file from the folder '/src/frontend/js/settings.example.js' to '/src/frontend/js/settings.js' and configure it

## How it looks like?
- a preview of the project is available on: http://info.d-koppenhagen.de/
