@echo off
title ScriptGenerator
del FlangerJS.js
echo Creating file...
for /F "tokens=*" %%A in (plugins.txt) do (
    type %%A >> FlangerJS.js
    echo. >> FlangerJS.js
    echo. >> FlangerJS.js
) %%A