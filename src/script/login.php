<?php
include 'sdk.php';
$helper = $fb->getRedirectLoginHelper();
$permissions = ['user_photos','user_hometown','publish_actions']; // optional
$loginUrl = $helper->getLoginUrl('https://profile4peace.in/script/login-callback.php', $permissions);

echo 'window.loginUrl = ' . $loginUrl;
?>