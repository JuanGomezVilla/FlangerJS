# LIBRARIES (system, keys, and httpserver)
import os, signal, socket
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Message types for the command console
typesMessage = {
    "warning" : "\033[93m",
    "info" : "\033[92m",
    "error" : "\033[91m"
}

# Function to write messages to the console
def sendLog(message, typeMessage):
    print(typesMessage[typeMessage] + str(message) + "\033[0m")

# Sets that the task should be terminated when pressing CTRL + C
signal.signal(signal.SIGINT, signal.SIG_DFL)

# Default port
port = int(input("PORT: ") or "8000")

# Default folder
folder = input("FOLDER: ")

# Set the folder with HTML files
currrentFolder = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(currrentFolder, folder))

# Server handler
class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

# Server start message
sendLog("\nStarting server", "info")

# Start the server on localhost with the mentioned port
htmlServer = HTTPServer(("0.0.0.0", port), CORSRequestHandler)

# Mentions that the server has been started at that address
sendLog("HTML server running at "+ str(socket.gethostbyname(socket.gethostname())) +":"+ str(htmlServer.server_port), "warning")
print("Press CTRL + C to stop")

# Start the server and it will run forever
try:
    htmlServer.serve_forever()
except:
    print("\n\n\nError")