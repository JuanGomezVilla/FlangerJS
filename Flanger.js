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
     * @property {number} x - Coordinates on the X axis, default 0
     * @property {number} y - Coordinates on the Y axis, default 0
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

        if(data.aspectRatio != null) {
            const aspectRatio = data.aspectRatio.split(":", 2);
            const aspectX = aspectRatio[0];
            const aspectY = aspectRatio[1];

            if(data.height == null && data.width == null){
                console.error("One size parameter must be specified");
                return;
            } else if(data.height != null && data.width != null){
                console.error("Only one size parameter is allowed");
                return;
            } else if(data.height == null){              
                height = parseInt((data.width * aspectY) / aspectX);
            } else if(data.width == null){
                width = parseInt((data.height * aspectX) / aspectY);
            }
        }

        //Checking that values ​​for width and height exist
        if(width != null && height != null){
            if(data.aspectRatio == null){
                //Verify that the data passed are integers
                if(!Number.isInteger(data.width) || !Number.isInteger(data.height)){
                    //Error message
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
     * By default, it is used by the FJSscene class.
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
     * @param {string} color 
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
     * mouse, possible effects like fade, or cursor icon
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
    finishCurrentScene: function(){
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
        //Cancel the animation with the interval
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
 * **Color**
 * 
 * List of colors, extracted from the CSharp Color class. It's not possible
 * change some value since the class is constant. Each value has associated
 * a hexadecimal code, representing said color
 * @author JuanGV
 * @version 1.0.0
 * @name FJScolor
 * @license MIT
 */
const FJScolor = {
    AliceBlue: "#F0F8FF",
    AntiqueWhite: "#FAEBD7",
    Aqua: "#00FFFF",
    Aquamarine: "#7FFFD4",
    Azure: "#F0FFFF",
    Beige: "#F5F5DC",
    Bisque: "#FFE4C4",
    Black: "#000000",
    BlanchedAlmond: "#FFEBCD",
    Blue: "#0000FF",
    BlueViolet: "#8A2BE2",
    Brown: "#A52A2A",
    BurlyWood: "#DEB887",
    CadetBlue: "#5F9EA0",
    Chartreuse: "#7FFF00",
    Chocolate: "#D2691E",
    Coral: "#FF7F50",
    CornflowerBlue: "#6495ED",
    Cornsilk: "#FFF8DC",
    Crimson: "#DC143C",
    Cyan: "#00FFFF",
    DarkBlue: "#00008B",
    DarkCyan: "#008B8B",
    DarkGoldenrod: "#B8860B",
    DarkGray: "#A9A9A9",
    DarkGreen: "#006400",
    DarkKhaki: "#BDB76B",
    DarkMagenta: "#8B008B",
    DarkOliveGreen: "#556B2F",
    DarkOrange: "#FF8C00",
    DarkOrchid: "#9932CC",
    DarkRed: "#8B0000",
    DarkSalmon: "#E9967A",
    DarkSeaGreen: "#8FBC8B",
    DarkSlateBlue: "#483D8B",
    DarkSlateGray: "#2F4F4F",
    DarkTurquoise: "#00CED1",
    DarkViolet: "#9400D3",
    DeepPink: "#FF1493",
    DeepSkyBlue: "#00BFFF",
    DimGray: "#696969",
    DodgerBlue: "#1E90FF",
    Firebrick: "#B22222",
    FloralWhite: "#FFFAF0",
    ForestGreen: "#228B22",
    Fuchsia: "#FF00FF",
    Gainsboro: "#DCDCDC",
    GhostWhite: "#F8F8FF",
    Gold: "#FFD700",
    Goldenrod: "#DAA520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#ADFF2F",
    Honeydew: "#F0FFF0",
    HotPink: "#FF69B4",
    IndianRed: "#CD5C5C",
    Indigo: "#4B0082",
    Ivory: "#FFFFF0",
    Khaki: "#F0E68C",
    Lavender: "#E6E6FA",
    LavenderBlush: "#FFF0F5",
    LawnGreen: "#7CFC00",
    LemonChiffon: "#FFFACD",
    LightBlue: "#ADD8E6",
    LightCoral: "#F08080",
    LightCyan: "#E0FFFF",
    LightGoldenrodYellow: "#FAFAD2",
    LightGray: "#D3D3D3",
    LightGreen: "#90EE90",
    LightPink: "#FFB6C1",
    LightSalmon: "#FFA07A",
    LightSeaGreen: "#20B2AA",
    LightSkyBlue: "#87CEFA",
    LightSlateGray: "#778899",
    LightSteelBlue: "#B0C4DE",
    LightYellow: "#FFFFE0",
    Lime: "#00FF00",
    LimeGreen: "#32CD32",
    Linen: "#FAF0E6",
    Magenta: "#FF00FF",
    Maroon: "#800000",
    MediumAquamarine: "#66CDAA",
    MediumBlue: "#0000CD",
    MediumOrchid: "#BA55D3",
    MediumPurple: "#9370DB",
    MediumSeaGreen: "#3CB371",
    MediumSlateBlue: "#7B68EE",
    MediumSpringGreen: "#00FA9A",
    MediumTurquoise: "#48D1CC",
    MediumVioletRed: "#C71585",
    MidnightBlue: "#191970",
    MintCream: "#F5FFFA",
    MistyRose: "#FFE4E1",
    Moccasin: "#FFE4B5",
    NavajoWhite: "#FFDEAD",
    Navy: "#000080",
    OldLace: "#FDF5E6",
    Olive: "#808000",
    OliveDrab: "#6B8E23",
    Orange: "#FFA500",
    OrangeRed: "#FF4500",
    Orchid: "#DA70D6",
    PaleGoldenrod: "#EEE8AA",
    PaleGreen: "#98FB98",
    PaleTurquoise: "#AFEEEE",
    PaleVioletRed: "#DB7093",
    PapayaWhip: "#FFEFD5",
    PeachPuff: "#FFDAB9",
    Peru: "#CD853F",
    Pink: "#FFC0CB",
    Plum: "#DDA0DD",
    PowderBlue: "#B0E0E6",
    Purple: "#800080",
    Red: "#FF0000",
    RosyBrown: "#BC8F8F",
    RoyalBlue: "#4169E1",
    SaddleBrown: "#8B4513",
    Salmon: "#FA8072",
    SandyBrown: "#F4A460",
    SeaGreen: "#2E8B57",
    Seashell: "#FFF5EE",
    Sienna: "#A0522D",
    Silver: "#C0C0C0",
    SkyBlue: "#87CEEB",
    SlateBlue: "#6A5ACD",
    SlateGray: "#708090",
    Snow: "#FFFAFA",
    SpringGreen: "#00FF7F",
    SteelBlue: "#4682B4",
    Tan: "#D2B48C",
    Teal: "#008080",
    Thistle: "#D8BFD8",
    Tomato: "#FF6347",
    Turquoise: "#40E0D0",
    Violet: "#EE82EE",
    Wheat: "#F5DEB3",
    White: "#FFFFFF",
    WhiteSmoke: "#F5F5F5",
    Yellow: "#FFFF00",
    YellowGreen: "#9ACD32"
}; 
 
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
     * @param {number} width Width in pixels
     * @param {number} height Height in pixels
     * @param {function} draw Function to draw by default
     * @param {function} onHover Function when mouse hover object
     * @param {function} onPressed Function when mouse press object
     * @param {function} onClick Function when mouse click the object
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

        this.useCursorPointer = cursorPointer;
        this.disabled = disabled;

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
     * Method to check clicks on the button. In case the mouse is hovering
     * and a click is detected, the onClick method is executed. Important
     * to mention that when clicking on the object, the click will be
     * automatically cancelled.
     * @public
     */
    update(){
        if(this.hover() && FJSscreen.mouse.click && !this.disabled){
            //Execute function click
            this.click();
            //Cancel the click
            FJSscreen.cancelClick();
        }
    }

    /**
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

    get enabled(){
        return !this.disabled;
    }

    set enabled(enabled){
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
     * Returns the width of the object
     * @returns {number} Width in pixels
     * @public
     */
    getWidth(){
        //Attribute return
        return this.width;
    }

    /**
     * Returns the height of the object
     * @returns {number} Height in pixels
     * @public
     */
    getHeight(){
        //Attribute return
        return this.height;
    }

    /**
     * Method to change the width of the object, there is no default value
     * @param {number} width Width in pixels
     * @public
     */
    setWidth(width){
        //The attribute receives a new value
        this.width = width;
    }

    /**
     * Method to change the height of the object, there is no default value
     * @param {number} height Height in pixels
     * @public
     */
    setHeight(height){
        //The attribute receives a new value
        this.height = height;
    }
} 
 
/**
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
     * 
     * @param {*} data 
     */
    constructor(data){
        super(data.x, data.y, () => {
            if(this.checked) this.onChecked();
            else this.drawMethod();
        }, data.onHover, data.onPressed, data.onClick, true);
        this.text = data.text;
        this.value = data.value;
        this.checked = data.checked || false;
        //Gráfico sin checked, por defecto función vacía
        this.drawMethod = data.draw || function(){};
        //Gráfico a dibujar cuando está checked, por defecto el método de dibujo
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
     * Método para comprobar si el checkbox está seleccionado, se puede
     * acceder a este estado directamente por la variable o por este
     * método. Utilizado en caso de dudas
     * @returns {boolean} Verdadero si el checkbox está seleccionado, de lo contrario, falso
     */
    isChecked(){
        //Captura el estado propio de checked y lo devuelve
        return this.checked;
    }
} 
 
/**
 * Clase para definir una barra de progreso con las acciones ya
 * implementadas. Se considera como un control de usuario y no
 * de juego por presentarse en la interfaz
 */
class FJSprogress {
    constructor(data){
        this.x = data.x; //Ubicación en el eje X
        this.y = data.y; //Ubicación en el eje Y
        this.width = data.width; //Ancho del objeto
        this.height = data.height; //Alto del objeto
        this.progress = data.progress || 0; //Progreso actual, por defecto 0
        this.speed = data.speed || 1; //Velocidad de avance, por defecto 1
        //Función de dibujado. Si el valor no es nulo, le pasará el progreso a la función
        //En caso de no especificar datos para esta función, le asigna un método vacío
        this.draw = data.draw != null ? () => data.draw(this.progress) : function(){};
        this.onFinish = data.onFinish || null; //Función de callback para finalizar, por defecto nulo
    }

    /**
     * Función de actualización de los datos. Avanzará el
     * valor del progreso según la velocidad especificada
     * y al terminar ejecutará una posible función de callback
     */
    update(){
        //Comprueba si el progreso es inferior a 100
        if(this.progress < 100){
            //En ese caso, aumenta el progreso según la velocidad fijada
            this.progress += this.speed;
        //Si el método onFinish no es nulo, ejecuta una sola vez el método
        } else if(this.onFinish != null){
            //Evita que el valor se vaya de rango por una alta velocidad
            this.progress = 100;
            //Ejecuta el método onFinish
            this.onFinish();
            //Anula el valor de dicho método para no ser repetido de nuevo
            this.onFinish = null;
        }
    }
} 
 
/**
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
     * Loads the image automatically, and executes a possible switch
     * when the image has been loaded. It is useful for triggering
     * actions likestart the game once the data has been loaded
     * @param {*} data - A dictionary with events and the path of the image, etc
     * @constructor
     */
    constructor(data){
        let temporalData = {};
        if(typeof data === "object" && data !== null && Object.keys(data).length > 0){
            temporalData = data;
        } else {
            temporalData.path = data;
        }
        
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
 
class FJStileRotation {
    constructor(data){
        //Guardará una posible función de carga y el tile
        this.onLoad = data.onLoad || function(){};

        //Cargará la imagen
        this.tile = new Image();
        //Función para cuando termine la carga
        this.tile.onload = () => {
            this.width = this.tile.width;
            this.height = this.tile.height;
            this.onLoad();
        };
        //Ruta del tile
        this.tile.src = data.path || data.src;
        this.angle = 0;
    }

    draw(angle=0, x=0, y=0, width=this.width, height=this.height){
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.tile, -width / 2, -height / 2, width, height);
        ctx.restore();
    }
} 
 
class FJStileset {
    constructor(data){
        //Guardará una posible función de carga y los tiles
        this.onLoad = data.onLoad || function(){};
        this.tiles = data.tiles;

        //Cargará la imagen
        this.tileset = new Image();
        //Función para cuando termine la carga
        this.tileset.onload = () => this.onLoad();
        //Ruta del tileset
        this.tileset.src = data.path || data.src;
    }

    /**
     * 
     * @param {string} tileName - Name of the tile to draw
     * @param {number} x - Location on the X axis of the canvas
     * @param {number} y - Location on the Y axis of the canvas
     * @param {number} width - Width of the tile on the canvas
     * @param {number} height - Tile height on canvas
     * @returns {void}
     * @function
     * @public
     */
    drawTile(tileName, x=0, y=0, width, height){
        let tile = this.tiles[tileName];
        ctx.drawImage(
            this.tileset,
            tile.x, tile.y,
            tile.w, tile.h,
            x, y,
            width, height
        );
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
     * @function
     * @returns {void}
     * @throws {Error} If there is an error while playing the audio
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
     * @function
     * @returns {void}
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
     * @function
     * @returns {void}
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
     * @function
     * @returns {void}
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
     * @function
     * @returns {void}
     * @param {string} src - The new audio file path
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
     * @function
     * @returns {number} The duration of the audio in seconds
     * @property duration
     * @public
     */
    get duration(){
        //Gets the audio and returns the duration of the original object
        return this.#audio.duration;
    }

    /**
     * **Volume status**
     * 
     * Returns the volume of the audio element
     * @function
     * @returns {number} The volume, value between 0 and 1
     * @property {number} volume
     * @public
     */
    get volume(){
        //Gets the audio and returns the volume of the original object
        return this.#audio.volume;
    }

    /**
     * **Volume status**
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
     * @returns {boolean} muted state
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
 * Class to create a direct interface with an object of type websocket.
 * Once the constructor is executed, it creates a connection to the
 * server, there is no init method. The objective of the class is to
 * save lines and directly pass the methods action in different
 * situations triggered by the websocket
 * @author JuanGV
 * @version 1.0.0.0
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
     * Constructor of the object, methods must be passed to it (optional)
     * of the actions in case of receiving a message, when the connection,
     * if it is closed, or if an error is raised. Besides, the user must
     * provide the address of the server.
     * @param {Array} data server, onMessage, onOpen, onClose, onError
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
     * Send data through the connection with the websocket
     * @param {object} data Data to send
     */
    send(data){
        //Using its own websocket, send the data passed
        this.websocket.send(data);
    }

    /**
     * Method to obtain the websocket of the connection
     * @returns {object} Returns the main websocket
     */
    getWebsocket(){
        //Returns the shortcut to the websocket
        return this.websocket;
    }
} 
 
class FJSwebrtc {
    constructor(data){
        this.channel = null;
        this.servers = data.servers || "stun:stun.l.google.com:19302";
        this.connection = new RTCPeerConnection({iceServers: [{urls: this.servers}]});
        this.connection.ondatachannel = (event) => {
            //Save the channel;
            this.channel = event.channel;
            //Action to take when the offer recipient receives a message
            this.channel.onmessage = (event) => this.onMessage(event.data);
        };
        this.connection.onconnectionstatechange = (event) => {
            document.getElementById('connectionState').innerText = this.connection.connectionState;
        };
        this.connection.oniceconnectionstatechange = (event) => {
            document.getElementById('iceConnectionState').innerText = this.connection.iceConnectionState;
        };
        this.onMessage = data.onMessage;
    }

    /**
     * Method that accepts an offer. If the value is in string, converts it to
     * JSON, otherwise return it in the variable. use this method
     * to accept a remote call and to receive the answer.
     * @param {data} data Offer value, can be string or JSON
     */
    async acceptRemoteOffer(data){
        //Check the value and cast it if necessary
        const jsonData = typeof data === "string" ? JSON.parse(data) : data;
        //Sets the connection a description as response
        await this.connection.setRemoteDescription(jsonData)
    }

    async createOffer(){
        //Create a channel and set an action for the offer sender when they receive a message
        this.channel = this.connection.createDataChannel("data");
        this.channel.onmessage = (event) => this.onMessage(event.data);

        this.connection.onicecandidate = (event) => {
        // console.log('onicecandidate', event)
        if (!event.candidate) {
            document.getElementById('createdOffer').value = JSON.stringify(this.connection.localDescription)
            document.getElementById('createdOffer').hidden = false
        }
        }

        const offer = await this.connection.createOffer()
        await this.connection.setLocalDescription(offer)
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
 
