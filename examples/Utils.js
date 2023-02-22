let FJSUtils = {
    /**
     * **Get a random number**
     * 
     * Devuelve un número aleatorio entre dos dados
     * @param {number} min Número mínimo que el usuario pasa
     * @param {number} max Número máximo dado
     * @returns {number} Número entero devuelto
     */
    randomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomChoice: function(data){
        return data[this.randomNumber(0, data.length - 1)];
    },
    getContentFromURL: async function(ruta, callback){
        let archivo = await fetch(ruta);
        callback(await archivo.text());
    },
    convertJSON: function(data, string=false){
        return string ? JSON.stringify(data) : JSON.parse(data);
    },
    fillRect: function(x, y, width, height, color="#000000"){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}
//https://dummyjson.com/products/1
