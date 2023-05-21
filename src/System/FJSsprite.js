class FJSsprite {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    crashWith(sprite){
        return !(
            (this.y + this.height < sprite.y) ||
            (this.y > sprite.y + sprite.height) ||
            (this.x + this.width < sprite.x) ||
            (this.x > sprite.x + sprite.width)
        );
    }
}