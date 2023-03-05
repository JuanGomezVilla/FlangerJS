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