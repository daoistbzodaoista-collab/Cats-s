@echo off
cd /d "%~dp0"
echo Iniciando CAT - Living Room en http://localhost:8000
start "CAT - Living Room" http://localhost:8000
py -m http.server 8000
pause
