class Assets {
    constructor(datos){
        for(let ruta of datos){
            cargarImagen(ruta).then((bitmap) => {
                console.log("Cargado");
            });;
        }
    }
}

async function cargarImagen(ruta){
    const response = await fetch(ruta);
    const blob = response.ok && await response.blob();
    return createImageBitmap(blob);
}
  
