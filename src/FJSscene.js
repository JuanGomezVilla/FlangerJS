/**
 * **Scene**
 * 
 * This class creates scenes. User must define a method with update parameters.
 * The other methods are optional.
 * @author JuanGV
 * @version 1.0.0
 * @name FJSscene
 * @license MIT
 */
class FJSscene {
    /**
     * Graphics update function
     * @private
     */
    #updateMethod;

    /**
     * **Constructor**
     * 
     * Method to build the scene. When creating the scene it does not start,
     * you will have to use the indicated method for this. can be specified
     * a pause variable, a start variable, and mandatory, an update method
     * @param {array} data update, onInit (optional), pause (optional)
     * @constructor
     */
    constructor(data){
        //Pause state, defaults to false
        this.pause = data.pause || false;
        //Function to be executed when the scene starts, before the update
        this.onInit = data.onInit || function(){};
        //Saves the update value of the scene
        this.#updateMethod = data.update;
        //Specifies the current time
        this.then = Date.now();
    }

    /**
     * **Starts the scene**
     * 
     * The scene is not started when it is created, so this function
     * must be called to start the process. First it will throw an
     * init function, then the scene will start
     * @returns {void}
     * @function
     * @public
     */
    init(){
        //Upload function before update
        this.onInit();
        //Start the update
        this.#update();
    }

    togglePause(){
        this.pause = !this.pause
    }

    /**
     * **Updates the scene**
     * 
     * Update function. It is private, and cannot be called. The only way
     * to start this method is from the scene start function
     * @returns {void}
     * @function
     * @private
     */
    #update(){
        //Set the interval by calling the update function
        interval = requestAnimationFrame(() => this.#update());
        
        //Capture current time value
        //let now = Date.now();

        //Calculate the time between the obtained and the later
        //let delta = now - this.then;

        //If the calculated value is greater than the fps interval, run the function
        //if(delta > FJSscreen.fpsInterval){
            //Calculate post time from fps
            //this.then = now - (delta % FJSscreen.fpsInterval);
            //Execute the update method
            this.#updateMethod();
            //The representation cycle ends
            FJSscreen.finishCicle();
        //}
    }

    /**
     * **Ends the current scene**
     * 
     * Cancel the animation with cancelAnimationFrame passing by parameter
     * the interval, global access variable
     * @returns {void}
     * @function
     * @public
     */
    finish(){
        //Cancels the interval, associated with the animation
        cancelAnimationFrame(interval);
    }
}