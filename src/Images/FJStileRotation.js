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
        this.src = temporalData.path || temporalData.src;

        //If auto load is enabled, load the image
        if(data.auto != false) this.load();
        this.angle = 0;
    }

    /**
     * **Load the tile**
     * 
     * Method to load the image, and run a callback function
     * @returns {void}
     * @function
     * @public
     */
    load(){
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
        this.tile.src = this.src;
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
        ctx.rotate(angle);
        ctx.drawImage(this.tile, -width / 2, -height / 2, width, height);
        ctx.restore();
    }
}