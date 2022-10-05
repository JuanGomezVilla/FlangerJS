# FrameCounter
FrameCounter.js permite contar el número de frames por segundo (FPS) en la escena del videojuego. Este plugin se encuentra dentro de FlangerJS pero puede ser utilizado en otros proyectos sin el framework. Se recomienda utilizar este plugin solo para el desarrollo y no desplegarlo.

## Instalación
1. Pegar el archivo *FrameCounter.js* en la carpeta Plugins del proyecto
2. En el archivo *index.html* pegar la siguiente línea de código en el apartado de plugins de la cabecera:
```javascript
<script type="text/javascript" src="scripts/Plugins/FrameCounter.js"></script>
```

## Parámetros
No es necesario de parámetros para crear un objeto del tipo FrameCounter

## Ejemplo
```javascript
var contador = new FrameCounter();

```

## Actualización en el canvas
A diferencia de otros métodos, FrameCounter no tiene una función para dibujar, únicamente para actualizar. Dicha función permite contar el número de frames en un segundo. En la última línea de ciclo, se debe llamar al método *actualizar()*:

```javascript
contador.actualizar();
```

El resultado se imprime en la consola del navegador. Por lo tanto, la ventana de herramientas del desarrollador debe estar abierta. Como se indicó al principio, este plugin debe limitarse únicamente a la fase de desarrollo.