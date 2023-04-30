let botonEmpezar = new FJSbutton({
    x: 20, y:30, width: 100, height:50,
    draw: function(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    onHover: function(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    onClick: function(){
        console.log("Empezar");
    }
});