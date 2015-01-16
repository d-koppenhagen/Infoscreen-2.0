<?php
	require("dbConfig.php");

	// check if all fields aren't empty
    //exit (echo) which field is empty to change later (has-error class)
    if($_POST[name] == ''){exit ("name");}
    if($_POST[nachricht] == ''){exit ("nachricht");}

    // write field values in vars
    $name = $_POST[name];
    $nachricht = $_POST[nachricht];

    //SQL query -> get data from db
    $sql="INSERT INTO `wg`.`guestbook` (`id`, `name`, `text`, `timestamp`) VALUES (NULL, '".$name."', '".$nachricht."', CURRENT_TIMESTAMP);";

    //prepare query
    $command = $VERBINDUNG->prepare($sql);

    // bind params
    $command->bindParam(':name', $_POST["name"]);
    $command->bindParam(':text', $_POST["nachricht"]);

    // execute if true (no error)
    if ($command->execute()) {
  		echo '';
    }
    echo "success";
?>
