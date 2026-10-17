# Samana front page (samana.tech): load notes for the app chat

Built by the website chat, Oct 12, 2026 (Atul, 22:25 to 22:36: "you make the website and send it to them when it is done to load it").
Preview: https://claude.ai/artifact/41ifDGNrF5r1z1vXv6LXCy

## What is here
- `index.html`: ONE page you scroll through, like the app (Atul, 00:23: "i like when you can just scroll through it all"): the opening, four doors (E, M, C, RP), then each part in order (E Enterprise with the Flow dashboard, M Manufacturing with lean farming quick, C Construction with the drawing set rising into 3D and cost into Flow, RP Resource planning: see, plan, track, year after year), Contact us (a form sent through Formspree; the form address is one line, `CONTACT_FORM`, in `samana.js`), plans, Start free. No suggestion button in the app (Atul, Oct 15, 09:58). The doors and the top bar jump down the page.
- `samana.css` and `samana.js` (kept as their own files). Fonts: IBM Plex from Google Fonts.
- `assets/`: the clips (`.mp4`, with `.jpg` posters) recorded in the app, and the Samana logos and icons. About 10 MB.

## How to load it
**Live since Oct 17** (samana-app `main` ef339b0, app item 18): the app serves this folder at `/home/`, and samana.tech and www.samana.tech open it. **This folder is an exact copy of `samana-app/home/`** (in step Oct 17, 11:15): every path is absolute (`/home/assets/...`, `/home/samana.css`, `/home/samana.js`), and the plans section is the app's current plans. So a swap is a straight copy of `index.html`, `samana.css`, `samana.js` and `assets/` into `samana-app/home/`, nothing to rewrite. Edit the live copy and this one together.
1. The app's address is set in ONE place, the `APP` line at the top of `samana.js` (`https://app.samana.tech`). Every Sign in, Start free and Choose plan link follows it; the plan buttons go to `APP + /settings`.
2. The contact form's address is ONE line too, `CONTACT_FORM` in `samana.js` (`https://formspree.io/f/mvkzlyzy`, sends to info@samana.tech).
3. The claude.ai preview is published from a copy with `/home/` taken out of the paths (it has no `/home/` folder).

## Rules kept on the page
- Manufacturing is Lean's main market; the farm part quick (Atul, 22:36 and 23:58). **Plans as the app sells them** (from the app chat, Oct 17; three columns, `.plans.p3`): Free $0 (the owner, 1 active job, $5 a month each person on the Takeoff portal, a taste of Sai); Takeoff $20 with Flow (the owner plus 1 person on the Takeoff portal, 5 active jobs, $5 each extra portal person); Lean $30 (1 business unit, 5 people besides the owner, $5 each extra person, $20 each extra unit with 5 more people). Flow is not sold alone; the owner is never counted; Sai's use starts over each month. The plans section follows the app's `plans` table: when the app chat changes a price, both copies change. Its buttons only open the app (plans are bought in Settings).
- No customer, partner or place names; Massachusetts only. Contact: info@samana.tech.
- Samana's tagline on the page is **From input to output** (Phase 6, Oct 14); the message: "we take a piece of land and create a running business", we build and run, not build and leave. "Making things work" stays Sattva's.
- The four parts are named on the pages in the logo's order (Atul, 23:43): E Enterprise, M Manufacturing, C Construction, RP Resource planning, each with its square cut from the logo (`assets/sq-*.svg`). The tagline stays EMCRP SOFTWARE.

## Still to come from the website chat
Fresh clips recorded on the sample job (a production run for the manufacturing part). Same file names, so a swap of `assets/` is all it takes.
