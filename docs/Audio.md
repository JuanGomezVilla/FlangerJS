# Audio
Con Flanger, se puede reproducir música y audios, siempre que estén dentro del formato admitido. El archivo relacionado a esta documentación es _FJSaudio.js_.


1. [Configuración](#punto1)
2. [Primeros pasos](#punto2)
3. [Volumen](#punto3)
4. [Pausa](#punto4)
5. [Detención](#punto5)
6. [Repetición](#punto6)
7. [Instrucciones complejas](#punto7)
8. [Objeto original](#punto8)
9. [Formatos admitidos](#punto9)


<div id="punto1"></div>

## 1. Configuración
Para utilizar este módulo, debes importarlo al crear la librería personalizada, marcando la casilla _Módulo de audio_.


<div id="punto2"></div>

## 2. Primeros pasos
Cada audio está asociado a un objeto, por lo tanto, crea un objeto (también puedes crearlo dentro de una lista):
```js
let audio = new FJSaudio("example.mp3");
```

Para reproducir el sonido, utiliza:
```js
audio.play();
```
Ten en cuenta que los audios no se reproducen hasta que el usuario no interactúa con la página, esto se debe a una cuestión de políticas del navegador. Una vez que el usuario haya hecho click sobre la página u otro evento que suponga la interacción directa con la web, estará disponible la reproducción sin necesidad de que el usuario haga más.

Puedes hacer una detección de la siguiente forma (cuando el usuario pulse una tecla, el audio se reproduce, ya que esto implica una interacción directa):
```js
window.addEventListener("keydown", () => audio.play());
```
Cabe destacar que la clase _FJSaudio_ no extiende de la clase _Audio_, recoge métodos de dicha clase pero no los hereda. El [punto 8](#punto8) explica como acceder a todos los métodos de esa clase.


<div id="punto3"></div>

## 3. Volumen
Puedes cambiar el volumen, llamando al atributo _volume_. Puedes obtener su valor o cambiarlo (el volumen debe estar en un rango entre 0 y 1):
```js
console.log(audio.volume);
audio.volume = 0.5;
```

Además, también puedes establecer el audio en silencio, u obtener su estado:
```js
audio.muted = true;
console.log(audio.muted);
```


<div id="punto4"></div>

## 4. Pausa
El audio puede ser pausado para luego continuar desde el momento en el que se detuvo. Ejecutando la siguiente línea, el audio cambiará su estado de pausa a reproducción, o viceversa:
```js
audio.togglePause();
```
> Este método solo funciona si el audio se ha reproducido. Si se detuvo con _stop_ (ver siguiente punto), el tiempo se fija a 0, por lo tanto, no se puede pausar algo que no ha comenzado todavía.

Puedes comprobar si el audio está en pausa con el atributo _paused_:
```js
console.log(audio.paused);
```
 

<div id="punto5"></div>

## 5. Detención
A diferencia del método de pausa, este método detiene el audio por completo y deja el tiempo fijado a 0, es decir, desde el inicio:
```js
audio.stop();
```


<div id="punto6"></div>

## 6. Repetición
Esta función repetirá el audio desde el inicio cuando se llame:
```js
audio.replay();
```


<div id="punto7"></div>

## 7. Instrucciones complejas
Puedes pasar instrucciones más complejas al crear un audio, es decir, un diccionario como opciones:
```js
let audio = new FJSaudio({
    src: "example.mp3",
    onLoad: function(){
        console.log("Load!");
    },
    onFinish: function(){
        console.log("Sound finish");
        /* this.replay(); //Replay on finish */
    }
});
```


<div id="punto8"></div>

## 8. Objeto original
El acceso al objeto original del audio está en privado, es decir, no se puede accedir directamente sino es con un método que lo permita. Para obtener el objeto original, utiliza:
```js
audio.getObject();
```


<div id="punto9"></div>

## 9. Formatos admitidos
Un aspecto fundamental de los navegadores es que no aceptan todo tipo de formatos de audio. Esto no lo puede remediar Flanger como tal porque es algo que afecta al propio navegador. Los formatos admitidos son:
- _mp3_: es audio comprimido, es útil cuando se requieren grandes cantidades de audios, pero puede tener pérdidas de calidad. Puede enfocarse para sonidos de larga duración, como la banda sonora, por ejemplo.
- _wav_: es un formato de audio sin comprimir que conserva la calidad completa del archivo de audio original, por lo que son más grandes que los mp3. Se usa a menudo para efectos de sonido o música en videojuegos.
- _ogg_: es un formato de audio comprimido que a menudo se utiliza en videojuegos porque proporciona buena calidad de audio mientras mantiene un tamaño de archivo pequeño. Los archivos OGG pueden ser tanto de pérdida como sin pérdida, dependiendo de los ajustes de compresión utilizados. OGG es un formato popular para la música en juegos, ya que proporciona un buen equilibrio entre calidad y tamaño de archivo. **Importante**: no es compatible en Safari.


