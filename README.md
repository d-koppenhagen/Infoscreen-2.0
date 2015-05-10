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
3. create an init.d script to run the infoscreen as a service (Debian)
    - edit the path after `APPLICATION_DIRECTORY` in the `infoscreen` file
    - run `sudo ./createInitScript.sh`
    - this will copy the file `infoscreen`to your `/etc/init.d` directory and make it excecutable
    - now you can start the infoscreen with `sudo service infoscreen start` (there are also the options `restart`, `stop` and `status`)
4. (optional) you can configure ar `VirtualHost` for apache, etc. like that:
```
<VirtualHost *:80>
    ServerAdmin yourMail@domain.com
    ServerName YOURSERVERNAME
    ServerAlias infoscreen.YOURDOMAIN.com

    ProxyRequests off

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    <location />
        ProxyPass http://localhost:3000/
        ProxyPassReverse http://localhost:3000/
    </location>
</VirtualHost>
```

## Configuration
- move file from the folder '/src/config.example.js' to '/src/config.js' and configure it
- move file from the folder '/src/frontend/js/settings.example.js' to '/src/frontend/js/settings.js' and configure it

## How it looks like?
- a preview of the project is available on: http://info.d-koppenhagen.de/
