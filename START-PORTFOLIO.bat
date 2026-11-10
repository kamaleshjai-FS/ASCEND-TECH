@echo off
title Digital Craft Portfolio - Live Server
cls
echo =====================================================================
echo           DIGITAL CRAFT - CREATIVE DEVELOPER PORTFOLIO
echo =====================================================================
echo.
echo  Starting local development server...
echo  Your browser will open automatically at: http://localhost:3000/
echo.
echo  Press Ctrl+C at any time in this window to stop the server.
echo =====================================================================
echo.

npm.cmd run dev -- --open --port 3000

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo  Trying fallback start command...
  npx.cmd vite --open --port 3000
)

pause
