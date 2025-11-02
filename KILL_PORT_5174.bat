@echo off
echo Killing process on port 5174...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do taskkill /F /PID %%a
echo Done! Port 5174 is now free.
pause
