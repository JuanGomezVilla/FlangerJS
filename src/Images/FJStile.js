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