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
    drawProgress: function(x, y, width, height, color, progress){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillRect(x + 3, y + 3, width * (progress/100) - 6, height - 6);
    },
    drawRadius: function(x, y, radius, color){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    },
    drawSelect: function(){

    },
    drawSlide: function(){

    }
}