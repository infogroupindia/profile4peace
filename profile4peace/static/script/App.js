///<reference path="FaceBook.ts" />
var App = (function () {
    function App() {
        FaceBook.api = new FaceBook(this.onInit);
    }
    App.prototype.onInit = function () {
        FaceBook.api.fetchProfilePic(this.onImageReady);
        FaceBook.api.fetchUserInfo(this.onUserInfoReady);
    };
    App.prototype.onImageReady = function (img) {
    };
    App.prototype.onUserInfoReady = function (user) {
    };
    return App;
})();
//# sourceMappingURL=App.js.map