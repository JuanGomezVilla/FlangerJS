class Pantalla {
    constructor(datos){
        //Captura el lienzo por id, class o ningún valor; y crea el lápiz
        if(datos.id != null) lienzo = document.getElementById(datos.id);
        else if(datos.class != null) lienzo = document.getElementsByClassName(datos.class)[0];
        else lienzo = document.getElementsByTagName("canvas")[0];
        lapiz = lienzo.getContext("2d");
    
        //Utilizar borde
        if(datos.borde) lienzo.style.border = "1px solid #000000";
    
        //Calibra el ancho y el alto
        if(datos.fullscreen){
            this.fullscreen = datos.fullscreen;
            this.color = datos.color;
            document.body.style.margin = 0;
            lienzo.width = document.body.clientWidth;
            lienzo.height = document.body.clientHeight;
        } else {
            if(datos.ancho != null && datos.ancho != null){
                lienzo.width = datos.ancho;
                lienzo.height = datos.alto;
            }
        }

        this.ancho = lienzo.width;
        this.alto = lienzo.height;
            
        //CONTROLES DEL RATÓN (x, y, click, presionado)
        this.raton = {x:0, y:0, click:false, presionado:false};
        window.addEventListener("click", () => this.raton.click = true);
        window.addEventListener("mousedown", () => this.raton.presionado = true);
        window.addEventListener("mouseup", () => this.raton.presionado = false);
        window.addEventListener("mousemove", (evento) => {
            var rectangulo = lienzo.getBoundingClientRect();
            this.raton.x = evento.clientX - rectangulo.left;
            this.raton.y = evento.clientY - rectangulo.top;
        })

        //CONTROLES DEL TECLADO
        this.teclado = {};
        window.addEventListener("keydown", (evento) => this.teclado[evento.key] = true);
        window.addEventListener("keyup", (evento) => this.teclado[evento.key] = false);
    }

    fondo(color){
        lapiz.fillStyle = color;
        lapiz.fillRect(0, 0, this.ancho, this.alto);
    }

    limpiar(){
        lapiz.clearRect(0, 0, this.ancho, this.alto);
    }

    anularClick(){
        this.raton.click = false;
    }
}

//UTILS
var utils = {
    dibujarRectangulo: function(x, y, ancho, alto, color="#000000"){
        lapiz.fillStyle = color;
        lapiz.fillRect(x, y, ancho, alto);
    },
    dibujarCuadro: function(x, y, ancho, alto, color="#000000", grosor=2){
        lapiz.beginPath();
        lapiz.strokeStyle = color;
        lapiz.lineWidth = grosor;
        lapiz.rect(x, y, ancho, alto);
        lapiz.closePath();
        lapiz.stroke();
    },
    //escribirTexto(texto="", x= , y= , color="", estilo="", size= , fuente="");
    escribirTexto: function(texto, x, y, color, estilo="", size=16, fuente="Arial", horizontal="center", vertical="middle"){
        lapiz.font = estilo +" "+ size +"px "+ fuente;
        lapiz.textBaseline = vertical;
        lapiz.textAlign = horizontal;
        lapiz.fillStyle = color;
        lapiz.fillText(texto, x, y);
    },
    dibujarCircunferencia: function(x, y, radio, color="#000000", grosor=2){
        lapiz.beginPath();
        lapiz.strokeStyle = color;
        lapiz.lineWidth = grosor;
        lapiz.arc(x, y, radio, 0, 2 * Math.PI);
        lapiz.closePath();
        lapiz.stroke();
    },
    dibujarCircunferenciaColor: function(x, y, radio, color="#000000"){
        lapiz.fillStyle = color;
        lapiz.beginPath();
        lapiz.arc(x, y, radio, 0, 2 * Math.PI);
        lapiz.closePath();
        lapiz.fill();
    },
    dibujarLinea: function(x1, y1, x2, y2, color="#000000", grosor=2){
        lapiz.beginPath();
        lapiz.strokeStyle = color;
        lapiz.lineWidth = grosor;
        lapiz.moveTo(x1, y1);
        lapiz.lineTo(x2, y2);
        lapiz.closePath();
        lapiz.stroke();
    },
    configurarSombra: function(color, blur, x, y){
        lapiz.shadowColor = color;
        lapiz.shadowBlur = blur;
        lapiz.shadowOffsetX = x;
        lapiz.shadowOffsetY = y;
    }
}

//BOTON
class Boton {
    constructor(datos){
        this.x = datos.x;
        this.y = datos.y;
        this.ancho = datos.ancho;
        this.alto = datos.alto;
        this.color1 = datos.color1;
        this.color2 = datos.color2;
        this.grosor = datos.grosor;
        this.onClick = datos.onClick;
        this.habilitado = datos.habilitado;
    }

    actualizar(){
        if(this.hover() && pantalla.raton.click && this.habilitado){
            this.onClick();
            pantalla.anularClick();
        }
    }

    hover(){
        return !(
            (this.x > pantalla.raton.x) ||
            (this.y > pantalla.raton.y) ||
            (this.x + this.ancho < pantalla.raton.x) ||
            (this.y + this.alto < pantalla.raton.y)
        );
    }
}

class BotonTexto extends Boton {
    constructor(datos){
        super({
            x: datos.x,
            y: datos.y,
            ancho: datos.ancho,
            alto: datos.alto,
            color1: datos.color1,
            color2: datos.color2,
            grosor: datos.grosor,
            onClick: datos.onClick,
            habilitado: datos.habilitado
        });
        this.texto = datos.texto;
        this.fuente = datos.fuente;
        this.pixeles = datos.pixeles;
        this.pesoFuente = datos.pesoFuente;
    }

    dibujarCuadro(color1, color2){
        var colorFondo;
        if(this.hover() && this.habilitado){
            colorFondo = color1;
        } else {
            colorFondo = color2;
        }
        utils.dibujarRectangulo(this.x, this.y, this.ancho, this.alto, colorFondo);
        utils.dibujarCuadro(this.x, this.y, this.ancho, this.alto, color1, this.grosor);
    }

    dibujar(inhabilitar=false){
        this.dibujarCuadro(this.color1, this.color2);
        var colorTexto;
        if(this.hover() && this.habilitado && !inhabilitar) colorTexto = this.color2;
        else colorTexto = this.color1;
        
        utils.escribirTexto(
            this.texto,
            this.x + this.ancho/2,
            this.y + this.alto/2,
            colorTexto,
            this.pesoFuente,
            this.pixeles,
            this.fuente
        );
    }
}

//################################################################################

/**
 * Clase para crear escenas. Inicialmente ejecuta un proceso previo,
 * y más tarde inicia la tarea principal. El proceso previo es útil
 * para cargar datos.
 */
class Escena {
    /**
     * Crea el escenario. Parámetros: sprites, onFinish
     * @param {array} datos 
     */
    constructor(datos){
        this.onLoad = datos.onLoad;                         //Cuando se cargue
        this.onRunning = datos.onRunning;                   //Ejecución infinita
        if(datos.pausa != null) this.pausa = datos.pausa;   //Estado de la pantalla
        else this.pausa = false;
    }

    /**
     * Actualiza todos los recursos. Es un método iniciado por el propio objeto,
     * por lo tanto, el usuario debe olvidarse de llamarlo, puesto que puede producir
     * errores de rendimiento si existen dos procesos u otro sustituye al principal
     */
    actualizar(){
        //Guarda el intervalo y llama al método onRunning
        intervalo = requestAnimationFrame(() => this.actualizar());
        this.onRunning();
        //Anula el click
        pantalla.anularClick();
    }

    /**
     * Método llamado por el usuario, utilizado para iniciar una escena
     */
    iniciar(){
        this.onLoad();      //Carga el método para añadir datos (await?)
        this.actualizar();  //Comienza a actualizar la pantalla
    }

    /**
     * Método llamado por el usuario. Finaliza la escena. En teoría, debería
     * iniciarse otra. Por lo tanto el orden es: a.finalizar(); b.iniciar()
     */
    finalizar(){
        //Cancela el intervalo
        window.cancelAnimationFrame(intervalo);
    }
}

//################################################################################

/**
 * Clase para cargar recursos como hojas de sprites. Prepara los datos
 * pero estos no son cargados desde el constructor
 */
 class Assets {
    /**
     * Crea los materiales. Parámetros: sprites, onFinish
     * @param {array} datos 
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
     * @param {string} ruta 
     * @param {number} orden 
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
     * @param {array} plantilla
     * @param {string} nombre
     * @param {number} x
     * @param {number} y
     * @param {number} ancho
     * @param {number} alto
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

//################################################################################

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