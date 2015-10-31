var Proxy = (function () {
    function Proxy() {
    }
    Proxy.prototype.getProfilePhoto = function (callback) {
        var img = new Image();
        img.src = "script/profile-photo.php";
        img.onload = function () {
            if (callback) {
                callback(img);
            }
        };
    };
    return Proxy;
})();
//# sourceMappingURL=Proxy.js.map