# Script Generator

## 1. Creación del proyecto

1. Crear un proyecto utilizando el comando de _dotnet_:
    ```bash
    dotnet new wpf --name ScriptGenerator
    ```
2. Acceder a la carpeta del proyecto:
    ```bash
    cd ScriptGenerator
    ```
3. Instalación de la librería [Material Design In XAML](http://materialdesigninxaml.net/):
    ```bash
    dotnet add package MaterialDesignThemes --version 4.8.0
    ```


## 2. Personalizando la ventana

1. Abre el archivo _MainWindow.xaml_
2. En la etiqueta _Window_, cambia el atributo _Title_ a _FlangerJS - ScriptGenerator_
3. Para personalizar el icono, crea una carpeta de nombre _assets_, y pega en ella un icono, _icon.ico_
4. En el archivo _ScriptGenerator.csproj_, añade dentro de la etiqueta _Project_:
    ```xml
    <ItemGroup>
        <Folder Include="assets\" />
        <Resource Include="assets/icon.ico" />
    </ItemGroup>
    ```
5. Posteriormente, en _MainWindow.xaml_ añade en la etiqueta _Window_ el atributo _Icon_ con la ruta del icono:
    ```xml
    <Window
        ...
        Icon="/assets/icon.ico">
        ...
    </Window>
    ```
6. Cambia el ancho y el alto, la ubicación de inicio y bloquea el maximizado:
    ```xml
    <Window
        ...
        Height="450"
        Width="700"
        ResizeMode="CanMinimize"
        WindowStartupLocation="CenterScreen">
        ...
    </Window>
    ```

## 3. Añadiendo la librería Material

1. Abre el archivo _App.xaml_ y añade dentro de las etiquetas las siguientes líneas (modifica el color en la tercera y cuarta línea):
    ```xml
    <Application
        ...
        xmlns:materialDesign="http://materialdesigninxaml.net/winfx/xaml/themes"
        ...>
        <Application.Resources>
            <ResourceDictionary>
                <ResourceDictionary.MergedDictionaries>
                    <materialDesign:CustomColorTheme BaseTheme="Dark" PrimaryColor="Yellow" SecondaryColor="DarkGreen" />
                    <ResourceDictionary Source="pack://application:,,,/MaterialDesignThemes.Wpf;component/Themes/MaterialDesignTheme.Defaults.xaml" /> 
                </ResourceDictionary.MergedDictionaries>
            </ResourceDictionary>
        </Application.Resources>
    </Application>
    ```
2. Comprueba si en el archivo _ScriptGenerator.csproj_: se ha añadido la referencia a la librería (cambia el valor de _version_ si no fuera 4.8.0, pero por defecto esto ya debería estar):
    ```xml
    <ItemGroup>
        <PackageReference Include="MaterialDesignThemes" Version="4.8.0" />
    </ItemGroup>
    ```

3. Añade la referencia de Material en _MainWindow.xaml_ dentro de la etiqueta _Window_:
    ```xml
    <Window
        ...
        xmlns:MaterialDesign="http://materialdesigninxaml.net/winfx/xaml/themes"
        TextElement.Foreground="{DynamicResource MaterialDesignBody}"
        TextElement.FontWeight="Regular"
        TextElement.FontSize="15"
        TextOptions.TextFormattingMode="Ideal"
        TextOptions.TextRenderingMode="Auto"
        Background="{DynamicResource MaterialDesignPaper}"
        FontFamily="{DynamicResource MaterialDesignFont}">
        ...
    </Window>
    ```

## 3. Compilación y publicación


1. En el archivo _ScriptGenerator.csproj_ añade las siguientes líneas dentro de la etiqueta _Project_, para publicarlo en un solo archivo, sin librerías innecesarias, y con un icono:
    ```xml
    <PublishSingleFile>true</PublishSingleFile>
    <ApplicationIcon>assets/icon.ico</ApplicationIcon>
    ```
2. Ejecuta en el CLI el siguiente comando que hará:
    - Crear un ejecutable para Windows
    - En un solo archivo ejecutable
    - En modo lanzamiento, y no depuración
    - Hace (_self_contained_) que los usuarios tengan que instalar NET cuando está en _false_, sin embargo, en _true_, el archivo ocupa bastante.
    ```bash
    dotnet publish -r win-x64 -p:PublishSingleFile=true --self-contained false -c Release
    ```
3. Tras esto, el programa se habrá compilado en un solo archivo ejecutable.

## Anotaciones

- En el siguiente [enlace](https://www.nuget.org/packages/MaterialDesignThemes/) puedes obtener la última versión de Material Design In Xaml.

