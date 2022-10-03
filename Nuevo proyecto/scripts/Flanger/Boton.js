class Boton {
	constructor(datos){
		this.x = datos.x;
		this.y = datos.y;
		this.ancho = datos.ancho;
		this.alto = datos.alto;
		this.color1 = datos.color1;
		this.color2 = datos.color2;
		this.grosor = datos.grosor;
		this.onClick = datos.onClick;
		this.habilitado = datos.habilitado;
	}

	actualizar(){
		if(this.hover() && pantalla.raton.click && this.habilitado){
			this.onClick();
			pantalla.anularClick();
		}
	}

	hover(){
		return !(
			(this.x > pantalla.raton.x) ||
			(this.y > pantalla.raton.y) ||
			(this.x + this.ancho < pantalla.raton.x) ||
			(this.y + this.alto < pantalla.raton.y)
			
		);
	}
}

class BotonTexto extends Boton {
	constructor(datos){
		super({
			x:datos.x, y:datos.y,
			ancho:datos.ancho, alto:datos.alto,
			color1:datos.color1, color2:datos.color2,
			grosor:datos.grosor,
			onClick:datos.onClick, habilitado:datos.habilitado
		});
		this.texto = datos.texto;
		this.fuente = datos.fuente;
		this.pixeles = datos.pixeles;
		this.pesoFuente = datos.pesoFuente;
	}

	dibujarCuadro(color1, color2){
		var colorFondo;
		if(this.hover() && this.habilitado){
			colorFondo = color1;
		} else {
			colorFondo = color2;
		}

		utils.dibujarRectangulo(this.x, this.y, this.ancho, this.alto, colorFondo);
		utils.dibujarCuadro(this.x, this.y, this.ancho, this.alto, color1, this.grosor);
	}

	dibujar(inhabilitar=false){
		this.dibujarCuadro(this.color1, this.color2);

		var colorTexto;
		if(this.hover() && this.habilitado && !inhabilitar) colorTexto = this.color2;
		else colorTexto = this.color1;
		
		utils.escribirTexto(
			this.texto,
			this.x + this.ancho/2,
			this.y + this.alto/2,
			colorTexto,
			this.pesoFuente,
			this.pixeles,
			this.fuente
		);
	}
}


