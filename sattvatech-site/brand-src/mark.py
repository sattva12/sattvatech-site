"""The Sattva mark: nine rounded squares in three rows of three, linked in one line that runs as an S.
Top row left to right, down the left side, middle row, down the right side, bottom row. y grows downward."""
from shapely.geometry import box
from shapely.ops import unary_union

SQ, GAP = 144.0, 64.0               # a square, and the space between squares
LINK, RAD = 96.0, 18.0              # the links are two thirds of a square thick, so the S holds at small sizes; the squares' corners are rounded this much
                                    # (Atul's picture had them a third of a square: at icon sizes that reads as nine dots, not an S)
SIZE = 3 * SQ + 2 * GAP             # the mark is square: 560

def square(col, row):
    x, y = col * (SQ + GAP), row * (SQ + GAP)
    return box(x + RAD, y + RAD, x + SQ - RAD, y + SQ - RAD).buffer(RAD, quad_segs=10)

def link(col, row, down):
    """A link from the square at col,row to the one on its right, or to the one below it."""
    x, y = col * (SQ + GAP), row * (SQ + GAP); c = SQ / 2; h = LINK / 2; lap = RAD + 2   # tucked a little into each square
    if down: return box(x + c - h, y + SQ - lap, x + c + h, y + SQ + GAP + lap)
    return box(x + SQ - lap, y + c - h, x + SQ + GAP + lap, y + c + h)

def mark():
    parts = [square(c, r) for r in range(3) for c in range(3)]
    parts += [link(c, r, False) for r in range(3) for c in range(2)]        # along each row
    parts += [link(0, 0, True), link(2, 1, True)]                           # down the left, then down the right
    return unary_union(parts)

def path_d(geom, sx=1.0, ox=0.0, oy=0.0, nd=1):
    polys = list(geom.geoms) if geom.geom_type == 'MultiPolygon' else [geom]
    def ring(r):
        pts = list(r.coords)[:-1]
        return 'M' + 'L'.join(f'{round(ox + x * sx, nd):g} {round(oy + y * sx, nd):g}' for x, y in pts) + 'Z'
    return ''.join(ring(p.exterior) + ''.join(ring(i) for i in p.interiors) for p in polys)

if __name__ == '__main__':
    g = mark(); print(g.geom_type, 'valid', g.is_valid, [round(v) for v in g.bounds], 'holes', len(g.interiors))
