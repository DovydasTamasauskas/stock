<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
	$API_KEY = 'apikey=ODCZDB41I8JYJNTV';
	$HOST = 'https://www.alphavantage.co/';
	$symbol = $_SERVER['QUERY_STRING'];
	$pieces = explode(",", $symbol);
	
	if($pieces[0] == 'Get'){
		$myfile = fopen($pieces[1]."_".$pieces[2].".txt", "r") or die("Unable to open file!");
		echo fread($myfile,filesize($pieces[1]."_".$pieces[2].".txt"));
		fclose($myfile);
	}else{
		$api_url = getEndpiont($pieces[0], $pieces[1], $HOST, $API_KEY);
		$xml = file_get_contents($api_url);
		$myfile = fopen($pieces[0]."_".$pieces[1].".txt", "w") or die("Unable to open file!");
		fwrite($myfile, $xml);
		fclose($myfile);
	}

	function getEndpiont($action, $symbol, $HOST, $API_KEY){
		switch ($action) {
			case 'Daily':
				return $HOST.'query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='.$symbol.'&outputsize=compact&'.$API_KEY;
				break;
		}
		return $HOST.'query?function='.$action.'&symbol='.$symbol.'&interval=daily&time_period=10&series_type=open&'.$API_KEY;
	}
?>
