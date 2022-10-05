var assets;

var escenaCargando = new Escena({
    pausa: false,
    onLoad: function(){
        assets = new Assets([
            "assets/imagen.jpg",
            "assets/imagen2.jpg"
        ]);
    },
    onRunning: function(){
        pantalla.limpiar();
        pantalla.fondo("blue");
        barraCargando.actualizar();
        barraCargando.dibujar();
    }
});

var barraCargando = new LoadBar({
    x: 330,
    y: 350,
    ancho: 300,
    alto: 15,
    grosor: 2,
    color1: "#FFFFFF",
    color2: "#000000",
    velocidad: 0.5,
    mostrarTexto: true,
    onFinish: function(){
        console.log("terminado");
    }
});

/*var miraTelescopica = new SniperSight({
    x:50,
    y:50,
    radio: 100,
    color: "#000000",
    grosor: 10,
    raton: true,
    sombra: false
});*/


var botones = [
    new BotonTexto({
        x:10, y:10, ancho:150, alto:50, color1:"#FFFFFF", color2:"#000000", habilitado:true, grosor:4,
        texto: "texto", fuente:"Arial", pesoFuente:"bolder", pixeles: 25,
        onClick: function(){
            escenaCargando.finalizar();
        }
    })
];