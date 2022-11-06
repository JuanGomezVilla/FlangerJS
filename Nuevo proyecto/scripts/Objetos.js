var assets;

var escenaCargando = new Escena({
    pausa: false,
    onLoad: function(){
        //Carga de materiales
        /*
            Recomendación:
                No finalizar la escena desde assets

        */
        assets = new Assets({
            onFinish: function(){
                terminar = true;
            },
            sprites: [
                {
                    url:"assets/coches.png", datos:{
                        cochePolicia: {x:130, y:16, w:48, h:93}
                    }
                }
            ]
        });
        assets.cargar();
    },
    onRunning: function(){
        pantalla.limpiar();
        pantalla.fondo("blue");
        barraCargando.actualizar();
        barraCargando.dibujar();
    }
});

var escenaJuego = new Escena({
    pausa: false,
    onLoad: function(){
        console.log("saludar");
    },
    onRunning: function(){
        pantalla.limpiar();
        pantalla.fondo("black");
        assets.dibujarSprite(0, "cochePolicia", 50, 50, 48, 93);
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
        escenaCargando.finalizar();
        escenaJuego.iniciar();
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

/*
var coche;
var assets;
var terminar = false;

var escenaCargando = new Escena({
    pausa: false,
    onLoad: function(){
        //Carga de materiales
        //No finalizar la escena desde assets
                assets = new Assets({
                    onFinish: function(){
                        terminar = true;
                    },
                    sprites: [
                        {
                            url:"assets/coches.png", datos:{
                                cochePolicia: {x:130, y:16, w:48, h:93}
                            }
                        }
                    ]
                });
                assets.cargar();
            },
            onRunning(){
                console.log("Actualizando escena cargando");
                if(terminar){
                    escenaCargando.finalizar();
                    escenaJuego.iniciar();
                }
            }
        });
        
        var escenaJuego = new Escena({
            pausa: false,
            onLoad: function(){
                coche = new Coche({
                    x:100,
                    y:100,
                    ancho:25,
                    alto:50
                });
            },
            onRunning: function(){
                pantalla.limpiar();
                pantalla.fondo("#606060");
                
                for(let i=0; i<10; i++){
                    utils.dibujarLinea(
                        50*i + 200,
                        50,
                        50*i + 200,
                        120, "#FFFFFF", 6
                    );
                }
                coche.actualizar();
                coche.dibujar();
        
                
            }
        });
 */