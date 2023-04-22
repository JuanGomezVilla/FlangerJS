let canvas, ctx, interval;

/**
 * This class establishes the videogame's bases. It creates the controllers for both the
 * keyboard and the mouse. The first runned method is init, which captures the data.
 */
let FJSscreen = {
    keyboard: {}, //The keyboard saves all the keys pressed with the name of the key pressed
    //Mouse data
    mouse: {
        x: 0, //Coordinates on the X axis
        y: 0, //Coordinates on the Y axis
        click: false, //Click control, single press
        pressed: false //Pressure control, long press
    },
    mouseHoveringElement: false,
    init: function(data){
        //Sets the default amount of FPS
        this.fps = data.fps == null ? 60 : data.fps;
        this.fpsInterval = 1000/this.fps;
        
        //Gets the canvas by ID or default
        if(data.id != null) canvas = document.querySelector(`#${data.id}`);
        else canvas = document.querySelector("canvas");

        //Verify that the canvas contains data, is not null
        if(canvas == null){
            //console.error("No <canvas> tag found");
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }

        //With the canvas captured, the pencil is created
        ctx = canvas.getContext("2d");

        //Add a border based on what the user says
        if(data.border) canvas.style.border = "1px solid #000000";

        //Verificación de que existe valores de ancho y alto
        //TODO: observar si el usuario puede aportar dos valores o uno (preguntar a don borja)
        let width = data.width;
        let height = data.height;

        if(data.aspectRatio != null) {
            const aspectRatio = data.aspectRatio.split(":", 2);
            const aspectX = aspectRatio[0];
            const aspectY = aspectRatio[1];

            if(data.height == null && data.width == null){
                console.error("One size parameter must be specified");
                return;
            } else if(data.height != null && data.width != null){
                console.error("Only one size parameter is allowed");
                return;
            } else if(data.height == null){              
                height = parseInt((data.width * aspectY) / aspectX);
            } else if(data.width == null){
                width = parseInt((data.height * aspectX) / aspectY);
            }
        }

        //Verificacion de que existen valores para el ancho y el alto
        if(width != null && height != null){
            if(data.aspectRatio == null){
                //Verificar que los datos pasados son numeros enteros
                if(!Number.isInteger(data.width) || !Number.isInteger(data.height)){
                    console.error("El ancho y el alto deben ser numeros enteros");
                    return;
                }
            }
            
            //Atributos de la misma clase
            this.width = width;
            this.height = height;

            //Asignar los valores creados al lienzo
            canvas.width = this.width;
            canvas.height = this.height;
        } else {
            this.width = canvas.width;
            this.height = canvas.height;
        }

        //Obtención del
        this.title = document.title == null ? "There is no title" : document.title;
        
        //DETECCIÓN DE PULSACIONES (TECLADO Y RATÓN)
        window.addEventListener("click", (evento) => this.mouse.click = true);
        window.addEventListener("mousedown", (evento) => this.mouse.pressed = true);
        window.addEventListener("mouseup", (evento) => this.mouse.pressed = false);
        window.addEventListener("mousemove", (evento) => {
            let boundingClientRect = canvas.getBoundingClientRect();
            this.mouse.x = evento.clientX - boundingClientRect.left;
            this.mouse.y = evento.clientY - boundingClientRect.top;
        });
        window.addEventListener("keydown", (evento) => this.keyboard[evento.key.toLowerCase()] = true);
        window.addEventListener("keyup", (evento) => this.keyboard[evento.key.toLowerCase()] = false);


        if(data.easterEgg){
            window.addEventListener("blur", (event) => document.title = "Come Back ;(");
            window.addEventListener("focus", (event) => document.title = this.title);
        }

    },
    /**
     * Devuelve el ancho de la pantalla, cantidad en píxeles
     * @returns Ancho de la pantalla
     */
    getWidth: function(){
        return this.width;
    },
    /**
     * Devuelve el alto de la pantalla, cantidad en píxeles
     * @returns Alto de la pantalla
     */
    getHeight: function(){
        return this.height;
    },
    /**
     * Devuelve el punto central truncado (sin decimales) a partir del ancho
     * @returns Número entero
     */
    getCentralPointX: function(){
        //El valor es dividido entre dos y truncado
        return Math.trunc(this.width/2);
    },
    /**
     * Devuelve el punto central truncado (sin decimales) a partir del alto
     * @returns Número entero
     */
    getCentralPointY: function(){
        //El valor es dividido entre dos y truncado
        return Math.trunc(this.height/2);
    },
    /**
     * Obtiene el punto central en ambos ejes, útil para cuando se requiere ubicar
     * un objeto en el punto central de la pantalla, de lo contrario utilizar el
     * método correspondiente según el eje
     */
    getCentralPoint: function(){
        //Devuelve un diccionario con las coordenadas, obtenidas con los métodos propios
        return {
            x: this.getCentralPointX(), //Para el eje X
            y: this.getCentralPointY() //Paa el eje Y
        }
    },
    /**
     * Limpia todo el contenido de la pantalla. Llamar al principio de cada bucle.
     * Por defecto, lo utiliza la clase FJSscene.
     */
    clear: function(){
        //Limpieza del lienzo
        ctx.clearRect(0, 0, this.width, this.height);
    },
    /**
     * Dibuja el color de fondo de la pantalla. El usuario debe proporcionar un
     * color, como string, dentro de la lista de formatos admitidos.
     * @param {string} color 
     */
    drawBackgroundColor: function(color){
        //Fija el color predeterminado
        ctx.fillStyle = color;
        //Dibuja desde el inicio de coordenadas hasta el ancho y el alto un rectángulo
        ctx.fillRect(0, 0, this.width, this.height);
    },
    /**
     * Cancela el click producido por el usuario. Lo utilizará un objeto del tipo
     * FJSscene al final de un ciclo, también lo puede escribir un usuario si
     * desea que un click no afecte a otros posteriores.
     */
    cancelClick: function(){
        //El mouse de la propia clase es cancelado
        this.mouse.click = false;
    },
    finishCicle: function(){
        this.cancelClick();
        canvas.style.cursor = this.mouseHoveringElement ? "pointer" : "default";
        this.mouseHoveringElement = false;
    }
}