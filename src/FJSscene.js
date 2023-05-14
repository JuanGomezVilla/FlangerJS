/**
 * This class creates scenes. User must define a method with update parameters.
 * The other methods are optional.
 * @author JuanGV
 * @version 1.0.0
 * @name FJSscene
 * @license MIT
 */
class FJSscene {
    /**
     * 
     * 
     * @param {array} data 
     */
    constructor(data){
        this.pause = data.pause == null ? false : data.pause;
        this.onInit = data.onInit != null ? data.onInit : () => {};
        this.updateMethod = data.update;
        this.then = Date.now();
    }

    /**
     * **Start the scene**
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

    #update(){

        interval = requestAnimationFrame(() => this.#update());
        
        //CAPTURAR VALORES
        let now = Date.now();
        let delta = now - this.then;

        if(delta > FJSscreen.fpsInterval){
            this.then = now - (delta % FJSscreen.fpsInterval);
            this.updateMethod();
            FJSscreen.finishCicle();
        }
    }

    /**
     * **Ends current scene**
     * 
     * Cancel the animation with cancelAnimationFrame passing by parameter
     * the interval, global access variable
     * @returns {void}
     * @function
     * @public
     */
    finish(){
        //Cancel the animation with the interval
        cancelAnimationFrame(interval);
    }
}