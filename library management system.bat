@echo off

echo Starting Library Management System...

start "Library Backend" cmd /k "cd /d "%~dp0backend" && node server.js"

timeout /t 3 /nobreak >nul

start "Library Frontend" cmd /k "cd /d "%~dp0frontend" && npx live-server"

timeout /t 3 /nobreak >nul

start http://127.0.0.1:8080/login.html

exit