# LoadBar
LoadBar.js se encuentra en el propio framework como plugin. Imprime una barra de carga en movimiento y cuando finaliza ejecuta un método.

## Instalación
1. Pegar el archivo *LoadBar.js* en la carpeta Plugins del proyecto
2. En el archivo *index.html* pegar la siguiente línea de código en el apartado de plugins de la cabecera:
```javascript
<script type="text/javascript" src="scripts/Plugins/LoadBar.js"></script>
```

## Parámetros
Los parámetros se pasan por una lista, por lo tanto habrá que abrir dos llaves y en el interior escribir los parámetros de la tabla siguiente:

| Parámetro  | Descripción  | Tipo | Ejemplo |
| ------------ | ------------ | ------------ | ------------ |
| x | ubicación en el eje X | integer | 330 |
| y | ubicación en el eje Y | integer | 350 |
| ancho | ancho de la barra | integer | 300 |
| alto | alto de la barra | integer | 15 |
| grosor | grosor del borde | integer | 2 |
| color1 | color principal | string | #FFFFFFF |
| color2 | color secundario | string | #000000 |
| velocidad | velocidad de avance de la barra | integer | 2 |
| mostrarTexto | permite mostrar el progreso | boolean | true |
| onFinish | método a ejecutar cuando termine | function | - |

La velocidad tambien puede ser un número decimal, como 0.5, aunque en la tabla indique que es un número entero.

## Ejemplo
```javascript
var barra = new LoadBar({
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
        console.log("Hello World!");
    }
});

```

## Dibujo en el canvas
El objeto creado se imprime en el canvas utilizando el mismo proceso que otros objetos:
- actualizar: cambia el estado del objeto, pero no lo dibuja
- dibujar: dibuja el objeto

Por lo tanto, es de entender que primero habrá que actualizar la barra llamando al método *actualizar()* y posteriormente dibujarlo con *dibujar()*. Esto es lo que se llama como definición de controles y capas, y permite un correcto uso del ratón en las capas delanteras y posteriores. Ejemplo:
```javascript
barra.actualizar();
console.log("Hello World!");
barra.dibujar();
```