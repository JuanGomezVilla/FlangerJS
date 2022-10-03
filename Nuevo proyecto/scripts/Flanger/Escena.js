class Escena {
	constructor(datos){
		this.onLoad = datos.onLoad;
		this.onRunning = datos.onRunning;
		if(datos.pausa != null) this.pausa = datos.pausa;
		else this.pausa = false;
	}

	actualizar(){
		intervalo = requestAnimationFrame(()=>this.actualizar());
		this.onRunning();
		pantalla.anularClick();
	}

	iniciar(){
		this.onLoad();
		this.actualizar();
		console.log("última línea de escena");
	}

	finalizar(){
		window.cancelAnimationFrame(intervalo);
	}
}