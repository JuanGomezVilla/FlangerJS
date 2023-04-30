class FJScheckbox extends FJScontroller {
    constructor(data){
        super(data.x, data.y, data.width, data.height, () => {
            if(this.checked) this.onChecked();
            else this.drawMethod();
        }, data.onHover, data.onPressed, data.onClick, true);
        this.text = data.text;
        this.checked = data.checked || false;
        this.drawMethod = data.draw || function(){};
        this.onChecked = data.onChecked || this.drawMethod;
    }

    isChecked(){
        return this.checked;
    }
}