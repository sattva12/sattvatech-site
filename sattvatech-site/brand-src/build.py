"""Writes every Sattva logo file. Run from this folder:  python3 build.py ../public/brand
Needs shapely and fonttools (with brotli, to read the woff2 fonts)."""
import os, sys, json
from shapely import affinity
import mark as M, word as Wd

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
os.makedirs(OUT, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
BOLD = os.path.join(HERE, 'montserrat-latin-600-normal.woff2')      # SATTVA
MED = os.path.join(HERE, 'montserrat-latin-500-normal.woff2')       # TECHNOLOGIES

INK, BLUE = '#16212c', '#153d72'
SILVER = '<linearGradient id="sv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b9c3cb"/></linearGradient>'
TECH_ON_DARK = '#c9d3dc'

def place(g, k=1.0, dx=0.0, dy=0.0): return affinity.translate(affinity.scale(g, k, k, origin=(0, 0)), dx, dy)
def fitted(font, text, cap, width, tol):
    """The word at this cap height, its letters spaced out to this width; top left at 0,0."""
    w0 = Wd.word(font, text, 0, 0, cap); t = (width - (w0.bounds[2] - w0.bounds[0])) / (len(text) - 1)
    g = Wd.word(font, text, t, 0, cap).simplify(tol); return affinity.translate(g, -g.bounds[0], -g.bounds[1])

H = M.SIZE                                         # the mark is a square this size (560)
MARK = M.mark()
# The words, drawn where SATTVA is 100 tall: SATTVA 625 wide, TECHNOLOGIES four tenths as tall and the same width, as measured from Atul's picture.
NAME_W, TECH_CAP, LEAD = 625.0, 40.0, 30.0
SAT = fitted(BOLD, 'SATTVA', 100.0, NAME_W, 0.15)
TECH = fitted(MED, 'TECHNOLOGIES', TECH_CAP, NAME_W, 0.1)
BLOCK = 100 + LEAD + TECH_CAP                      # the height of the two lines together

STACK_K, STACK_GAP = H / NAME_W, 75.0              # stacked: the words exactly as wide as the mark
WIDE_K, WIDE_GAP = 1.8, 120.0                      # side by side: SATTVA stands about a third of the mark's height
SMALL_K = 2.1                                      # side by side without TECHNOLOGIES: SATTVA a little bigger

def lock(kind):
    """The pieces in place: mark, SATTVA, TECHNOLOGIES or None; then width and height."""
    if kind == 'mark': return [MARK, None, None], H, H
    if kind == 'stacked':
        k = STACK_K; y0 = H + STACK_GAP
        return [MARK, place(SAT, k, 0, y0), place(TECH, k, 0, y0 + (100 + LEAD) * k)], H, y0 + BLOCK * k
    if kind == 'wide':
        k = WIDE_K; x0 = H + WIDE_GAP; y0 = (H - BLOCK * k) / 2
        return [MARK, place(SAT, k, x0, y0), place(TECH, k, x0, y0 + (100 + LEAD) * k)], x0 + NAME_W * k, H
    if kind == 'small':
        k = SMALL_K; x0 = H + WIDE_GAP; y0 = (H - 100 * k) / 2
        return [MARK, place(SAT, k, x0, y0), None], x0 + NAME_W * k, H

def svg(kind, colour, title='Sattva Technologies'):
    (m, sat, tech), w, h = lock(kind)
    P = lambda g, fill: f'<path fill="{fill}" fill-rule="evenodd" d="{M.path_d(g)}"/>' if g is not None else ''
    if colour == 'silver': body = P(m, 'url(#sv)') + P(sat, 'url(#sv)') + P(tech, TECH_ON_DARK); defs = f'<defs>{SILVER}</defs>'
    else: body = ''.join(P(g, colour) for g in (m, sat, tech)); defs = ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" role="img" aria-label="{title}"><title>{title}</title>{defs}{body}</svg>'

def write(name, text):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)
    print(f'{name:34s} {len(text):6d} bytes')

for stem, kind in (('sattva-mark', 'mark'), ('sattva-logo', 'stacked'), ('sattva-logo-wide', 'wide'), ('sattva-logo-small', 'small')):
    write(stem + '.svg', svg(kind, INK)); write(stem + '-white.svg', svg(kind, '#ffffff')); write(stem + '-silver.svg', svg(kind, 'silver'))

# The browser-tab icon and the phone icon: the mark in white on the app's blue.
def icon(size, mark_size, rx, nd):
    k = mark_size / H; o = (size - mark_size) / 2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"><rect width="{size}" height="{size}" rx="{rx}" fill="{BLUE}"/>'
            f'<path fill="#fff" d="{M.path_d(place(MARK, k, o, o), 1, 0, 0, nd)}"/></svg>')
# At 32 the squares are 6 wide, the gaps 3 and the links 4, so every edge lands on a whole pixel.
old = (M.SQ, M.GAP, M.LINK, M.RAD); M.SQ, M.GAP, M.LINK, M.RAD = 6.0, 3.0, 4.0, 0.9
tiny = M.mark(); M.SQ, M.GAP, M.LINK, M.RAD = old
write('favicon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="{BLUE}"/><path fill="#fff" d="{M.path_d(place(tiny, 1, 4, 4), 1, 0, 0, 2)}"/></svg>')
write('icon.svg', icon(512, 300, 0, 1))

# The shapes for the site's own code (src/brand.jsx): the side-by-side layout, in place.
(m, sat, tech), w, h = lock('wide')
(_, sat2, _), w2, _ = lock('small')
json.dump({'h': h, 'w': round(w, 1), 'w_small': round(w2, 1), 'mark': M.path_d(m), 'sattva': M.path_d(sat), 'tech': M.path_d(tech), 'sattva_small': M.path_d(sat2)},
          open(os.path.join(OUT, 'brand.json'), 'w'))
print('brand.json', os.path.getsize(os.path.join(OUT, 'brand.json')))
