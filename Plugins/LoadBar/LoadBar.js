/**
 * Crea una barra de carga a partir de unos datos pasados. Una vez finalizada
 * la carga, se ejecutará una función, también definida por el usuario.
 */
class LoadBar {
    constructor(datos){
        this.x              = datos.x;              //Ubicación en el eje X
        this.y              = datos.y;              //Ubicación en el eje Y
        this.ancho          = datos.ancho;          //Ancho de la barra
        this.alto           = datos.alto;           //Alto de la barra
        this.grosor         = datos.grosor;         //Grosor del borde (0 -> sin borde)
        this.color1         = datos.color1;         //Color principal
        this.color2         = datos.color2;         //Color secundario
        this.velocidad      = datos.velocidad;      //Velocidad de avance
        this.mostrarTexto   = datos.mostrarTexto;   //Permitir mostrar el progreso
        this.onFinish       = datos.onFinish;       //Método a ejecutar cuando termine
        this.carga          = 0;                    //Carga realizada (0 por defecto)
        this.realizarFinish = false;                //Interruptor de ejecución de onFinish()
    }

    /**
     * Llamar a este método para actualizar el progreso.
     * No controla el dibujado de gráficos
    */
    actualizar(){
        //Aumenta la carga
        if(this.carga < 100) this.carga += this.velocidad;
        
        //Muestra el texto de progreso
        if(this.mostrarTexto){
            utils.escribirTexto(
            Math.floor(this.carga) +"%",    //Redondea la carga para evitar decimales
            this.x + this.ancho/2,          //Ubicación horizontal en el centro de la barra
            this.y + this.alto + 20,        //Ubicación vertical del texto (debajo de la barra)
            this.color1                     //Utiliza el color principal
            );
        }
                
        //Detiene la carga cuando llega al final
        if(this.carga >= 100){
            //Evita posibles decimales
            this.carga = 100;
            
            //Ejecuta una sola vez el método onFinish y cierra el interruptor
            if(!this.realizarFinish){
                this.onFinish();
                this.realizarFinish = true;
            }
        }
    }

    /**
     * Llamar a este método para dibujar la barra (tener en cuenta que
     * el estado no cambia si antes no se llama al método actualizar)
    */
    dibujar(){
        //FONDO
        utils.dibujarRectangulo(this.x, this.y, this.ancho, this.alto, this.color2);

        //BARRA DE AVANCE
        utils.dibujarRectangulo(this.x, this.y, this.carga * (this.ancho/100), this.alto, this.color1);
        
        //BORDE
        utils.dibujarCuadro(this.x, this.y, this.ancho, this.alto, this.color1, this.grosor);
    }
}