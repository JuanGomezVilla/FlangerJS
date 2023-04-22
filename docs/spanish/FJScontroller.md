## FJScontroller
A pesar de parecer una clase muy sencilla, cobra un papel muy importante en el desarrollo de componentes de interfaz con el usuario. No es una clase diseñada para crear objetos, sino para definir clases que extienden de esta. Los atributos elementales son las coordenadas, _draw_, _onClick_, _onHover_, _onPressed_. Desde la clase hijo se utiliza la función _super_ para pasar dichos atributos.

Sin embargo, para evitar confusiones y mezclas, existen clases con métodos y atributos similares, permitiendo un código limpio y ordenado, con clases enfocadas para objetivos concretos. Un ejemplo de esto es el siguiente: supón que un sprite extienda de esta clase, es cierto que quieres manejar el control de clicks, pero el hover como otras funciones ya lo tienen clases específicas para esto, dando la posibilidad de cuidar el rendimiento.

En un principio, se pensó que ciertos métodos como los _setter_ y el constructor tuvieran valores por defecto, en caso de que el usuario no los aportara. Sin embargo, se decidió evitar esto, dando a entender que el usuario debería aportar los valores necesarios y así evitar errores posteriores. Además, existen dos tipos de controladores: rectangulares, y path. Los primeros son sencillos, y solo requieren de un ancho y un alto. Por otro lado, el path es un poco más complejo.

En la siguiente tabla, se pueden observar los parámetros del constructor:

| Orden | Nombre | Tipo   | Descripción             |
|-------|--------|--------|-------------------------|
| 1 | x | number | Coordenadas en el eje X |
| 2 | y | number | Coordenadas en el eje Y |
| 3 | width | number | Ancho en píxeles |
| 4 | height | number | Alto en píxeles |