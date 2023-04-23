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