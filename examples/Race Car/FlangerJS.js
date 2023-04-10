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
 
let FJSutils = {
    /**
     * **Get a random number**
     * 
     * Returns a random integer between two given integer numbers. 
     * User must always give two numbers range as there are no default parameters.
     * @param {number} min Minimum number the user gives
     * @param {number} max Maximum number the user gives
     * @returns {number} Returned integer
     */
    randomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * **Get a random value from a given list**
     * 
     * User gives by parameter an array of data. The program will return
     * a random value of said list
     * @param {array} data List with values
     * @returns {*} Value returned
     */
    randomChoice: function(data){
        return data[this.randomNumber(0, data.length - 1)];
    },
    /**
     * **Get the content from an adress**
     * 
     * Returns text, usually from a web. It is understood that this text is in JSON format
     * to receive calls. Content is returned in text format.
     * @param {string} ruta Dirección del contenido
     * @param {function} 
     */
    getContentFromURL: async function(ruta, callback){
        let archivo = await fetch(ruta);
        callback(await archivo.text());
    },
    /**
     * **Turns text into JSON**
     * 
     * Gets a text content given by parameter and turns it into JSON format
     * @param {string} data Text content to convert
     * @returns Returns the content converted to JSON format
     */
    convertJSON: function(data){
        return JSON.parse(data);
    },
    /**
     * **Draws a rectangle**
     * 
     * Draws a Rectangle in the given coordinates (x,y), with the specified width, height  and color.
     * In case no parameters were given, a black(#000000) rectangle with coordinates (0.0)
     * and a width and height of 50 each is drawn by default.
     * @param {number} x X axis coordinate
     * @param {number} y Y axis coordinate
     * @param {number} width Rectangle's width
     * @param {number} height Rectangle's height
     * @param {string} color Rectangle's color
     */
    fillRect: function(x=0, y=0, width=50, height=50, color="#000000"){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
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
 
class FJSwebrtc {
    constructor(data){
        this.channel = null;
        this.servers = data.servers || "stun:stun.l.google.com:19302";
        this.connection = new RTCPeerConnection({iceServers: [{urls: this.servers}]});
        this.connection.ondatachannel = (event) => {
            //Save the channel;
            this.channel = event.channel;
            //Action to take when the offer recipient receives a message
            this.channel.onmessage = (event) => this.onMessage(event.data);
        };
        this.connection.onconnectionstatechange = (event) => {
            document.getElementById('connectionState').innerText = this.connection.connectionState;
        };
        this.connection.oniceconnectionstatechange = (event) => {
            document.getElementById('iceConnectionState').innerText = this.connection.iceConnectionState;
        };
        this.onMessage = data.onMessage;
    }

    /**
     * Method that accepts an offer. If the value is in string, converts it to
     * JSON, otherwise return it in the variable. use this method
     * to accept a remote call and to receive the answer.
     * @param {data} data Offer value, can be string or JSON
     */
    async acceptRemoteOffer(data){
        //Check the value and cast it if necessary
        const jsonData = typeof data === "string" ? JSON.parse(data) : data;
        //Sets the connection a description as response
        await this.connection.setRemoteDescription(jsonData)
    }

    async createOffer(){
        //Create a channel and set an action for the offer sender when they receive a message
        this.channel = this.connection.createDataChannel("data");
        this.channel.onmessage = (event) => this.onMessage(event.data);

        this.connection.onicecandidate = (event) => {
        // console.log('onicecandidate', event)
        if (!event.candidate) {
            document.getElementById('createdOffer').value = JSON.stringify(this.connection.localDescription)
            document.getElementById('createdOffer').hidden = false
        }
        }

        const offer = await this.connection.createOffer()
        await this.connection.setLocalDescription(offer)
    }

    
    

    async createAnswer() {
        this.connection.onicecandidate = (event) => {
        if (!event.candidate) {
            document.getElementById('createdAnswer').value = JSON.stringify(this.connection.localDescription)
            document.getElementById('createdAnswer').hidden = false
        }
        }

        const answer = await this.connection.createAnswer()
        await this.connection.setLocalDescription(answer)
    }

    async sendData(data) {
        //If channel exists, send data, otherwise notify user that data cannot be sent
        if(this.channel) this.channel.send(data);
        else console.error("Data cannot be sent because there is no communication channel");
    }
} 
 
/**
 * Class to create a direct interface with an object of type websocket.
 * Once the constructor is executed, it creates a connection to the
 * server, there is no init method. The objective of the class is to
 * save lines and directly pass the methods action in different
 * situations triggered by the websocket
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSwebsocket
 * @license MIT
 */
class FJSwebsocket {
    /**
     * Websocket establishing a connection to the server of websockets,
     * it is private but there is a method that returns the object
     */
    #websocket;

    /**
     * Constructor of the object, methods must be passed to it (optional)
     * of the actions in case of receiving a message, when the connection,
     * if it is closed, or if an error is raised. Besides, the user must
     * provide the address of the server.
     * @param {Array} data server, onMessage, onOpen, onClose, onError
     */
    constructor(data){
        //Default actions before possible events with the server
        this.onMessage = data.onMessage || function(){};
        this.onOpen = data.onOpen || function(){};
        this.onClose = data.onClose || function(){};
        this.onError = data.onError || function(){};

        //Create the connection to the websocket server
        this.websocket = new WebSocket(data.server);

        //Action to take when a connection to the server is established
        this.websocket.addEventListener("open", (event) => this.onOpen(event.data));
        //Action to take when the connection is closed
        this.websocket.addEventListener("close", (event) => this.onClose(event.data));
        //Action to perform when a message is received from the server
        this.websocket.addEventListener("message", (event) => this.onMessage(event.data));
        //Action to take when an error is triggered with the connection
        this.websocket.addEventListener("error", (event) => this.onError(event.data));
    }

    /**
     * Send data through the connection with the websocket
     * @param {object} data Data to send
     */
    send(data){
        //Using its own websocket, send the data passed
        this.websocket.send(data);
    }

    /**
     * Method to obtain the websocket of the connection
     * @returns {object} Returns the main websocket
     */
    getWebsocket(){
        //Returns the shortcut to the websocket
        return this.websocket;
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
 
class FJScheckbox {
    constructor(data){

    }
} 
 
 
 
