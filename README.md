# FlangerJS
FlangerJS es un marco de desarrollo de videojuegos 2D escrito en JavaScript. Permite crear un videojuego a partir de un código predefinido utilizando librerías propias, que son como tal el mismo framework.

## Features
- Uso de escenas definidas
- No es necesario acceder al código fuente para corregir errores
- Compatibilidad con pulsaciones del ratón y teclas
- Orden de capas en pulsaciones adaptable por el desarrollador
- Aplicación de plugins para el entorno 2D

## Instalación
Descargar el proyecto. Es necesario disponer de un navegador web, preferiblemente Google Chrome, y un editor de código como Sublime Text 3 o Visual Studio Code.

## Clases y palabras reservadas
Para trabajar sobre el framework, existen variables que no deben ser modificadas, sobreescritas o acceder a sus datos, puesto que puede dar errores y para esto ya existen unos métodos más directos y legibles.

### Variables reservadas
Las variables reservadas no pueden ser modificadas ni en el nombre ni en sus atributos si no es por métodos. Modificar los atributos no es una acción que si se lleva a cabo bloquea el juego, pero hacerlo puede provocar fallas.
- lienzo: controla todos los datos del canvas
- lapiz: guarda el contexto del lienzo
- intervalo: actualiza la pantalla
- pantalla: aloja el lienzo, el lápiz, el intervalo para controlarlos directamente
- sistema: controla el funcionamiento del sistema

### Clases reservadas


## Plugins
FlangerJS cuenta con plugins JS adaptados al mismo framework, que funcionan como componentes. Pueden ser extraídos del mismo marco o ser desarrollados por cuenta propia y más tarde integrarlo, respetando las directrices que se establecen.

**Directrices:**
- No pueden existir nombres repetidos o clases que tengan el nombre de la lista del punto anterior
- Los plugins utilizan las herramientas creadas en el framework
- Evita modificar los parámetros de las clases del framework si no es por métodos

| Plugin | README |
| ------ | ------ |
| BarraCargando | [Plugins/BarraCargando/README.md][PlDb] |