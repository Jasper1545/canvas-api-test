window.onload = () => {

    var canvas = document.getElementById("app") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");


    var stage = new DisplayObjectContainer();

    setInterval(() => {
        
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);

    }, 100)


    //文字
    var name = new TextField();
    name.x = 70;
    name.y = 70;
    name.text = "Jasper";
    name.color = "#000000";
    name.size = 100;
    name.alpha = 0.2;

    var shape = new Shape();
    shape.graphics.beginFill("#000000");

    shape.graphics.moveTo(200,200);
    shape.graphics.lineTo(100,100);
    shape.graphics.lineTo(0,200);

    shape.graphics.drawCircle(30,30,30);
    shape.graphics.drawRect(50,50,100,50);

    shape.graphics.moveTo(0,0);
    shape.graphics.lineTo(100,100);
    shape.graphics.lineTo(200,0);

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

    image.onload = () => {

        var avater = new Bitmap();
        avater.image = image;
        avater.width = 300;
        avater.height = 300;
        avater.alpha = 0.8;

        stage.addChild(avater);
        stage.addChild(name);
        stage.addChild(shape);

    }

}

interface Drawable {
    
    draw(context2D:CanvasRenderingContext2D);

}

class DisplayObject implements Drawable {

    x:number = 0;
    y:number = 0;
    alpha:number = 1;

    draw(context2D:CanvasRenderingContext2D) {


    }
}

class DisplayObjectContainer implements Drawable {
    
    array:Drawable[] = [];
    
    draw(context2D:CanvasRenderingContext2D) {

        for (let drawable of this.array) {

            drawable.draw(context2D);
        }
    }

    addChild(displayObject:DisplayObject){

        this.array.push(displayObject);

    }
}

class Bitmap extends DisplayObject {
    
    image:HTMLImageElement;
    width:number;
    height:number;

    draw(context2D:CanvasRenderingContext2D) {
        context2D.globalAlpha = this.alpha;
        context2D.drawImage(this.image,this.x,this.y,this.width,this.height);
        
    }
}

class TextField extends DisplayObject {
    
    text:string = "";
    color:string = "";
    size:number = 40;
    font:string = "Arial";

    draw(context2D:CanvasRenderingContext2D) {
        
        context2D.globalAlpha = this.alpha;
        context2D.fillStyle = this.color;
        context2D.font = this.size +"px" + " " + this.font;
        context2D.fillText(this.text,this.x,this.y);
    }

}

class Shape extends DisplayObject {

    graphics = new Graphics();
    
    public constructor() {
        super();
    }

    draw(context2D:CanvasRenderingContext2D) {
        
        for(let info of this.graphics.shapeInfo){
            context2D.fillStyle = this.graphics.color;
            context2D.globalAlpha = info.alpha;

            switch(info.type) {

                case ShapeType.LINE:
                    context2D.moveTo(info.x,info.y);
                    context2D.lineTo(info.endx,info.endy);
                    context2D.stroke();
                    break;

                case ShapeType.RECT:
                    context2D.fillRect(info.x,info.y,info.width,info.height);
                    break;
                
                case ShapeType.CIRCLE:
                    context2D.beginPath();
                    context2D.arc(info.x,info.y,info.radius,0,Math.PI*2,true);
                    context2D.closePath();
                    context2D.fill();
                    break;

            }
        }
        
        
    }

    

}

var ShapeType = {

    LINE:0,
    RECT:1,
    CIRCLE:2
 
}

class Graphics {

    _x:number;
    _y:number;

    color:string = "";
    shapeInfo:ShapeInfo[] = [];

    public beginFill(color:string) {
        this.color = color;
    }

    public endFill() {

    }

    public drawCircle(x:number,y:number,radius:number) {

        this.shapeInfo.push(new CircleInfo(x,y,radius));
    }

    public drawRect(x:number,y:number,width:number,height:number) {

        this.shapeInfo.push(new RectInfo(x,y,width,height));
    }

    public lineTo(x:number,y:number) {
        this.shapeInfo.push(new LineInfo(this._x,this._y,x,y));
        this._x = x;
        this._y = y;
    }

    public moveTo(x:number,y:number) {
        this._x = x;
        this._y = y;
    }


}

class ShapeInfo {
    type:number;
    x:number;
    y:number;
    alpha:number = 1;
    
    radius:number;
    width:number;
    height:number;
       
    endx:number;
    endy:number;
}

class CircleInfo extends ShapeInfo {
    type = ShapeType.CIRCLE;

    public constructor(x:number,y:number,radius:number) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

}

class RectInfo extends ShapeInfo {
    type = ShapeType.RECT;

    public constructor(x:number,y:number,width:number,height:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


}

class LineInfo extends ShapeInfo {
    type = ShapeType.LINE;

    public constructor(_x:number,_y:number,x:number,y:number) {
        super();
        this.x = _x;
        this.y = _y;
        this.endx = x;
        this.endy = y;
      
    }
 
}









