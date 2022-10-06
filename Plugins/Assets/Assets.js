/**
 * Clase para cargar recursos como hojas de sprites. Prepara los datos
 * pero estos no son cargados desde el constructor
 */
class Assets {
    /**
     * Crea los materiales. Parámetros: sprites, onFinish
     * @param {*} datos 
     */
    constructor(datos){
        this.sprites        = datos.sprites;        //Datos de los sprites
        this.onFinish       = datos.onFinish;       //Ejecutar tras finalizar
        this.assetsCargar   = this.sprites.length;  //Cantidad de sprites a cargar
        this.assetsCargados = 0;                    //Sprites cargados
    }

    /**
     * Carga todas las imágenes pasadas por parámetro en el constructor.
     * De forma asíncrona, cargará tantas imágenes como existan
     */
    cargar(){
        //Recorre la lista de sprites y llama al método cargarImagen()
        for(let i=0; i<this.sprites.length; i++){
            this.cargarImagen(this.sprites[i].url, i);
        }
    }

    /**
     * Carga una imagen a partir de una ruta de forma asíncrona
     * @param {*} ruta 
     * @param {*} orden 
     */
    async cargarImagen(ruta, orden){
        //Crea una imagen y establece la ruta
        const imagen = new Image();
        imagen.src = ruta;

        /*
            Cuando la imagen se cargue:
                1. Guarda la imagen
                2. Aumenta en uno los datos cargados
                3. Comprueba si ha terminado la carga
        */
        imagen.onload = () => {
            this.sprites[orden].url = imagen;
            this.assetsCargados++;
            if(this.assetsCargados == this.assetsCargar) this.onFinish();
        };
    }

    /**
     * Dibuja sprites. Habrá que indicar en la plantilla un número entero,
     * que corresponde al orden de hoja de sprite importada. El nombre hace
     * referencia al valor del sprite en la hoja
     * @param {*} plantilla
     * @param {*} nombre
     * @param {*} x
     * @param {*} y
     * @param {*} ancho
     * @param {*} alto
     */
    dibujarSprite(plantilla, nombre, x=0, y=0, ancho=0, alto=0){
        var sprite = this.sprites[plantilla].datos[nombre];
        lapiz.drawImage(
            this.sprites[plantilla].url,
            sprite.x,   //Ubicación en el eje X en la hoja
            sprite.y,   //Ubicación en el eje Y en la hoja
            sprite.w,   //Ancho del sprite en la hoja
            sprite.h,   //Alto del sprite en la hoja
            x,          //Ubicación en X en el lienzo
            y,          //Ubicación en Y en el lienzo
            ancho,      //Ancho en el lienzo
            alto        //Alto en el lienzo
        );
    }
}