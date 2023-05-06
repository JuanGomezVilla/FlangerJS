class FJSgroupRadius {
    constructor(group){
        this.group = group;
    }

    update(){
        this.group.forEach((item) => {
            item.update()
        });
    }

    draw(){
        this.group.forEach((item) => item.draw());
    }

    getItemsChecked(){
        
    }
}