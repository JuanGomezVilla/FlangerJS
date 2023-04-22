let FJSutils = {
    /**
     * **Get a random number**
     * 
     * Returns a random integer between two given integer numbers. 
     * User must always give two numbers range as there are no default parameters.
     * @param {number} min Minimum number the user gives
     * @param {number} max Maximum number the user gives
     * @returns {number} Returned integer
     */
    randomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * **Get a random value from a given list**
     * 
     * User gives by parameter an array of data. The program will return
     * a random value of said list
     * @param {array} data List with values
     * @returns {*} Value returned
     */
    randomChoice: function(data){
        return data[this.randomNumber(0, data.length - 1)];
    },
    /**
     * **Get the content from an adress**
     * 
     * Returns text, usually from a web. It is understood that this text is in JSON format
     * to receive calls. Content is returned in text format.
     * @param {string} ruta Dirección del contenido
     * @param {function} 
     */
    getContentFromURL: async function(ruta, callback){
        let archivo = await fetch(ruta);
        callback(await archivo.text());
    },
    /**
     * **Turns text into JSON**
     * 
     * Gets a text content given by parameter and turns it into JSON format
     * @param {string} data Text content to convert
     * @returns Returns the content converted to JSON format
     */
    convertJSON: function(data){
        return JSON.parse(data);
    },
    /**
     * **Draws a rectangle**
     * 
     * Draws a Rectangle in the given coordinates (x,y), with the specified width, height  and color.
     * In case no parameters were given, a black(#000000) rectangle with coordinates (0.0)
     * and a width and height of 50 each is drawn by default.
     * @param {number} x X axis coordinate
     * @param {number} y Y axis coordinate
     * @param {number} width Rectangle's width
     * @param {number} height Rectangle's height
     * @param {string} color Rectangle's color
     */
    fillRect: function(x=0, y=0, width=50, height=50, color="#000000"){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}