# FlangerJS
[![FlangerJS](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://flangerjs.org)

FlangerJS es un marco de desarrollo de videojuegos 2D escrito en JavaScript. Permite crear un videojuego a partir de un código predefinido utilizando librerías propias, que son el mismo framework.

## Ventajas
- Uso de escenas definidas
- Compatibilidad con pulsaciones del ratón y teclas
- Orden de capas adaptable por el desarrollador
- Aplicación de plugins para el entorno 2D
- Control de flujo directo

## Instalación
Descargar el proyecto. Es necesario disponer de un navegador web, preferiblemente Google Chrome, y un editor de código como Sublime Text 3 o Visual Studio Code.

## Clases y palabras reservadas
Para trabajar sobre el framework, existen variables que no deben ser modificadas, sobreescritas o acceder a sus datos, puesto que puede dar errores y para esto ya existen unos métodos más directos y legibles.

### Variables reservadas
Las variables reservadas no pueden ser modificadas ni en el nombre ni en sus atributos si no es por métodos. Modificar los atributos es una acción que si se lleva a cabo no bloquea el juego, pero hacerlo puede provocar fallas.
- lienzo: controla todos los datos del canvas
- lapiz: guarda el contexto del lienzo
- intervalo: contiene los datos de actualización de pantalla
- pantalla: aloja el lienzo, el lápiz, el intervalo para controlarlos directamente
- utils: pertenece a FlangerJS, es una variable no visible directamente sobre el archivo index.html

### Clases reservadas
- Pantalla
- Boton, BotonTexto
- Escena
- Assets
- LoadBar

## Plugins
FlangerJS cuenta con plugins JS adaptados al mismo framework, que funcionan como componentes. Pueden ser extraídos del mismo marco o ser desarrollados por cuenta propia y más tarde integrarlos, respetando las directrices que se establecen.

- No pueden existir nombres repetidos o clases que tengan el nombre de la lista del punto anterior
- Los plugins utilizan las herramientas creadas en el framework
- Evita modificar los parámetros de las clases del framework si no es por métodos

| Plugin | README |
| ------ | ------ |
| LoadBar | [Plugins/LoadBar/README.md][PlDb] |