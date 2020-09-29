<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
	//$API_KEY = 'apikey=ODCZDB41I8JYJNTV';
	$HOST = 'https://www.alphavantage.co/';
	$pieces = explode(",", $_SERVER['QUERY_STRING']);
    if($pieces[0] == 'Get'){
		$dir = $pieces[1]."/".$pieces[2].".txt";
		$myfile = fopen($pieces[1]."/".$pieces[2].".txt", "r") or die("Unable to open file!");
		echo fread($myfile,filesize($pieces[1]."/".$pieces[2].".txt"));
		fclose($myfile);
	}else if($pieces[0] == 'Set'){
		$dir = $pieces[1]."/".$pieces[2].".txt";
		if (!is_dir($pieces[1])){
			mkdir($pieces[1], 0755, true);
		}
		$myfile = fopen($dir, "w") or die("Unable to open file!");
		echo fread($myfile,filesize($pieces[1]."/".$pieces[2].".txt"));
		fwrite($myfile, $pieces[3]);
		fclose($myfile);
	} else {
		$api_url = getEndpiont($pieces[1], $pieces[2], $HOST, $pieces[0]);
		$xml = file_get_contents($api_url);
		$dir = $pieces[1]."/".$pieces[2].".txt";
		if (!is_dir($pieces[1]))
		{
			mkdir($pieces[1], 0755, true);
		}
		$myfile = fopen($dir, "w") or die("Unable to open file!");
		fwrite($myfile, $xml);
		fclose($myfile);
	}

	function getEndpiont($action, $symbol, $HOST, $API_KEY){
		switch ($action) {
			case 'Daily':
				return $HOST.'query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='.$symbol.'&outputsize=full&apikey='.$API_KEY;
				break;
			case 'SMA':
				return $HOST.'query?function='.$action.'&symbol='.$symbol.'&interval=monthly&time_period=10&series_type=open&apikey='.$API_KEY;
				break;
		}
		return $HOST.'query?function='.$action.'&symbol='.$symbol.'&interval=daily&time_period=10&series_type=open&apikey='.$API_KEY;
	}
?>
