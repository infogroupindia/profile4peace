///<reference path="FaceBook.ts" />
class App{

    ctx:CanvasRenderingContext2D;
    callLater:boolean;
    user:any;
    img:any;
    loginBtn:any;
    invert = {
        "Indian": "Pakistanis",
        "Pakistani": "Indians"
    };

    constructor(){
        this.loginBtn = document.getElementById('peaceBtn');
        FaceBook.api = new FaceBook(this.onInit);
    }

    onInit(){

        console.log("App Inited");

        this.loginBtn.innerHTML = "Make Peace";
        this.loginBtn.onclick = () => {
            FaceBook.api.uploadPhoto(this.ctx.getImageData(0,0,256,256));
        };

        FaceBook.api.fetchProfilePic((img) => {this.onImageReady(img)});
        FaceBook.api.fetchUserInfo((user) => {this.onUserInfoReady(user)});
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
        this.img = img;
        this.displayImage(img);
        if(this.callLater){
            this.drawText();
            this.callLater = false;
        }
    }
    onUserInfoReady(user){
        this.user = user;
        if(!this.img){
            this.callLater = true;
        }else{
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