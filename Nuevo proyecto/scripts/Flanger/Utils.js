var utils = {
    dibujarRectangulo: function(x, y, ancho, alto, color="#000000"){
        lapiz.fillStyle = color;
        lapiz.fillRect(x, y, ancho, alto);
    },
    dibujarCuadro: function(x, y, ancho, alto, color="#000000", grosor=2){
        lapiz.beginPath();
        lapiz.strokeStyle = color;
        lapiz.lineWidth = grosor;
        lapiz.rect(x, y, ancho, alto);
        lapiz.closePath();
        lapiz.stroke();
    },
    //escribirTexto(texto="", x= , y= , color="", estilo="", size= , fuente="");
    escribirTexto: function(texto, x, y, color, estilo="", size=16, fuente="Arial", horizontal="center", vertical="middle"){
        lapiz.font = estilo +" "+ size +"px "+ fuente;
        lapiz.textBaseline = vertical;
        lapiz.textAlign = horizontal;
        lapiz.fillStyle = color;
        lapiz.fillText(texto, x, y);
    },
    dibujarCircunferencia: function(x, y, radio, color="#000000", grosor=2){
        lapiz.beginPath();
        lapiz.strokeStyle = color;
        lapiz.lineWidth = grosor;
        lapiz.arc(x, y, radio, 0, 2 * Math.PI);
        lapiz.closePath();
        lapiz.stroke();
    },
    dibujarCircunferenciaColor: function(x, y, radio, color="#000000"){
        lapiz.fillStyle = color;
        lapiz.beginPath();
        lapiz.arc(x, y, radio, 0, 2 * Math.PI);
        lapiz.closePath();
        lapiz.fill();
    },
    dibujarLinea: function(x1, y1, x2, y2, color="#000000", grosor=2){
        lapiz.beginPath();
        lapiz.strokeStyle = color;
        lapiz.lineWidth = grosor;
        lapiz.moveTo(x1, y1);
        lapiz.lineTo(x2, y2);
        lapiz.closePath();
        lapiz.stroke();
    },
    configurarSombra: function(color, blur, x, y){
        lapiz.shadowColor = color;
        lapiz.shadowBlur = blur;
        lapiz.shadowOffsetX = x;
        lapiz.shadowOffsetY = y;
    }
}