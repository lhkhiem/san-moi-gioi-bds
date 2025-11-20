# Public Frontend

Frontend cho website công khai (Port 4002).

## Features
- Homepage với fullpage scroll
- Project listings và detail pages
- News/Blog system
- Contact form
- Job listings
- Responsive design
- SEO optimized

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 3. Start Development
```bash
npm run dev
```

App runs on `http://localhost:4002`

## Project Structure

```
public-frontend/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities and API client
├── hooks/            # Custom React hooks
└── public/           # Static assets
```

## API Integration

Frontend gọi API từ Public Backend (Port 4000):
- Projects API
- Posts API
- Leads API (form submission)
- Jobs API

## Build

```bash
npm run build
npm start
```

