interface Window {
    FB:any;
    fbAsyncInit:Function;
    checkLoginState:Function;
}
class FaceBook {

    static api:FaceBook;

    scopes:any = {
        scope: "user_photos,user_hometown"
    };

    user = {
        fbId: null,
        name: null,
        citizen:null
    };

    constructor(private oninit) {
        window.fbAsyncInit = () => this.init;
    }

    init() {
        window.FB.init({
            appId: '1658469721067231',
            cookie: true,  // enable cookies to allow the server to access
                           // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.5' // use version 2.2
        });

        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }, this.scopes);
    }
    checkLoginState() {
        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }, this.scopes);
    }
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        var loginBtn = document.getElementById('peaceBtn');

        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.oninit();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('peaceBtn').innerHTML = 'Login with FB';
            loginBtn.onclick = function () {
                window.FB.login(function (response) {
                    console.log(response);
                }, this.scopes);
            }
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            loginBtn.innerHTML = 'Login with FB';
            loginBtn.onclick = function () {
                window.FB.login(function (response) {
                    console.log(response);
                }, this.scopes);
            }
        }
    }
    fetchProfilePic(callback) {
        window.FB.api(
            "/me/picture?width=512&height=512",
            function (response) {
                console.log(response);
                if (response && !response.error) {
                    var img = new Image();
                    img.src = response.data.url;
                    img.onload = function () {
                        if (callback) {
                            callback(img);
                        }
                    }
                }
            }
        );
    }
    fetchUserInfo(callback) {
        window.FB.api('/me?fields=hometown,name', function (response) {
            console.log(response);
            this.user.fbId = response.id;
            this.user.name = response.name;
            if (response.hometown.name.indexOf("India") > -1) {
                this.user.citizen = "Indian";
            } else if (response.hometown.name.indexOf("Pakistan") > -1) {
                this.user.citizen = "Pakistani";
            }
            if (callback) {
                callback(this.user);
            }
        });
    }
}

window.checkLoginState = () => {
    FaceBook.api.checkLoginState();
};