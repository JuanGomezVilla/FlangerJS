/**
 * Class to create controllers that respond to user actions, eg hover,
 * click. The class provides the methods common to all types of controllers.
 * Therefore, it is important to mention that the objects like checkboxes,
 * buttons, etc., extend this class.
 * @author JuanGV
 * @version 1.0.0
 * @name FJScontroller
 * @license MIT
 */
class FJScontroller {
    /**
     * Function to draw by default
     * @private
     */
    #drawMethod;

    /**
     * Function to perform when the mouse rests on the button
     * @private
     */
    #onHover;

    /**
     * Function to perform when the mouse is pressing the button
     * @private
     */
    #onPressed;
    
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
     * @param {function} draw Function to draw by default
     * @param {function} onHover Function when mouse hover object
     * @param {function} onPressed Function when mouse press object
     * @param {function} onClick Function when mouse click the object
     * @param {boolean} cursorPointer Boolean indicating whether to use the cursor pointer style
     * @param {boolean} disabled Sets the enabled state of the button
     * @constructor
     */
    constructor(x, y, draw, onHover, onPressed, onClick, cursorPointer = false, disabled = false){
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
         * Object disabled state
         * @type {boolean}
         * @public
         */
        this.disabled = disabled;

        //Cursor style if hovered and object is enabled
        this.useCursorPointer = cursorPointer;
        

        //Set the private attributes
        this.#drawMethod = draw || function(){};
        this.#onHover = onHover || this.#drawMethod;
        this.#onPressed = onPressed || (this.#onHover || this.#drawMethod);

        /**
         * Call this function for when you want to click on
         * the button without the need for the user to do it
         * @public
         */
        this.click = onClick || function(){};
    }

    /**
     * **Draw object**
     * 
     * Method to draw the button on the canvas, will execute the function
     * that the user passed to it in the constructor. This method avoids
     * that two layers are superimposed on each other, giving rise to shapes
     * pixelated or not smooth.
     * @returns {void}
     * @function
     * @public
     */
    draw(){
        //When the mouse is over the object and is not disabled
        if(this.hover() && !this.disabled){
            //Tells the main class that an object is being hovered over
            FJSscreen.mouse.hoveringElement = this.useCursorPointer;
            //If the mouse is being pressed, execute onPressed, otherwise onHover
            if(FJSscreen.mouse.pressed) this.#onPressed();
            else this.#onHover();
        } else {
            //If no hover is performed, draw the object
            this.#drawMethod();
        }
    }

    /**
     * **Update object**
     * 
     * Method to check clicks on the button. In case the mouse is hovering
     * and a click is detected, the onClick method is executed. Important
     * to mention that when clicking on the object, the click will be
     * automatically cancelled
     * @returns {void}
     * @function
     * @public
     */
    update(){
        //When the mouse is clicking, it is over the object and the object is not disabled
        if(this.hover() && FJSscreen.mouse.click && !this.disabled){
            //Execute function click
            this.click();
            //Cancel the click
            FJSscreen.cancelClick();
        }
    }

    /**
     * **Hover**
     * 
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
     * **Enabled**
     * 
     * Returns whether the object is enabled or not, returns the
     * opposite value of the original disabled attribute
     * @returns {boolean} True if not disabled, false otherwise
     * @function
     * @public
     */
    get enabled(){
        //Returns the opposite value of the original attribute
        return !this.disabled;
    }

    /**
     * **Enabled**
     * 
     * Sets if the object is enabled or not, sets the value opposite
     * of the parameter passed over to the original, which is disabled
     * @returns {void}
     * @function
     * @public
     */
    set enabled(enabled){
        //Sets the value to the opposite of the one passed by parameter
        this.disabled = !enabled;
    }
}