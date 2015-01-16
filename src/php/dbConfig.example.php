<?php
/*
$SERVER = "mysql:host=localhost;
             dbname=wgmonitor";
$BENUTZER = "root"; // Datenbank-User (Benutzername)
$PASSWORT = "Kudewe58"; // Datenbank-Passwort
*/

$SERVER = "mysql:host=HOSTNAME;
             dbname=NAME";
$BENUTZER = "USERNAME"; // Datenbank-User (Benutzername)
$PASSWORT = "PASSWORD"; // Datenbank-Passwort

// Zeichensatz UTF-8 bei der Verbindung setzen
$OPTION = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

try {
 // Verbindung zur Datenbank aufbauen
 $VERBINDUNG = new PDO($SERVER, $BENUTZER, $PASSWORT, $OPTION);

}
catch (PDOException $e) {
 // Bei einer fehlerhaften Verbindung eine Nachricht ausgeben
 echo $e->getMessage();
}
?>

