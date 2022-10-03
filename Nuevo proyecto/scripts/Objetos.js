var escenaCargando = new Escena({
	pausa: true,
	onLoad: function(){
		console.log("Preparación");
	},
	onRunning: function(){
		pantalla.limpiar();
		pantalla.fondo("blue");

		if(this.pausa){
			console.log("hola");
		} else {
			console.log("No en pausa");
			//botones[0].actualizar();
		}

		botones[0].dibujar();
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

var miraTelescopica = new SniperSight({
	x:50,
	y:50,
	radio: 100,
	color: "#000000",
	grosor: 10,
	raton: true,
	sombra: false
});


var botones = [
	new BotonTexto({
		x:10, y:10, ancho:150, alto:50, color1:"#FFFFFF", color2:"#000000", habilitado:true, grosor:4,
		texto: "texto", fuente:"Arial", pesoFuente:"bolder", pixeles: 25,
		onClick: function(){
			escenaCargando.finalizar();
		}
	})
];