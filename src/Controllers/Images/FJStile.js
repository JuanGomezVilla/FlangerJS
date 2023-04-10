class FJStile {
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
    }

    draw(x=0, y=0, width=this.width, height=this.height){
        ctx.drawImage(this.tile, x, y, width, height);
    }
}