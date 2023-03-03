# Websockets - Python

## 1. Setup

1. It is recommended to activate a virtual environment to run the server. It can also be done directly on the machine. To create a virtual environment named _env_, use the following command:
	```bash
	python -m venv env
	```
2. To install the requirements in the virtual environment, you need to activate it first:
	```bash
	call env/scripts/activate
	```
3. Run the following command to install the requirements:
	```bash
	pip install -r requirements.txt
	```

## 2. Starting the server

There are two _.py_ files. One starts an HTML server and the other websockets. It is important to configure the firewall to allow access from other devices if connection errors arise. When the servers are started, separately or not, they start at 0.0.0.0, so the server starts at the IP address of the host machine, all that changes is the port. It is recommended to use these ports:
 - 8000: HTML server port
 - 8080: websockets server port

To start both servers, follow the steps below:
1. Run the websocket server with port 8080 (you write it after executing the command):
	```bash
	python WebsocketServer.py
	```
2. Once this is done, after launching the script an information message will appear, copy the address where the websockets server is running and paste it where you start the connection with JavaScript. Example:
	```javascript
	websocketServer = new WebSocket("ws:192.168.156.232:8080");
	```
3. Save the file and run the HTML server (you must specify the name of the folder where the files are to be displayed and the port, recommended 8000):
	```bash
	python HTMLserver.py
	```
4. The HTML server will run with the IP address followed by the port (for example, _192.168.156.232:8000_). To access the HTML server from another device, first you have to be in the same network as the server and from a browser type the address of the device that hosts the server (_192.168.156.232:8000_)

## 3. Annotations

- Although it starts at 0.0.0.0, you can also access it with _localhost_ or 127.0.0.1, but that number is not reachable from devices that don't host the server. Therefore, write down the IP address of the device if you are going to connect different devices.
- If you do not write a port for each server, it will be automatically set to those indicated in point 2
- In short, configure the websockets server first, and then launch the HTML server
- To remove the installed libraries in Python, you can use the following command:
	```bash
	pip freeze
	```