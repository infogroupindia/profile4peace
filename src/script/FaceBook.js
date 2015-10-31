var FaceBook = (function () {
    function FaceBook(oninit) {
        var _this = this;
        this.oninit = oninit;
        this.appId = '1658469721067231';
        this.scopes = {
            scope: "user_photos,user_hometown,publish_actions"
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
        var _this = this;
        window.FB.init({
            appId: this.appId,
            cookie: true,
            // the session
            xfbml: true,
            version: 'v2.5' // use version 2.2
        });
        window.FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response);
        }, this.scopes);
    };
    FaceBook.prototype.checkLoginState = function () {
        var _this = this;
        window.FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response);
        }, this.scopes);
    };
    FaceBook.prototype.statusChangeCallback = function (response) {
        console.log('statusChangeCallback');
        console.log(response);
        var loginBtn = document.getElementById('peaceBtn');
        var self = this;
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            self.accessToken = response.authResponse.accessToken;
            self.oninit();
        }
        else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('peaceBtn').innerHTML = 'Login with FB';
            loginBtn.onclick = function () {
                window.FB.login(function (response) {
                    console.log(response);
                    if (response.status === "connected") {
                        self.accessToken = response.authResponse.accessToken;
                        self.oninit();
                    }
                }, self.scopes);
            };
        }
        else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            loginBtn.innerHTML = 'Login with FB';
            loginBtn.onclick = function () {
                window.FB.login(function (response) {
                    console.log(response);
                    if (response.status === "connected") {
                        self.accessToken = response.authResponse.accessToken;
                        self.oninit();
                    }
                }, self.scopes);
            };
        }
    };
    /*fetchProfilePic(callback) {
     window.FB.api(
     "/me/picture?width=512&height=512",
     function (response) {
     console.log(response);
     if (response && !response.error) {
     var img = new Image();
     img.src = response.data.url;
     img.onload = function() {
     if (callback) {
     callback(img);
     }
     }
     }
     }
     );
     }*/
    FaceBook.prototype.fetchUserInfo = function (callback) {
        var _this = this;
        window.FB.api('/me?fields=hometown,name', function (response) {
            console.log(response);
            _this.user.fbId = response.id;
            _this.user.name = response.name;
            if (response.hometown.name.indexOf("India") > -1) {
                _this.user.citizen = "Indian";
            }
            else if (response.hometown.name.indexOf("Pakistan") > -1) {
                _this.user.citizen = "Pakistani";
            }
            if (callback) {
                callback(_this.user);
            }
        });
    };
    FaceBook.prototype.uploadPhoto = function (data) {
        console.log("Image length:" + data.length);
        var progress = document.getElementById('progress');
        progress.style.display = "block";
        var fd = new FormData();
        fd.append("fbid", this.user.fbId);
        fd.append("imageData", data);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "script/upload-photo.php", true);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percentComplete = Math.round((e.loaded / e.total) * 100);
                console.log(percentComplete + '% uploaded');
                progress.innerHTML = percentComplete + "% Uploaded";
            }
        };
        xhr.onload = function () {
            if (this.status == 200) {
                var result = JSON.parse(this.response);
                if (result.success) {
                    progress.innerHTML = "Navigating to FB";
                    window.top.location.href = result.url;
                }
                else {
                    progress.innerHTML = "Error uploading photo";
                }
            }
        };
        xhr.send(fd);
    };
    return FaceBook;
})();
window.checkLoginState = function () {
    FaceBook.api.checkLoginState();
};
//# sourceMappingURL=FaceBook.js.map