<?php

define('API', '86a9106ae65537651a8e456835b316ab');

$r = isset($_GET['r']) ? $_GET['r'] : '';
$typ = isset($_GET['typ']) ? $_GET['typ'] : '';


if(!$r ){
    die('Missing parameters');
}

//XML file to load
$api_url = 'http://www.ukulele-chords.com/get?ak='. API .'&r='.$r.'&typ='.$typ;

//converts the specified XML file into a SimpleXMLElement object
// $xml = simplexml_load_file($api_url);
// echo $xml;

$res = file_get_contents($api_url);

$src = preg_match('/<chord_diag_mini>(.+)<\/chord_diag_mini>/', $res , $matches);


//Navigate through the tree to get your info (chord diagram here)
//chord[0] returns the "main chord". For alternative positions, use a foreach() loop.
// $res = $xml->chord[0]->chord_diag_mini;

//print the result
// echo $matches[1];

$remoteImage = $matches[1];
$imginfo = getimagesize($remoteImage);
header("Content-type: {$imginfo['mime']}");
readfile($remoteImage);
?>