class FJSsprite {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get getWidth(){
        return this.width;
    }

    get getHeight(){
        return this.height;
    }

    set setWidth(width = 0){
        this.width = width;
    }

    set setHeight(height = 0){
        this.height = height;
    }

    crashWith(sprite){
        
    }
}