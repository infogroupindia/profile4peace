///<reference path="FaceBook.ts" />
class App{

    constructor(){

        FaceBook.api = new FaceBook(this.onInit);
    }
    onInit(){
        FaceBook.api.fetchProfilePic(this.onImageReady);
        FaceBook.api.fetchUserInfo(this.onUserInfoReady);
    }
    onImageReady(img){

    }
    onUserInfoReady(user){

    }
}