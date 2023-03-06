# ?. Sistema multijugador

## 1. Introducción
Actualmente existe dos tipos de tecnología para conexión entre clientes, posiblemente existan más, pero las más importantes son Websockets y WebRTC.

## 2. Websockets
Esta tecnología es mucho más sencilla que WebRTC, tal vez porque su formato de preparación es bastante sencillo. Con Websockets, puedes conectarte a un servidor que maneja este tipo de conexiones, y a un objeto en el lado del cliente que tendrá las siguientes funciones:

 - Enviar mensajes al servidor
 - Cuando se abre la conexión con el servidor
 - Cuando se cierra la conexión con el servidor
 - Cuando se recibe un mensaje del servidor
 - Cuando se produce un error en la conexión

Si bien es cierto que un objeto de Websockets se le puede asignar directamente escuchadores con _addEventListener_, lo que hace Flanger es agrupar todos esos datos en un solo objeto y dejar ya definidos los métodos de acción una vez que el objeto se ha creado. Un ejemplo muy simple de websockets sin utilizar el framework es el siguiente:

```javascript
//Creación de la conexión con el servidor
const socket = new WebSocket("ws://localhost:8080");

//Acción cuando se abre la conexión con el servidor
socket.addEventListener("open", (event) => {
    socket.send("Conexión abierta");
});

//Accción cuando se recibe un mensaje
socket.addEventListener("message", (event) => {
    //Imprime los datos recibidos
    console.log(event.data);
});
```

En el ejemplo anterior se puede observar que sucederá cuando se abre la conexión con el servidor y cuando se recibe un mensaje del mismo. En cierto modo, es un poco caótico, el ejemplo siguiente es el mismo que el anterior pero utilizando el objeto _FJSwebsocket_, teniendo en cuenta también que lo que se guarda en _socket_ no es un websocket, sino un objeto que funciona en su interior con un websocket:
```javascript
const socket = new FJSwebsocket({
    server: "ws://localhost:8080",
    onOpen: function(){
        console.log("Conexión abierta");
    },
    onMessage: function(event){
        console.log(event.data);
    }
});
```

Sin embargo, _FJSwebsocket_ trae todas las funciones del websocket original: _open_, _message_, _error_, _close_. Para definir estos métodos, utiliza el mismo nombre anteponiendo el prefijo _on_, y la siguiente letra en mayúsculas (ej: _open_ -> _onOpen_). Los atributos se pasarán por un diccionario a la clase. Más abajo encontrarás una tabla con los argumentos a pasar. La clase tiene métodos para enviar un mensaje y para obtener el socket original dentro de la clase.
```javascript
//Creación del objeto y de la conexión
const socketFJS = new FJSwebsocket({
    server: ...,
    onClose: ...,
    onError: ...,
    onMessage: ...,
    onOpen: ...
});

//Envía datos al servidor
socketFJS.send("Datos a enviar");

//Obtiene el socket original
const socket = socketFJS.getWebsocket();
```

Finalmente, cabe destacar que los métodos de cierre, abertura, error y mensajes son opcionales, excepto el atributo _server_ y tienen la posibilidad de recibir los datos del evento:
```javascript
//Creación del objeto y de la conexión
const socketFJS = new FJSwebsocket({
    ...
    onMessage: function(event){
        console.log(event.data);
    }
    ...
}
```

En la siguiente tabla puedes observar los argumentos a pasar y en la siguiente las funciones que contiene la tabla:

Argumentos:
|Nombre|Tipo|Opcional|
|-|-|-|
|_onClose_|_function_|sí|
|_onMessage_|_function_|sí|
|_onError_|_function_|sí|
|_onOpen_|_function_|sí|
|_server_|_string_|no|

Funciones:
|Nombre|Tipo|Devolución|
|-|-|-|
|_getWebsocket_|_function_|websocket|
|_send_|_function_|_void_|


## 3. WebRTC

## 4. Anotaciones
 - Más [información](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) sobre Websockets. 