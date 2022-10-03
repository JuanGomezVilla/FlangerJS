class Pantalla {
	constructor(datos){
		//Captura el lienzo por id, class o ningún valor; y crea el lápiz
		if(datos.id != null) lienzo = document.getElementById(datos.id);
		else if(datos.class != null) lienzo = document.getElementsByClassName(datos.class)[0];
		else lienzo = document.getElementsByTagName("canvas")[0];
		lapiz = lienzo.getContext("2d");

		//Utilizar borde
		if(datos.borde) lienzo.style.border = "1px solid #000000";
		
		//Calibra el ancho y el alto
		if(datos.fullscreen){
			this.fullscreen = datos.fullscreen;
			this.color = datos.color;
			document.body.style.margin = 0;
			lienzo.width = document.body.clientWidth;
			lienzo.height = document.body.clientHeight;
		} else {
			if(datos.ancho != null && datos.ancho != null){
				lienzo.width = datos.ancho;
				lienzo.height = datos.alto;
			}
		}

		this.ancho = lienzo.width;
		this.alto = lienzo.height;
		
		//CONTROLES DEL RATÓN (x, y, click, presionado)
		this.raton = {x:0, y:0, click:false, presionado:false};
		window.addEventListener("click", () => this.raton.click = true);
		window.addEventListener("mousedown", () => this.raton.presionado = true);
		window.addEventListener("mouseup", () => this.raton.presionado = false);
		window.addEventListener("mousemove", (evento) => {
			var rectangulo = lienzo.getBoundingClientRect();
			this.raton.x = evento.clientX - rectangulo.left;
			this.raton.y = evento.clientY - rectangulo.top;
		})

		//CONTROLES DEL TECLADO
		this.teclado = {};
		window.addEventListener("keydown", (evento) => this.teclado[evento.key] = true);
		window.addEventListener("keyup", (evento) => this.teclado[evento.key] = false);
	}

	fondo(color){
		lapiz.fillStyle = color;
		lapiz.fillRect(0, 0, this.ancho, this.alto);
	}

	limpiar(){

		lapiz.clearRect(0, 0, this.ancho, this.alto);
	}

	anularClick(){
		this.raton.click = false;
	}

	getAncho(){

	}

	getAlto(){
		return 
	}

	getObjectX(porcentaje){
		return Math.floor((porcentaje/100) * this.ancho);
	}

	getObjectY(porcentaje){
		return Math.floor((porcentaje/100) * this.alto);
	}

}