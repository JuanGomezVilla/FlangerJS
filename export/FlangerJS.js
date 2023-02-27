let canvas, ctx, interval;

/**
 * This class establishes the videogame's bases. It creates the controllers for both the
 * keyboard and the mouse. The first runned method is init, which captures the data.
 */
let FJSscreen = {
    keyboard: {}, //El teclado guarda todas las teclas pulsadas, no con un número sino con el nombre de la tecla
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
            console.error("No se ha encontrado una etiqueta <canvas> en el documento");
            return;
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
    clearScreen: function(){
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
 
/**
 * This class creates scenes. User must define a method with update parameters.
 * The other methods are optional.
 */
class FJSscene {
    /**
     * 
     * 
     * @param {array} data 
     */
    constructor(data){
        this.pause = data.pause == null ? false : data.pause;
        this.onLoad = data.onLoad != null ? data.onLoad : () => {};
        this.onRunning = data.onRunning;
        this.then = Date.now();
    }

    init(){
        this.onLoad();
        this.update();
    }

    update(){
        interval = requestAnimationFrame(() => this.update());
        
        //CAPTURAR VALORES
        let now = Date.now();
        let delta = now - this.then;

        if(delta > FJSscreen.fpsInterval){
            this.then = now - (delta % FJSscreen.fpsInterval);
            this.onRunning();
            FJSscreen.finishCicle();
        }

    }

    /**
     * Ends current scene
     */
    finish(){
        cancelAnimationFrame(interval);
    }
} 
 
/**
 * Class to create controllers that respond to user actions, eg hover,
 * click. The class provides the methods common to all types of controllers.
 * Therefore, it is important to mention that the objects like checkboxes,
 * buttons, etc., extend this class.
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJScontroller
 * @license MIT
 */
class FJScontroller {
    /**
     * Function to draw by default
     * @private
     */
    #drawMethod;

    /**
     * Function to perform when the mouse rests on the button
     * @private
     */
    #onHover;

    /**
     * Function to perform when the mouse is pressing the button
     * @private
     */
    #onPressed;
    
    /**
     * **Constructor**
     * 
     * Receives in order the elementary parameters: coordinates and dimensions.
     * Use the _super_ command for when extending from another class. To avoid
     * errors, parameters do not contain default values.
     * @param {number} x Coordinates on the X axis
     * @param {number} y Coordinates on the Y axis
     * @param {function} draw Function to draw by default
     * @param {function} onHover Function when mouse hover object
     * @param {function} onPressed Function when mouse press object
     * @param {function} onClick Function when mouse click the object
     */
    constructor(x, y, draw, onHover, onPressed, onClick){
        /**
         * Coordinates on the X axis
         * @type {number}
         * @public
         */
        this.x = x;

        /**
         * Coordinates on the Y axis
         * @type {number}
         * @public
         */
        this.y = y;

        //Set the private attributes
        this.#drawMethod = draw;
        this.#onHover = onHover || draw;
        this.#onPressed = onPressed || (onHover || draw);

        /**
         * Call this function for when you want to click on
         * the button without the need for the user to do it
         * @public
         */
        this.click = onClick || function(){};
    }

    /**
     * Method to draw the button on the canvas, will execute the function
     * that the user passed to it in the constructor. This method avoids
     * that two layers are superimposed on each other, giving rise to shapes
     * pixelated or not smooth.
     * @public
     */
    draw(){
        //When the mouse is over the object
        if(this.hover()){
            //Tells the main class that an object is being hovered over
            FJSscreen.mouseHoveringElement = true;
            //If the mouse is being pressed, execute onPressed, otherwise onHover
            if(FJSscreen.mouse.pressed) this.#onPressed();
            else this.#onHover();
        } else {
            //If no hover is performed, draw the object
            this.#drawMethod();
        }
    }

    /**
     * Method to check clicks on the button. In case the mouse is hovering
     * and a click is detected, the onClick method is executed. Important
     * to mention that when clicking on the object, the click will be
     * automatically cancelled.
     * @public
     */
    update(){
        if(this.hover() && FJSscreen.mouse.click){
            //Execute function click
            this.click();
            //Cancel the click
            FJSscreen.cancelClick();
        }
    }
} 
 
/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. If you want to
 * create a more path button, use FJSbuttonPath
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSbutton
 * @license MIT
 * @extends {FJScontroller}
 */
class FJSbutton extends FJScontroller {
    /**
     * **Constructor**
     * 
     * Constructor of the object. Receive initial features
     * and the processing methods for user actions.
     * @param {array} data x, y, width, height, draw, onHover, onClick, onPressed
     */
    constructor(data){
        //Super to pass the data to the parent constructor
        super(data.x, data.y, data.draw, data.onHover, data.onPressed, data.onClick);

        //Set the private attributes
        /**
         * Width in pixels
         * @type {number}
         * @public
         */
        this.width = data.width;

        /**
         * Height in pixels
         * @type {number}
         * @public
         */
        this.height = data.height;
    }

    /**
     * Function used to check if the mouse is hovering over the object
     * @returns {boolean} Boolean indicating if the mouse is sitting on the object
     * @public
     */
    hover(){
        //Returns true when none of the conditions are met
        return !(
            (this.y + (this.height) < FJSscreen.mouse.y) ||
            (this.y > FJSscreen.mouse.y) ||
            (this.x + (this.width) < FJSscreen.mouse.x) ||
            (this.x > FJSscreen.mouse.x)
        );
    }

    /**
     * Returns the width of the object
     * @returns {number} Width in pixels
     * @public
     */
    getWidth(){
        //Attribute return
        return this.width;
    }

    /**
     * Returns the height of the object
     * @returns {number} Height in pixels
     * @public
     */
    getHeight(){
        //Attribute return
        return this.height;
    }

    /**
     * Method to change the width of the object, there is no default value
     * @param {number} width Width in pixels
     * @public
     */
    setWidth(width){
        //The attribute receives a new value
        this.width = width;
    }

    /**
     * Method to change the height of the object, there is no default value
     * @param {number} height Height in pixels
     * @public
     */
    setHeight(height){
        //The attribute receives a new value
        this.height = height;
    }
} 
 
/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. Allows you to
 * create buttons from paths, we are currently trying to implement a
 * coordinate movement
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSbuttonPath
 * @license MIT
 * @extends {FJScontroller}
 */
class FJSbuttonPath extends FJScontroller {

    constructor(data){
        super(data.x, data.y, data.draw, data.onHover, data.onPressed, data.onClick);
        this.path = data.path();
    }

    hover(){
        return ctx.isPointInPath(this.path, FJSscreen.mouse.x, FJSscreen.mouse.y);
    }
}