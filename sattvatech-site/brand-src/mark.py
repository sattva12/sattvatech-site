"""The Sattva mark, second drawing: a whole S in front, three bars across and three bars down behind it.
Units: the S is 635 wide and 855 tall, centred on 0,0; y grows downward."""
import math
from shapely.geometry import Polygon, box
from shapely.ops import unary_union

W, T = 317.5, 427.5                 # the S: half width, half height
CUT = 192.0                         # the ends of the S are cut level, this far above and below centre
SIDE, TOPB = 140.0, 108.0           # stroke of the S at its sides, and at top and bottom
SPINE, LEAN = 74.0, 16.5            # half the spine's height at centre, and its slope in degrees
BAR, GAP = 62.0, 36.0               # the bars behind: width, and the space between them
LEN = 1040.0                        # every bar is this long, across and down
HALO = 22.0                         # clear space kept between the S and the bars, in the one-colour drawing

def arc(cx, cy, rx, ry, a0, a1, n=40):
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * k / n)), cy + ry * math.sin(math.radians(a0 + (a1 - a0) * k / n))) for k in range(n + 1)]
def bez(p0, c1, c2, p3, n=40):
    out = []
    for k in range(n + 1):
        t = k / n; m = 1 - t
        out.append((m**3 * p0[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t**3 * p3[0], m**3 * p0[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t**3 * p3[1]))
    return out

def s_shape():
    rx, ry = W - SIDE, (T - CUT) - TOPB           # the opening inside each bowl
    ux, uy = math.cos(math.radians(LEAN)), math.sin(math.radians(LEAN))
    mid = (0.0, SPINE)                            # the underside of the spine where it crosses the centre line
    half = []
    half += arc(0, -CUT, W, T - CUT, 0, -180)     # the outside, from the top right end over the top to the left side
    half += bez((-W, -CUT), (-W, -CUT + 165), (mid[0] - 190 * ux, mid[1] - 190 * uy), mid)[1:]     # left side sweeping into the spine
    half += bez(mid, (mid[0] + 105 * ux, mid[1] + 105 * uy), (rx, CUT - 95), (rx, CUT))[1:]        # the spine turning down into the lower bowl
    half += arc(0, CUT, rx, ry, 0, 180)[1:]       # round the inside of the lower bowl to the end of the S
    return Polygon(half + [(-x, -y) for x, y in half]).buffer(0)

def bars(n_down=3, n_across=3):
    c = BAR + GAP
    def offs(n): return [c * (i - (n - 1) / 2) for i in range(n)]
    return unary_union([box(-LEN / 2, y - BAR / 2, LEN / 2, y + BAR / 2) for y in offs(n_across)] + [box(x - BAR / 2, -LEN / 2, x + BAR / 2, LEN / 2) for x in offs(n_down)])

def mark(halo=HALO):
    """One colour: the bars stop short of the S so it reads as lying on top. Returns (S, bars)."""
    s = s_shape()
    b = bars().difference(s.buffer(halo, join_style=1)) if halo is not None else bars()
    # drop specks too small to print
    parts = [p for p in (b.geoms if b.geom_type == 'MultiPolygon' else [b]) if p.area > BAR * BAR * 0.35]
    return s, unary_union(parts)

def path_d(geom, sx=1.0, ox=0.0, oy=0.0, nd=1):
    polys = list(geom.geoms) if geom.geom_type == 'MultiPolygon' else [geom]
    def ring(r):
        pts = list(r.coords)[:-1]
        return 'M' + 'L'.join(f'{round(ox + x * sx, nd):g} {round(oy + y * sx, nd):g}' for x, y in pts) + 'Z'
    return ''.join(ring(p.exterior) + ''.join(ring(i) for i in p.interiors) for p in polys)

if __name__ == '__main__':
    s, b = mark(); print('S valid', s.is_valid, s.geom_type, [round(v) for v in s.bounds], '| bars parts', len(b.geoms) if b.geom_type == 'MultiPolygon' else 1)
    h = LEN / 2 + 40
    def one(fill_s, fill_b, bg, sb): 
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-h} {-h} {2*h} {2*h}" width="520" height="520"><rect x="{-h}" y="{-h}" width="{2*h}" height="{2*h}" fill="{bg}"/><path fill="{fill_b}" fill-rule="evenodd" d="{path_d(sb)}"/><path fill="{fill_s}" fill-rule="evenodd" d="{path_d(s)}"/></svg>'
    open('m2-test.html', 'w').write('<body style="margin:0;display:flex;background:#0d2747"><img src="new-sym.png" height="520">' + one('#fff', '#fff', '#0d2747', b) + one('#fff', '#8f9fb3', '#0d2747', bars()) + '</body>')
