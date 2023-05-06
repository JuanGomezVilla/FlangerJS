let canvas, ctx, interval;

/**
 * This class establishes the videogame's bases. It creates the controllers for both the
 * keyboard and the mouse. The first runned method is init, which captures the data
 * @author JuanGV
 * @version 1.0.0
 * @name FJSutils
 * @license MIT
 */
let FJSscreen = {
    keyboard: {}, //The keyboard saves all the keys pressed with the name of the key pressed
    //Mouse data
    mouse: {
        x: 0, //Coordinates on the X axis
        y: 0, //Coordinates on the Y axis
        click: false, //Click control, single press
        pressed: false, //Pressure control, long press
        isHoveringElement: false //Possibility of being on an object
    },
    /**
     * **Establish the bases of the game**
     * 
     * Function to start or establish a canvas on which to work and
     * will represent the elements. Easter eggs can be activated
     * @param {*} data - Dictionary with keys, canvas settings
     * @returns {void}
     * @function
     * @public
     */
    init: function(data){
        //Sets the default amount of FPS
        this.fps = data.fps == null ? 60 : data.fps;
        this.fpsInterval = 1000/this.fps;
        
        //Gets the canvas by ID or default
        if(data.id != null) canvas = document.querySelector(`#${data.id}`);
        else canvas = document.querySelector("canvas");

        //Verify that the canvas contains data, is not null
        if(canvas == null){
            //Creates a canvas tag and adds it to the body of the page
            //IMPORTANT: this should be avoided in production and not in development environments
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }

        //With the canvas captured or created, the pencil is created
        ctx = canvas.getContext("2d");

        //Add a border based on what the user says
        if(data.border) canvas.style.border = "1px solid #000000";

        //Checking that width and height values ​​exist
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

        //Get the tab title (easter egg)
        this.title = document.title == null ? "There is no title" : document.title;
        
        //Detection of keys (keyboard and mouse)
        window.addEventListener("keydown", (event) => this.keyboard[event.key] = true); //Keystroke
        window.addEventListener("keyup", (event) => this.keyboard[event.key] = false); //End of a key press
        window.addEventListener("click", (event) => this.mouse.click = true); //Mouse click
        window.addEventListener("mousedown", (event) => this.mouse.pressed = true); //Mouse pressure
        window.addEventListener("mouseup", (event) => this.mouse.pressed = false); //End of mouse pressure
        window.addEventListener("mousemove", (event) => {
            //Returns information from the DOMrect. Sets the location of X and Y relative to the canvas
            let boundingClientRect = canvas.getBoundingClientRect();
            this.mouse.x = event.clientX - boundingClientRect.left;
            this.mouse.y = event.clientY - boundingClientRect.top;
        });

        //If easter eggs are user activated
        if(data.easterEgg){
            //When the user switches tabs, the title of the game tab will change
            window.addEventListener("blur", (event) => document.title = "Come Back ;(");
            window.addEventListener("focus", (event) => document.title = this.title);
        }

        //Library creation message
        console.log("%cCreated with %cFlanger",
            "color:white;font: 30px Bahnschrift;",
            "color:#F0DB4F;font: 40px Bahnschrift;"
        );

    },
    /**
     * **Get canvas width**
     * 
     * Returns the width of the screen, amount in pixels
     * @returns {number} Screen width
     * @function
     * @public
     */
    getWidth: function(){
        //Returns the width of the canvas, attribute of the class
        return this.width;
    },
    /**
     * **Get canvas height**
     * 
     * Returns the height of the screen, amount in pixels
     * @returns {number} Screen height
     * @function
     * @public
     */
    getHeight: function(){
        //Returns the height of the canvas, attribute of the class
        return this.height;
    },
    /**
     * **Get the center point on the X axis**
     * 
     * Returns the truncated center point (no decimal places) from the width
     * @returns {number} Center point on the X axis
     * @function
     * @public
     */
    getCentralPointX: function(){
        //The value is divided by two and truncated
        return Math.trunc(this.width/2);
    },
    /**
     * **Get the center point on the Y axis**
     * 
     * Returns the truncated center point (no decimal places) from the height
     * @returns {number} Center point on the Y axis
     * @function
     * @public
     */
    getCentralPointY: function(){
        //The value is divided by two and truncated
        return Math.trunc(this.height/2);
    },
    /**
     * **Get the center point of the screen**
     * 
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
    fade: {
        r: 0,
        g: 0,
        b: 0,
        transparency: 0,
        running: false,
        speed: 0.01,
        callback: function(){},
        begin: function(r, g, b, callback){
            this.reset();
            this.r = r;
            this.g = g;
            this.b = b;
            this.callback = callback;
            this.running = true;
        },
        finish: function(){
            this.running = false;
            this.transparency = 0;
        },
        reset: function(){
            this.running = false;
            this.transparency = 0;
        }  
    },
    finishCicle: function(){
        let fade = this.fade;
        //Posible fade
        if(fade.running){
            ctx.fillStyle = `rgb(${fade.r}, ${fade.g}, ${fade.b}, ${fade.transparency})`;
            ctx.fillRect(0, 0, this.width, this.height);
            this.fade.transparency += fade.speed;

            //Detecta cuando ha completado todo el ciclo
            if(this.fade.transparency >= 1){
                this.fade.speed = -0.01;
                this.fade.callback();
            }

            //Si la velocidad es negativa y la transparencia 0, finaliza el fade
            if(fade.speed < 0 && fade.transparency <= 0)  this.fade.finish();
        }

        this.cancelClick();
        canvas.style.cursor = this.mouse.isHoveringElement ? "pointer" : "default";
        this.mouse.isHoveringElement = false;
    },
}