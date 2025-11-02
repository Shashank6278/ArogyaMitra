# Kill any process using port 5174
Write-Host "Killing processes on port 5174..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 5174 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
foreach ($proc in $processes) {
    Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue
    Write-Host "Killed process $proc" -ForegroundColor Green
}

# Wait a moment
Start-Sleep -Seconds 2

# Start admin panel
Write-Host "Starting admin panel on port 5174..." -ForegroundColor Cyan
Set-Location "c:\Users\shash\OneDrive\Desktop\ArogyaMitra\admin"
npm run dev
