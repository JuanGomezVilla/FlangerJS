//Global variables for the canvas, the context, and the update interval
let canvas, ctx, interval;

/**
 * **Screen**
 * 
 * This class establishes the videogame's bases. It creates the controllers for both the
 * keyboard and the mouse. The first runned method is init, which captures the data
 * @author JuanGV
 * @version 1.0.0
 * @name FJSscreen
 * @license MIT
 */
let FJSscreen = {
    keyboard: {}, //The keyboard saves all the keys pressed with the name of the key pressed
    /**
     * Object representing a fade effect
     * @namespace
     * @property {number} x - Coordinates on the X axis, default 0 (high value to avoid initial wrong hovers)
     * @property {number} y - Coordinates on the Y axis, default 0 (high value to avoid initial wrong hovers)
     * @property {boolean} click - Click control, single press, default false
     * @property {boolean} pressed - Pressure control, long press, default false
     * @property {boolean} isHoveringElement - Possibility of being on an object, default false
    */
    mouse: {
        x: -999, //Coordinates on the X axis
        y: -999, //Coordinates on the Y axis
        click: false, //Click control, single press
        pressed: false, //Pressure control, long press
        hoveringElement: false //Possibility of being on an object
    },
    /**
     * Object representing a fade effect
     * @namespace
     * @property {number} r - The red component of the fade color (0-255)
     * @property {number} g - The green component of the fade color (0-255)
     * @property {number} b - The blue component of the fade color (0-255)
     * @property {number} transparency - The transparency level of the fade (0-1)
     * @property {boolean} running - Indicates if the fade effect is currently running
     * @property {number} speed - The speed at which the fade effect occurs
     * @property {Function} callback - The callback function to be executed when the fade effect completes
     * @property {Function} begin - Begins the fade effect with the specified color and callback
     * @property {Function} reset - Resets the fade effect by stopping it and resetting the transparency level
    */
    fade: {
        r: 0, //Red color
        g: 0, //Green color
        b: 0, //Blue color
        transparency: 0, //Transparency, value between 0 and 1
        running: false, //Animation trigger
        speed: 0.01, //Default speed
        callback: function(){}, //Callback function on finish first phase
        /**
         * **Begin the animation**
         * 
         * Function to start the animation. Reset all values, and activate
         * the activation trigger, to avoid repeating the animation
         * @param {number} [r=0] - Red color, default 0
         * @param {number} [g=0] - Green color, default 0
         * @param {number} [b=0] - Blue color, default 0
         * @param {Function} [callback=function(){}] - Callback function on finish first phase, default empty
         * @returns {void}
         * @function
         * @public
         */
        init: function(r=0, g=0, b=0, callback=function(){}){
            this.reset(); //Reset values
            this.r = r; //Sets the red value
            this.g = g; //Sets the green value
            this.b = b; //Sets the blue value
            this.callback = callback; //Callback function
            this.running = true; //Activate the animation trigger
        },
        /**
         * **Reset data**
         * 
         * Resets the fade effect by stopping it and resetting the transparency level,
         * also used to finish the animation
         * @returns {void}
         * @function
         * @public
         */
        reset: function(){
            //Disable the animation trigger
            this.running = false;
            //Hide the fade layer with transparency at 0
            this.transparency = 0;
            //Resets the speed
            this.speed = 0.01;
        }  
    },
    /**
     * **Establish the bases of the game**
     * 
     * Function to start or establish a canvas on which to work and
     * will represent the elements. Easter eggs can be activated
     * @param {*} data - Dictionary with keys, canvas settings
     * @returns {void}
     * @function
     * @public
     */
    init: function(data){
        //Sets the default amount of FPS
        this.fps = data.fps == null ? 60 : data.fps;
        this.fpsInterval = 1000/this.fps;
        
        //Gets the canvas by ID or default
        if(data.id != null) canvas = document.querySelector(`#${data.id}`);
        else canvas = document.querySelector("canvas");

        //Verify that the canvas contains data, is not null
        if(canvas == null){
            //Creates a canvas tag and adds it to the body of the page
            //IMPORTANT: this should be avoided in production and not in development environments
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }

        //With the canvas captured or created, the pencil is created
        ctx = canvas.getContext("2d");

        //Add a border based on what the user says
        if(data.border) canvas.style.border = "1px solid #000000";

        //Checking that width and height values ​​exist
        let width = data.width;
        let height = data.height;

        //If the user specifies an aspect ratio
        if(data.aspectRatio != null) {
            //Obtaining the aspect ratio by separating the two points, and for each axis
            let aspectRatio = data.aspectRatio.split(":", 2);
            let aspectX = aspectRatio[0];
            let aspectY = aspectRatio[1];

            //If the user does not specify any width or height
            if(data.height == null && data.width == null){
                //Error message and stop
                console.error("One size parameter must be specified");
                return;
            //If there are both values ​​for width and height
            } else if(data.height != null && data.width != null){
                //Error message and stop
                console.error("Only one size parameter is allowed");
                return;
            //If the width is null
            } else if(data.width == null){
                //Width calculation
                width = parseInt((data.height * aspectX) / aspectY);
            //In case the height value is null
            } else if(data.height == null){
                //Height calculation
                height = parseInt((data.width * aspectY) / aspectX);
            }
        }

        //Checking that values ​​for width and height exist
        if(width != null && height != null){
            //If the aspect ratio is zero
            if(data.aspectRatio == null){
                //Verify that the data passed are integers
                if(!Number.isInteger(data.width) || !Number.isInteger(data.height)){
                    //Error message and stop
                    console.error("Width and height must be integers");
                    return;
                }
            }
            
            //Attributes of the same class
            this.width = width;
            this.height = height;

            //Assign the created values ​​to the canvas
            canvas.width = this.width;
            canvas.height = this.height;
        } else {
            //Sets the canvas values
            this.width = canvas.width;
            this.height = canvas.height;
        }

        //Get the tab title (easter egg)
        this.title = document.title == null ? "There is no title" : document.title;
        
        //Detection of keys (keyboard and mouse)
        window.addEventListener("keydown", (event) => this.keyboard[event.key] = true); //Keystroke
        window.addEventListener("keyup", (event) => this.keyboard[event.key] = false); //End of a key press
        window.addEventListener("click", (event) => this.mouse.click = true); //Mouse click
        window.addEventListener("mousedown", (event) => this.mouse.pressed = true); //Mouse pressure
        window.addEventListener("mouseup", (event) => this.mouse.pressed = false); //End of mouse pressure
        window.addEventListener("mousemove", (event) => {
            //Returns information from the DOMrect. Sets the location of X and Y relative to the canvas
            let boundingClientRect = canvas.getBoundingClientRect();
            this.mouse.x = event.clientX - boundingClientRect.left;
            this.mouse.y = event.clientY - boundingClientRect.top;
        });

        //If easter eggs are user activated
        if(data.easterEgg){
            //When the user switches tabs, the title of the game tab will change
            window.addEventListener("blur", (event) => document.title = "Come Back ;(");
            window.addEventListener("focus", (event) => document.title = this.title);
        }

        //Library creation message
        console.log("%cCreated with %cFlanger",
            "color:white;font: 30px Bahnschrift;",
            "color:#F0DB4F;font: 40px Bahnschrift;"
        );
    },
    /**
     * **Get canvas width**
     * 
     * Returns the width of the screen, amount in pixels
     * @returns {number} Screen width
     * @function
     * @public
     */
    getWidth: function(){
        //Returns the width of the canvas, attribute of the class
        return this.width;
    },
    /**
     * **Get canvas height**
     * 
     * Returns the height of the screen, amount in pixels
     * @returns {number} Screen height
     * @function
     * @public
     */
    getHeight: function(){
        //Returns the height of the canvas, attribute of the class
        return this.height;
    },
    /**
     * **Get the center point on the X axis**
     * 
     * Returns the truncated center point (no decimal places) from the width
     * @returns {number} Center point on the X axis
     * @function
     * @public
     */
    getCentralPointX: function(){
        //The value is divided by two and truncated
        return Math.trunc(this.width/2);
    },
    /**
     * **Get the center point on the Y axis**
     * 
     * Returns the truncated center point (no decimal places) from the height
     * @returns {number} Center point on the Y axis
     * @function
     * @public
     */
    getCentralPointY: function(){
        //The value is divided by two and truncated
        return Math.trunc(this.height/2);
    },
    /**
     * **Get the center point of the screen**
     * 
     * Obtains the center point in both axes, useful for when it is required to locate
     * an object in the center point of the screen, otherwise use the
     * corresponding method according to the axis
     * @returns {void}
     * @function
     * @public
     */
    getCentralPoint: function(){
        //Returns a dictionary with the coordinates, obtained with the proper methods
        return {
            x: this.getCentralPointX(), //For the X axis
            y: this.getCentralPointY() //For the Y axis
        }
    },
    /**
     * **Clear the screen**
     * 
     * Clean all the content on the screen. Call the beginning of each loop.
     * By default, it is used by the FJSscene class
     * @returns {void}
     * @function
     * @public
     */
    clear: function(){
        //Cleaning the canvas
        ctx.clearRect(0, 0, this.width, this.height);
    },
    /**
     * **Sets the background color**
     * 
     * Draws the background color of the screen. The user must provide a
     * color, as a string, within the list of supported formats
     * @param {string} color - Background color
     * @returns {void}
     * @function
     * @public
     */
    setBackgroundColor: function(color){
        //Set default color
        ctx.fillStyle = color;
        //Draws from the start of coordinates to the width and height a rectangle
        ctx.fillRect(0, 0, this.width, this.height);
    },
    /**
     * **Cancel the click status**
     * 
     * Cancels the click produced by the user. It will be used by an object
     * of type FJSscene at the end of a loop, can also be written by a user
     * if you want a click not to affect subsequent ones
     * @returns {void}
     * @function
     * @public
     */
    cancelClick: function(){
        //The mouse click of the own class is canceled
        this.mouse.click = false;
    },
    /**
     * *Ends a render cycle**
     * 
     * Function called at the end of each rendering cycle, is used to control the
     * mouse, possible effects like fade, or cursor icon, etc
     * @returns {void}
     * @function
     * @public
     */
    finishCicle: function(){
        //Capture the fade to avoid calling it constantly
        let fade = this.fade;
        //Possible fade
        if(fade.running){
            //Sets the color of the fade layer, with transparency
            ctx.fillStyle = `rgb(${fade.r}, ${fade.g}, ${fade.b}, ${fade.transparency})`;
            //Fill all the screen with the layer
            ctx.fillRect(0, 0, this.width, this.height);
            //Increases the transparency with the speed
            this.fade.transparency += fade.speed;

            //Detects when it has completed one the two phases
            if(this.fade.transparency >= 1){
                //Change the speed to negative
                this.fade.speed = -0.01;
                //Runs the callback function
                this.fade.callback();
            }

            //If the speed is negative and the transparency 0, end the fade by resetting the data
            if(fade.speed < 0 && fade.transparency <= 0)  this.fade.reset();
        }

        //Cancel mouse click
        this.cancelClick();
        //Changes the mouse icon if it was resting on an object
        canvas.style.cursor = this.mouse.hoveringElement ? "pointer" : "default";
        //At the end of the cycle, it is considered that it would have finished sitting on an object
        this.mouse.hoveringElement = false;
    },
    /**
     * **Finish current scene**
     * 
     * Ends the scene that is currently running. This method can be carried out because
     * the scene is always stored in the general variable of the interval
     * @returns {void}
     * @function
     * @public
     */
    finishCurrentScene: function(){
        //Cancel the main interval
        cancelAnimationFrame(interval);
    },
    /**
     * **Load a font**
     * 
     * The user gives a nameFont, the source file and a callback function
     * @returns {void}
     * @function
     * @public
     */
    loadFont(data){
        //HTML tag that contains the CSS style, create a CSS for the font
        let temporalStyle = document.createElement("style");
        temporalStyle.innerText = `@font-face {font-family: '${data.nameFont}';src: url('${data.src}');}`;
        //Insert the style in the header of the page, Loads a possible final load function, optionally user-defined
        document.head.append(temporalStyle);
        data.onLoad();
    },
}