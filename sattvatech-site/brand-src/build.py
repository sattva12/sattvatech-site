"""Writes the Sattva logo files: the mark, the stacked logo and the side-by-side logo, in dark, white and silver."""
import os, sys, json
from shapely import affinity
from shapely.ops import unary_union
import mark as M
import letters as L

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
os.makedirs(OUT, exist_ok=True)

INK, WHITE, NAVY, BLUE = '#16212c', '#ffffff', '#0d2747', '#153d72'
SILVER = '<linearGradient id="sv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b9c3cb"/></linearGradient>'

def place(g, k=1.0, dx=0.0, dy=0.0):
    return affinity.translate(affinity.scale(g, k, k, origin=(0, 0)), dx, dy)

MARK = M.mark()                                   # 145.2 wide, 152 tall, centred on 0,0
WORD = L.sattva()                                 # 733.6 wide, 100 tall, top left at 0,0
MW, MH = MARK.bounds[2] * 2, MARK.bounds[3] * 2
WW, WH = WORD.bounds[2], 100.0

def mark_only(pad=0.0):
    return [place(MARK, 1, MW / 2 + pad, MH / 2 + pad)], MW + 2 * pad, MH + 2 * pad

def stacked():
    """As drawn in the original: the mark over the word, the word a little over one and a half marks wide."""
    k = 0.311; gap = 17.6; w = WW * k
    return [place(MARK, 1, w / 2, MH / 2), place(WORD, k, 0, MH + gap)], w, MH + gap + WH * k

def wide():
    """The mark on the left, the word beside it, centred on the mark's height."""
    k = 0.46; gap = 30.0
    return [place(MARK, 1, MW / 2, MH / 2), place(WORD, k, MW + gap, (MH - WH * k) / 2)], MW + gap + WW * k, MH

def svg(parts, w, h, fill, title, bg=None, pad=0.0, defs=''):
    """Each part is its own path, so a silver fill runs top to bottom over the mark and over the word separately."""
    W_, H_ = w + 2 * pad, h + 2 * pad
    paths = ''.join(f'<path d="{M.path_d(g, 1, pad, pad)}"/>' for g in parts)
    back = f'<rect width="{W_:g}" height="{H_:g}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {round(W_, 2):g} {round(H_, 2):g}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{("<defs>" + defs + "</defs>") if defs else ""}{back}<g fill="{fill}" fill-rule="evenodd">{paths}</g></svg>')

def write(name, text):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)
    print(f'{name:34s} {len(text):6d} bytes')

for stem, (g, w, h), title in (('sattva-mark', mark_only(), 'Sattva'), ('sattva-logo', stacked(), 'Sattva'), ('sattva-logo-wide', wide(), 'Sattva')):
    write(stem + '.svg', svg(g, w, h, INK, title))
    write(stem + '-white.svg', svg(g, w, h, WHITE, title))
    write(stem + '-silver.svg', svg(g, w, h, 'url(#sv)', title, defs=SILVER))

# The browser-tab icon: the mark drawn for small sizes, bars and gaps the same width so they land on whole pixels at 32.
M.GAP, M.HX, M.HY = 10.0, 70.0, 75.0
small = M.mark()
k = 0.2                                           # one bar is 2 of 32
d = M.path_d(place(small, k, 16, 16), 1, 0, 0, 3)
write('favicon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="{BLUE}"/><path fill="#fff" fill-rule="evenodd" d="{d}"/></svg>')
# The same on a square with room round it, for phone home screens.
k = 0.62 * 512 / 150
d = M.path_d(place(small, k, 256, 256), 1, 0, 0, 1)
write('icon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="{BLUE}"/><path fill="#fff" fill-rule="evenodd" d="{d}"/></svg>')
M.GAP, M.HX, M.HY = 9.0, 72.6, 76.0

# The shapes for the site's own code, so the logo is drawn in the page and takes the page's colours.
g, w, h = mark_only()
json.dump({'mark': {'w': round(MW, 2), 'h': round(MH, 2), 'd': M.path_d(g[0])},
           'word': {'w': round(WW, 2), 'h': WH, 'd': M.path_d(WORD)}}, open(os.path.join(OUT, 'brand.json'), 'w'))
print('brand.json', os.path.getsize(os.path.join(OUT, 'brand.json')))
