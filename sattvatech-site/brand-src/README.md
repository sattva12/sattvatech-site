# The Sattva logo, as drawn

The logo is drawn by these three scripts, so it can be changed in one place and every file made again.

- `mark.py`: the mark. The S, three bars across and three bars down, joined into one solid shape. No slits, no circle.
- `letters.py`: the word SATTVA, drawn from the measured shapes of the original lettering.
- `build.py`: writes the files. `python3 build.py out` (needs `shapely`).

The files the site uses are in `public/brand/`:

| File | Use |
|---|---|
| `sattva-logo.svg` | Mark over the word. Dark, for light backgrounds. |
| `sattva-logo-wide.svg` | Mark beside the word. Dark, for light backgrounds. |
| `sattva-mark.svg` | The mark alone. |
| `...-white.svg` | The same, white, for dark backgrounds. |
| `...-silver.svg` | The same, silver (white at the top to `#b9c3cb` at the bottom), for dark backgrounds. |
| `*.png` | The same as pictures with a clear background, for documents and print. |
| `sattva-share.jpg` | The picture shown when a link to the site is shared. |

Colours: dark `#16212c`, the app's blue `#153d72`, navy `#0d2747`. The site draws the logo in the page from `src/brand.jsx`.
The browser-tab icon (`public/favicon.svg`) is the mark with its bars set one bar apart, so they land on whole pixels at small sizes.
