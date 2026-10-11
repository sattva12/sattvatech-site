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

## The logo colours (set by Atul, 2026-10-11)

The white-line logo on navy (the files ending `-dark`) is the main version. The same list is in `public/brand/sattva-colours.json`, and as a picture in `public/brand/sattva-colours.png`.

| Colour | Hex | RGB | Where |
|---|---|---|---|
| Blue | `#3D7FD0` | 61, 127, 208 | The blue squares, on dark backgrounds |
| Red | `#E44936` | 228, 73, 54 | The red squares |
| Green | `#3EA059` | 62, 160, 89 | The green squares |
| Yellow | `#F6B70A` | 246, 183, 10 | The yellow squares |
| White | `#FFFFFF` | 255, 255, 255 | The S line and SATTVA, on dark |
| Pale grey | `#DFE6EE` | 223, 230, 238 | TECHNOLOGIES, on dark |
| Navy | `#0D2747` | 13, 39, 71 | The background behind the logo |
| App blue | `#153D72` | 21, 61, 114 | The top bar of the site and the app |
| Deep blue | `#134E89` | 19, 78, 137 | The blue squares, on white paper only |
| Line grey | `#525355` | 82, 83, 85 | The S line, on white paper only |
| Charcoal | `#2F3033` | 47, 48, 51 | The lettering, on white paper only |
| Ink | `#16212C` | 22, 33, 44 | The one-colour logo |

These are screen colours. No print (CMYK or Pantone) numbers have been set; a printer should match to the hex values.

The browser-tab icon (`public/favicon.svg`) and the phone icons are the dark-background mark on navy `#0d2747`. The tab icon is drawn so that at 32 px every edge lands on a whole pixel.
