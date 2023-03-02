class FJSwebsocket {
    constructor(data){
        this.url = data.url;
        this.onMessage = data.onMessage || function(){};
        this.onOpen = data.onOpen || function(){};
        this.onClose = data.onClose || function(){};
        this.onMessage = data.onMessage || function(){};
        this.onError = data.onError || function(){};
        this.websocket = new WebSocket(this.url);
        this.websocket.addEventListener("open", (event) => this.onOpen(event.data));
        this.websocket.addEventListener("close", (event) => this.onClose(event.data));
        this.websocket.addEventListener("message", (event) => this.onMessage(event.data));
        this.websocket.addEventListener("error", (event) => this.onError(event.data));
    }

    send(data){
        this.websocket.send(data);
    }

    getWebsocket(){
        return this.websocket;
    }
}