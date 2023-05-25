@echo off
rem Window title and color
title FlangerJS - CLI
color 0f

rem Establece un parámetro para realizar dibujados
set "print=for /f %%^" in ("""") do echo(%%~""

rem Applies a line break
echo.
rem Main title with styles
%print%  [33m _____  _[37m                                       _   ______
%print%  [33m|  ___|| |[37m                                     | | /  ____|
%print%  [33m| |__  | |  __ _  _ __    ___    ___  _ __[37m     | ||  (___
%print%  [33m|  __| | | / _` || '_ \  / _ \  / _ \| `__|[37m _  | | \___  \
%print%  [33m| |    | || (_| || | | || (_) ||  __/| |[37m   | |_| | ____)  |
%print%  [33m|_|    |_| \__,_||_| |_| \__, | \___||_|[37m    \____/|______/
%print%  [33m                         __/ /[37m
%print%  [33m                        |___/[37m
%print%
%print%
%print%  [1mDeveloped by JuanGV[0m - https://github.com/JuanGomezVilla
echo.
rem Interpret the parameters that are written by console
if "%~1" == "-help" if "%~1" == "-h" goto :Help
if "%~1" == "-export" if "%~1" == "-compile" goto :Export

rem Send to help
if "%~1" == "" goto :Help

:Export
rem Processing the first two parameters
if "%~2" == "" if not "%~2" == "-default" echo.  [91mYou have to specify a file name, use -default or write a value[37m && goto :EOF
set nameFile=%2
if "%nameFile%" == "-default" set nameFile=Flanger.js
set format=%nameFile:~-3%
if not %format% == .js echo [91mError, the file format must be JavaScript ^(.js^)[37m && goto :EOF

rem Procesa el tercer parámetro, referido a la caja de plugins
rem if not "%~3" == "-plugins" echo [91mError, write file path, parameter -plugins[37m && goto :EOF

rem Delete a possible default file that is already created
del Flanger.js 2>nul

echo.  Creating file...

rem Loop where it will store each line of plugins.txt in the variable A
for /F "tokens=*" %%A in (plugins.txt) do (
    rem Paste the content into the file and add line breaks
    type %%A >> %nameFile%
    echo. >> %nameFile%
    echo. >> %nameFile%
)

rem Applies a line break
echo.
rem Write that the process has finished
echo.  [32mProcess finished...[37m


goto :EOF



:Help
echo.
%print%  Use command -compile or -export to generate a file
%print%  You need to set a name file, or use -default
%print%
%print%  Example: flanger -export -default

goto :EOF