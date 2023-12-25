/**
 * **Switch**
 * 
 * Class that works as a switch, it will execute a certain function
 * when the user has launched the check() function for a certain
 * number of times, also defined by the user
 * @author JuanGV
 * @version 1.0.0
 * @name FJSswitch
 * @license MIT
 */
class FJSswitch {

    /**
     * **Constructor**
     * 
     * Sets the switch data (times and callback)
     * @param {Array} data - times, onFinish
     */
    constructor(data){
        this.order = 0;
        this.times = data.times;
        this.onFinish = data.onFinish || function(){};
    }

    /**
     * Method to check if the established times have been reached
     * @function
     * @public
     */
    check(){
        //Increase order
        this.order++;
        //Checks if the order is equivalent to times, and executes a callback
        if(this.order == this.times) this.onFinish();
    }
}