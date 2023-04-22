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
     * @param {function} draw Function to draw by default
     * @param {function} onHover Function when mouse hover object
     * @param {function} onPressed Function when mouse press object
     * @param {function} onClick Function when mouse click the object
     */
    constructor(x, y, draw, onHover, onPressed, onClick){
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
     * Method to draw the button on the canvas, will execute the function
     * that the user passed to it in the constructor. This method avoids
     * that two layers are superimposed on each other, giving rise to shapes
     * pixelated or not smooth.
     * @public
     */
    draw(){
        //When the mouse is over the object
        if(this.hover()){
            //Tells the main class that an object is being hovered over
            FJSscreen.mouseHoveringElement = true;
            //If the mouse is being pressed, execute onPressed, otherwise onHover
            if(FJSscreen.mouse.pressed) this.#onPressed();
            else this.#onHover();
        } else {
            //If no hover is performed, draw the object
            this.#drawMethod();
        }
    }

    /**
     * Method to check clicks on the button. In case the mouse is hovering
     * and a click is detected, the onClick method is executed. Important
     * to mention that when clicking on the object, the click will be
     * automatically cancelled.
     * @public
     */
    update(){
        if(this.hover() && FJSscreen.mouse.click){
            //Execute function click
            this.click();
            //Cancel the click
            FJSscreen.cancelClick();
        }
    }
}