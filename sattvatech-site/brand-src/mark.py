"""The Sattva mark: nine rounded squares in three rows of three, and one line that runs over them as an S.
The line starts at the top right square, runs along the top row, down the left, along the middle, down the right,
and along the bottom row to the bottom left square. y grows downward."""
from shapely.geometry import box
from shapely.ops import unary_union

SQ, GAP = 144.0, 64.0               # a square, and the space between squares
RAD = 18.0                          # how much the squares' corners are rounded
LINE, TURN = 46.0, 20.0             # the S line: its width (about a third of a square) and the rounding of its outer corners
LINK = 96.0                         # one colour only: the links between squares, two thirds of a square thick
SIZE = 3 * SQ + 2 * GAP             # the mark is square: 560
PITCH = SQ + GAP

# The colours as measured from Atul's picture, row by row. The line and the lettering are greys.
BLUE, RED, GREEN, YELLOW = '#134e89', '#e44936', '#3ea059', '#f6b70a'
GRID = [[BLUE, RED, GREEN], [YELLOW, BLUE, RED], [GREEN, YELLOW, BLUE]]
LINE_GREY, TEXT_GREY = '#525355', '#2f3033'

def square(col, row):
    x, y = col * PITCH, row * PITCH
    return box(x + RAD, y + RAD, x + SQ - RAD, y + SQ - RAD).buffer(RAD, quad_segs=10)

def line(width=None, tuck=1.5):
    """The S line. Its two ends stop square against the top right and bottom left squares (tucked under them a hair)."""
    w = (width or LINE) / 2; c = [SQ / 2 + i * PITCH for i in range(3)]      # the centres of the rows and columns
    far = 400                                                                # the ends are drawn long, the corners rounded, then the ends cut back
    body = unary_union([
        box(c[0] - w, c[0] - w, 2 * PITCH + far, c[0] + w),                  # along the top row
        box(c[0] - w, c[0] - w, c[0] + w, c[1] + w),                         # down the left
        box(c[0] - w, c[1] - w, c[2] + w, c[1] + w),                         # along the middle row
        box(c[2] - w, c[1] - w, c[2] + w, c[2] + w),                         # down the right
        box(SQ - far, c[2] - w, c[2] + w, c[2] + w),                         # along the bottom row
    ])
    r = max(0.0, min(TURN, w - 1.5))
    if r: body = body.buffer(-r, join_style=2).buffer(r, quad_segs=10)       # rounds the outside corners, leaves the inside ones square
    cut_top = box(2 * PITCH + tuck, c[0] - w - 5, 2 * PITCH + far + 50, c[0] + w + 5)      # past the top right square's edge
    cut_bottom = box(SQ - far - 50, c[2] - w - 5, SQ - tuck, c[2] + w + 5)                   # past the bottom left square's edge
    return body.difference(cut_top).difference(cut_bottom)

def mono():
    """One colour: the squares and the links between them as a single shape, links thick enough that the S holds when small."""
    h = LINK / 2; lap = RAD + 2; c = SQ / 2
    parts = [square(col, row) for row in range(3) for col in range(3)]
    for row in range(3):
        for col in range(2):
            x, y = col * PITCH, row * PITCH; parts.append(box(x + SQ - lap, y + c - h, x + PITCH + lap, y + c + h))
    for col, row in ((0, 0), (2, 1)):
        x, y = col * PITCH, row * PITCH; parts.append(box(x + c - h, y + SQ - lap, x + c + h, y + PITCH + lap))
    return unary_union(parts)

def path_d(geom, sx=1.0, ox=0.0, oy=0.0, nd=1):
    polys = list(geom.geoms) if geom.geom_type == 'MultiPolygon' else [geom]
    def ring(r):
        pts = list(r.coords)[:-1]
        return 'M' + 'L'.join(f'{round(ox + x * sx, nd):g} {round(oy + y * sx, nd):g}' for x, y in pts) + 'Z'
    return ''.join(ring(p.exterior) + ''.join(ring(i) for i in p.interiors) for p in polys)

def colour_svg_body(sx=1.0, ox=0.0, oy=0.0, grid=None, line_fill=None, width=None, nd=1, halo=None, halo_fill='#fff'):
    """The colour mark as SVG shapes: seven squares, the line over them, then the two end squares over the line's ends."""
    grid = grid or GRID; ends = {(2, 0), (0, 2)}; out = ''
    sq = lambda col, row: f'<path fill="{grid[row][col]}" d="{path_d(square(col, row), sx, ox, oy, nd)}"/>'
    out += ''.join(sq(col, row) for row in range(3) for col in range(3) if (col, row) not in ends)
    ln = line(width)
    if halo: out += f'<path fill="{halo_fill}" d="{path_d(ln.buffer(halo, join_style=1), sx, ox, oy, nd)}"/>'
    out += f'<path fill="{line_fill or LINE_GREY}" d="{path_d(ln, sx, ox, oy, nd)}"/>'
    out += ''.join(sq(col, row) for col, row in sorted(ends))
    return out

if __name__ == '__main__':
    l = line(); print('line', l.geom_type, l.is_valid, [round(v) for v in l.bounds]); m = mono(); print('mono', m.geom_type, m.is_valid)
