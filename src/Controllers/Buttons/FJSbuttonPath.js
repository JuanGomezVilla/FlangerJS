/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. Allows you to
 * create buttons from paths, we are currently trying to implement a
 * coordinate movement
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSbuttonPath
 * @license MIT
 * @extends {FJScontroller}
 */
class FJSbuttonPath extends FJScontroller {

    constructor(data){
        super(data.x, data.y, data.draw, data.onHover, data.onPressed, data.onClick);
        this.path = data.path();
    }

    hover(){
        return ctx.isPointInPath(this.path, FJSscreen.mouse.x, FJSscreen.mouse.y);
    }
}