/**
 * **Gamepad**
 * 
 * Class to connect a single Gamepad controller. A difference of
 * the {@link FJSgamepads} class, this * can only control the
 * actions of a controller and is useful if the game is not focused
 * for a multiplayer experience on the same device
 */
let FJSgamepad = {
    /**
     * Gamepad variable, will initially be a null value. hosts
     * all device data. It is in a nutshell, the
     * main controller. It is a public and accessible data
     */
    gamepad: null,
    /**
     * Boot function. Will set the primary listeners
     * and possible callback methods
     * @param {object} data
     * @returns {void}
     * @function
     * @public
     */
    init: function(data){
        //Functions to connect, disconnect, or on error
        //If the user does not provide a definition of that function, it will be an empty method
        this.onConnect = data.onConnect || function(){};
        this.onDisconnect = data.onDisconnect || function(){};
        this.onError = data.onError || function(){};

        //Listener for when a remote is connected, the user must press a key of said remote
        window.addEventListener("gamepadconnected", (event) => {
            //If the gamepad value is null, there are no controllers connected, therefore it can be saved
            if(this.gamepad == null){
                //The gamepad receives the driver from the gamepad that was just connected
                this.gamepad = event.gamepad;
                //A possible user-defined function is executed
                this.onConnect(event);
            } else {
                this.onError(event);
            }
        });
        //Listener for when the remote is disconnected
        window.addEventListener("gamepaddisconnected", (event) => {
            //If the gamepad attribute is different from null
            //And the id of the disconnected gamepad is equivalent to the id of the gamepad attribute
            if(this.gamepad != null && event.gamepad.id == this.gamepad.id){
                //The gamepad is emptied
                this.gamepad = null;
                //Execution of a possible trip function
                this.onDisconnect(event);
            }
        });
    },
    /**
     * **Update gamepad**
     * 
     * Function to update gamepad data
     * @returns {void}
     * @function
     * @public
     */
    update: function(){
        this.gamepad = navigator.getGamepads()[0];
    },
    /**
     * **Get axe**
     * 
     * Method to obtain one of the command axes
     * @param {number} axe Axis, can be vertical or horizontal
     * @param {number} sensitivity Detection sensitivity
     * @returns 
     */
    getAxe: function(axe, sensitivity=3){
        //parseFloat vs Number
        return parseFloat(this.gamepad.axes[axe].toFixed(sensitivity));
    },
    /**
     * **Get button**
     * 
     * Function to get one of the gamepad buttons
     * @param {number} iterator Indicates the order of the button in the set
     * @returns {object} Button object
     */
    getButton: function(iterator){
        return this.gamepad.buttons[iterator];
    },
    /**
     * **Is connected**
     * 
     * Function that returns if the controller is connected
     * @returns {boolean}
     * @function
     * @public
     */
    isConnected: function(){
        return this.gamepad != null;
    },
    /**
     * **Vibrate**
     * 
     * Method to vibrate the controller, not implemented yet
     * @returns {void}
     * @function
     * @public
     */
    vibrate: function(){
        this.gamepad.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 200,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0,
        });
    }
}