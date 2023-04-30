/**
 * Clase para definir una barra de progreso con las acciones ya
 * implementadas. Se considera como un control de usuario y no
 * de juego por presentarse en la interfaz
 */
class FJSprogress {
    constructor(data){
        this.x = data.x; //Ubicación en el eje X
        this.y = data.y; //Ubicación en el eje Y
        this.width = data.width; //Ancho del objeto
        this.height = data.height; //Alto del objeto
        this.progress = data.progress || 0; //Progreso actual, por defecto 0
        this.speed = data.speed || 1; //Velocidad de avance, por defecto 1
        //Función de dibujado. Si el valor no es nulo, le pasará el progreso a la función
        //En caso de no especificar datos para esta función, le asigna un método vacío
        this.draw = data.draw != null ? () => data.draw(this.progress) : function(){};
        this.onFinish = data.onFinish || null; //Función de callback para finalizar, por defecto nulo
    }

    /**
     * Función de actualización de los datos. Avanzará el
     * valor del progreso según la velocidad especificada
     * y al terminar ejecutará una posible función de callback
     */
    update(){
        //Comprueba si el progreso es inferior a 100
        if(this.progress < 100){
            //En ese caso, aumenta el progreso según la velocidad fijada
            this.progress += this.speed;
        //Si el método onFinish no es nulo, ejecuta una sola vez el método
        } else if(this.onFinish != null){
            //Evita que el valor se vaya de rango por una alta velocidad
            this.progress = 100;
            //Ejecuta el método onFinish
            this.onFinish();
            //Anula el valor de dicho método para no ser repetido de nuevo
            this.onFinish = null;
        }
    }
}