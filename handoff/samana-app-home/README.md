# Samana front page (samana.tech): load notes for the app chat

Built by the website chat, Oct 12, 2026 (Atul, 22:25 to 22:36: "you make the website and send it to them when it is done to load it").
Preview: https://claude.ai/artifact/41ifDGNrF5r1z1vXv6LXCy

## What is here
- `index.html`: ONE page you scroll through, like the app (Atul, 00:23: "i like when you can just scroll through it all"): the opening, four doors (E, M, C, RP), then each part in order (E Enterprise with the Flow dashboard, M Manufacturing with lean farming quick, C Construction with the drawing set rising into 3D and cost into Flow, RP Resource planning: see, plan, track, year after year), suggestions, plans, Start free. The doors and the top bar jump down the page.
- `samana.css` and `samana.js` (kept as their own files). Fonts: IBM Plex from Google Fonts.
- `assets/`: the clips (`.mp4`, with `.jpg` posters) recorded in the app, and the Samana logos and icons. About 10 MB.

## How to load it
1. Copy `index.html`, `samana.css`, `samana.js` and `assets/` into the app's static files so that **https://samana.tech/** (and www) serves this page, and the app keeps running at **app.samana.tech** (Atul, 22:34). For the app's own signed-out screen, either send signed-out visitors to samana.tech, or serve this file at `/` when nobody is signed in.
2. The app's address is set in ONE place, the `APP` line at the top of `samana.js` (today `https://app.sattvatech.com`). Change it to `https://app.samana.tech` once sign-in works there (item 10). Every Sign in, Start free and Choose plan link follows it; the plan buttons go to `APP + /settings`.
3. Keep paths relative (`assets/...`), or move `assets/` and change the paths.

## Rules kept on the page
- Manufacturing is Lean's main market; the farm part quick (Atul, 22:36 and 23:58). Plans as Atul set them (Oct 13, 00:03 to 00:17; `claude/inbox-samana-app.md` items 13 and 16): Free $0, 1 user, 1 active job, $5 each crew member on the Takeoff portal; Takeoff $10, the owner plus 1 crew member on the Takeoff portal, 5 active jobs, $5 each extra portal crew member; Flow $20, 1 business unit, 5 users, $5 each extra; Lean $30, 1 business unit, 5 users, $5 each extra, $20 each extra unit with 5 more users. The app must charge the same before this page goes live: the plans section stays a preview until the plan security check (app item 16) and Atul's Stripe yes. Until then, load the page with the plans section as it is but do not take payments from it (its buttons only open the app).
- No customer, partner or place names; Massachusetts only. Contact: info@samana.tech.
- Samana's tagline on the page is **From input to output** (Phase 6, Oct 14); the message: "we take a piece of land and create a running business", we build and run, not build and leave. "Making things work" stays Sattva's.
- The four parts are named on the pages in the logo's order (Atul, 23:43): E Enterprise, M Manufacturing, C Construction, RP Resource planning, each with its square cut from the logo (`assets/sq-*.svg`). The tagline stays EMCRP SOFTWARE.

## Still to come from the website chat
Fresh clips recorded on the sample job (a production run for the manufacturing part). Same file names, so a swap of `assets/` is all it takes.
