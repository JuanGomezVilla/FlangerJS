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

        //If auto load is enabled, load the image
        if(data.auto != false) this.load();

        this.src = data.path || data.src;

        //First sample
        let sampleTile = Object.values(this.tiles)[0];
        this.heightKey = this.widthKey = null;

        if("w" in sampleTile) this.widthKey = "w";
        else if("width" in sampleTile) this.widthKey = "width";

        if("h" in sampleTile) this.heightKey = "h";
        else if("height" in sampleTile) this.heightKey = "height";
    }

    /**
     * **Load the tileset**
     * 
     * Method to load the image, and run a callback function
     * @returns {void}
     * @function
     * @public
     */
    load(){
        //Load the image
        this.tileset = new Image();
        //Function for when the charge is finished
        this.tileset.onload = () => this.onLoad();
        //Tileset path
        this.tileset.src = this.src;
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