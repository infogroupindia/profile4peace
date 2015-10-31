/**
 * Created by Nidin Vinayakan on 26-10-2015.
 */
// This is called with the results from from FB.getLoginStatus().
var scopes = {
    scope: "user_photos,user_hometown"
};
var citizen = null;
var user = {
    fbId: null,
    name: null
};
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    var loginBtn = document.getElementById('peaceBtn');

    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        fetchProfilePic();
        fetchUserCountry();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('peaceBtn').innerHTML = 'Login with FB';
        loginBtn.onclick = function () {
            FB.login(function (response) {
                console.log(response);
            }, scopes);
        }
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        loginBtn.innerHTML = 'Login with FB';
        loginBtn.onclick = function () {
            FB.login(function (response) {
                console.log(response);
            }, scopes);
        }
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    }, scopes);
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1658469721067231',
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.5' // use version 2.2
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    }, scopes);

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fetchProfilePic(callback) {
    FB.api(
        "/me/picture?width=512&height=512",
        function (response) {
            console.log(response);
            if (response && !response.error) {
                var img = new Image();
                img.src = response.data.url;
                img.onload = function () {
                    displayImage(img);
                    if (callback) {
                        callback(img);
                    }
                }
            }
        }
    );
}
function fetchUserCountry() {
    FB.api('/me?fields=hometown,name', function (response) {
        console.log(response);
        user.fbId = response.id;
        user.name = response.name;
        if (response.hometown.name.indexOf("India") > -1) {
            citizen = "Indian";
        } else if (response.hometown.name.indexOf("Pakistan") > -1) {
            citizen = "Pakistani";
        }
    });
}
