"""Writes every Farmmetric logo file into store/brand. Run from this folder:  python3 build.py ..
Needs shapely, fonttools and brotli; the PNGs also need cairosvg.

Farmmetric keeps its own tractor and stands alone: no Sattva mark or "by Sattva" line (Atul, 2026-10-12).
"""
import os, sys, math
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen
from shapely.geometry import Polygon
from shapely.ops import unary_union
from shapely import affinity
import tractor as T

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, 'ibm-plex-sans-condensed-latin-700-normal.woff2')   # what the app uses for its titles
LIME, GREEN, WHITE = '#ffffff', '#3ea059', '#ffffff'
NAME = 'Farmmetric'                                   # that spelling: not FARMMETRIC, not Farm Metric

TR = T.tractor().simplify(0.3)              # 0.3 of a unit in 850: far below what any screen shows
X0, Y0, X1, Y1 = T.BOUNDS; TW, TH = X1 - X0, Y1 - Y0

# ---- the word ----------------------------------------------------------------
def _rings(rec, n=12):
    rings, cur, pos = [], [], (0, 0)
    for op, a in rec:
        if op == 'moveTo': cur = [a[0]]; pos = a[0]
        elif op == 'lineTo': cur.append(a[0]); pos = a[0]
        elif op == 'qCurveTo':
            pts = list(a); on = pts[-1]; offs = pts[:-1]
            for i, o in enumerate(offs):
                end = on if i == len(offs) - 1 else ((o[0] + offs[i + 1][0]) / 2, (o[1] + offs[i + 1][1]) / 2)
                for k in range(1, n + 1):
                    t = k / n; cur.append(((1-t)**2*pos[0] + 2*(1-t)*t*o[0] + t*t*end[0], (1-t)**2*pos[1] + 2*(1-t)*t*o[1] + t*t*end[1]))
                pos = end
        elif op == 'curveTo':
            p1, p2, p3 = a
            for k in range(1, n + 1):
                t = k / n; cur.append(tuple((1-t)**3*pos[i] + 3*(1-t)**2*t*p1[i] + 3*(1-t)*t*t*p2[i] + t**3*p3[i] for i in range(2)))
            pos = p3
        elif op in ('closePath', 'endPath'):
            if len(cur) > 2: rings.append(cur)
            cur = []
    return rings

def _signed(r): return sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(r, r[1:] + r[:1])) / 2

def glyph(font, ch):
    """A letter as one shape, read by the direction of its outlines: outlines turning the way the biggest one turns
    are filled, the others are holes. (This keeps overlapping outlines, as in t and f, from cutting each other.)"""
    gs = font.getGlyphSet(); name = font.getBestCmap()[ord(ch)]
    pen = DecomposingRecordingPen(gs); gs[name].draw(pen)
    rings = _rings(pen.value)
    if not rings: return None, gs[name].width
    main = max(rings, key=lambda r: abs(_signed(r))); sign = _signed(main) > 0
    fill = unary_union([Polygon(r).buffer(0) for r in rings if (_signed(r) > 0) == sign])
    holes = unary_union([Polygon(r).buffer(0) for r in rings if (_signed(r) > 0) != sign])
    return fill.difference(holes), gs[name].width

def word(text, cap=100.0, track=0.0):
    """The word with its capital height cap, top of the capitals at y=0, y growing downward, left edge at x=0."""
    f = TTFont(FONT); caph = f['OS/2'].sCapHeight; k = cap / caph; x = 0.0; parts = []
    for ch in text:
        g, adv = glyph(f, ch)
        if g is not None and not g.is_empty: parts.append(affinity.translate(affinity.scale(g, k, -k, origin=(0, 0)), x, cap))
        x += adv * k + track
    w = unary_union(parts).simplify(0.08)
    return affinity.translate(w, -w.bounds[0], 0)

WORD = word(NAME)                                      # capitals 100 tall, from y=0; the g-less word has no descender
WW, WH = WORD.bounds[2], WORD.bounds[3]

# ---- svg helpers -------------------------------------------------------------
def P(g, fill, k=1.0, ox=0.0, oy=0.0, nd=1):
    return f'<path fill="{fill}" fill-rule="evenodd" d="{T.path_d(g, k, ox, oy, nd)}"/>'
def tractor_at(fill, size, cx, cy, nd=2):
    """The tractor scaled to this height, centred on cx, cy."""
    k = size / TH
    return P(TR, fill, k, cx - (X0 + TW / 2) * k, cy - (Y0 + TH / 2) * k, nd)
def doc(w, h, body, title='Farmmetric', bg=None):
    rect = f'<rect width="{w:g}" height="{h:g}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" role="img" aria-label="{title}"><title>{title}</title>{rect}{body}</svg>'

FILES = []
def write(name, text, png=None):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)
    FILES.append((name, png)); print(f'{name:44s} {len(text):6d} bytes')

# ---- the mark alone ----------------------------------------------------------
def mark(fill): return doc(round(TW, 1), round(TH, 1), P(TR, fill, 1, -X0, -Y0))
write('farmmetric-mark.svg', mark(LIME), [('farmmetric-mark.png', {'output_height': 1024})])
write('farmmetric-mark-white.svg', mark(WHITE), [('farmmetric-mark-white.png', {'output_height': 1024})])
write('farmmetric-mark-green.svg', mark(GREEN), [('farmmetric-mark-green.png', {'output_height': 1024})])

# ---- the app icon: a full square, no rounding and no white; the store and the phone round it -----------------
ICON_FILL = 0.62                                       # the tractor's height as a share of the square
write('farmmetric-icon.svg', doc(512, 512, tractor_at(LIME, 512 * ICON_FILL, 256, 256), bg=GREEN),
      [('farmmetric-icon-512.png', {'output_width': 512}), ('apple-touch-icon-180.png', {'output_width': 180}),
       ('farmmetric-icon-1024.png', {'output_width': 1024})])

# ---- Android adaptive icon: 108 x 108, everything that matters inside the middle 66 (a circle) --------------
pts = [p for g in TR.geoms for p in g.exterior.coords]
cx0, cy0 = X0 + TW / 2, Y0 + TH / 2
reach = max(math.hypot(x - cx0, y - cy0) for x, y in pts)    # the farthest point of the tractor from its centre
k_fg = 33.0 / reach                                           # so the whole tractor sits inside the 66 circle
write('farmmetric-adaptive-foreground.svg',
      doc(108, 108, P(TR, LIME, k_fg, 54 - cx0 * k_fg, 54 - cy0 * k_fg, 3)),
      [('farmmetric-adaptive-foreground-432.png', {'output_width': 432})])
write('farmmetric-adaptive-background.svg', doc(108, 108, '', bg=GREEN),
      [('farmmetric-adaptive-background-432.png', {'output_width': 432})])

# ---- browser tab icons: at 32 and 48 the circuit would be a smudge, so the small tab icon leaves it out --------
SMALL = T.tractor(circuit=False).simplify(1.5)
def small_icon(n):
    k = n * 0.78 / TH
    return doc(n, n, P(SMALL, LIME, k, n / 2 - cx0 * k, n / 2 - cy0 * k, 2), bg=GREEN)
write('favicon.svg', small_icon(48), [('favicon-32.png', {'output_width': 32}), ('favicon-48.png', {'output_width': 48})])

# ---- the wordmark: the tractor beside the word (wide) and over it (stacked) -----------------------------------
def wide(tfill, wfill):
    th = 100.0 / 0.42                                  # the word's capitals are 42% of the tractor's height
    gap = th * 0.22; k = th / TH; tw = TW * k
    body = P(TR, tfill, k, -X0 * k, -Y0 * k) + P(WORD, wfill, 1, tw + gap, (th - 100) / 2)
    return doc(round(tw + gap + WW, 1), round(th, 1), body)
def stacked(tfill, wfill):
    k = TW / WW * 1.0                                   # the word as wide as the tractor
    gap = TH * 0.10; body = P(TR, tfill, 1, -X0, -Y0) + P(WORD, wfill, k, 0, TH + gap)
    return doc(round(TW, 1), round(TH + gap + WH * k, 1), body)
for name, tf, wf in (('', LIME, WHITE), ('-light', LIME, GREEN)):
    write(f'farmmetric-logo-wide{name}.svg', wide(tf, wf), [(f'farmmetric-logo-wide{name}.png', {'output_width': 1800})])
    write(f'farmmetric-logo{name}.svg', stacked(tf, wf), [(f'farmmetric-logo{name}.png', {'output_height': 1400})])
write('farmmetric-logo-wide-mono-white.svg', wide(WHITE, WHITE), [('farmmetric-logo-wide-mono-white.png', {'output_width': 1800})])
write('farmmetric-logo-wide-mono-green.svg', wide(GREEN, GREEN), [('farmmetric-logo-wide-mono-green.png', {'output_width': 1800})])

# ---- PNGs --------------------------------------------------------------------
try:
    import cairosvg
    for name, pngs in FILES:
        for png, size in (pngs or []):
            cairosvg.svg2png(url=os.path.join(OUT, name), write_to=os.path.join(OUT, png), **size)
    print('PNGs written')
except ImportError:
    print('cairosvg not installed: PNGs not written')
