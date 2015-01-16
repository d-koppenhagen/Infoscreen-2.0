<?php
	require_once("dbConfig.php");
    // Abrufen der Daten
    $command = $VERBINDUNG->query("SELECT * FROM `guestbook` ORDER BY  `timestamp` DESC ");
    $listitem = $command->fetchAll(PDO::FETCH_OBJ);

    //get json encoded data
    echo json_encode($listitem);
?>
