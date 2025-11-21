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
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

## Luu y:
- Dam bao port 4002 khong bi firewall chan
- Kiem tra Node.js version >= 18
- Neu thieu dependencies, chay: npm install --production trong thu muc deploy