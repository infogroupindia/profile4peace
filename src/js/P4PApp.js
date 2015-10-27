/**
 * Created by Nidin Vinayakan on 26-10-2015.
 */
var ctx, textImg;
var invert = {
    "Indian":"Pakistani",
    "Pakistani":"Indian"
};
function startApp() {
    if (!ctx) {
        var canvas = document.getElementById("image-canvas");
        ctx = canvas.getContext("2d");
        console.log(ctx);

        drawText();

        /*        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
         '<foreignObject width="100%" height="100%">' +
         '<div style="display: inline;padding: 0;bottom: -142px;left: 7px;position: relative;font-family: \'Ubuntu\', sans-serif;background: rgba(255,244,175,0.88);box-shadow: 5px 0 0 rgba(255,244,175,0.88), -5px 0 0 rgba(255,244,175,0.88);">' +
         'I\'m an Indian\n' +
         'I am from Kochi\n' +
         'I don\'t hate Pakistan\n' +
         'I\'m not alone\n' +
         'There are many people\n' +
         'Like me.' +
         '</div>' +
         '</foreignObject>' +
         '</svg>';

         var DOMURL = window.URL || window.webkitURL || window;

         textImg = new Image();
         var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
         var url = DOMURL.createObjectURL(svg);

         textImg.onload = function () {
         ctx.drawImage(textImg, 0, 0, 256, 256);
         DOMURL.revokeObjectURL(url);
         };

         textImg.src = url;*/
    }
}
function displayImage(img) {
    if (!ctx) {
        startApp();
    }
    ctx.drawImage(img, 0, 0, 256, 256);
    drawText();
}
function drawText(){
    var y = 205;

    if(!citizen){
        ctx.fillStyle = "rgba(255,244,175,0.8)";
        ctx.fillRect(0, y-20, 256, 256  + 20 - y);

        ctx.fillStyle = "#000000";
        ctx.font = "italic 1em Ubuntu";
        ctx.fillText("Please wait...", 5, y);
    }else{
        ctx.fillStyle = "rgba(255,244,175,0.8)";
        ctx.fillRect(0, y-20, 256, 256  + 20 - y);

        ctx.fillStyle = "#000000";
        ctx.font = "italic 1em Ubuntu";
        ctx.fillText("I'm an "+citizen, 5, y);
        ctx.fillText("I don't hate "+invert[citizen], 5, y + 15);
        ctx.fillText("I'm not alone", 5, y + 30);
        ctx.fillText("There are many people like me", 5, y + 45);
    }
}