<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

if(!isset($_SESSION))
{
    session_start();
}

require_once __DIR__ . "/libs/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php";

$fb = new Facebook\Facebook([
    'app_id' => '1658469721067231',
    'app_secret' => '2cb0864cf0cb591faedef648be64d005',
    'default_graph_version' => 'v2.5',
]);
?>