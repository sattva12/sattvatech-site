# The Sattva logo, as drawn

The logo is drawn by these scripts, so it can be changed in one place and every file made again.

- `mark.py`: the mark. Nine rounded squares in three rows of three, coloured blue, red, green / yellow, blue, red / green, yellow, blue, and one grey line that runs over them as an S: from the top right square along the top row, down the left, along the middle, down the right, and along the bottom row to the bottom left square. The colours and the line's width are as measured from Atul's picture. It also holds the one-colour form: the squares with thick links between them, as one shape.
- `word.py` and the two Montserrat font files: the letters. SATTVA in the 700 weight, TECHNOLOGIES in the 600 weight at four tenths the height, spaced out to the same width. (Montserrat is under the SIL Open Font License.)
- `build.py`: writes the files. `python3 build.py ../public/brand` (needs `shapely`, `fonttools` and `brotli`). It also writes `brand.json`, the shapes that `src/brand.jsx` carries so the site can draw the logo in the page.

The files in `public/brand/`:

| File | Use |
|---|---|
| `sattva-logo` | The mark over SATTVA TECHNOLOGIES, the words as wide as the mark. Covers, flyers, signs. |
| `sattva-logo-wide` | The mark beside SATTVA TECHNOLOGIES. Top bars and document headers, 40 px tall and up. |
| `sattva-logo-small` | The mark beside SATTVA alone. Under 40 px tall. |
| `sattva-mark` | The mark alone. Square. |
| no ending | Full colour for light backgrounds, as Atul drew it: grey line `#525355`, lettering `#2f3033`. |
| `-dark` | Full colour for dark backgrounds: the blue squares lightened to `#3d7fd0` so they show, the line and the lettering white. |
| `-mono` | One colour, dark `#16212c`: for stamps, embroidery, engraving, one-colour print. |
| `-mono-white` | One colour, white. |
| `.svg` and `.png` | Every one comes as both. The PNGs have a clear background. |
| `sattva-share.jpg` | The picture shown when a link to the site is shared. |

The square colours: blue `#134e89`, red `#e44936`, green `#3ea059`, yellow `#f6b70a`.
The browser-tab icon (`public/favicon.svg`) and the phone icons are the dark-background mark on navy `#0d2747`. The tab icon is drawn so that at 32 px every edge lands on a whole pixel.
