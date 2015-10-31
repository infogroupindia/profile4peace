///<reference path="Proxy.ts" />
///<reference path="FaceBook.ts" />
class App {

    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    canvasHD:HTMLCanvasElement;
    callLater:boolean;
    busy:boolean;
    user:any;
    img:any;
    loginBtn:any;
    proxy:Proxy;
    invert = {
        "Indian": "Pakistanis",
        "Pakistani": "Indians"
    };

    constructor() {
        this.loginBtn = document.getElementById('peaceBtn');
        var self = this;
        FaceBook.api = new FaceBook(() => {
            self.onInit();
        });
        this.startApp();
    }

    onInit() {

        console.log("App Inited");
        var self = this;
        this.activateProxy(function () {
            var img = new Image();
            img.src = "script/profile-photo.php?mode=preview";
            img.onload = () => {
                self.onImageReady(img);
            };

            FaceBook.api.fetchUserInfo((user) => {
                self.onUserInfoReady(user)
            });


            self.loginBtn.innerHTML = "Make Peace";
            self.loginBtn.onclick = () => {
                if (self.busy) {
                    return;
                }
                self.busy = true;
                self.loginBtn.innerHTML = "Please wait";
                self.loadHDImage();
            };

        });
    }

    startApp() {
        if (!this.ctx) {
            this.canvas = <HTMLCanvasElement>document.getElementById("image-canvas");
            this.ctx = this.canvas.getContext("2d");
            console.log(this.ctx);

            this.drawText();
        }
    }

    loadHDImage() {
        this.canvasHD = document.createElement("canvas");
        this.canvasHD.width = 1024;
        this.canvasHD.height = 1024;
        var hdctx = this.canvasHD.getContext("2d");
        var img = new Image();
        img.src = "script/profile-photo.php?mode=HD";
        img.onload = () => {
            hdctx.drawImage(img, 0, 0, 1024, 1024);
            this.drawTextHD(hdctx);
            FaceBook.api.uploadPhoto(this.canvasHD.toDataURL());
        };
    }

    activateProxy(callback:Function) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            callback();
        });
        xhr.open("GET", "script/set-session.php?accessToken=" + FaceBook.api.accessToken);
        xhr.send();
    }

    onImageReady(img) {
        this.img = img;
        this.displayImage(img);
        if (this.callLater) {
            this.drawText();
            this.callLater = false;
        }
    }

    onUserInfoReady(user) {
        this.user = user;
        if (!this.img) {
            this.callLater = true;
        } else {
            this.drawText();
        }
    }

    displayImage(img) {
        if (!this.ctx) {
            this.startApp();
        }
        this.ctx.drawImage(img, 0, 0, 256, 256);
        this.drawText();
    }

    drawWait() {
        var y = 50;
        this.ctx.fillStyle = "rgba(255,244,175,0.8)";
        this.ctx.fillRect(0, y - 20, 256, 40);

        this.ctx.fillStyle = "#000000";
        this.ctx.font = "italic 1em Ubuntu";
        this.ctx.fillText("Please wait...", 85, y + 25);
    }

    drawText() {
        var y = 185;
        var pad = 20;
        var gap = 15;

        if (!this.user) {

            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y, 256, 256 - y);

            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("Login with FB", 82, y + 45);

        } else {

            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y, 256, 256 - y);

            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("I'm an " + this.user.citizen, 5, y + pad);
            this.ctx.fillText("I don't hate " + this.invert[this.user.citizen], 5, y + pad + gap);
            this.ctx.fillText("I'm not alone", 5, y + pad + gap + gap);
            this.ctx.fillText("There are many people like me", 5, y + pad + gap + gap + gap);

        }
    }

    drawTextHD(ctx) {
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
    }
}