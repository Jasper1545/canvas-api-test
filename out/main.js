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
    var shape = new Shape();
    shape.graphics.beginFill("#000000");
    shape.graphics.drawCircle(30, 30, 30);
    shape.graphics.drawRect(50, 50, 100, 50);
    shape.graphics.endFill();
    /*
        var rect = new Shape();
        rect.graphics.beginFill("#000000");
        rect.graphics.drawRect(50,50,100,50);
        rect.graphics.endFill();
    */
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
        stage.addChild(shape);
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
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.call(this);
        this.graphics = new Graphics();
    }
    Shape.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.graphics.shapeInfo; _i < _a.length; _i++) {
            var info = _a[_i];
            context2D.fillStyle = this.graphics.color;
            context2D.globalAlpha = info.alpha;
            switch (info.type) {
                case ShapeType.LINE:
                    break;
                case ShapeType.RECT:
                    context2D.fillRect(info.x, info.y, info.width, info.height);
                    break;
                case ShapeType.CIRCLE:
                    context2D.beginPath();
                    context2D.arc(info.x, info.y, info.radius, 0, Math.PI * 2, true);
                    context2D.closePath();
                    context2D.fill();
                    break;
            }
        }
    };
    return Shape;
}(DisplayObject));
var ShapeType = {
    LINE: 0,
    RECT: 1,
    CIRCLE: 2
};
var Graphics = (function () {
    function Graphics() {
        this.color = "";
        this.shapeInfo = [];
    }
    Graphics.prototype.beginFill = function (color) {
        this.color = color;
    };
    Graphics.prototype.endFill = function () {
    };
    Graphics.prototype.drawCircle = function (x, y, radius) {
        this.shapeInfo.push(new CircleInfo(x, y, radius));
    };
    Graphics.prototype.drawRect = function (x, y, width, height) {
        this.shapeInfo.push(new RectInfo(x, y, width, height));
    };
    Graphics.prototype.lineTo = function (x, y) {
    };
    return Graphics;
}());
var ShapeInfo = (function () {
    function ShapeInfo() {
        this.alpha = 1;
    }
    return ShapeInfo;
}());
var CircleInfo = (function (_super) {
    __extends(CircleInfo, _super);
    function CircleInfo(x, y, radius) {
        _super.call(this);
        this.type = ShapeType.CIRCLE;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    return CircleInfo;
}(ShapeInfo));
var RectInfo = (function (_super) {
    __extends(RectInfo, _super);
    function RectInfo(x, y, width, height) {
        _super.call(this);
        this.type = ShapeType.RECT;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return RectInfo;
}(ShapeInfo));
var LineInfo = (function (_super) {
    __extends(LineInfo, _super);
    function LineInfo() {
        _super.apply(this, arguments);
        this.type = ShapeType.LINE;
    }
    return LineInfo;
}(ShapeInfo));
//# sourceMappingURL=main.js.map