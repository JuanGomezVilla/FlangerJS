@echo off
::title ScriptGenerator
del FlangerJS.js
echo Creating file...
type "src\FJSscreen.js" >> export\FlangerJS.js
echo. >> export\FlangerJS.js
echo. >> export\FlangerJS.js
type "src\FJSscene.js" >> export\FlangerJS.js
echo. >> export\FlangerJS.js
echo. >> export\FlangerJS.js
type "src\Controllers\FJScontroller.js" >> export\FlangerJS.js
echo. >> export\FlangerJS.js
echo. >> export\FlangerJS.js
type "src\Controllers\Buttons\FJSbutton.js" >> export\FlangerJS.js
echo. >> export\FlangerJS.js
echo. >> export\FlangerJS.js
type "src\Controllers\Buttons\FJSbuttonPath.js" >> export\FlangerJS.js
echo File created succesfully...
::pause > nul
::exit