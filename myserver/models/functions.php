<?php
function defaultjson($totalHosts = 2, $start = 1) {
	//This functin is to simulate fetching results from the DB.
	$jsonStr = '{"configurations": [';
	$resultsLimit = $start + 19;
	for ($i = $start; $i <= $resultsLimit; $i++) {
		if ($i <= $totalHosts) {
			if ($i!=$start) {
				$jsonStr .=",";
			}
			$port = rand(1000,9999);
			$jsonStr .= <<<JSON
				{
							"name": "host{$i}",
							"hostname": "nessus{$i}-ntp.lab.com",
							"port": "$port",
							"username": "user{$i}"
						}
JSON;
				
				
		}
	}


		
	$jsonStr .="]}";
	echo $jsonStr;
}
?>
