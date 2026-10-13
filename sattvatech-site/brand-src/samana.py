"""Writes every Samana logo file. Run from this folder:  python3 samana.py ../public/brand
Needs shapely, fonttools (with brotli) and cairosvg (for the PNGs).

The Samana mark (Atul, 2026-10-12, 21:44 to 22:01): four rounded squares in Sattva's colours, read as one formula,
    E = mc^2 = integral of RP
- blue square: capital E; an equals sign in the gap; red square: lowercase m
- green square: lowercase c with a yellow 2; a second equals sign in the gap; yellow square: an integral sign
  with R at the top and P at the bottom, the integral from R to P
  (R drawn on top for readability, Atul 22:01). The mark is not explained anywhere; EMC2RP Software is just the tagline (22:03).
Meaning: resource planning, from beginning to end, equals the energy of combining manufacturing and construction.
EMC2RP: Enterprise, Manufacturing and Construction Resource Planning. The lockup reads SAMANA / EMC2RP SOFTWARE.
This replaces the earlier "Samana by Sattva" lockup (the Sattva mark with SAMANA beside it)."""
import os, sys
from shapely.geometry import box, LineString
from shapely.ops import unary_union
from shapely import affinity
import word as Wd

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
os.makedirs(OUT, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
BOLD = os.path.join(HERE, 'montserrat-latin-700-normal.woff2')
SEMI = os.path.join(HERE, 'montserrat-latin-600-normal.woff2')

SQ, RAD = 144.0, 18.0             # a square and its corner rounding (as the Sattva squares)
HG, VG = 60.0, 20.0               # the gap across (holds the equals signs) and the gap down
W, H = 2 * SQ + HG, 2 * SQ + VG   # the mark: 348 by 308
BLUE, DARK_BLUE, RED, GREEN, YELLOW = '#134e89', '#3d7fd0', '#e44936', '#3ea059', '#f6b70a'
NAVY, INK, TEXT_GREY, PALE = '#0d2747', '#16212c', '#2f3033', '#dfe6ee'

def sq(col, row):
    x, y = col * (SQ + HG), row * (SQ + VG)
    return box(x + RAD, y + RAD, x + SQ - RAD, y + SQ - RAD).buffer(RAD, quad_segs=10)

def at(g, cx=None, cy=None, x=None, y=None):
    """Move a shape so its centre (or its left/top edge) lands where asked."""
    b = g.bounds
    dx = (cx - (b[0] + b[2]) / 2) if cx is not None else (x - b[0] if x is not None else 0)
    dy = (cy - (b[1] + b[3]) / 2) if cy is not None else (y - b[1] if y is not None else 0)
    return affinity.translate(g, dx, dy)

def glyphs():
    """The letters and signs, placed on the mark. Returns {name: shape}."""
    s = SQ; c0, c1 = s / 2, SQ + HG + s / 2; r0, r1 = s / 2, SQ + VG + s / 2
    E = at(Wd.word(BOLD, 'E', 0, 0, 74).simplify(0.1), cx=c0, cy=r0)
    m = Wd.word(BOLD, 'm', 0, 0, 88).simplify(0.1); m = at(m, cx=c1, cy=r0)
    c = Wd.word(BOLD, 'c', 0, 0, 92).simplify(0.1); c = at(c, cx=c0 - 6, cy=r1 + 4)
    two = Wd.word(BOLD, '2', 0, 0, 40).simplify(0.1); two = at(two, x=c.bounds[2] + 4, y=SQ + VG + 20)
    # the integral: one stroke, a hook at the top right, a long gentle lean down, a hook at the bottom left
    def bez(p0, p1, p2, p3, n=24):
        return [((1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t*t*p2[0] + t**3*p3[0],
                 (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t*t*p2[1] + t**3*p3[1]) for t in [i / n for i in range(n + 1)]]
    pts = bez((84, 30), (82, 20), (70, 16), (64, 26)) + bez((64, 26), (60, 34), (58, 60), (56, 72))[1:] \
        + bez((56, 72), (54, 86), (52, 112), (48, 120))[1:] + bez((48, 120), (42, 130), (30, 128), (28, 118))[1:]
    integ = LineString(pts).buffer(6.0, cap_style=1, join_style=1, quad_segs=8).simplify(0.1)
    integ = affinity.translate(integ, SQ + HG - 8, SQ + VG)
    R = at(Wd.word(BOLD, 'R', 0, 0, 30).simplify(0.1), x=SQ + HG + 94, y=SQ + VG + 18)
    P = at(Wd.word(BOLD, 'P', 0, 0, 30).simplify(0.1), x=SQ + HG + 94, y=SQ + VG + SQ - 18 - 30)
    def eq(cy):
        bw, bh, gap = 32.0, 10.0, 11.0; cx = SQ + HG / 2
        return unary_union([box(cx - bw / 2, cy - gap / 2 - bh, cx + bw / 2, cy - gap / 2).buffer(2.5, join_style=1),
                            box(cx - bw / 2, cy + gap / 2, cx + bw / 2, cy + gap / 2 + bh).buffer(2.5, join_style=1)])
    return {'E': E, 'm': m, 'c': c, 'two': two, 'int': integ, 'R': R, 'P': P, 'eq1': eq(r0), 'eq2': eq(r1)}

G = glyphs()
SMALL_DROP = ('R', 'P')            # under about 64 px the limits would be a smudge: the small mark leaves them off

def path_d(g, sx=1.0, ox=0.0, oy=0.0, nd=1):
    polys = list(g.geoms) if g.geom_type in ('MultiPolygon', 'GeometryCollection') else [g]
    out = ''
    for p in polys:
        if p.geom_type != 'Polygon' or p.is_empty: continue
        for r in [p.exterior] + list(p.interiors):
            pts = list(r.coords)[:-1]
            out += 'M' + 'L'.join(f'{round(ox + x * sx, nd):g} {round(oy + y * sx, nd):g}' for x, y in pts) + 'Z'
    return out

def mark_body(tone, sx=1.0, ox=0.0, oy=0.0, small=False, nd=1):
    """The mark as SVG shapes. tone: 'dark', 'light', or a single colour."""
    P = lambda g, fill: f'<path fill="{fill}" fill-rule="evenodd" d="{path_d(g, sx, ox, oy, nd)}"/>'
    keys = [k for k in G if not (small and k in SMALL_DROP)]
    if tone in ('dark', 'light'):
        blue = DARK_BLUE if tone == 'dark' else BLUE
        signs = '#ffffff' if tone == 'dark' else TEXT_GREY
        out = P(sq(0, 0), blue) + P(sq(1, 0), RED) + P(sq(0, 1), GREEN) + P(sq(1, 1), YELLOW)
        out += P(unary_union([G['E'], G['m'], G['c']]), '#ffffff') + P(G['two'], YELLOW)
        out += P(unary_union([G[k] for k in ('int', 'R', 'P') if k in keys]), NAVY)
        out += P(unary_union([G['eq1'], G['eq2']]), signs)
        return out
    # one colour: the squares with the letters cut out of them, and the equals signs
    cut = unary_union([G[k] for k in keys if not k.startswith('eq')])
    squares = unary_union([sq(0, 0), sq(1, 0), sq(0, 1), sq(1, 1)]).difference(cut)
    return P(unary_union([squares, G['eq1'], G['eq2']]), tone)

def fitted(font, text, cap, width):
    w0 = Wd.word(font, text, 0, 0, cap); t = (width - (w0.bounds[2] - w0.bounds[0])) / max(1, len(text) - 1)
    g = Wd.word(font, text, t, 0, cap).simplify(0.1); return at(g, x=0, y=0)

NAME = at(Wd.word(BOLD, 'SAMANA', 0, 0, 100).simplify(0.15), x=0, y=0); NAME_W = NAME.bounds[2]
SUB = at(Wd.word(SEMI, 'EMC²RP SOFTWARE', 7.0, 0, 34).simplify(0.1), x=0, y=0)   # the tagline, lightly spaced
LEAD = 30.0; BLOCK = 100 + LEAD + 34

def lock(kind):
    """Where SAMANA and the category line go: (name, sub, mark x, mark y, width, height)."""
    if kind == 'mark': return None, None, 0, 0, W, H
    if kind == 'wide':
        k = H / BLOCK * 0.62; x0 = W + 74; y0 = (H - BLOCK * k) / 2
        return place(NAME, k, x0, y0), place(SUB, k, x0, y0 + (100 + LEAD) * k), 0, 0, x0 + NAME_W * k, H
    if kind == 'small':
        k = 1.25; x0 = W + 70; y0 = (H - 100 * k) / 2
        return place(NAME, k, x0, y0), None, 0, 0, x0 + NAME_W * k, H
    if kind == 'stacked':
        k = (W * 1.7) / NAME_W; tw = NAME_W * k; mx = (tw - W) / 2; y0 = H + 60
        return place(NAME, k, 0, y0), place(SUB, k, 0, y0 + (100 + LEAD) * k), mx, 0, tw, y0 + BLOCK * k

def place(g, k, dx, dy): return affinity.translate(affinity.scale(g, k, k, origin=(0, 0)), dx, dy)

def svg(kind, tone, title='Samana, EMC²RP software'):
    name, sub, mx, my, w, h = lock(kind)
    c1 = '#ffffff' if tone == 'dark' else (TEXT_GREY if tone == 'light' else tone)
    c2 = PALE if tone == 'dark' else (TEXT_GREY if tone == 'light' else tone)
    P = lambda g, fill: f'<path fill="{fill}" fill-rule="evenodd" d="{path_d(g)}"/>' if g is not None else ''
    body = f'<g transform="translate({mx:.1f} {my:.1f})">{mark_body(tone)}</g>' + P(name, c1) + P(sub, c2)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" role="img" aria-label="{title}"><title>{title}</title>{body}</svg>'

def write(name, text):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)
    print(f'{name:36s} {len(text):6d} bytes')

FILES = []
for stem, kind in (('samana-mark', 'mark'), ('samana-logo', 'stacked'), ('samana-logo-wide', 'wide'), ('samana-logo-small', 'small')):
    for end, tone in (('', 'light'), ('-dark', 'dark'), ('-mono', INK), ('-mono-white', '#ffffff')):
        write(stem + end + '.svg', svg(kind, tone)); FILES.append((stem + end, kind))

# App icons: the mark on navy, a full square (the store and the phone round it). The small icons leave off R and P.
def icon(size, small):
    k = size * 0.62 / W; ox = (size - W * k) / 2; oy = (size - H * k) / 2
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"><rect width="{size}" height="{size}" fill="{NAVY}"/>{mark_body("dark", k, ox, oy, small, nd=2)}</svg>'
write('samana-icon.svg', icon(512, False))
write('samana-favicon.svg', icon(64, True))

import cairosvg
for stem, kind in FILES:
    size = {'output_height': 1200} if kind in ('stacked', 'mark') else {'output_width': 1800}
    cairosvg.svg2png(url=os.path.join(OUT, stem + '.svg'), write_to=os.path.join(OUT, stem + '.png'), **size)
for px in (1024, 512, 192, 180):
    cairosvg.svg2png(url=os.path.join(OUT, 'samana-icon.svg'), write_to=os.path.join(OUT, f'samana-icon-{px}.png'), output_width=px)
for px in (48, 32):
    cairosvg.svg2png(url=os.path.join(OUT, 'samana-favicon.svg'), write_to=os.path.join(OUT, f'samana-favicon-{px}.png'), output_width=px)
print('PNGs written')
