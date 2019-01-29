<?php

include_once(dirname(__FILE__) . '/config.inc');


$r = isset($_GET['r']) ? $_GET['r'] : ''; //Chord
$typ = isset($_GET['typ']) ? $_GET['typ'] : ''; //Chord type
$filefullname = CHORD_IMAGES_FOLDER . '/'. strtoupper($r). strtolower($typ) . '.png'; //Chord image file name and path.


if(!$r ){
    die('Missing parameters');
}


//Serve the local file, if existe.
if( !file_exists($filefullname)){
    //Retrive remote image, save and serve localy

    //XML file to load
    $api_url = 'http://www.ukulele-chords.com/get?ak='. CHORDS_API_KEY .'&r='.$r.'&typ='.$typ;
    $res = file_get_contents($api_url);
    $src = preg_match('/<chord_diag_mini>(.+)<\/chord_diag_mini>/', $res , $matches);
    $remoteImage = $matches[1];
    
    file_put_contents($filefullname, file_get_contents($remoteImage));
}

header("Content-type: image/png");
echo readfile($filefullname);

?>