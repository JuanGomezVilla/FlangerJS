/**
 * Class to create controllers that respond to user actions, eg hover,
 * click. The class provides the methods common to all types of controllers.
 * Therefore, it is important to mention that the objects like checkboxes,
 * buttons, etc., extend this class.
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJScontroller
 * @license MIT
 */
class FJScontroller {
    /**
     * **Constructor**
     * 
     * Receives in order the elementary parameters: coordinates and dimensions.
     * Use the _super_ command for when extending from another class. To avoid
     * errors, parameters do not contain default values.
     * @param {number} x Coordinates on the X axis
     * @param {number} y Coordinates on the Y axis
     * @param {number} width Width in pixels
     * @param {number} height Height in pixels
     */
    constructor(x, y, width, height){
        /**
         * Coordinates on the X axis
         * @type {number}
         * @public
         */
        this.x = x;

        /**
         * Coordinates on the Y axis
         * @type {number}
         * @public
         */
        this.y = y;

        /**
         * Width in pixels
         * @type {number}
         * @public
         */
        this.width = width;

        /**
         * Height in pixels
         * @type {number}
         * @public
         */
        this.height = height;
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