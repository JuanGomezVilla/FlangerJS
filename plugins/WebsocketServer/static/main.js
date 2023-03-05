let websocketServer, textConnected, chatBox, buttonSend, boxMessage;

function changeStatus(newStatus, color){
    textConnected.innerText = newStatus;
    textConnected.style.color = color;
}

function appendMessage(message, color){
    let messageParagraph = document.createElement("p");
    messageParagraph.innerText = message;
    messageParagraph.style.color = color;
    chatBox.append(messageParagraph);
}

window.onload = function(){
    textConnected = document.querySelector("#textConnected");
    chatBox = document.querySelector("#chatBox");
    buttonSend = document.querySelector("#buttonSend");
    boxMessage = document.querySelector("#boxMessage");

    websocketServer = new WebSocket("ws:192.168.1.77:8080");
    websocketServer.addEventListener("open", (event) => changeStatus("true", "green"));
    websocketServer.addEventListener("error", (event) => changeStatus("not", "red"));
    websocketServer.addEventListener("close", (event) => changeStatus("not", "red"));
    websocketServer.addEventListener("message", (event) => {
        console.log("asdfasdf");
        appendMessage(event.data, "black")
    });

    buttonSend.addEventListener("click", (event) => {
        let messageSend = boxMessage.value;
        websocketServer.send(messageSend);
        appendMessage(messageSend, "blue")
        boxMessage.value = "";
    });
}