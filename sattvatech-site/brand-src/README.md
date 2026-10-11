# The Sattva logo, as drawn

The logo is drawn by these scripts, so it can be changed in one place and every file made again.

- `mark.py`: the mark. Nine rounded squares in three rows of three, linked in one line that runs as an S: along the top row, down the left, along the middle, down the right, along the bottom. The links are two thirds of a square thick. Atul's picture had them a third; at icon sizes that reads as nine dots, so they were thickened to keep the S.
- `word.py` and the two Montserrat font files: the letters. SATTVA in the 600 weight, TECHNOLOGIES in the 500 weight at four tenths the height, spaced out to the same width. (Montserrat is under the SIL Open Font License.)
- `build.py`: writes the files. `python3 build.py ../public/brand` (needs `shapely`, `fonttools` and `brotli`). It also writes `brand.json`, the shapes that `src/brand.jsx` carries so the site can draw the logo in the page.

The files in `public/brand/`:

| File | Use |
|---|---|
| `sattva-logo` | The mark over SATTVA TECHNOLOGIES, the words as wide as the mark. Covers, flyers, signs. |
| `sattva-logo-wide` | The mark beside SATTVA TECHNOLOGIES. Top bars and document headers, 40 px tall and up. |
| `sattva-logo-small` | The mark beside SATTVA alone. Under 40 px tall. |
| `sattva-mark` | The mark alone. Square. |
| no ending | Dark `#16212c`, for light backgrounds. |
| `-white` | White, for dark backgrounds and one-colour print. |
| `-silver` | For dark backgrounds: white fading down to `#b9c3cb`, with TECHNOLOGIES in `#c9d3dc`. |
| `.svg` and `.png` | Every one comes as both. The PNGs have a clear background. |
| `sattva-share.jpg` | The picture shown when a link to the site is shared. |

The browser-tab icon (`public/favicon.svg`) and the phone icons are the mark in white on the app's blue `#153d72`. The tab icon is drawn so that at 32 px every edge lands on a whole pixel.
