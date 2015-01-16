<?php
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $out = array();
    //$stationIDs = implode(",",$data->{'stations'});

    $clientID = $data->{'clientID'};
    $useragent = "easy.GO Client Android v4.0.3_easyGO_4.0.7 Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36;";
    $requestURI = "http://hn1.the-agent-factory.de/easygo2/rest/regions/MDV/modules/stationmonitor?con10=1&con01=1&sm10=0&sm01=0&source=HISTORY&cStyle=0&transportFilter=00011111&mode=DEP&hafasID=";

    foreach($data->{'stations'} as $station){
        $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => $requestURI.$station,
                CURLOPT_USERAGENT => $useragent,
                CURLOPT_HTTPHEADER => array("EasyGO-Client-ID: ".$clientIDs, "Accept: application/json"),
              ));
            $out[] = json_decode(curl_exec($curl), 1);
            curl_close($curl);
            //$this->data = json_decode($resp);
    }
echo json_encode($out);
?>
