"""The Sattva mark, redrawn as one solid shape: the S, three bars across, three bars down. Units: one bar is 10 wide."""
import math
from shapely.geometry import Polygon, box
from shapely.ops import unary_union

BAR, GAP = 10.0, 9.0                # bar width and the space between bars
HX, HY = 72.6, 76.0                 # half length of the bars across, half height of the bars down
W, T, R, RI = 55.0, 62.0, 39.0, 12.0  # the S: half width, half height, outer corner, inner corner
SIDE, TOPB = 20.5, 18.5             # stroke of the S at its sides, and at top and bottom
CUT = 31.0                          # where the S's ends are cut off, above and below centre

def arc(cx, cy, r, a0, a1, n=28):
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * k / n)), cy + r * math.sin(math.radians(a0 + (a1 - a0) * k / n))) for k in range(n + 1)]
def bez(p0, c1, c2, p3, n=28):
    out = []
    for k in range(n + 1):
        t = k / n; m = 1 - t
        out.append((m**3 * p0[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t**3 * p3[0], m**3 * p0[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t**3 * p3[1]))
    return out

def s_shape():
    xi, yi = W - SIDE, T - TOPB       # inner half width and half height of each bowl
    a_cut = math.degrees(math.asin((CUT - (T - R)) / R))   # angle on the outer corner where the end is cut
    half = []                         # the upper half of the outline, from the top right end round to the right side at centre height
    half += arc(W - R, -(T - R), R, -a_cut, -90)            # outer corner, top right, from the cut up to the top
    half += arc(-(W - R), -(T - R), R, -90, -180)           # outer corner, top left
    half += [(-W, -14.0)]
    half += bez((-W, -14.0), (-W, -6.0), (-44.0, 2.0), (-30.2, 4.8))      # the left side turning into the middle stroke
    half += bez((-30.2, 4.8), (-18.0, 7.0), (2.0, 5.5), (14.0, 6.6))
    half += bez((14.0, 6.6), (24.0, 7.5), (xi, 12.0), (xi, 23.0))          # the middle stroke turning down into the lower bowl
    half += [(xi, yi - RI)]
    half += arc(xi - RI, yi - RI, RI, 0, 90, 12)             # inner corner, bottom right
    half += arc(-(xi - RI), yi - RI, RI, 90, 180, 12)        # inner corner, bottom left
    half += [(-xi, CUT)]
    # the lower half is the upper half turned half way round
    return Polygon(half + [(-x, -y) for x, y in half])

def mark(with_s=True):
    c = BAR / 2 + GAP + BAR / 2
    bars = [box(-HX, y - BAR / 2, HX, y + BAR / 2) for y in (-c, 0, c)] + [box(x - BAR / 2, -HY, x + BAR / 2, HY) for x in (-c, 0, c)]
    g = unary_union(bars + ([s_shape().buffer(0)] if with_s else []))
    # two slivers are left where the S's middle stroke meets the outer bars; closed, so no specks at small sizes
    return Polygon(g.exterior, [i for i in g.interiors if Polygon(i).area > 40])

def path_d(geom, sx=1.0, ox=0.0, oy=0.0, nd=2):
    polys = list(geom.geoms) if geom.geom_type == 'MultiPolygon' else [geom]
    def ring(r):
        pts = list(r.coords)[:-1]
        return 'M' + 'L'.join(f'{round(ox + x * sx, nd):g} {round(oy + y * sx, nd):g}' for x, y in pts) + 'Z'
    return ''.join(ring(p.exterior) + ''.join(ring(i) for i in p.interiors) for p in polys)

if __name__ == '__main__':
    from PIL import Image, ImageDraw
    import numpy as np
    g = mark(); print('valid', g.is_valid, g.geom_type, 'holes', len(g.interiors) if g.geom_type == 'Polygon' else None, 'bounds', [round(v, 1) for v in g.bounds])
    src = Image.open('flat.png').convert('L'); a = np.array(src)
    k, cx, cy = 2.5 * 4, 635.5 * 4, 338 * 4      # draw at 4 times the picture's size for clean edges
    big = Image.new('L', (src.width * 4, src.height * 4), 0); dr = ImageDraw.Draw(big)
    for p in (g.geoms if g.geom_type == 'MultiPolygon' else [g]):
        dr.polygon([(cx + x * k, cy + y * k) for x, y in p.exterior.coords], fill=255)
        for i in p.interiors: dr.polygon([(cx + x * k, cy + y * k) for x, y in i.coords], fill=0)
    mine = np.array(big.resize(src.size, Image.LANCZOS)) > 128
    theirs = a < 110
    reg = (slice(130, 545), slice(430, 840))
    inter = (mine[reg] & theirs[reg]).sum(); uni = (mine[reg] | theirs[reg]).sum(); print('overlap', round(inter / uni, 3))
    ov = np.zeros((415, 410, 3), 'uint8') + 255
    ov[theirs[reg] & mine[reg]] = (60, 60, 60); ov[theirs[reg] & ~mine[reg]] = (230, 60, 60); ov[~theirs[reg] & mine[reg]] = (60, 120, 230)
    Image.fromarray(ov).resize((1230, 1245), Image.NEAREST).save('overlay.png')
