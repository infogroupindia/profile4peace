<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Profile 4 Peace</title>
    <script type="text/javascript" src="script/Proxy.js"></script>
    <script type="text/javascript" src="script/FaceBook.js"></script>
    <script type="text/javascript" src="script/App.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="fonts/audimat/audimat-regular.css">
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:500italic' rel='stylesheet' type='text/css'>
    <script>
	<?php include script/login.php?>
        window.onload = function(){
            var app = new App();
        }
    </script>
</head>
<body>
<!--<div>
<pre id="taag_output_text" style="float:left;" class="fig" contenteditable="true">    ___    ___     ___     ___     ___
   | _ \  | __|   /   \   / __|   | __|
   |  _/  | _|    | - |  | (__    | _|
  _|_|_   |___|   |_|_|   \___|   |___|
_| """ |_|"""""|_|"""""|_|"""""|_|"""""|
"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-' </pre>
</div>-->
<div id="status">
</div>
<div class="app blue-bg">
    <div class="center-content">
        <div class="profile-pic">
            <canvas id="image-canvas" width="256" height="256"></canvas>
        </div>
        <div id="progress" class="progress">Uploading 10%</div>
        <div id="peaceBtn" class="make-peace">Make Peace</div>
        <div class="disclaimer">by clicking above button you will change your facebook profile picture!</div>
    </div>
    <div class="slogan-container">
        <div class="slogan">#Profile 4 Peace</div>
    </div>
</div>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-6466066-17', 'auto');
    ga('send', 'pageview');

</script>
</body>
</html>