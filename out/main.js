var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("app");
    var context2D = canvas.getContext("2d");
    var stage = new DisplayObjectContainer();
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 100);
    //文字
    var name = new TextField();
    name.x = 70;
    name.y = 70;
    name.text = "Jasper";
    name.color = "#000000";
    name.size = 50;
    name.alpha = 0.2;
    //图片
    var image = document.createElement("img");
    image.src = "avater.jpg";
    image.onload = function () {
        var avater = new Bitmap();
        avater.image = image;
        avater.width = 300;
        avater.height = 300;
        avater.alpha = 0.8;
        stage.addChild(avater);
        stage.addChild(name);
    };
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
    }
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.array = [];
    }
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (displayObject) {
        this.array.push(displayObject);
    };
    return DisplayObjectContainer;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.draw = function (context2D) {
        context2D.globalAlpha = this.alpha;
        context2D.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    return Bitmap;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
        this.color = "";
        this.size = 40;
        this.font = "Arial";
    }
    TextField.prototype.draw = function (context2D) {
        context2D.globalAlpha = this.alpha;
        context2D.fillStyle = this.color;
        context2D.font = this.size + "px" + " " + this.font;
        context2D.fillText(this.text, this.x, this.y);
    };
    return TextField;
}(DisplayObject));
//# sourceMappingURL=main.js.map