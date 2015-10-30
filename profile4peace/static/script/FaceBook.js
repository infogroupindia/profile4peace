var FaceBook = (function () {
    function FaceBook(oninit) {
        var _this = this;
        this.oninit = oninit;
        this.scopes = {
            scope: "user_photos,user_hometown"
        };
        this.user = {
            fbId: null,
            name: null,
            citizen: null
        };
        window.fbAsyncInit = function () {
            console.log("SDK Inited");
            _this.init();
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id))
                return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    FaceBook.prototype.init = function () {
        window.FB.init({
            appId: '1658469721067231',
            cookie: true,
            // the session
            xfbml: true,
            version: 'v2.5' // use version 2.2
        });
        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }, this.scopes);
    };
    FaceBook.prototype.checkLoginState = function () {
        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }, this.scopes);
    };
    FaceBook.prototype.statusChangeCallback = function (response) {
        console.log('statusChangeCallback');
        console.log(response);
        var loginBtn = document.getElementById('peaceBtn');
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.oninit();
        }
        else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('peaceBtn').innerHTML = 'Login with FB';
            loginBtn.onclick = function () {
                window.FB.login(function (response) {
                    console.log(response);
                }, this.scopes);
            };
        }
        else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            loginBtn.innerHTML = 'Login with FB';
            loginBtn.onclick = function () {
                window.FB.login(function (response) {
                    console.log(response);
                }, this.scopes);
            };
        }
    };
    FaceBook.prototype.fetchProfilePic = function (callback) {
        window.FB.api("/me/picture?width=512&height=512", function (response) {
            console.log(response);
            if (response && !response.error) {
                var img = new Image();
                img.src = response.data.url;
                img.onload = function () {
                    if (callback) {
                        callback(img);
                    }
                };
            }
        });
    };
    FaceBook.prototype.fetchUserInfo = function (callback) {
        window.FB.api('/me?fields=hometown,name', function (response) {
            console.log(response);
            this.user.fbId = response.id;
            this.user.name = response.name;
            if (response.hometown.name.indexOf("India") > -1) {
                this.user.citizen = "Indian";
            }
            else if (response.hometown.name.indexOf("Pakistan") > -1) {
                this.user.citizen = "Pakistani";
            }
            if (callback) {
                callback(this.user);
            }
        });
    };
    return FaceBook;
})();
window.checkLoginState = function () {
    FaceBook.api.checkLoginState();
};
//# sourceMappingURL=FaceBook.js.map