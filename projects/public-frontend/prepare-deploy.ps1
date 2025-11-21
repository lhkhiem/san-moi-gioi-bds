# Script chuẩn bị files để deploy lên VPS
# Chạy script này sau khi build xong

$deployDir = "deploy-package"
$standaloneDir = ".next/standalone"
$staticDir = ".next/static"
$publicDir = "public"

Write-Host "Chuan bi files de deploy..." -ForegroundColor Green

# Tạo thư mục deploy
if (Test-Path $deployDir) {
    Remove-Item -Recurse -Force $deployDir
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy standalone
Write-Host "Copy standalone build..." -ForegroundColor Yellow
Copy-Item -Recurse -Force "$standaloneDir\*" "$deployDir\"

# Copy static files
Write-Host "Copy static files..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$deployDir\.next" -Force | Out-Null
Copy-Item -Recurse -Force "$staticDir" "$deployDir\.next\"

# Copy public files
Write-Host "Copy public assets..." -ForegroundColor Yellow
Copy-Item -Recurse -Force "$publicDir" "$deployDir\"

# Tạo file .env.example
Write-Host "Tao .env.example..." -ForegroundColor Yellow
$envContent = @"
NODE_ENV=production
PORT=4002
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
"@
$envContent | Out-File -FilePath "$deployDir\.env.example" -Encoding UTF8 -NoNewline

# Tạo script start.sh cho VPS
Write-Host "Tao start script..." -ForegroundColor Yellow
$startScript = @"
#!/bin/bash
# Script de chay Next.js standalone tren VPS

export NODE_ENV=production
export PORT=4002

# Chay server
node server.js
"@
$startScript | Out-File -FilePath "$deployDir\start.sh" -Encoding UTF8 -NoNewline

# Tạo README cho deployment
Write-Host "Tao README..." -ForegroundColor Yellow
$readmeContent = @"
# Huong dan Deploy len VPS

## Files trong package nay:
- server.js - Next.js server
- .next/static/ - Static assets
- public/ - Public files
- node_modules/ - Dependencies (neu co)

## Cach deploy:

### 1. Upload files len VPS
scp -r deploy-package/* user@vps:/path/to/deploy/

### 2. Tren VPS, cai dat Node.js (neu chua co)
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Hoac dung nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18

### 3. Tao file .env
cd /path/to/deploy
cp .env.example .env
nano .env  # Sua cac gia tri can thiet

### 4. Chay server
# Cach 1: Chay truc tiep
NODE_ENV=production PORT=4002 node server.js

# Cach 2: Dung PM2 (khuyen nghi)
npm install -g pm2
pm2 start server.js --name public-frontend --env production -- --port 4002
pm2 save
pm2 startup  # Tu dong start khi server reboot

### 5. Cau hinh Nginx (tuy chon)
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }
}

## Luu y:
- Dam bao port 4002 khong bi firewall chan
- Kiem tra Node.js version >= 18
- Neu thieu dependencies, chay: npm install --production trong thu muc deploy
"@
$readmeContent | Out-File -FilePath "$deployDir\README-DEPLOY.md" -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "Hoan thanh! Files da duoc chuan bi trong thu muc: $deployDir" -ForegroundColor Green
Write-Host ""
Write-Host "De upload len VPS, chay:" -ForegroundColor Cyan
Write-Host "   scp -r $deployDir\* user@vps:/path/to/deploy/" -ForegroundColor White
Write-Host ""

