/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. If you want to
 * create a more complex button, extend FJSbuttonComplex.
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSbutton
 * @license MIT
 * @extends {FJScontroller}
 */
class FJSbutton extends FJScontroller {
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
     * Constructor of the object. Receive initial features
     * and the processing methods for user actions.
     * @param {array} data x, y, width, height, onHover, onClick, onPressed
     */
    constructor(data){
        //Super to pass the data to the parent constructor
        super(data.x, data.y, data.width, data.height);

        //Set the private attributes
        this.#drawMethod = data.draw;
        this.#onHover = data.onHover || function(){};
        this.#onPressed = data.onPressed || function(){};

        /**
         * Call this function for when you want to click on
         * the button without the need for the user to do it
         * @public
         */
        this.click = data.onClick || function(){};
    }

    /**
     * Method to draw the button on the canvas, will execute the function
     * that the user passed to it in the constructor.
     * @public
     */
    draw(){
        //Draw the button
        this.#drawMethod();
        //When the mouse is hovering over the button, execute onHover
        if(this.hover()) this.#onHover();
        //When hovering is done and mouse pressure is detected, run onPressed
        if(this.hover() && FJSscreen.mouse.pressed) this.#onPressed();
    }

    /**
     * Method to check clicks on the button. In case the mouse is hovering
     * and a click is detected, the onClick method is executed. Important
     * to mention that when clicking on the object, the click will be
     * automatically cancelled.
     * @public
     */
    update(){
        //If there is hover over the object and a click is being performed
        if(this.hover() && FJSscreen.mouse.click){
            //Execute function click
            this.click();
            //Cancel the click
            FJSscreen.cancelClick();
        }
    }
}