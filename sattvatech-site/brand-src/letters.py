"""The SATTVA lettering, drawn from the measured shapes in the logo: cap height 100, y grows downward."""
import math
from shapely.geometry import Polygon, box
from shapely.ops import unary_union
from shapely import affinity

def fillet(pts, radii, n=10):
    """A polygon with each corner rounded by its own radius (0 leaves it sharp)."""
    out = []; N = len(pts)
    for i, (p, r) in enumerate(zip(pts, radii)):
        a, b = pts[i - 1], pts[(i + 1) % N]
        if not r: out.append(p); continue
        v1 = (a[0] - p[0], a[1] - p[1]); v2 = (b[0] - p[0], b[1] - p[1])
        l1, l2 = math.hypot(*v1), math.hypot(*v2); u1 = (v1[0] / l1, v1[1] / l1); u2 = (v2[0] / l2, v2[1] / l2)
        ang = math.acos(max(-1, min(1, u1[0] * u2[0] + u1[1] * u2[1])))
        d = min(r / math.tan(ang / 2), l1 / 2, l2 / 2); r = d * math.tan(ang / 2)
        t1 = (p[0] + u1[0] * d, p[1] + u1[1] * d); t2 = (p[0] + u2[0] * d, p[1] + u2[1] * d)
        bis = (u1[0] + u2[0], u1[1] + u2[1]); bl = math.hypot(*bis); h = r / math.sin(ang / 2)
        c = (p[0] + bis[0] / bl * h, p[1] + bis[1] / bl * h)
        a1 = math.atan2(t1[1] - c[1], t1[0] - c[0]); a2 = math.atan2(t2[1] - c[1], t2[0] - c[0])
        da = a2 - a1
        while da > math.pi: da -= 2 * math.pi
        while da < -math.pi: da += 2 * math.pi
        out += [(c[0] + r * math.cos(a1 + da * k / n), c[1] + r * math.sin(a1 + da * k / n)) for k in range(n + 1)]
    return Polygon(out)

TH, TV, TM = 19.8, 22.1, 17.0      # stroke: bars across, stems, the S's middle bar
RO, RIN = 23.0, 5.0                # the S's outer and inner corners
SLOPE, LEG = 0.554, 23.8           # the lean of A and V, and how wide a leg is measured across

def letter_s(x=0.0):
    w = 106.5; m0, m1 = 40.9, 57.9; b0 = 100 - TH
    pts = [(102.4, 0), (0, 0), (0, m1), (w - TV, m1), (w - TV, b0), (0.4, b0), (0.4, 100), (w, 100), (w, m0), (TV, m0), (TV, TH), (102.4, TH)]
    rad = [0, RO, RO, RIN, RIN, 0, 0, RO, RO, RIN, RIN, 0]
    return affinity.translate(fillet(pts, rad), x, 0)

def letter_t(cx, w=115.0):
    return unary_union([box(cx - w / 2, 0, cx + w / 2, TH), box(cx - TV / 2, 0, cx + TV / 2, 100)])

def letter_a(cx, half=67.7, bar=(62.4, 79.5)):
    top = half - 100 * SLOPE
    outer = fillet([(cx - half, 100), (cx - top, 0), (cx + top, 0), (cx + half, 100)], [0, 6, 6, 0])
    inh = half - LEG; apex = 100 - inh / SLOPE
    inner = fillet([(cx - inh, 100.01), (cx, apex), (cx + inh, 100.01)], [0, 2.5, 0])
    return unary_union([outer.difference(inner), box(cx - half, bar[0], cx + half, bar[1]).intersection(outer)])

def letter_v(cx, half=67.5):
    a = letter_a(cx, half, bar=(0, 0))                # an A with no bar, turned upside down
    return affinity.scale(a, 1, -1, origin=(cx, 50))

def sattva():
    return unary_union([letter_s(0), letter_a(180.6), letter_t(295.2), letter_t(419.6), letter_v(550.2), letter_a(665.9)])

if __name__ == '__main__':
    from PIL import Image, ImageDraw
    import numpy as np
    w = sattva(); print('valid', w.is_valid, 'bounds', [round(v, 1) for v in w.bounds], 'parts', len(w.geoms) if w.geom_type == 'MultiPolygon' else 1)
    src = Image.open('flat.png').convert('L'); a = np.array(src)
    K = 4; k = 77.75 / 100 * K; ox, oy = (340 + 12.2) * K, (560 + 12.0) * K
    big = Image.new('L', (src.width * K, src.height * K), 0); dr = ImageDraw.Draw(big)
    for p in (w.geoms if w.geom_type == 'MultiPolygon' else [w]):
        dr.polygon([(ox + x * k, oy + y * k) for x, y in p.exterior.coords], fill=255)
        for i in p.interiors: dr.polygon([(ox + x * k, oy + y * k) for x, y in i.coords], fill=0)
    mine = np.array(big.resize(src.size, Image.LANCZOS)) > 128; theirs = a < 128
    reg = (slice(560, 665), slice(340, 935))
    print('overlap', round((mine[reg] & theirs[reg]).sum() / (mine[reg] | theirs[reg]).sum(), 3))
    ov = np.zeros((105, 595, 3), 'uint8') + 255
    ov[theirs[reg] & mine[reg]] = (60, 60, 60); ov[theirs[reg] & ~mine[reg]] = (230, 60, 60); ov[~theirs[reg] & mine[reg]] = (60, 120, 230)
    Image.fromarray(ov).resize((1785, 315), Image.NEAREST).save('word-overlay.png')
