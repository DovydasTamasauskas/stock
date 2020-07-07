<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
	$API_KEY = 'apikey=HGJWFG4N8AQ66ICD';
	$HOST = 'https://www.alphavantage.co/';
	$symbol = $_SERVER['QUERY_STRING'];
	$pieces = explode(",", $symbol);
	
	if($pieces[0] == 'Get'){
		$myfile = fopen($pieces[1]."_".$pieces[2].".txt", "r") or die("Unable to open file!");
		echo fread($myfile,filesize($pieces[1]."_".$pieces[2].".txt"));
		fclose($myfile);
	}else{
		if($pieces[0] == 'Daily'){
			$api_url = $HOST.'query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='.$pieces[1].'&outputsize=compact&'.$API_KEY;
		} else if ($pieces[0] == 'SMA') {
			$api_url = $HOST.'query?function=SMA&symbol='.$pieces[1].'&interval=daily&time_period=10&series_type=open&'.$API_KEY;
		}
		
		$xml = file_get_contents($api_url);
		$myfile = fopen($pieces[0]."_".$pieces[1].".txt", "w") or die("Unable to open file!");
		fwrite($myfile, $xml);
		fclose($myfile);
	}
?>
