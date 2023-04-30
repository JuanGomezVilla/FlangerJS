class FJSselect {
    constructor(data){
        //super(data.x, data.y, data.draw, data.onHover, data.onPressed, data.onClick);
        this.x = data.x;
        this.y = data.y;
        this.drawMethod = data.draw;
        this.width = data.width;
        this.height = data.height;
        this.items = data.items;

        this.focus = true;
        
    }

    update(){
        if(FJSscreen.mouse.click){
            this.focus = !this.focus;
        }
    }

    draw(){
        if(this.focus){
            let itemsLength = this.items.length;
            for(let i=0; i<itemsLength; i++){
                this.drawMethod(this.items[i], i);
            }
        } else {
            this.drawMethod(this.items[0], 0);
        }
        
    }
}