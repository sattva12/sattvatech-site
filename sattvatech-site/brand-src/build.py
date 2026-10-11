"""Writes every Sattva logo file. Run from this folder:  python3 build.py ../public/brand
Needs shapely and fonttools (with brotli, to read the woff2 fonts)."""
import os, sys, json
from shapely import affinity
import mark as M, word as Wd

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
os.makedirs(OUT, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
BOLD = os.path.join(HERE, 'montserrat-latin-700-normal.woff2')      # SATTVA
SEMI = os.path.join(HERE, 'montserrat-latin-600-normal.woff2')      # TECHNOLOGIES

INK, NAVY = '#16212c', '#0d2747'
# On dark backgrounds the blue squares are lightened so they show, and the line and the lettering turn white.
DARK_BLUE = '#3d7fd0'
DARK_GRID = [[DARK_BLUE if c == M.BLUE else c for c in row] for row in M.GRID]
TONES = {                     # squares, line, SATTVA, TECHNOLOGIES
    'light': (M.GRID, M.LINE_GREY, M.TEXT_GREY, M.TEXT_GREY),
    'dark': (DARK_GRID, '#ffffff', '#ffffff', '#dfe6ee'),
}

def place(g, k=1.0, dx=0.0, dy=0.0): return affinity.translate(affinity.scale(g, k, k, origin=(0, 0)), dx, dy)
def fitted(font, text, cap, width, tol):
    """The word at this cap height, its letters spaced out to this width; top left at 0,0."""
    w0 = Wd.word(font, text, 0, 0, cap); t = (width - (w0.bounds[2] - w0.bounds[0])) / (len(text) - 1)
    g = Wd.word(font, text, t, 0, cap).simplify(tol); return affinity.translate(g, -g.bounds[0], -g.bounds[1])

H = M.SIZE                                         # the mark is a square this size (560)
# The words, drawn where SATTVA is 100 tall, as measured from Atul's picture: 622 wide, TECHNOLOGIES four tenths as tall and the same width.
NAME_W, TECH_CAP, LEAD = 622.0, 40.0, 28.0
SAT = fitted(BOLD, 'SATTVA', 100.0, NAME_W, 0.15)
TECH = fitted(SEMI, 'TECHNOLOGIES', TECH_CAP, NAME_W, 0.1)
BLOCK = 100 + LEAD + TECH_CAP                      # the height of the two lines together

STACK_K, STACK_GAP = H / NAME_W, 74.0              # stacked: the words exactly as wide as the mark
WIDE_K, WIDE_GAP = 1.8, 120.0                      # side by side: SATTVA stands about a third of the mark's height
SMALL_K = 2.1                                      # side by side without TECHNOLOGIES: SATTVA a little bigger

def lock(kind):
    """Where the words go beside or under the mark: SATTVA, TECHNOLOGIES or None; then width and height. The mark sits at 0,0."""
    if kind == 'mark': return None, None, H, H
    if kind == 'stacked':
        k = STACK_K; y0 = H + STACK_GAP
        return place(SAT, k, 0, y0), place(TECH, k, 0, y0 + (100 + LEAD) * k), H, y0 + BLOCK * k
    if kind == 'wide':
        k = WIDE_K; x0 = H + WIDE_GAP; y0 = (H - BLOCK * k) / 2
        return place(SAT, k, x0, y0), place(TECH, k, x0, y0 + (100 + LEAD) * k), x0 + NAME_W * k, H
    if kind == 'small':
        k = SMALL_K; x0 = H + WIDE_GAP; y0 = (H - 100 * k) / 2
        return place(SAT, k, x0, y0), None, x0 + NAME_W * k, H

def svg(kind, tone, title='Sattva Technologies'):
    sat, tech, w, h = lock(kind)
    P = lambda g, fill: f'<path fill="{fill}" fill-rule="evenodd" d="{M.path_d(g)}"/>' if g is not None else ''
    if tone in TONES:
        grid, line, c1, c2 = TONES[tone]; body = M.colour_svg_body(grid=grid, line_fill=line) + P(sat, c1) + P(tech, c2)
    else:                                          # one colour: tone is the colour itself
        body = P(M.mono(), tone) + P(sat, tone) + P(tech, tone)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" role="img" aria-label="{title}"><title>{title}</title>{body}</svg>'

def write(name, text):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)
    print(f'{name:34s} {len(text):6d} bytes')

for stem, kind in (('sattva-mark', 'mark'), ('sattva-logo', 'stacked'), ('sattva-logo-wide', 'wide'), ('sattva-logo-small', 'small')):
    write(stem + '.svg', svg(kind, 'light')); write(stem + '-dark.svg', svg(kind, 'dark'))
    write(stem + '-mono.svg', svg(kind, INK)); write(stem + '-mono-white.svg', svg(kind, '#ffffff'))

# The browser-tab icon and the phone icon: the dark-background mark on navy.
# At 32 the squares are 6 wide, the gaps 3 and the line 2, so every edge lands on a whole pixel.
old = (M.SQ, M.GAP, M.RAD, M.LINE, M.TURN, M.SIZE, M.PITCH); M.SQ, M.GAP, M.RAD, M.LINE, M.TURN, M.SIZE, M.PITCH = 6.0, 3.0, 0.9, 2.0, 0.0, 24.0, 9.0
write('favicon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="{NAVY}"/>' + M.colour_svg_body(1, 4, 4, DARK_GRID, '#ffffff', nd=2) + '</svg>')
M.SQ, M.GAP, M.RAD, M.LINE, M.TURN, M.SIZE, M.PITCH = old
k = 310 / H; o = (512 - 310) / 2
write('icon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="{NAVY}"/>' + M.colour_svg_body(k, o, o, DARK_GRID, '#ffffff') + '</svg>')

# The shapes for the site's own code (src/brand.jsx).
sat, tech, w, h = lock('wide'); sat2, _, w2, _ = lock('small')
json.dump({'h': h, 'w': round(w, 1), 'w_small': round(w2, 1), 'sq': M.SQ, 'pitch': M.PITCH, 'rad': M.RAD,
           'grid': M.GRID, 'blue': M.BLUE, 'dark_blue': DARK_BLUE, 'line_grey': M.LINE_GREY, 'text_grey': M.TEXT_GREY,
           'line': M.path_d(M.line()), 'mono': M.path_d(M.mono()), 'sattva': M.path_d(sat), 'tech': M.path_d(tech), 'sattva_small': M.path_d(sat2)},
          open(os.path.join(OUT, 'brand.json'), 'w'))
print('brand.json', os.path.getsize(os.path.join(OUT, 'brand.json')))
