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
    }
} 
 
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
 
/**
 * **Utils**
 * 
 * Class used to speed up some useful actions or to be run multiple
 * times, like generating a random number for example. The class is
 * not independent of the library
 * @author JuanGV
 * @version 1.0.0
 * @name FJSutils
 * @license MIT
 */
let FJSutils = {
    /**
     * **Get a random number**
     * 
     * Returns a random integer between two given integer numbers. User must
     * always give two numbers range as there are no default parameters.
     * @param {number} min - Minimum number the user gives
     * @param {number} max - Maximum number the user gives
     * @returns {number} Returned integer
     * @function
     * @public
     */
    randomNumber: function(min, max){
        //Returns a random number between a minimum and a maximum
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * **Get a random value from a given list**
     * 
     * User gives by parameter an array of data. The program will return
     * a random value of said list
     * @param {array} data - List with values
     * @returns {object} Value returned
     * @function
     * @public
     */
    randomChoice: function(data){
        //Select a random number and the value obtained will be the order within the list
        return data[this.randomNumber(0, data.length - 1)];
    },
    /**
     * **Get the content from an adress**
     * 
     * Returns text, usually from a web. It is understood that this text is in JSON format
     * to receive calls, but content is returned in text format
     * @param {string} path - Path of data
     * @param {function} callback - Callback function
     * @returns {void}
     * @function
     * @public
     */
    getContentFromURL: async function(path, callback){
        //Gets the data and passes it as a parameter to the callback function
        let data = await fetch(path);
        callback(await data.text());
    },
    /**
     * **Get a JSON content**
     * 
     * Returns a content already in JSON, so it would not be necessary to perform
     * parse over the fetched data. A JS object would be returned
     * @param {string} path - Path of data
     * @param {function} callback - Callback function
     * @returns {void}
     * @function
     * @public
     */
    getJSON: async function(path, callback){
        //Gets the data and passes it as a JS object in the parameter of the callback function
        let data = await fetch(data);
        callback(await data.json());
    },
    /**
     * **Turns text into JSON**
     * 
     * Gets a text content given by parameter and turns it into JSON format
     * @param {string} data - Text content to convert
     * @returns {object} Returns the content converted to JSON format
     * @function
     * @public
     */
    convertJSON: function(data){
        //Returns the parse result of the data with the JSON object
        return JSON.parse(data);
    },
    /**
     * **Download data in a plain text file**
     * 
     * Function to download a plain text file to the device. No it
     * necessarily has to be the .txt format, but the one that is
     * compatible with plain text
     * @param {string} text - Content of the file
     * @param {string} filename - Name of the file, also with format
     * @returns {void}
     * @function
     * @public
     */
    downloadPlainTextFile: function(text, filename){
        //Create a hidden element of type link
        let fileLink = document.createElement("a");
        //Establishes as attributes the link with the encrypted data and the possibility of downloading
        fileLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        fileLink.setAttribute("download", filename);
        //Click on the object to download the file
        fileLink.click();
        //Remove the object
        fileLink.remove();
    },
    /**
     * **Draws a rectangle**
     * 
     * Draws a Rectangle in the given coordinates (x,y), with the specified width, height  and color.
     * In case no parameters were given, a black(#000000) rectangle with coordinates (0.0)
     * and a width and height of 50 each is drawn by default.
     * @param {number} [x=0] - X axis coordinate
     * @param {number} [y=0] - Y axis coordinate
     * @param {number} [width=50] - Rectangle's width
     * @param {number} [height=50] - Rectangle's height
     * @param {string} [color="#000000"] - Rectangle's color
     * @returns {void}
     * @function
     * @public
     */
    fillRect: function(x=0, y=0, width=50, height=50, color="#000000"){
        //Sets the color of the context
        ctx.fillStyle = color;
        //Draw the rectangle on the canvas
        ctx.fillRect(x, y, width, height);
    },
    /**
     * **Write text on the canvas**
     * 
     * Function to draw text on the canvas. It will have some default parameters
     * in case the user wants to write as little as possible. The values are not
     * related to user settings, to set a few defaults, check out {@link FJStheme}
     * (library object)
     * @param {string} text - Text to draw
     * @param {number} [x=0] - Location on the X axis of the canvas
     * @param {number} [y=0] - Location the Y axis of the canvas
     * @param {string} [color="#000000"] - Text color
     * @param {string} [style=""] - Styles, such as italic, bolder, etc.
     * @param {number} [size=16] - Size in pixels, default 16
     * @param {string} [family=Arial] - Font family
     * @param {string} [align=left] - Horizontal alignment
     * @param {string} [baseline=middle] - Vertical alignment
     * @returns {void}
     * @function
     * @public
     */
    fillText: function(text, x=0, y=0, color="#000000", style="", size=16, family="Arial", align="left", baseline="middle"){
        //Sets the color of the text
        ctx.fillStyle = color;
        //Style, size, and font family
        ctx.font = style +" "+ size +"px "+ family;
        //Align text horizontally
        ctx.textAlign = align;
        //Align text vertically
        ctx.textBaseline = baseline;
        //Draws the text at the specified location
        ctx.fillText(text, x, y);
    }
} 
 
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
 
/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. If you want to
 * create a more path button, use FJSbuttonPath
 * @author JuanGV
 * @version 1.0.0
 * @name FJSbutton
 * @license MIT
 * @extends {FJScontroller}
 */
class FJSbutton extends FJScontroller {
    /**
     * **Constructor**
     * 
     * Constructor of the object. Receive initial features
     * and the processing methods for user actions.
     * @param {array} data x, y, width, height, draw, onHover, onClick, onPressed
     * @constructor
     */
    constructor(data){
        //Super to pass the data to the parent constructor
        super(data.x, data.y, data.draw, data.onHover, data.onPressed, data.onClick, true, false);
        /**
         * Width in pixels
         * @type {number}
         * @public
         */
        this.width = data.width;

        /**
         * Height in pixels
         * @type {number}
         * @public
         */
        this.height = data.height;
    }

    /**
     * **Get width**
     * 
     * Returns the width of the object
     * @returns {number} Width in pixels
     * @function
     * @public
     */
    getWidth(){
        //Attribute return
        return this.width;
    }

    /**
     * **Get height**
     * 
     * Returns the height of the object
     * @returns {number} Height in pixels
     * @function
     * @public
     */
    getHeight(){
        //Attribute return
        return this.height;
    }

    /**
     * **Set width**
     * 
     * Method to change the width of the object, there is no default value
     * @param {number} width Width in pixels
     * @function
     * @public
     */
    setWidth(width){
        //The attribute receives a new value
        this.width = width;
    }

    /**
     * **Set height**
     * 
     * Method to change the height of the object, there is no default value
     * @param {number} height Height in pixels
     * @function
     * @public
     */
    setHeight(height){
        //The attribute receives a new value
        this.height = height;
    }
} 
 
/**
 * **Checkbox**
 * 
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. If you want to
 * create a more path button, use FJSbuttonPath
 * @author JuanGV
 * @version 1.0.0
 * @name FJScheckbox
 * @license MIT
 * @extends {FJScontroller}
 */
class FJScheckbox extends FJScontroller {
    /**
     * **Constructor**
     * 
     * Constructor of the object. Receive initial features
     * and the processing methods for user actions.
     * @param {*} data x, y, width, height, draw, onHover, onClick, onPressed, onChecked, value, checked, text
     * @constructor
     */
    constructor(data){
        //Calls the constructor of the extending class
        super(data.x, data.y, () => {
            if(this.checked) this.onChecked();
            else this.drawMethod();
        }, data.onHover, data.onPressed, data.onClick, true);
        //Text linked to the checkbox
        this.text = data.text;
        //Value (a value assigned by the user that is not visible on the interface)
        this.value = data.value;
        /**
         * Checked trigger
         * @type {boolean}
         * @public
         */
        this.checked = data.checked || false;
        //Unchecked graph, default empty function
        this.drawMethod = data.draw || function(){};
        //Draw when checked, default draw method
        this.onChecked = data.onChecked || this.drawMethod;
        /**
         * Width in pixels
         * @type {number}
         * @public
         */
        this.width = data.width;
        /**
         * Height in pixels
         * @type {number}
         * @public
         */
        this.height = data.height;
    }

    /**
     * **Is checked**
     * 
     * Method to check if the checkbox is selected, you can
     * access this state directly by the variable or by this
     * method. Used in case of doubt
     * @returns {boolean} True if the checkbox is selected, false otherwise
     * @function
     * @public
     */
    isChecked(){
        //Captures the checked status and returns it
        return this.checked;
    }
} 
 
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
 
/**
 * **Sprite**
 * 
 * Class to use with simple sprites, which have some coordinates
 * and a width and height. Can check for collisions, and should
 * be used with objects that extend of the same class
 * @author JuanGV
 * @version 1.0.0
 * @name FJSsprite
 * @license MIT
 */
class FJSsprite {
    /**
     * **Constructor**
     * 
     * Sets the typical parameters of a sprite, such as coordinates
     * and dimensions. Data must be integers
     * @param {number} x - Coordinates on the X axis
     * @param {number} y - Coordinates on the Y axis
     * @param {number} width - Sprite width
     * @param {number} height - Sprite height
     */
    constructor(x, y, width, height){
        this.x = x; //Coordinates on the X axis
        this.y = y; //Coordinates on the Y axis
        this.width = width; //Sprite width
        this.height = height; //Sprite height
    }

    /**
     * **Crash with sprite**
     * 
     * Method to check if a collision has occurred with another
     * sprite. The sprite that is passed by parameter must
     * extend the same class or contain the attributes of
     * coordinates (x, y) and dimensions (width, height)
     * @param {object} sprite - Object to check for collision
     * @returns {boolean} Returns true if a collision occurred, false otherwise
     */
    crashWith(sprite){
        return !(
            (this.y + this.height < sprite.y) ||
            (this.y > sprite.y + sprite.height) ||
            (this.x + this.width < sprite.x) ||
            (this.x > sprite.x + sprite.width)
        );
    }
} 
 
/**
 * **Tile**
 * 
 * Class to handle with a single tile, i.e. an image without a grid.
 * It is useful if you are not going to use packages of sprites and
 * you are going to print a simple image
 * @author JuanGV
 * @version 1.0.0
 * @name FJStile
 * @license MIT
 */
class FJStile {
    /**
     * **Constructor**
     * 
     * Loads the image automatically, and executes a possible switch
     * when the image has been loaded. It is useful for triggering
     * actions likestart the game once the data has been loaded
     * @param {*} data - A dictionary with events and the path of the image, etc. It may just be the path
     * @constructor
     */
    constructor(data){
        //Dictionary to save possible data
        let temporalData = {};
        
        //If the object is of the dictionary type, save the data in the temporary variable
        if(typeof data === "object" && data !== null && Object.keys(data).length > 0) temporalData = data;
        else temporalData.path = data; //Creating the path key
        
        //It will save a possible load function and the tile
        this.onLoad = temporalData.onLoad || function(){};
        //Load the image
        this.tile = new Image();
        //Function for when the charge is finished
        this.tile.onload = () => {
            //Saves the width and height, and runs a possible on load function
            this.width = this.tile.width;
            this.height = this.tile.height;
            this.onLoad();
        };
        //Tile path
        this.tile.src = temporalData.path || temporalData.src;
    }
    
    /**
     * **Draw**
     * 
     * Draw the tile that was originally loaded from the constructor.
     * Not to be confused as a tileset. Draw the image directly.
     * Parameters are all default. The coordinates to 0 and the
     * dimensions the original values ​​of the image
     * @param {number} [x=0] - Location on the X axis
     * @param {number} [y=0] - Location on the Y axis
     * @param {number} [width=this.width] - Tile width on canvas
     * @param {number} [height=this.height] - Tile height on canvas
     * @returns {void}
     * @function
     * @public
     */
    draw(x=0, y=0, width=this.width, height=this.height){
        //Draw the image on the canvas with the main context
        ctx.drawImage(this.tile, x, y, width, height);
    }
} 
 
/**
 * **Tile with rotation**
 * 
 * Class to host a tile with rotation. Unlike class simple drawing
 * of a tile, this will have to indicate the angle of rotation at
 * the beginning of the drawing parameters
 * @author JuanGV
 * @version 1.0.0
 * @name FJStileRotation
 * @license MIT
 */
class FJStileRotation {
    /**
     * **Constructor**
     * 
     * Loads the image automatically, and executes a possible switch
     * when the image has been loaded. It is useful for triggering
     * actions likestart the game once the data has been loaded
     * @param {*} data - A dictionary with events and the path of the image, etc. It may just be the path
     * @constructor
     */
    constructor(data){
        //Dictionary to save possible data
        let temporalData = {};
        
        //If the object is of the dictionary type, save the data in the temporary variable
        if(typeof data === "object" && data !== null && Object.keys(data).length > 0) temporalData = data;
        else temporalData.path = data; //Creating the path key

        //It will save a possible load function
        this.onLoad = data.onLoad || function(){};

        //Load the image
        this.tile = new Image();
        //Function for when the charge is finished
        this.tile.onload = () => {
            this.width = this.tile.width;
            this.height = this.tile.height;
            this.onLoad();
        };
        //Tile path and angle
        this.tile.src = data.path || data.src;
        this.angle = 0;
    }

    /**
     * **Draw**
     * 
     * Draws the chart on the canvas with a past rotation
     * by parameter. Its default value is 0, although it is
     * recommended to specify a value
     * @param {number} [angle=0] - Angle of rotation, value not translated with Math.PI
     * @param {number} [x=0] - Location on the X axis
     * @param {number} [y=0] - Location on the Y axis
     * @param {number} [width=this.width] - Tile width on canvas
     * @param {number} [height=this.height] - Tile height on canvas
     * @returns {void}
     * @function
     * @public
     */
    draw(angle=0, x=0, y=0, width=this.width, height=this.height){
        //Draw the image on the canvas with an angle
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.tile, -width / 2, -height / 2, width, height);
        ctx.restore();
    }
} 
 
/**
 * **Tileset**
 * 
 * Class to handle with sets of tiles. what will they be
 * concentrated in the same image. To perform rotations
 * with a specific sprite, you must use the class
 * but with suffix Rotation
 * @author JuanGV
 * @version 1.0.0
 * @name FJStileset
 * @license MIT
 */
class FJStileset {
    /**
     * **Constructor**
     * 
     * Directly load the image in an own variable. When the image
     * has been loaded, it will execute a callback function. Unlike
     * the other classes to draw images, here it is mandatory to pass a
     * dictionary and not a single parameter
     * @param {*} data - A dictionary with events, the tiles, and the path
     * @constructor
     */
    constructor(data){
        //Will save a possible loading function and tiles
        this.onLoad = data.onLoad || function(){};
        this.tiles = data.tiles;

        //Load the image
        this.tileset = new Image();
        //Function for when the charge is finished
        this.tileset.onload = () => this.onLoad();
        //Tileset path
        this.tileset.src = data.path || data.src;

        //First sample
        let sampleTile = Object.values(this.tiles)[0];

        this.heightKey = this.widthKey = null;

        if("w" in sampleTile) this.widthKey = "w";
        else if("width" in sampleTile) this.widthKey = "width";

        if("h" in sampleTile) this.heightKey = "h";
        else if("height" in sampleTile) this.heightKey = "height";
    }

    /**
     * **Draw a tile**
     * 
     * Draw a tile with a name. It is important to remember that each tile
     * has associated a name, or an identifier, something at the user's choice
     * @param {string} tileName - Name of the tile to draw
     * @param {number} [x=0] - Location on the X axis of the canvas
     * @param {number} [y=0] - Location on the Y axis of the canvas
     * @param {number} [width=*] - Width of the tile on the canvas
     * @param {number} [height=*] - Tile height on canvas
     * @returns {void}
     * @function
     * @public
     */
    drawTile(tileName, x=0, y=0, width=this.tiles[tileName][this.widthKey], height=this.tiles[tileName][this.heightKey]){
        //Capture the tile to draw
        let tile = this.tiles[tileName];
        //Draw the image based on the passed data
        ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h, x, y, width, height);
    }
} 
 
/**
 * **Tileset (tiles with rotation)**
 * 
 * Class to handle with sets of tiles. what will they be
 * concentrated in the same image. To perform rotations
 * with a specific sprite, you must use the class
 * but with suffix Rotation
 * @author JuanGV
 * @version 1.0.0
 * @name FJStilesetRotation
 * @license MIT
 */
class FJStilesetRotation {
    /**
     * **Constructor**
     * 
     * Like the FJStileset class, it loads the image in the same way, the only
     * difference is the way of drawing, for the angles
     * @param {*} data - A dictionary with events, the tiles, and the path
     * @constructor
     */
    constructor(data){
        //Will save a possible loading function and tiles
        this.onLoad = data.onLoad || function(){};
        this.tiles = data.tiles;

        //Load the image
        this.tileset = new Image();
        //Function for when the charge is finished
        this.tileset.onload = () => this.onLoad();
        //Tileset path
        this.tileset.src = data.path || data.src;
    }

    /**
     * **Draw a tile with a rotation**
     * 
     * Draw a tile with a name, and with a rotation (angle).
     * Similar documentation in the class FJStileset. 
     * @param {string} tileName - Name of the tile to draw
     * @param {number} [angle=0] - Rotation angle of the tile to draw
     * @param {number} [x=0] - Location on the X axis of the canvas
     * @param {number} [y=0] - Location on the Y axis of the canvas
     * @param {number} [width=*] - Width of the tile on the canvas
     * @param {number} [height=*] - Tile height on canvas
     * @returns {void}
     * @function
     * @public
     */
    drawTile(tileName, angle=0, x=0, y=0, width=this.tiles[tileName], height=this.tiles[tileName]){
        //Capture the tile to draw
        let tile = this.tiles[tileName];
        //Draw the image based on the passed data
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h, -width / 2, -height / 2, width, height);
        ctx.restore();
    }
} 
 
/**
 * **Audio**
 * 
 * Class to handle an audio file. Only one audio will be imported, that
 * will be used during the development of the game. It is important clarify
 * that this class facilitates the use of the {@link Audio} object. Is say,
 * it is not a strictly necessary class, but it does make the job easier
 * @author JuanGV
 * @version 1.0.0
 * @name FJSaudio
 * @license MIT
 */
class FJSaudio {
    /**
     * Audio, original object
     * @private
     */
    #audio;

    /**
     * **Constructor**
     * 
     * Load the audio automatically, you can load only the route or
     * pass a dictionary with data and events. If you lack experience,
     * it is recommended to only pass the file path.
     * @param {*} data - The audio file path or a dictionary with events, etc
     * @constructor
     */
    constructor(data){
        //Create the audio object and a temporary variable for the file path
        this.#audio = new Audio();
        let temporalPath;
        //Default empty functions for end of load and end method
        this.onLoad = function(){};
        this.onFinish = function(){};

        //If the data passed is of the dictionary type
        if(typeof data === "object" && data !== null && Object.keys(data).length > 0){
            //Sets the file path and possible new data for the event functions
            temporalPath = data.src;
            this.onLoad = data.onLoad || function(){};
            this.onFinish = data.onFinish || function(){};
        } else {
            //Just set the path of the file
            temporalPath = data;
        }
        //Set the data source, and the methods to play the audio and whether it's done
        this.#audio.src = temporalPath;
        this.#audio.addEventListener("canplay", this.onLoad(), false);
        this.#audio.addEventListener("ended", () => this.onFinish(), false);
    }

    /**
     * **Play audio**
     * 
     * Plays the audio. The audio will not be heard if the user does not
     * previously interact with the screen
     * @returns {void}
     * @throws {Error} If there is an error while playing the audio
     * @function
     * @public
     */
    play() {
        //Try block to handle any exceptions that might occur while playing the audio
        try {
            //Attempts to play the audio
            this.#audio.play(); 
        //Catch block to handle any exceptions thrown by the try block
        } catch(error) {
            //Logs the error to the console
            console.error("Error while playing audio:", error);
            //Throws a new Error object with a message.
            throw new Error("Error while playing audio");
        }
    }

    /**
     * **Toggle pause**
     * 
     * Toggles between playing and pausing the audio
     * If the audio is paused, it will play it
     * If the audio is playing, it will pause it
     * @returns {void}
     * @function
     * @public
     */
    togglePause(){
        //Verify that the audio has not started because the current time is at 0
        //Use a ternary operator to change the pause state of the audio
        if(this.#audio.currentTime != 0) this.#audio.paused ? this.#audio.play() : this.#audio.pause();
    }

    /**
     * **Stop audio**
     * 
     * Stops the current audio playback and sets the current playback time to 0
     * @returns {void}
     * @function
     * @public
     */
    stop(){
        this.#audio.pause();
        this.#audio.currentTime = 0;
    }

    /**
     * **Replay audio**
     * 
     * Restarts the audio playback from the beginning
     * @returns {void}
     * @function
     * @public
     */
    replay(){
        //Set the current time to 0
        this.#audio.currentTime = 0;
        //Play the audio
        this.#audio.play();
    }

    /**
     * **Change audio**
     * 
     * Method to load a new audio passing its path
     * @returns {void}
     * @param {string} src - The new audio file path
     * @functions
     * @public
     */
    changeAudio(src){
        //Stops the current audio
        this.stop();
        //Changes the audio source to a new path
        this.#audio.src = src;
        //Loads the new audio
        this.#audio.load();
        //Starts playback
        this.play();
    }

    /**
     * **Get original object**
     * 
     * Returns the original object audio
     * @returns {object} Original object audio
     * @function
     * @public
     */
    getObject(){
        //Returns the private audio
        return this.#audio;
    }
    
    /**
     * **Pause status**
     * 
     * Getter method that returns the value of the paused attribute of the audio object
     * @returns {boolean} The current value of the "paused" attribute
     * @public
     */
    get paused(){
        //Gets the audio and returns the pause state
        return this.#audio.paused;
    }

    /**
     * **Duration**
     * 
     * Returns the duration of the audio element
     * @returns {number} The duration of the audio in seconds
     * @property {number} duration
     * @public
     */
    get duration(){
        //Gets the audio and returns the duration of the original object
        return this.#audio.duration;
    }

    /**
     * **Volume**
     * 
     * Returns the volume of the audio element
     * @returns {number} The volume, value between 0 and 1
     * @property {number} volume
     * @public
     */
    get volume(){
        //Gets the audio and returns the volume of the original object
        return this.#audio.volume;
    }

    /**
     * **Volume**
     * 
     * Sets the volume of the audio object
     * @param {number} volume - The volume level to set. A number between 0 and 1
     * @property {number} volume
     * @public
     */
    set volume(volume){
        //Gets the audio and set the volume of the original object
        this.#audio.volume = volume;
    }
    
    /**
     * **Muted status**
     * 
     * Gets the muted state of the audio object
     * @function
     * @returns {boolean} Muted state
     * @property {boolean} muted
     * @public
     */
    get muted(){
        //Gets the audio and returns the muted state of the original object
        return this.#audio.muted;
    }

    /**
     * **Muted status**
     * 
     * Sets the muted state of the audio object
     * @param {boolean} muted - Muted state
     * @property {boolean} muted
     * @public
     */
    set muted(muted){
        //Gets the audio and set the muted state of the original object
        this.#audio.muted = muted;
    }
} 
 
/**
 * **WebSocket**
 * 
 * Class to create a direct interface with an object of type websocket.
 * Once the constructor is executed, it creates a connection to the
 * server, there is no init method. The objective of the class is to
 * save lines and directly pass the methods action in different
 * situations triggered by the websocket
 * @author JuanGV
 * @version 1.0.0
 * @name FJSwebsocket
 * @license MIT
 */
class FJSwebsocket {
    /**
     * Websocket establishing a connection to the server of websockets,
     * it is private but there is a method that returns the object
     * @private
     */
    #websocket;

    /**
     * **Constructor**
     * 
     * Constructor of the object, methods must be passed to it (optional)
     * of the actions in case of receiving a message, when the connection,
     * if it is closed, or if an error is raised. Besides, the user must
     * provide the address of the server.
     * @param {Array} data - server, onMessage, onOpen, onClose, onError
     * @constructor
     */
    constructor(data){
        //Default actions before possible events with the server
        this.onMessage = data.onMessage || function(){};
        this.onOpen = data.onOpen || function(){};
        this.onClose = data.onClose || function(){};
        this.onError = data.onError || function(){};

        //Create the connection to the websocket server
        this.websocket = new WebSocket(data.server);

        //Action to take when a connection to the server is established
        this.websocket.addEventListener("open", (event) => this.onOpen(event.data));
        //Action to take when the connection is closed
        this.websocket.addEventListener("close", (event) => this.onClose(event.data));
        //Action to perform when a message is received from the server
        this.websocket.addEventListener("message", (event) => this.onMessage(event.data));
        //Action to take when an error is triggered with the connection
        this.websocket.addEventListener("error", (event) => this.onError(event.data));
    }

    /**
     * **Send data**
     * 
     * Send data through the connection with the websocket
     * @param {object} data - Data to send
     * @returns {void}
     * @function
     * @public
     */
    send(data){
        //Using its own websocket, send the data passed
        this.websocket.send(data);
    }

    /**
     * **Get original websocket**
     * 
     * Method to obtain the websocket of the connection
     * @returns {object} Returns the main websocket
     * @function
     * @public
     */
    getWebsocket(){
        //Returns the shortcut to the websocket
        return this.websocket;
    }
} 
 
/**
 * **WebRTC**
 * 
 * Class to establish a communication channel between two clients,
 * considered as peer to peer connections. The receiving user has
 * to send a verification code and vice versa, to complete the
 * connection between both points. IMPORTANT: this class is found
 * under development and may still bring bugs or need improvements
 * @author JuanGV
 * @version 1.0.0
 * @name FJSwebrtc
 * @license MIT
 */
class FJSwebrtc {
    /**
     * **Constructor**
     * 
     * Sets the object to handle with WebRTC connections. It will be passed
     * by parameter the callback functions when a trigger is triggered
     * action, and will be processed from those methods
     * @param {Array} data - onMessage
     * @constructor
     */
    constructor(data){
        //Callback functions
        this.onMessage = data.onMessage;
        this.onClientConnected = data.onClientConnected;
        this.onYouConnected = data.onYouConnected;

        //The channel is initially null and the servers can be those indicated by the user or one by default
        this.channel = null;
        this.servers = data.servers || "stun:stun.l.google.com:19302";

        //Creates the connection to the servers and a function for when a data channel is created on the connection
        this.connection = new RTCPeerConnection({iceServers: [{urls: this.servers}]});
        this.connection.ondatachannel = (event) => {
            //Save the channel;
            this.channel = event.channel;
            //Action to take when the offer recipient receives a message
            this.channel.onmessage = (event) => this.onMessage(event.data);
        };
        //Cuando el usuario se ha conectado
        this.connection.onconnectionstatechange = (event) => {
            document.getElementById('connectionState').innerText = this.connection.connectionState;
        };
        //Cuando tu te has conectado
        this.connection.oniceconnectionstatechange = (event) => {
            document.getElementById('iceConnectionState').innerText = this.connection.iceConnectionState;
        };
        
    }

    /**
     * **Accept remote offer**
     * 
     * Method that accepts an offer. If the value is in string, converts it to
     * JSON, otherwise return it in the variable. use this method
     * to accept a remote call and to receive the answer.
     * @param {data} data - Offer value, can be string or JSON
     * @returns {void}
     * @function
     * @public
     */
    async acceptRemoteOffer(data){
        //Check the value and cast it if necessary
        const jsonData = typeof data === "string" ? JSON.parse(data) : data;
        //Sets the connection a description as response
        await this.connection.setRemoteDescription(jsonData)
    }

    /**
     * **Create offer**
     * 
     * Method used to create an offer and send it to the customer to check
     * the connection, this process will also be done by the other client
     * @returns {void}
     * @function
     * @public
     */
    async createOffer(){
        //Create a channel and set an action for the offer sender when they receive a message
        this.channel = this.connection.createDataChannel("data");
        this.channel.onmessage = (event) => this.onMessage(event.data);

        //Cuando se genera un candidato en la conexión
        this.connection.onicecandidate = (event) => {
            //Si el evento no contiene algún candidato
            if (!event.candidate) {
                document.getElementById('createdOffer').value = JSON.stringify(this.connection.localDescription)
                document.getElementById('createdOffer').hidden = false
            }
        }

        //Create an offer with the connection and set it as a local description
        await this.connection.setLocalDescription(await this.connection.createOffer())
    }

    
    

    async createAnswer() {
        this.connection.onicecandidate = (event) => {
        if (!event.candidate) {
            document.getElementById('createdAnswer').value = JSON.stringify(this.connection.localDescription)
            document.getElementById('createdAnswer').hidden = false
        }
        }

        const answer = await this.connection.createAnswer()
        await this.connection.setLocalDescription(answer)
    }

    async sendData(data) {
        //If channel exists, send data, otherwise notify user that data cannot be sent
        if(this.channel) this.channel.send(data);
        else console.error("Data cannot be sent because there is no communication channel");
    }
} 
 
/**
 * Clase para conectar un solo mando de Gamepad. A diferencia de
 * la clase {@link FJSgamepads}, esta * solo puede controlar las
 * acciones de un mando y es útil si el juego no está enfocado
 * para una experiencia multijugador en el mismo dispositivo
 */
let FJSgamepad = {
    /**
     * Variable del gamepad, inicialmente será un valor nulo. Aloja
     * todos los datos del dispositivo. Es en pocas palabras, el
     * controlador principal. Es un dato público y accesible
     */
    gamepad: null,
    /**
     * Función de arranque. Establecerá los escuchadores principales
     * y posibles métodos de callback
     * @param {object} data 
     */
    init: function(data){
        //Funciones para conectar, desconectar, o en caso de error
        //Si el usuario no aporta una definición de esa función, será un método vacío
        this.onConnect = data.onConnect || function(){};
        this.onDisconnect = data.onDisconnect || function(){};
        this.onError = data.onError || function(){};

        //Escuchador para cuando un mando se conecta, el usuario debe presionar una tecla de dicho mando
        window.addEventListener("gamepadconnected", (event) => {
            //Si el valor del gamepad es nulo, no hay mandos conectados, por lo tanto, se puede guardar
            if(this.gamepad == null){
                //El gamepad recibe el controlador del gamepad que se acaba de conectar
                this.gamepad = event.gamepad;
                //Se ejecuta una posible función definida por el usuario
                this.onConnect(event);
            } else {
                this.onError(event);
            }
        });
        //Escuchador para cuando el mando se desconecte
        window.addEventListener("gamepaddisconnected", (event) => {
            //Si el atributo gamepad es diferente de nulo
            //Y el id del gamepad desconectado es equivalente al id del atributo gamepad
            if(this.gamepad != null && event.gamepad.id == this.gamepad.id){
                //El gamepad es vaciado
                this.gamepad = null;
                //Ejecución de una posible función de desconexión
                this.onDisconnect(event);
            }
        });
    },
    updateGamepad: function(){
        this.gamepad = navigator.getGamepads()[0];
    },
    getAxe: function(axe, sensibilidad=3){
        //parseFloat vs Number
        return parseFloat(this.gamepad.axes[axe].toFixed(sensibilidad));
    },
    getButton: function(iterator){
        return this.gamepad.buttons[iterator];
    },
    //Método que devuelve si el mando está conectado
    isConnected: function(){
        return this.gamepad != null;
    },
    vibrate: function(){
        /*this.gamepad.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 200,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0,
        });*/
    }
} 
 
let FJSgamepads = {
    gamepads: [],
    init: function(data){
        this.onConnect = data.onConnect || function(){};
        this.onDisconnect = data.onDisconnect || function(){};

        window.addEventListener("gamepadconnected", (event) => {
            this.onConnect(event);
        });
        window.addEventListener("gamepaddisconnected", (event) => {
            
        });
    }
} 
 
