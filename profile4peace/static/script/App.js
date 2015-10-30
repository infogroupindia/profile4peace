///<reference path="FaceBook.ts" />
var App = (function () {
    function App() {
        this.invert = {
            "Indian": "Pakistanis",
            "Pakistani": "Indians"
        };
        FaceBook.api = new FaceBook(this.onInit);
    }
    App.prototype.onInit = function () {
        var _this = this;
        console.log("App Inited");
        FaceBook.api.fetchProfilePic(function (img) {
            _this.onImageReady(img);
        });
        FaceBook.api.fetchUserInfo(function (user) {
            _this.onUserInfoReady(user);
        });
    };
    App.prototype.startApp = function () {
        if (!this.ctx) {
            var canvas = document.getElementById("image-canvas");
            this.ctx = canvas.getContext("2d");
            console.log(this.ctx);
            this.drawText();
        }
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
    App.prototype.drawText = function () {
        var y = 205;
        if (!this.user) {
            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y - 20, 256, 256 + 20 - y);
            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("Please wait...", 85, y + 25);
        }
        else {
            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y - 20, 256, 256 + 20 - y);
            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("I'm an " + this.user.citizen, 5, y);
            this.ctx.fillText("I don't hate " + this.invert[this.user.citizen], 5, y + 15);
            this.ctx.fillText("I'm not alone", 5, y + 30);
            this.ctx.fillText("There are many people like me", 5, y + 45);
        }
    };
    return App;
})();
//# sourceMappingURL=App.js.map