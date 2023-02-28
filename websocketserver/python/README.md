# Websockets server in Python

## 1. Setup

1. It is recommended to activate a virtual environment to run the server. It can also be done directly on the machine. To create a virtual environment named _env_, use the following command:
	```bash
	python -m venv env
	```

2. To install the requirements (websockets), it is necessary to activate the virtual environment first:
	```bash
	call env/scripts/activate
	```
	
3. After having activated the virtual environment, install the requirements:
	```bash
	pip install -r requirements.txt
	```


## 2. Starting server
There are two methods to run the server:
- The automated method is to run the _run.bat_ file from the CLI:
	```bash
	call run
	```

- The second, non-automated method is to run the following commands:
	```bash
	call env/scripts/activate
	python server.py
	```

## 3. Annotations

- To remove the installed libraries in Python, you can use the following command:
	```bash
	pip freeze
	```

- Once one of the two previous steps has been carried out, and understanding that the file has been executed correctly, a text will appear on the screen asking for the port, write a number, if you press _Enter_ the default port will be 8000.

## 4. Example

To see the _example.html_ file in action, start the server, and then open two different tabs to check the messages that are being sent and received.