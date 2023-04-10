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
     * @param {string} spriteName - Nombre del sprite a dibujar
     * @param {number} x - Ubicación en el eje X del canvas
     * @param {number} y - Ubicación en el eje Y del canvas
     * @param {number} width - Ancho del tile en el canvas
     * @param {number} height - Alto del tile en el canvas
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