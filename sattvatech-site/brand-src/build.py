"""Writes every Sattva logo file. Run from this folder:  python3 build.py ../public/brand
Needs shapely and fonttools (with brotli, to read the woff2 font)."""
import os, sys, json
from shapely import affinity
import mark as M, letters as L, word as Wd

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
os.makedirs(OUT, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, 'montserrat-latin-500-normal.woff2')      # the letters of TECHNOLOGIES

INK, BLUE = '#16212c', '#153d72'
SILVER = '<linearGradient id="sv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b9c3cb"/></linearGradient>'
STEEL = '<linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb0c4"/><stop offset="1" stop-color="#75889f"/></linearGradient>'
TECH_ON_DARK = '#c9d3dc'

def place(g, k=1.0, dx=0.0, dy=0.0): return affinity.translate(affinity.scale(g, k, k, origin=(0, 0)), dx, dy)

H = M.LEN                                          # the mark fits a square this size
S = M.s_shape()
BARS_FULL = M.bars()                               # for two colours: the S is simply drawn on top
BARS_CUT = M.mark()[1].simplify(0.4)                             # for one colour: the bars stop short of the S
SAT = L.sattva(); SW = SAT.bounds[2]               # SATTVA, 733.6 wide, 100 tall
CAP, LEAD = 40.0, 42.0                             # TECHNOLOGIES: its height, and the space above it, where SATTVA is 100 tall
def _tech():
    w0 = Wd.word(FONT, 'TECHNOLOGIES', 0, 0, CAP); t = (SW - (w0.bounds[2] - w0.bounds[0])) / 11
    g = Wd.word(FONT, 'TECHNOLOGIES', t, 0, CAP).simplify(0.12); return affinity.translate(g, -g.bounds[0], -g.bounds[1])
TECH = _tech()                                     # spaced out to the same width as SATTVA

WIDE_K, WIDE_GAP = 3.536, 120.0                    # side by side: SATTVA stands about a third of the mark's height
STACK_K, STACK_GAP = 1.9, 110.0                    # stacked: SATTVA a third wider than the mark

def lock(kind):
    """Returns the pieces in place: S, bars (full), bars (cut), SATTVA, TECHNOLOGIES or None; then width and height."""
    if kind == 'mark':
        return [place(S, 1, H / 2, H / 2), place(BARS_FULL, 1, H / 2, H / 2), place(BARS_CUT, 1, H / 2, H / 2), None, None], H, H
    if kind in ('wide', 'small'):
        tech = kind == 'wide'; k = WIDE_K; x0 = H + WIDE_GAP
        y0 = (H - (100 + (LEAD + CAP if tech else 0)) * k) / 2
        return [place(S, 1, H / 2, H / 2), place(BARS_FULL, 1, H / 2, H / 2), place(BARS_CUT, 1, H / 2, H / 2), place(SAT, k, x0, y0),
                place(TECH, k, x0, y0 + (100 + LEAD) * k) if tech else None], x0 + SW * k, H
    if kind == 'stacked':
        k = STACK_K; w = max(H, SW * k); xm = w / 2; x0 = (w - SW * k) / 2; y0 = H + STACK_GAP
        return [place(S, 1, xm, H / 2), place(BARS_FULL, 1, xm, H / 2), place(BARS_CUT, 1, xm, H / 2), place(SAT, k, x0, y0),
                place(TECH, k, x0, y0 + (100 + LEAD) * k)], w, y0 + (100 + LEAD + CAP) * k

def svg(kind, colour, title='Sattva Technologies'):
    (s, bf, bc, sat, tech), w, h = lock(kind)
    P = lambda g, fill: f'<path fill="{fill}" fill-rule="evenodd" d="{M.path_d(g)}"/>' if g is not None else ''
    if colour == 'silver':                         # two colours, for dark backgrounds
        body = P(bf, 'url(#st)') + P(s, 'url(#sv)') + P(sat, 'url(#sv)') + P(tech, TECH_ON_DARK); defs = f'<defs>{SILVER}{STEEL}</defs>'
    else:                                          # one colour
        body = ''.join(P(g, colour) for g in (bc, s, sat, tech)); defs = ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" role="img" aria-label="{title}"><title>{title}</title>{defs}{body}</svg>')

def write(name, text):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)
    print(f'{name:34s} {len(text):6d} bytes')

for stem, kind in (('sattva-mark', 'mark'), ('sattva-logo', 'stacked'), ('sattva-logo-wide', 'wide'), ('sattva-logo-small', 'small')):
    write(stem + '.svg', svg(kind, INK)); write(stem + '-white.svg', svg(kind, '#ffffff')); write(stem + '-silver.svg', svg(kind, 'silver'))

# The browser-tab icon and the phone icon: the S in white on the app's blue, the bars running off the edges.
def icon(size, s_height, rx):
    k = s_height / (2 * M.T); c = size / 2; big = size / k
    old = M.LEN; M.LEN = big * 1.2; b = M.bars(); M.LEN = old
    clip = f'<clipPath id="c"><rect width="{size}" height="{size}" rx="{rx}"/></clipPath>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"><defs>{clip}</defs><g clip-path="url(#c)"><rect width="{size}" height="{size}" fill="{BLUE}"/>'
            f'<path fill="#8ea3bf" d="{M.path_d(place(b, k, c, c), 1, 0, 0, 2)}"/><path fill="#fff" d="{M.path_d(place(S, k, c, c), 1, 0, 0, 2)}"/></g></svg>')
write('favicon.svg', icon(32, 25.5, 6))
write('icon.svg', icon(512, 330, 0))

# The shapes for the site's own code (src/brand.jsx), side by side, in place.
(s, bf, bc, sat, tech), w, h = lock('wide')
json.dump({'h': h, 'w': round(w, 1), 'mark_w': H, 'lift': round((LEAD + CAP) * WIDE_K / 2, 1),
           's': M.path_d(s), 'bars': M.path_d(bf), 'bars_cut': M.path_d(bc), 'sattva': M.path_d(sat), 'tech': M.path_d(tech)},
          open(os.path.join(OUT, 'brand.json'), 'w'))
print('brand.json', os.path.getsize(os.path.join(OUT, 'brand.json')))
