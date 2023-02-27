/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. If you want to
 * create a more path button, use FJSbuttonPath
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSbutton
 * @license MIT
 * @extends {FJScontroller}
 */
class FJSbutton extends FJScontroller {
    /**
     * **Constructor**
     * 
     * Constructor of the object. Receive initial features
     * and the processing methods for user actions.
     * @param {array} data x, y, width, height, draw, onHover, onClick, onPressed
     */
    constructor(data){
        //Super to pass the data to the parent constructor
        super(data.x, data.y, data.draw, data.onHover, data.onPressed, data.onClick);

        //Set the private attributes
        /**
         * Width in pixels
         * @type {number}
         * @public
         */
        this.width = data.width;

        /**
         * Height in pixels
         * @type {number}
         * @public
         */
        this.height = data.height;
    }

    /**
     * Function used to check if the mouse is hovering over the object
     * @returns {boolean} Boolean indicating if the mouse is sitting on the object
     * @public
     */
    hover(){
        //Returns true when none of the conditions are met
        return !(
            (this.y + (this.height) < FJSscreen.mouse.y) ||
            (this.y > FJSscreen.mouse.y) ||
            (this.x + (this.width) < FJSscreen.mouse.x) ||
            (this.x > FJSscreen.mouse.x)
        );
    }

    /**
     * Returns the width of the object
     * @returns {number} Width in pixels
     * @public
     */
    getWidth(){
        //Attribute return
        return this.width;
    }

    /**
     * Returns the height of the object
     * @returns {number} Height in pixels
     * @public
     */
    getHeight(){
        //Attribute return
        return this.height;
    }

    /**
     * Method to change the width of the object, there is no default value
     * @param {number} width Width in pixels
     * @public
     */
    setWidth(width){
        //The attribute receives a new value
        this.width = width;
    }

    /**
     * Method to change the height of the object, there is no default value
     * @param {number} height Height in pixels
     * @public
     */
    setHeight(height){
        //The attribute receives a new value
        this.height = height;
    }
}