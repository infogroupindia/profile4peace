<?php
include 'sdk.php';
header('Content-type: image/jpeg');

$size = $_GET['mode'] == "preview"?'width=512&height=512':'width=1024&height=1024';

$response = $fb->get('/me/picture?redirect=false&'.$size, $_SESSION['facebook_access_token']);

$photo = json_decode($response->getGraphObject());
echo file_get_contents($photo->url);
?>