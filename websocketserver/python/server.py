# LIBRARIES (asynchronous tasks and websockets)
import asyncio, websockets

# Default port
port = 8080
try:
    # If the user types a correct port
    port = int(input("PORT: "))
except:
    pass

# Connecting clients will be added to the list below
CLIENTS = set()
# Message types for the command console
typesMessage = {
    "warning" : "\033[93m",
    "info" : "\033[92m",
    "error" : "\033[91m"
}

# Function to handle new connections
async def handler(websocket, path):
    # Write to the console that a client has connected
    print("Client connected")
    
    # The new customer is added to the list
    CLIENTS.add(websocket)
    
    # Possible errors when sending data, or when disconnecting
    try:
        # For each websocket message
        async for message in websocket:
            # For every client of clients
            for client in CLIENTS:
                # Send a message to all clients except the sender
                if client != websocket:
                    await client.send(message)
    # Possible websocket error
    except websockets.ConnectionClosedError:
        pass
    finally:
        # The client disconnects, and is removed from the set
        print("Disconnected client")
        CLIENTS.remove(websocket)

# Main function to start the server
async def main():
    # Information message
    sendLog("\nStarting server", "info")

    # Start the server on localhost with the port that the user has indicated at the beginning
    async with websockets.serve(handler, "localhost", port):
        # It says by console that the server has been activated correctly
        sendLog("\nWebsocket server running at 127.0.0.1:"+ str(port), "warning")
        await asyncio.Future() # Run forever

# Function to write messages to the console
def sendLog(message, typeMessage):
    print(typesMessage[typeMessage] + str(message) + "\033[0m")

# In case of pressing CTRL + C to stop the server, avoid error messages
try:
    # Runs the main function, starting the server
    asyncio.run(main())
except:
    # Show server stopped message
    sendLog("\nServer stopped", "error")