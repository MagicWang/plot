rmdir build /s /q
.\src\util\buildScripts\build.bat -p plot.profile.js
cd build
del /s *.js.map
del /s *.uncompressed.js