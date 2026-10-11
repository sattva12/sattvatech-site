# The Sattva logo, as drawn

The logo is drawn by these scripts, so it can be changed in one place and every file made again.

- `mark.py`: the mark. A whole S in front; three bars across and three bars down behind it, all six the same length.
- `letters.py`: the word SATTVA, drawn from the measured shapes of Atul's lettering.
- `word.py` and the Montserrat font file: the letters of TECHNOLOGIES, spaced out to the width of SATTVA. (Montserrat is under the SIL Open Font License.)
- `build.py`: writes the files. `python3 build.py ../public/brand` (needs `shapely`, `fonttools` and `brotli`). It also writes `brand.json`, the shapes that `src/brand.jsx` carries so the site can draw the logo in the page.

The files in `public/brand/`:

| File | Use |
|---|---|
| `sattva-logo` | The mark over SATTVA TECHNOLOGIES. Covers, flyers, signs. |
| `sattva-logo-wide` | The mark beside SATTVA TECHNOLOGIES. Top bars and document headers, 40 px tall and up. |
| `sattva-logo-small` | The mark beside SATTVA alone. Under 40 px tall. |
| `sattva-mark` | The mark alone. |
| no ending | One colour, dark `#16212c`, for light backgrounds. The bars stop short of the S so it reads as lying on top. |
| `-white` | One colour, white, for dark backgrounds and one-colour print. |
| `-silver` | Two colours, for dark backgrounds: the S and the name in silver (white down to `#b9c3cb`), the bars in steel (`#9fb0c4` down to `#75889f`). |
| `.svg` and `.png` | Every one comes as both. The PNGs have a clear background. |
| `sattva-share.jpg` | The picture shown when a link to the site is shared. |

The browser-tab icon (`public/favicon.svg`) and the phone icons are the S in white on the app's blue `#153d72`, with the bars running off the edges.
