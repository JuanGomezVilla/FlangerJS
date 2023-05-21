/**
 * **Checkbox**
 * 
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
     * @constructor
     */
    constructor(data){
        //Calls the constructor of the extending class
        super(data.x, data.y, () => {
            if(this.checked) this.onChecked();
            else this.drawMethod();
        }, data.onHover, data.onPressed, data.onClick, true);
        //Text linked to the checkbox
        this.text = data.text;
        //Value (a value assigned by the user that is not visible on the interface)
        this.value = data.value;
        this.checked = data.checked || false;
        //Unchecked graph, default empty function
        this.drawMethod = data.draw || function(){};
        //Draw when checked, default draw method
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
     * **Is checked**
     * 
     * Method to check if the checkbox is selected, you can
     * access this state directly by the variable or by this
     * method. Used in case of doubt
     * @returns {boolean} True if the checkbox is selected, false otherwise
     * @function
     * @public
     */
    isChecked(){
        //Captures the checked status and returns it
        return this.checked;
    }
}