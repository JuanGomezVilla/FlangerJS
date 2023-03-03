# Websockets - Python

## 1. Configuración

1. Se recomienda activar un entorno virtual para ejecutar el servidor. También se puede hacer directamente en la máquina. Para crear un entorno virtual llamado _env_, utiliza el siguiente comando:
	```bash
	python -m venv env
	```
2. Para instalar los requisitos en el entorno virtual, es necesario activarlo primero:
	```bash
	call env/scripts/activate
	```
3. Ejecuta el siguiente comando para instalar los requisitos:
	```bash
	pip install -r requirements.txt
	```

## 2. Iniciando el servidor

Existen dos archivos _.py_. Uno inicia un servidor de HTML y otro de websockets. Es importante configurar el firewall para permitir accesos desde otros dispositivos si surgen errores de conexión. Cuando se inician los servidores, de forma separada o no, se inician en 0.0.0.0, de tal modo que el servidor se inicia en la dirección IP de la máquina que lo hospeda, lo único que cambia es el puerto. Se recomienda utilizar estos puertos:
 - 8000: puerto del servidor HTML
 - 8080: puerto del servidor de Websockets

Para iniciar ambos servidores, sigue los siguientes pasos:
1. Ejecuta el servidor de websockets con el puerto 8080 (lo escribes tras ejecutar el comando):
	```bash
	python WebsocketServer.py
	```
2. Hecho esto, tras lanzar el script aparecerá un mensaje con información, copia la dirección donde se está ejecutando el servidor de websockets y pégalo en donde inicias la conexión con JavaScript. Ejemplo:
	```javascript
	websocketServer = new WebSocket("ws:192.168.156.232:8080");
	```
3. Guarda el archivo y ejecuta el servidor HTML (deberás especificar el nombre de la carpeta donde están los archivos a mostrar y el puerto, recomendable 8000):
	```bash
	python HTMLserver.py
	```
4. El servidor HTML se ejecutará con la dirección IP seguido del puerto (por ejemplo, _192.168.156.232:8000_). Para acceder al servidor HTML desde otro dispositivo, primero tienes que estar en la misma red del servidor y desde un navegador escribir la dirección del dispositivo que aloja el servidor (_192.168.156.232:8000_)


## 3. Anotaciones

- Aunque se inicia en 0.0.0.0, también puedes acceder con _localhost_ o 127.0.0.1, pero ese número no es accesible desde dispositivos que no alojan el servidor. Por lo tanto, escribe la dirección IP del dispositivo si vas a conectar dispositivos diferentes.
- Si no escribes un puerto para cada servidor, se fijará automáticamente a los indicados en el punto 2
- En resumen, configura primero el servidor websockets, y luego lanza el servidor HTML
- Para eliminar las bibliotecas instaladas en Python, puede usar el siguiente comando:
	```bash
	pip freeze
	```