# Sattva Technologies LLC — Website

Professional website for sattvatech.com, built with React + Vite, deployed on Vercel.

## Quick Deploy to Vercel

### Option A: Drag & Drop (Fastest)
1. Run `npm install && npm run build` locally
2. Go to vercel.com → New Project → drag the `dist/` folder
3. Set custom domain: sattvatech.com

### Option B: GitHub (Recommended for future updates)
1. Push this folder to a GitHub repo (public or private)
2. Go to vercel.com → New Project → Import from GitHub
3. Vercel auto-detects Vite — click Deploy
4. Add custom domain: sattvatech.com → follow DNS instructions

## Local Development
```bash
npm install
npm run dev
```
Visit http://localhost:5173

## Adding Your Capability Statement PDF
Place your capability statement PDF at:
```
public/capability-statement.pdf
```
The download buttons are already wired up.

## Future Updates
Come back to Claude and say "update the website" — paste in what you want changed
and Claude will edit the App.jsx file directly.

## File Structure
```
sattvatech-site/
├── index.html          # Entry point
├── vite.config.js      # Build config
├── vercel.json         # Vercel settings
├── package.json
├── public/
│   └── capability-statement.pdf  ← ADD THIS
└── src/
    ├── main.jsx        # React root
    └── App.jsx         # All site content ← edit this
```
