# Samana front page (samana.tech): load notes for the app chat

Built by the website chat, Oct 12, 2026 (Atul, 22:25 to 22:36: "you make the website and send it to them when it is done to load it").
Preview: https://claude.ai/artifact/41ifDGNrF5r1z1vXv6LXCy

## What is here
- Five pages (Atul, 23:47: "each one is their own pages"): `index.html` (the front page: four doors E, M, C, RP, suggestions, plans), `enterprise.html` (the Flow dashboard), `manufacturing.html` (Lean production, lean farming quick), `construction.html` (agile design-build, the drawing set rising into 3D, cost into Flow), `resource-planning.html` (see, plan, track, year after year).
- `samana.css` and `samana.js`, shared by all five. Fonts: IBM Plex from Google Fonts.
- `assets/`: the clips (`.mp4`, with `.jpg` posters) recorded in the app, and the Samana logos and icons. About 10 MB.

## How to load it
1. Copy the five pages, `samana.css`, `samana.js` and `assets/` into the app's static files so that **https://samana.tech/** (and www) serves this page, and the app keeps running at **app.samana.tech** (Atul, 22:34). For the app's own signed-out screen, either send signed-out visitors to samana.tech, or serve this file at `/` when nobody is signed in.
2. The app's address is set in ONE place, the `APP` line at the top of `samana.js` (today `https://app.sattvatech.com`). Change it to `https://app.samana.tech` once sign-in works there (item 10). Every Sign in, Start free and Choose plan link follows it; the plan buttons go to `APP + /settings`.
3. Keep paths relative (`assets/...`), or move `assets/` and change the paths.

## Rules kept on the page
- Manufacturing first, the farm part quick (Atul, 22:36). Plans and prices from the `plans` table: Free, Takeoff $10, Flow $20, Lean $30; extra business units $10; past 10 jobs $5 a job.
- No customer, partner or place names; Massachusetts only. Contact: info@samana.tech.
- The logo's letters are never explained; the tagline is EMCRP SOFTWARE.

## Still to come from the website chat
Fresh clips recorded on the sample job (a production run for the manufacturing part). Same file names, so a swap of `assets/` is all it takes.
