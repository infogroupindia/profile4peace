<?php
include 'sdk.php';

$fbid = $_POST['fbid'];
$img = $_POST['imageData'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$img_data = base64_decode($img);
$photo_url = "../photos/".$fbid.".jpg";
$photo_web_url = "https://profile4peace.in/photos/".$fbid.".jpg";
file_put_contents($photo_url, $img_data);

$data = [
  'message' => '#profile4peace',
  'source' => $fb->fileToUpload($photo_url),
];

try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post('/me/photos', $data, $_SESSION['facebook_access_token']);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo '{"success": "false", "message": "Graph returned an error: ' . $e->getMessage().'"}';
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	echo '{"success": "false", "message": "Facebook SDK returned an error: ' . $e->getMessage().'"}';
  exit;
}

$graphNode = $response->getGraphNode();

echo '{"success": "true", "url": "https://www.facebook.com/photo.php?fbid='.$graphNode['id'].'&makeprofile=1"}';

?>