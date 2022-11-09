/**
 * Permite contar el número de frames por segundo (FPS) en la escena
 * del videojuego. Este plugin se encuentra dentro de FlangerJS pero
 * puede ser utilizado en otros proyectos sin el framework
 */
class FrameCounter {
    /**
     * Crea un interruptor para imprimir los FPS y los establece a 0
     */
    constructor(){
        this.imprimir = true;
        this.frames = 0;
    }

    /**
     * Aumenta los frames, después de 1000 milisegundos, muestra
     * el resultado y lo resetea. El proceso vuelve a empezar
     * con los frames a 0
     */
    actualizar(){
        this.frames++;
        if(this.imprimir){
            this.imprimir = false;
            setTimeout(() => {
                console.log("FPS: "+ this.frames);
                this.frames = 0;
                this.imprimir = true;
            }, 1000);
        }
    }
}