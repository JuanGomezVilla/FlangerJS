class FJSradius extends FJScontroller {
    constructor(data){
        super(data.x, data.y, () => {
            if(this.checked) this.onChecked();
            else this.drawMethod();
        }, data.onHover, data.onPressed, data.onClick, true);
        this.text = data.text;
        this.radius = data.radius;
        this.checked = data.checked || false;
        //Gráfico sin checked, por defecto función vacía
        this.drawMethod = data.draw || function(){};
        //Gráfico a dibujar cuando está checked, por defecto el método de dibujo
        this.onChecked = data.onChecked || this.drawMethod;
    }

    hover(){
        return false;
    }

    isChecked(){
        //Captura el estado propio de checked y lo devuelve
        return this.checked;
    }
}