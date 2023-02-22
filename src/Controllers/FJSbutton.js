/**
 * Clase Botón, extiende de la clase controlador para obtener los objetos
 * iniciales, tales como el hover, las coordenadas, y las dimensiones. Si
 * se quiere crear un botón más complejo, utilizar FJSbuttonComplex
 */
class FJSbutton extends FJScontroller {
    /**
     * Constructor del objeto. Recibe las características iniciales
     * más los métodos de procesamiento
     * @param {array} data 
     */
    constructor(data){
        super(data.x, data.y, data.width, data.height);
        this.drawNormal = data.draw;
        this.onHover = data.onHover == null ? function(){} : data.onHover;
        this.onClick = data.onClick == null ? function(){} : data.onClick;
        this.onPressed = data.onPressed == null ? function(){} : data.onPressed;
    }

    draw(){
        this.drawNormal();
        if(this.hover()) this.onHover();
        if(this.hover() && FJSscreen.mouse.pressed) this.onPressed();
    }

    update(){
        if(this.hover() && FJSscreen.mouse.click) this.onClick();
    }

    click(){
        this.onClick();
        FJSscreen.cancelClick();
    }
}