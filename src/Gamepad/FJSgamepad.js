/**
 * Clase para conectar un solo mando de Gamepad. A diferencia de
 * la clase {@link FJSgamepads}, esta * solo puede controlar las
 * acciones de un mando y es útil si el juego no está enfocado
 * para una experiencia multijugador en el mismo dispositivo
 */
let FJSgamepad = {
    /**
     * Variable del gamepad, inicialmente será un valor nulo. Aloja
     * todos los datos del dispositivo. Es en pocas palabras, el
     * controlador principal. Es un dato público y accesible
     */
    gamepad: null,
    /**
     * Función de arranque. Establecerá los escuchadores principales
     * y posibles métodos de callback
     * @param {object} data 
     */
    init: function(data){
        //Funciones para conectar, desconectar, o en caso de error
        //Si el usuario no aporta una definición de esa función, será un método vacío
        this.onConnect = data.onConnect || function(){};
        this.onDisconnect = data.onDisconnect || function(){};
        this.onError = data.onError || function(){};

        //Escuchador para cuando un mando se conecta, el usuario debe presionar una tecla de dicho mando
        window.addEventListener("gamepadconnected", (event) => {
            //Si el valor del gamepad es nulo, no hay mandos conectados, por lo tanto, se puede guardar
            if(this.gamepad == null){
                //El gamepad recibe el controlador del gamepad que se acaba de conectar
                this.gamepad = event.gamepad;
                //Se ejecuta una posible función definida por el usuario
                this.onConnect(event);
            } else {
                this.onError(event);
            }
        });
        //Escuchador para cuando el mando se desconecte
        window.addEventListener("gamepaddisconnected", (event) => {
            //Si el atributo gamepad es diferente de nulo
            //Y el id del gamepad desconectado es equivalente al id del atributo gamepad
            if(this.gamepad != null && event.gamepad.id == this.gamepad.id){
                //El gamepad es vaciado
                this.gamepad = null;
                //Ejecución de una posible función de desconexión
                this.onDisconnect(event);
            }
        });
    },
    updateGamepad: function(){
        this.gamepad = navigator.getGamepads()[0];
    },
    getAxe: function(axe, sensibilidad=3){
        //parseFloat vs Number
        return parseFloat(this.gamepad.axes[axe].toFixed(sensibilidad));
    },
    getButton: function(iterator){
        return this.gamepad.buttons[iterator];
    },
    //Método que devuelve si el mando está conectado
    isConnected: function(){
        return this.gamepad != null;
    },
    vibrate: function(){
        /*this.gamepad.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 200,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0,
        });*/
    }
}