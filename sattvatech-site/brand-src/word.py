"""Lettering for the wordmark: glyph outlines taken from a font file and turned into shapes."""
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen
from shapely.geometry import Polygon
from shapely.ops import unary_union
from shapely import affinity

def _flat(rec, n=10):
    rings, cur, pos = [], [], (0, 0)
    q = lambda p0, p1, p2, t: ((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0], (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1])
    c = lambda p0, p1, p2, p3, t: ((1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t*t*p2[0] + t**3*p3[0], (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t*t*p2[1] + t**3*p3[1])
    for op, a in rec:
        if op == 'moveTo': cur = [a[0]]; pos = a[0]
        elif op == 'lineTo': cur.append(a[0]); pos = a[0]
        elif op == 'qCurveTo':
            pts = list(a); on = pts[-1]; offs = pts[:-1]
            # a run of off-curve points has implied on-curve points half way between them
            segs = []
            for i, o in enumerate(offs):
                end = on if i == len(offs) - 1 else ((o[0] + offs[i+1][0]) / 2, (o[1] + offs[i+1][1]) / 2)
                segs.append((o, end))
            for o, end in segs:
                for k in range(1, n + 1): cur.append(q(pos, o, end, k / n))
                pos = end
        elif op == 'curveTo':
            for k in range(1, n + 1): cur.append(c(pos, a[0], a[1], a[2], k / n))
            pos = a[2]
        elif op in ('closePath', 'endPath'):
            if len(cur) > 2: rings.append(cur)
            cur = []
    return rings

def glyph(font, ch):
    gs = font.getGlyphSet(); name = font.getBestCmap()[ord(ch)]
    pen = DecomposingRecordingPen(gs); gs[name].draw(pen)
    rings = _flat(pen.value)
    shape = None
    for r in sorted((Polygon(r).buffer(0) for r in rings), key=lambda p: -p.area):   # biggest first; a ring inside the shape is a hole
        shape = r if shape is None else (shape.difference(r) if shape.contains(r.representative_point()) else shape.union(r))
    return shape, gs[name].width

def word(path, text, track=0.0, bold=0.0, cap=100.0):
    """The word as one shape, its cap height scaled to cap, baseline at y=0 and y growing downward."""
    f = TTFont(path); upm = f['head'].unitsPerEm
    caph = getattr(f['OS/2'], 'sCapHeight', 0) or glyph(f, 'T')[0].bounds[3]
    k = cap / caph; x = 0.0; parts = []
    for ch in text:
        g, adv = glyph(f, ch)
        if g is not None: parts.append(affinity.translate(affinity.scale(g, k, -k, origin=(0, 0)), x, 0))
        x += adv * k + track
    w = unary_union(parts)
    if bold: w = w.buffer(bold, join_style=2, mitre_limit=3)
    minx = w.bounds[0]
    return affinity.translate(w, -minx, 0)
