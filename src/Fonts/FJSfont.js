/**
 * Class used to import fonts. Perform the same procedure
 * import fonts that use CSS, but with JavaScript
 * @author JuanGV
 * @version 1.0.0
 * @name FJSfont
 * @license MIT
 */
class FJSfont {
    /**
     * **Constructor**
     * 
     * Constructor of the object. Receive initial features
     * and the processing methods for user actions.
     * @param {array} data src, nameFont, onLoad
     * @constructor
     */
    constructor(data){
        /**
         * Path and name of the font
         * @type {string}
         * @public
         */
        this.src = data.src;

        /**
         * Name of the font in the game
         * @type {string}
         * @public
         */
        this.nameFont = data.nameFont;

        /**
         * Method to load on finish
         * @type {void}
         * @public
         */
        this.onLoad = data.onLoad || function(){};

        /**
         * HTML tag that contains the CSS style
         * @type {style}
         * @public
         */
        this.style = document.createElement("style");
    }

    /**
     * **Load the font**
     * 
     * Method to load the source from the data provided in the constructor
     * @function
     * @public
     */
    load(){
        //Create a CSS for the font
        this.style.innerText = `@font-face {font-family: '${this.nameFont}';src: url('${this.src}');}`;
        //Insert the style in the header of the page
        document.head.append(this.style);
        //Loads a possible final load function, optionally user-defined
        this.onLoad();
    }
}