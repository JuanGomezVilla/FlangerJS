/**
 * This class creates scenes. User must define a method with update parameters.
 * The other methods are optional.
 */
class FJSscene {
    /**
     * 
     * 
     * @param {array} data 
     */
    constructor(data){
        this.pause = data.pause == null ? false : data.pause;
        this.onLoad = data.onLoad != null ? data.onLoad : () => {};
        this.onRunning = data.onRunning;
        this.then = Date.now();
    }

    init(){
        this.onLoad();
        this.update();
    }

    update(){
        interval = requestAnimationFrame(() => this.update());
        
        //CAPTURAR VALORES
        let now = Date.now();
        let delta = now - this.then;

        if(delta > FJSscreen.fpsInterval){
            this.then = now - (delta % FJSscreen.fpsInterval);
            this.onRunning();
            FJSscreen.cancelClick();
        }
    }

    /**
     * Ends current scene
     */
    finish(){
        cancelAnimationFrame(interval);
    }
}