let FJSgamepads = {
    gamepads: [],
    init: function(data){
        this.onConnect = data.onConnect || function(){};
        this.onDisconnect = data.onDisconnect || function(){};

        window.addEventListener("gamepadconnected", (event) => {
            this.onConnect(event);
        });
        window.addEventListener("gamepaddisconnected", (event) => {
            
        });
    }
}