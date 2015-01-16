<?php
	require("dbConfig.php");

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    // write field values in vars
    $name = $data->name;
    $message = $data->message;

    //SQL query -> get data from db
    $sql="INSERT INTO `wg`.`guestbook` (`id`, `name`, `text`, `timestamp`) VALUES (NULL, '".$name."', '".$message."', CURRENT_TIMESTAMP);";

    //prepare query
    $command = $VERBINDUNG->prepare($sql);

    // bind params
    /*
        $command->bindParam(':name', $_POST["name"]);
        $command->bindParam(':text', $_POST["nachricht"]);
    */
    // execute if true (no error)
    if ($command->execute()) {
  		echo '';
    }
    echo "success";
?>
