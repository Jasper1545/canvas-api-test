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
    name.size = 50;
    name.alpha = 0.2;
    
    
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







