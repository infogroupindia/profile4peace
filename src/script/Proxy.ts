class Proxy {

    constructor() {

    }

    getProfilePhoto(callback:Function) {
        var img = new Image();
        img.src = "script/profile-photo.php";
        img.onload = function () {
            if (callback) {
                callback(img);
            }
        }
    }
}