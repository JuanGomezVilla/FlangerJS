/**
 * **Performance**
 * 
 * Class designed to check game performance. There are
 * different methods to do this inside the class. 
 * IMPORTANT: use only in development environments
 * @author JuanGV
 * @version 1.0.0
 * @name FJSperformance
 * @license MIT
 */
let FJSperformance = {
    /**
     * **Method 1**
     * 
     * Method used to check the number of frames in
     * one second. Advance through rendering cycle
     * @property {boolean} counting - Trigger to avoid repetitions
     * @property {number} frames - Number of frames in a second
     * @property {Function} update - Function to update the process
     */
    method1: {
        counting: false, //Trigger to avoid repetitions
        frames: 0, //Number of frames in a second
        /**
         * **Update frames**
         * 
         * Function to count the number of frames that have happened.
         * setInterval is not called, setTimeout is used
         * @returns {void}
         * @function
         * @public
         */
        update: function(){
            //If the trigger is disabled
            if(!this.counting){
                //Activate the trigger
                this.counting = true;
                //Start the countdown of 1000 milliseconds (1 second)
                setTimeout(() => {
                    //Print the number of frames on the console
                    console.log(this.frames);
                    //Deactivate the activator
                    this.counting = false;
                    //Reset the number of frames
                    this.frames = 0;
                }, 1000);
            }
            //Increases the number of frames by 1
            this.frames++;
        }
    }
}