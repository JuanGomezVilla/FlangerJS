# Barra de progreso


## Configuración


## Primeros pasos
Para crear una barra de progreso con datos implementados, utiliza _FJSprogress_, y pásale unas opciones por defecto obligatorias:
```js
let progressBar = new FJSprogress({
    x: 20,
    y: 20,
    width: 200,
    height: 40,
    draw: function(progress){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width * (progress/100), this.height);
    },
    onFinish: function(){
        console.log("Progress finished!");
    }
});
```

## Callback


Este componente permite la implementación de una barra de progreso, evitando que el usuario tenga que programarla. El construtor recibirá por parámetro un diccionario con datos. Dichos datos son los atributos. Los _obligatorios_ son:
 - _x_: representa la ubicación en el eje X
 - _y_: representa la ubicación en el eje Y
 - _width_: ancho del objeto
 - _height_: alto del objeto

Los datos anteriores son atributos del objeto y sirven para ser utilizados de forma interna dentro de la clase, es decir, con alcance. Por otro lado, están los atributos opcionales, aquellos que no son obligatorios y que recibirán un valor por defecto en caso de no tener un valor asignado:
 - _draw_: método de dibujado, recibe un progreso
 - _onFinish_: acción al terminar el progreso
 - _progress_: progreso de la barra. Basado en 100
 - _speed_: velocidad de avance


