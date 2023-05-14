@echo off
rem Window title
title Library Generator - FlangerJS
rem Delete a possible file that is already created
del Flanger.js 2>nul
rem Applies a line break
echo.
rem Notifies that the file is being created
echo [33mCreating file...[37m
rem Loop where it will store each line of plugins.txt in the variable A
for /F "tokens=*" %%A in (plugins.txt) do (
    rem Paste the content into the file and add line breaks
    type %%A >> Flanger.js
    echo. >> Flanger.js
    echo. >> Flanger.js
)
rem Applies a line break
echo.
rem Write that the process has finished
echo [32mProcess finished...[37m