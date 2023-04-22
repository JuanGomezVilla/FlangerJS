<img width="400" src="assets/logo_min.png">

[![FlangerJS](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://flangerjs.org)

FlangerJS is a 2D game development framework written in JavaScript. It allows the programmer to have direct access to the canvas, at the same time that it has predefined controllers.


## Advantages
- Using defined scenes
- Support for mouse, keyboard, and gamepad
- Developer customizable layer order
- Application of plugins for 2D environment
- Direct flow control
- Neat code

## Setup
Download the project. You need to have a web browser, preferably Google Chrome, and a code editor like Sublime Text 3 or Visual Studio Code.

## Classes and reserved words
To work on the framework, there are variables and classes that should not be modified, overwritten or access their data, since it can give errors and for this there are already more direct and readable methods.

### Reserved variables
The reserved variables cannot be modified neither in the name nor in their attributes if it is not by methods. Modifying the attributes is an action that if carried out does not crash the game, but doing so can cause crashes.
- **canvas**: controls all data on the canvas
- **ctx**: saves the canvas context
- **interval**: contains the screen update data
