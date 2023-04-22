# Audio
Con Flanger, se puede reproducir música y audios, aquellos que estén dentro del formato admitido.

## Configuración
Para utilizar este módulo, debes importarlo cuando vas a crear la librería personalizando, marcando la casilla de _Módulo de audio_.


## Primeros pasos
Cada audio está asociado a un objeto, por lo tanto, crea un objeto (también puedes crearlo dentro de una lista):
```js
let audio = new FJSaudio("example.mp3");
```

Para reproducir el sonido, utiliza:
```js
audio.play();
```
Ten en cuenta que los audios no se reproducen hasta que el usuario no interactúa con la página, esto se debe a una cuestión de políticas del navegador. Una vez que el usuario haya hecho click sobre la página u otro evento que suponga la interacción directa con la web, estará disponible la reproducción de audio sin necesidad de que el usuario haga más.

Puedes hacer una detección de la siguiente forma (cuando el usuario pulse una tecla, el audio se reproduce, por ejemplo):
```js
window.addEventListener("keydown", () => audio.play());
```

## Pausar el audio
El audio puede ser pausado para luego continuar desde el momento en el que se detuvo. Ejecutando la siguiente línea, el audio cambiará su estado de pausa a reproducción, o viceversa:
```js
audio.togglePause();
```
> Este método solo funciona si el audio se ha reproducido. Si se detuvo con _stop_ (ver siguiente punto), el tiempo empieza a 0, por lo tanto, no se puede pausar algo que no ha comenzado todavía.
 

## Detener el audio
A diferencia del método de pausa, este método detiene el audio por completo y deja el tiempo fijado a 0, es decir, desde el inicio:
```js
audio.stop();
```


## Repetir el audio
Esta función repetirá el audio desde el inicio cuando se llame:
```js
audio.replay();
```