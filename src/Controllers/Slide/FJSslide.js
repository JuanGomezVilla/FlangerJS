class FJSslide {
    constructor(data){
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.drawMethod = data.draw;

        this.xBox = this.x;
        this.yBox = this.y;
        this.widthBox = data.widthBox;
        this.heightBox = data.heightBox;
    }

    update(){
        if(FJSscreen.mouse.pressed && this.hover()){
            let mouseX = FJSscreen.mouse.x;
            if(mouseX > this.x && mouseX < this.x + this.width){
                this.xBox =  mouseX;
            }
            
            
        }
    }

    hover(){
        return !(
            (this.y + (this.height) < FJSscreen.mouse.y) ||
            (this.y > FJSscreen.mouse.y) ||
            (this.x + (this.width) < FJSscreen.mouse.x) ||
            (this.x > FJSscreen.mouse.x)
        );
    }

    draw(){
        this.drawMethod();

        ctx.fillStyle = "white";
        ctx.fillRect(this.xBox, this.yBox - 10, 20, 20);
    }

    get value(){

    }


}