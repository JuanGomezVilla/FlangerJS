/**
 * **Progress**
 * 
 * Class to define a progress bar with the actions already
 * implemented. It is considered as a user control and not
 * of game to be presented in the interface. The user has
 * to define the format of the progress bar
 * @author JuanGV
 * @version 1.0.0
 * @name FJSprogress
 * @license MIT
 */
class FJSprogress {
    /**
     * **Constructor**
     * 
     * Constructor of the object. Receives initial data such as location,
     * dimensions, speed, and callback functions to draw, to end, etc.
     * @param {array} data x, y, width, height, draw, progress, speed, draw, onFinish
     * @constructor
     */
    constructor(data){
        this.x = data.x; //Location on the X axis
        this.y = data.y; //Y-axis location
        this.width = data.width; //Object width
        this.height = data.height; //Object height
        this.progress = data.progress || 0; //Current progress, default 0
        this.speed = data.speed || 1; //Speed rate, default 1
        //Draw function. If the value is not null, it will pass the progress to the function
        //In case of not specifying data for this function, it assigns an empty method
        this.draw = data.draw != null ? () => data.draw(this.progress) : function(){};
        this.onFinish = data.onFinish || null; //Callback function to finish, defaults to null
        this.finished = false; //Trigger to finish animation
    }

    /**
     * **Update**
     * 
     * Data update function. will advance the value of progress
     * according to the specified speed and when finished it
     * will execute a callback function
     * @returns {void}
     * @function
     * @public
     */
    update(){
        //Check if progress is less than 100
        if(this.progress < 100){
            //In that case, it increases the progress according to the set speed
            this.progress += this.speed;
        //If the onFinish method is not null, execute the method once
        } else if(!this.finished){
            //Prevents the value from going out of range due to high speed
            this.progress = 100;
            //Execute the onFinish method
            this.onFinish();
            //Activates the trigger to avoid repeat
            this.finished = true;
        }
    }

    /**
     * **Reset values**
     * 
     * Method to reset all values, setting the progress to its
     * value defaults to 0, and the trigger from finished to off
     * @returns {void}
     * @function
     * @public
     */
    reset(){
        //Sets progress to 0 and disables the finished trigger
        this.progress = 0;
        this.finished = false;
    }
}