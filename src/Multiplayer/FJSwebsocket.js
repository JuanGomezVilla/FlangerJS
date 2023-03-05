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