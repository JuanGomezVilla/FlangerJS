class SniperSight {
	/**
	 * Constructor. Datos: x, y, radio, color, grosor, raton, sombra, velocidad
	 * @constructor
	 * @param {*} datos 
	 */
	constructor(datos){
		this.x 		= datos.x;			//Ubicación en el eje X
		this.y 		= datos.x;			//Ubicación en el eje Y
		this.radio 	= datos.radio;		//Radio de la circunferencia
		this.color 	= datos.color;		//Color del objeto
		this.grosor = datos.grosor;		//Grosor del borde
		this.raton 	= datos.raton;		//Utilizar ratón
		this.sombra = datos.sombra;		//Aplicar sombra
	}

	actualizar(){
		if(this.raton){
			this.x = pantalla.raton.x - 100;
			this.y = pantalla.raton.y - 100;
		}
	}

	dibujar(){
		utils.dibujarLinea(this.x, this.y - this.radio, this.x, this.y + this.radio, "#000000", 2);
		utils.dibujarLinea(this.x - this.radio, this.y, this.x + this.radio, this.y, "#000000", 2);
		utils.dibujarCircunferenciaColor(this.x, this.y, 2, "red");

		if(this.sombra){
			lapiz.save();
			utils.configurarSombra("black", 15, 0, 0);			
			utils.dibujarCircunferencia(this.x, this.y, this.radio, this.color, this.grosor);
			lapiz.restore();
		} else {
			utils.dibujarCircunferencia(this.x, this.y, this.radio, this.color, this.grosor);
		}
	}
}