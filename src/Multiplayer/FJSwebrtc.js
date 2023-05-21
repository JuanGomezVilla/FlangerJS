/**
 * **WebRTC**
 * 
 * Class to establish a communication channel between two clients,
 * considered as peer to peer connections. The receiving user has
 * to send a verification code and vice versa, to complete the
 * connection between both points. IMPORTANT: this class is found
 * under development and may still bring bugs or need improvements
 * @author JuanGV
 * @version 1.0.0
 * @name FJSwebrtc
 * @license MIT
 */
class FJSwebrtc {
    /**
     * **Constructor**
     * 
     * Sets the object to handle with WebRTC connections. It will be passed
     * by parameter the callback functions when a trigger is triggered
     * action, and will be processed from those methods
     * @param {Array} data - onMessage
     * @constructor
     */
    constructor(data){
        //Callback functions
        this.onMessage = data.onMessage;
        this.onClientConnected = data.onClientConnected;
        this.onYouConnected = data.onYouConnected;

        //The channel is initially null and the servers can be those indicated by the user or one by default
        this.channel = null;
        this.servers = data.servers || "stun:stun.l.google.com:19302";

        //Creates the connection to the servers and a function for when a data channel is created on the connection
        this.connection = new RTCPeerConnection({iceServers: [{urls: this.servers}]});
        this.connection.ondatachannel = (event) => {
            //Save the channel;
            this.channel = event.channel;
            //Action to take when the offer recipient receives a message
            this.channel.onmessage = (event) => this.onMessage(event.data);
        };
        //Cuando el usuario se ha conectado
        this.connection.onconnectionstatechange = (event) => {
            document.getElementById('connectionState').innerText = this.connection.connectionState;
        };
        //Cuando tu te has conectado
        this.connection.oniceconnectionstatechange = (event) => {
            document.getElementById('iceConnectionState').innerText = this.connection.iceConnectionState;
        };
        
    }

    /**
     * **Accept remote offer**
     * 
     * Method that accepts an offer. If the value is in string, converts it to
     * JSON, otherwise return it in the variable. use this method
     * to accept a remote call and to receive the answer.
     * @param {data} data - Offer value, can be string or JSON
     * @returns {void}
     * @function
     * @public
     */
    async acceptRemoteOffer(data){
        //Check the value and cast it if necessary
        const jsonData = typeof data === "string" ? JSON.parse(data) : data;
        //Sets the connection a description as response
        await this.connection.setRemoteDescription(jsonData)
    }

    /**
     * **Create offer**
     * 
     * Method used to create an offer and send it to the customer to check
     * the connection, this process will also be done by the other client
     * @returns {void}
     * @function
     * @public
     */
    async createOffer(){
        //Create a channel and set an action for the offer sender when they receive a message
        this.channel = this.connection.createDataChannel("data");
        this.channel.onmessage = (event) => this.onMessage(event.data);

        //Cuando se genera un candidato en la conexión
        this.connection.onicecandidate = (event) => {
            //Si el evento no contiene algún candidato
            if (!event.candidate) {
                document.getElementById('createdOffer').value = JSON.stringify(this.connection.localDescription)
                document.getElementById('createdOffer').hidden = false
            }
        }

        //Create an offer with the connection and set it as a local description
        await this.connection.setLocalDescription(await this.connection.createOffer())
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