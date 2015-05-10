#!/bin/bash
 pwd
 cp infoscreen /etc/init.d/
 if [ ! -d "/var/run/" ]; then
     echo "Folder doesn't exist, created Folder: /var/log/"
     mkdir /var/run/
 fi 
 if [ ! -d "/var/log/" ]; then
     echo "Folder doesn't exist, created Folder: /var/log/"
     mkdir /var/log/
 fi

 chmod +x /etc/init.d/infoscreen
 update-rc.d infoscreen defaults
 echo "finished"
