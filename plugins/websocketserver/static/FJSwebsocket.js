/**
 * Class to create a direct interface with an object of type
 * websocket. Once the constructor is executed, it creates a
 * connection to the server, there is no init method. The objective
 * of the class is to save lines and directly pass the methods
 * action in different situations triggered by the websocket
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJSwebsocket
 * @license MIT
 */
class FJSwebsocket {
    /**
     * Websocket establishing a connection to the server
     * of websockets, it is private but there is a method to
     * get the object directly
     */
    #websocket;

    /**
     * 
     * @param {Array} data url, onMessage, onOpen, onClose, onMessage, onError
     */
    constructor(data){
        this.onMessage = data.onMessage || function(){};
        this.onOpen = data.onOpen || function(){};
        this.onClose = data.onClose || function(){};
        this.onMessage = data.onMessage || function(){};
        this.onError = data.onError || function(){};
        this.websocket = new WebSocket(data.url);

        //Acción a realizar cuando se establece una conexión con el servidor
        this.websocket.addEventListener("open", (event) => this.onOpen(event.data));
        //Acción a realizar cuando se desencadena un error con el servidor
        this.websocket.addEventListener("close", (event) => this.onClose(event.data));
        this.websocket.addEventListener("message", (event) => this.onMessage(event.data));
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