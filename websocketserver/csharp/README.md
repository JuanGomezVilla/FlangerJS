# Creación del proyecto

## Preparación

1. Instalar NET 6.0 desde https://dotnet.microsoft.com/en-us/download (versión compatible)

2. Abrir este proyecto, no es necesario de una solución

3. Ejecutar el comando para construir: dotnet build


## Comandos útiles
dotnet new console

## Pasos en la creación de un proyecto similar

 1. Abrir VS Code en una carpeta
 2. Abrir un terminal y escribir el siguiente comando: dotnet new wpf
 3. Construir el proyecto: dotnet build
 4. Posteriormente, instalar la librería de Material Design XAML (https://www.nuget.org/packages/MaterialDesignThemes/) con el comando:
    ```bash
    dotnet add package MaterialDesignThemes --version 4.7.1
    ```
 5. Crear una carpeta _models_ para guardar en ella las clases
 6. Crear una carpeta _static_ para contenido HTML de prueba
 7. Agregar las librerías a XAML de Material Design
     
 - Crear un proyecto en WPF: dotnet new wpf
 - Instalar Material Design XAML