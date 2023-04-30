/*
SCENES
Paste in this file all the scenes that you are going to use
*/

let loadingScene = new FJSscene({
    onRunning: function(){
        FJSscreen.clear();
        FJSscreen.drawBackgroundColor("red");

        botonEmpezar.update();
        botonEmpezar.draw();

    }
});