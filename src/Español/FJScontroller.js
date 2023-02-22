/**
 * Clase para crear controladores que responden ante acciones del usuario,
 * por ejemplo, hover, click. La clase aporta los métodos comúnes a todos
 * los tipos de controladores. Por tanto, es importante mencionar que los
 * objetos como checkbox, buttons, etc., extienden de esta clase.
 * @author JuanGV
 * @version 1.0.0.0
 * @name FJScontroller
 * @license MIT
 */
class FJScontroller {
    /**
     * **Constructor**
     * 
     * Recibe en orden los parámetros elementales: coordenadas y dimensiones. 
     * Utilizar el comando _super_ para cuando se extiende desde otra clase.
     * Para evitar errores, los parámetros no contienen valores por defecto.
     * @param {number} x Coordenadas en el eje X
     * @param {number} y Coordenadas en el eje Y
     * @param {number} width Ancho en píxeles
     * @param {number} height Alto en píxeles
     */
    constructor(x, y, width, height){
        /**
         * Coordenadas en el eje X
         * @type {number}
         * @public
         */
        this.x = x;

        /**
         * Coordenadas en el eje Y
         * @type {number}
         * @public
         */
        this.y = y;

        /**
         * Ancho en píxeles
         * @type {number}
         * @public
         */
        this.width = width;

        /**
         * Alto en píxeles
         * @type {number}
         * @public
         */
        this.height = height;
    }

    /**
     * Función utilizada para comprobar si el ratón está posado sobre el objeto
     * @returns {boolean} Booleano mencionando si el ratón está posado sobre el objeto
     * @public
     */
    hover(){
        //Devuelve true cuando ninguna de las condiciones se cumpla
        return !(
            (this.y + (this.height) < FJSscreen.mouse.y) ||
            (this.y > FJSscreen.mouse.y) ||
            (this.x + (this.width) < FJSscreen.mouse.x) ||
            (this.x > FJSscreen.mouse.x)
        );
    }

    /**
     * Devuelve el ancho del objeto
     * @returns {number} Ancho en píxeles
     * @public
     */
    getWidth(){
        //Devolución del atributo
        return this.width;
    }

    /**
     * Devuelve el alto del objeto
     * @returns {number} Alto en píxeles
     * @public
     */
    getHeight(){
        //Devolución del atributo
        return this.height;
    }

    /**
     * Método para cambiar el ancho del objeto, no existe valor por defecto
     * @param {number} width Ancho en píxeles
     * @public
     */
    setWidth(width){
        //El atributo recibe un nuevo valor
        this.width = width;
    }

    /**
     * Método para cambiar el alto del objeto, no existe valor por defecto
     * @param {number} height Alto en píxeles
     * @public
     */
    setHeight(height){
        //El atributo recibe un nuevo valor
        this.height = height;
    }
}