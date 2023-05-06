/**
 * Button class, extends the _FJScontroller_ class, to obtain the objects
 * initials, such as hover, coordinates, and dimensions. If you want to
 * create a more path button, use FJSbuttonPath
 * @author JuanGV
 * @version 1.0.0
 * @name FJScheckbox
 * @license MIT
 * @extends {FJScontroller}
 */
class FJScheckbox extends FJScontroller {
    /**
     * 
     * @param {*} data 
     */
    constructor(data){
        super(data.x, data.y, () => {
            if(this.checked) this.onChecked();
            else this.drawMethod();
        }, data.onHover, data.onPressed, data.onClick, true);
        this.text = data.text;
        this.value = data.value;
        this.checked = data.checked || false;
        //Gráfico sin checked, por defecto función vacía
        this.drawMethod = data.draw || function(){};
        //Gráfico a dibujar cuando está checked, por defecto el método de dibujo
        this.onChecked = data.onChecked || this.drawMethod;
        /**
         * Width in pixels
         * @type {number}
         * @public
         */
        this.width = data.width;

        /**
         * Height in pixels
         * @type {number}
         * @public
         */
        this.height = data.height;
    }

    /**
     * Método para comprobar si el checkbox está seleccionado, se puede
     * acceder a este estado directamente por la variable o por este
     * método. Utilizado en caso de dudas
     * @returns {boolean} Verdadero si el checkbox está seleccionado, de lo contrario, falso
     */
    isChecked(){
        //Captura el estado propio de checked y lo devuelve
        return this.checked;
    }
}