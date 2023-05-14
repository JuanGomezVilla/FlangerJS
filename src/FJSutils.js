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