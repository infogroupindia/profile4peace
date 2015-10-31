///<reference path="Proxy.ts" />
///<reference path="FaceBook.ts" />
var App = (function () {
    function App() {
        this.invert = {
            "Indian": "Pakistanis",
            "Pakistani": "Indians"
        };
        this.loginBtn = document.getElementById('peaceBtn');
        var self = this;
        FaceBook.api = new FaceBook(function () {
            self.onInit();
        });
        this.startApp();
    }
    App.prototype.onInit = function () {
        console.log("App Inited");
        var self = this;
        this.activateProxy(function () {
            var img = new Image();
            img.src = "script/profile-photo.php?mode=preview";
            img.onload = function () {
                self.onImageReady(img);
            };
            FaceBook.api.fetchUserInfo(function (user) {
                self.onUserInfoReady(user);
            });
            self.loginBtn.innerHTML = "Make Peace";
            self.loginBtn.onclick = function () {
                if (self.busy) {
                    return;
                }
                self.busy = true;
                self.loginBtn.innerHTML = "Please wait";
                self.loadHDImage();
            };
        });
    };
    App.prototype.startApp = function () {
        if (!this.ctx) {
            this.canvas = document.getElementById("image-canvas");
            this.ctx = this.canvas.getContext("2d");
            console.log(this.ctx);
            this.drawText();
        }
    };
    App.prototype.loadHDImage = function () {
        var _this = this;
        this.canvasHD = document.createElement("canvas");
        this.canvasHD.width = 1024;
        this.canvasHD.height = 1024;
        var hdctx = this.canvasHD.getContext("2d");
        var img = new Image();
        img.src = "script/profile-photo.php?mode=HD";
        img.onload = function () {
            hdctx.drawImage(img, 0, 0, 1024, 1024);
            _this.drawTextHD(hdctx);
            FaceBook.api.uploadPhoto(_this.canvasHD.toDataURL());
        };
    };
    App.prototype.activateProxy = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            callback();
        });
        xhr.open("GET", "script/set-session.php?accessToken=" + FaceBook.api.accessToken);
        xhr.send();
    };
    App.prototype.onImageReady = function (img) {
        this.img = img;
        this.displayImage(img);
        if (this.callLater) {
            this.drawText();
            this.callLater = false;
        }
    };
    App.prototype.onUserInfoReady = function (user) {
        this.user = user;
        if (!this.img) {
            this.callLater = true;
        }
        else {
            this.drawText();
        }
    };
    App.prototype.displayImage = function (img) {
        if (!this.ctx) {
            this.startApp();
        }
        this.ctx.drawImage(img, 0, 0, 256, 256);
        this.drawText();
    };
    App.prototype.drawWait = function () {
        var y = 50;
        this.ctx.fillStyle = "rgba(255,244,175,0.8)";
        this.ctx.fillRect(0, y - 20, 256, 40);
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "italic 1em Ubuntu";
        this.ctx.fillText("Please wait...", 85, y + 25);
    };
    App.prototype.drawText = function () {
        var y = 185;
        var pad = 20;
        var gap = 15;
        if (!this.user) {
            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y, 256, 256 - y);
            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("Login with FB", 82, y + 45);
        }
        else {
            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y, 256, 256 - y);
            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("I'm an " + this.user.citizen, 5, y + pad);
            this.ctx.fillText("I don't hate " + this.invert[this.user.citizen], 5, y + pad + gap);
            this.ctx.fillText("I'm not alone", 5, y + pad + gap + gap);
            this.ctx.fillText("There are many people like me", 5, y + pad + gap + gap + gap);
        }
    };
    App.prototype.drawTextHD = function (ctx) {
        var y = 740;
        var pad = 70;
        var gap = 60;
        ctx.fillStyle = "rgba(255,244,175, 0.8)";
        ctx.fillRect(0, y, 1024, 1024 - y);
        ctx.fillStyle = "#000000";
        ctx.font = "italic 5em Ubuntu";
        if (this.user) {
            ctx.fillText("I'm an " + this.user.citizen, 30, y + pad);
            ctx.fillText("I don't hate " + this.invert[this.user.citizen], 30, y + pad + gap);
            ctx.fillText("I'm not alone", 30, y + pad + gap + gap);
            ctx.fillText("There are many people like me", 30, y + pad + gap + gap + gap);
        }
    };
    return App;
})();
//# sourceMappingURL=App.js.map