/*
Clase utilizada para definir temas. En caso de tener una gran cantidad de botones, modifique
estas funciones y llámelas cuando sea necesario
*/
let FJStheme = {
    drawButton: function(text, x, y, width, height, color){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "bold italic 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + width/2, y + height/2);
    },
    drawCheckbox: function(x, y, width, height, color1, color2){
        ctx.beginPath();
        ctx.strokeStyle = color1;
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color2;
        ctx.fillRect(x + 3, y + 3, width - (3*2), height - (3*2));
    },
    drawSelect: function(){

    },
    drawSlide: function(){

    }
}