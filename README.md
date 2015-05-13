# Infoscreen-2.0
## About
This the new version of my WG-Screen WebApp using NodeJS and AngularJS.
([old](https://github.com/Doerki/wgmonitor) version)

## Freatures (some are already in development)
* [x] Departure Monitor for Tram (EasyGo)
* [x] Weather- and News-Toolbar
* [x] Gallery
* [x] Shopping List
* [x] Guestbook
* [x] Calendar
* [x] RSS Feeds-Reader
* [ ] WebRTC Audio/Video integration

## What you need
- [NodeJS](https://nodejs.org)
- [MongoDB](https://www.mongodb.org/) for the shopping list
- [MySQL](https://www.mysql.de/) for the guestbook page

## How to setup
1. clone this project
2. go to `src` folder and run `npm install` (maybe you need to install also dependencies)
3. run the app with `node server.js`
4. open the url in your browser (http://localhost:3000)
5. create an init.d script to run the infoscreen as a service (Debian)
    - edit the path after `APPLICATION_DIRECTORY` in the `infoscreen` file
    - run `sudo ./createInitScript.sh`
    - this will copy the file `infoscreen`to your `/etc/init.d` directory and make it excecutable
    - now you can start the infoscreen with `sudo service infoscreen start` (there are also the options `restart`, `stop` and `status`)
6. (optional) you can configure ar `VirtualHost` for apache, etc. like that:
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
