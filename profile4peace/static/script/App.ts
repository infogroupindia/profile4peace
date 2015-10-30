///<reference path="FaceBook.ts" />
class App{

    ctx:CanvasRenderingContext2D;
    user:any;
    invert = {
        "Indian": "Pakistanis",
        "Pakistani": "Indians"
    };

    constructor(){

        FaceBook.api = new FaceBook(this.onInit);
    }
    onInit(){
        console.log("App Inited");
        FaceBook.api.fetchProfilePic(this.onImageReady);
        FaceBook.api.fetchUserInfo(this.onUserInfoReady);
    }
    startApp() {
        if (!this.ctx) {
            var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("image-canvas");
            this.ctx = canvas.getContext("2d");
            console.log(this.ctx);

            this.drawText();
        }
    }
    onImageReady(img){

    }
    onUserInfoReady(user){

    }
    displayImage(img) {
        if (!this.ctx) {
            this.startApp();
        }
        this.ctx.drawImage(img, 0, 0, 256, 256);
        this.drawText();
    }
    drawText() {
        var y = 205;

        if (!this.user) {

            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y - 20, 256, 256 + 20 - y);

            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("Please wait...", 85, y+25);

        } else {

            this.ctx.fillStyle = "rgba(255,244,175,0.8)";
            this.ctx.fillRect(0, y - 20, 256, 256 + 20 - y);

            this.ctx.fillStyle = "#000000";
            this.ctx.font = "italic 1em Ubuntu";
            this.ctx.fillText("I'm an " + this.user.citizen, 5, y);
            this.ctx.fillText("I don't hate " + this.invert[this.user.citizen], 5, y + 15);
            this.ctx.fillText("I'm not alone", 5, y + 30);
            this.ctx.fillText("There are many people like me", 5, y + 45);

        }
    }
}