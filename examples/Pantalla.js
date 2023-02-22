/**
 * Clase principal del juego, maneja todos los controles del lienzo, teclado,
 * ratón, estado, etc. La implementación a pantalla completa también está presente.
 */
class Pantalla {
    constructor(datos){
        //Captura del canvas en el código
        if(datos.id != null) this.lienzo = document.getElementById(datos.id);
        else this.lienzo = document.querySelector("canvas");

        //Comprobar si existe el lienzo en el documento
        if(this.lienzo == null){
            //En ese caso, muestra un mensaje de error, y con 'return' bloquea la carga siguiente
            console.error("No se ha encontrado una etiqueta <canvas> en el documento");
            return;
        }

        //Creación de un lápiz para dibujar en el lienzo
        this.lapiz = this.lienzo.getContext("2d");

        //Dimensiones del lienzo
        this.ancho = datos.ancho;
        this.alto = datos.alto;

        //Set del ancho y el alto del lienzo
        this.lienzo.width = this.ancho;
        this.lienzo.height = this.alto;

        //Añadir un borde por defecto si el usuario lo especifica
        if(datos.borde) this.lienzo.style.border = "1px solid #000000";

        this.teclado = {};

        //ESCUCHADORES DE TECLADO
        window.addEventListener("keydown", (evento) => this.teclado[evento.key] = true);
        window.addEventListener("keyup", (evento) => this.teclado[evento.key] = false);
    }

    getLienzo(){
        return this.lienzo;
    }

    getLapiz(){
        return this.lapiz;
    }

    getAncho(){
        return this.ancho;
    }

    getAlto(){
        return this.alto;
    }

    getPuntoCentralX(){
        return Math.trunc(this.ancho/2);
    }

    getPuntoCentralY(){
        return Math.trunc(this.alto/2);
    }

    getPuntoCentral(){
        return {
            x: this.getPuntoCentralX(),
            y: this.getPuntoCentralY()
        }
    }
}