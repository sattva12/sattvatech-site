/* The drawings on the site, in the app's own sheet language: white linework, amber marks and dimensions.
   Every drawing is a 720 by 470 sheet. Lines ink in once; pass still to draw it finished. */

const R = (x, y, w, h) => `M${x} ${y}h${w}v${h}h${-w}z`
const C = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0z`

function P({ d, c = 'w', t = 0, ...rest }) {
  return <path d={d} pathLength="1" className={'ink ' + c} style={{ '--d': t + 's' }} {...rest} />
}
function T({ x, y, c = 'lb', t = 0.9, a = 'middle', children, ...rest }) {
  return <text x={x} y={y} textAnchor={a} className={'tx ' + c} style={{ '--d': t + 's' }} {...rest}>{children}</text>
}
function DimH({ x1, x2, y, label, t = 1.3 }) {
  return (
    <g className="ly-dim">
      <P c="a" t={t} d={`M${x1} ${y}H${x2}M${x1} ${y - 5}v10M${x2} ${y - 5}v10`} />
      <T x={(x1 + x2) / 2} y={y - 7} c="lv" t={t + 0.2}>{label}</T>
    </g>
  )
}
function DimV({ y1, y2, x, label, t = 1.3 }) {
  const m = (y1 + y2) / 2
  return (
    <g className="ly-dim">
      <P c="a" t={t} d={`M${x} ${y1}V${y2}M${x - 5} ${y1}h10M${x - 5} ${y2}h10`} />
      <T x={x - 7} y={m} c="lv" t={t + 0.2} transform={`rotate(-90 ${x - 7} ${m})`}>{label}</T>
    </g>
  )
}
function Sheet({ children, still, label, className = '', box = '0 0 720 470' }) {
  return <svg viewBox={box} className={'st-dw ' + (still ? 'still ' : '') + className} role="img" aria-label={label}>{children}</svg>
}

/* Construction: the basement of the sample house, 36 ft 6 in. by 24 ft inside the concrete */
export function PlanBasement({ still }) {
  const x0 = 92, y0 = 58, w = 547.5, h = 360, x1 = x0 + w, y1 = y0 + h
  const X = (n) => x0 + n, Y = (n) => y0 + n
  const lights = [[60, 55], [150, 55], [60, 115], [150, 115], [80, 255], [190, 255], [80, 320], [190, 320], [400, 120], [490, 120], [400, 215], [490, 215], [400, 310], [490, 310]]
  const outlets = [[0, 40], [0, 120], [0, 250], [0, 330], [110, 360], [230, 360], [390, 360], [500, 360], [547.5, 90], [547.5, 300], [120, 0], [450, 0]]
  return (
    <Sheet still={still} label="Basement plan: two bedrooms, a bath, the stairs and a living area, with dimensions">
      <P d={R(x0 - 10, y0 - 10, w + 20, h + 20)} t={0} />
      <P d={R(x0, y0, w, h)} c="t" t={0.15} />
      {/* closets between the bedrooms, and the wall that divides them */}
      <P c="i" t={0.45} d={`M${x0} ${Y(180)}H${X(250)}M${X(95)} ${Y(150)}V${Y(210)}M${x0} ${Y(150)}h10M${X(85)} ${Y(150)}h10M${x0} ${Y(210)}h10M${X(85)} ${Y(210)}h10`} />
      <P c="t" t={0.7} d={`M${X(10)} ${Y(150)}l18.75 -12l18.75 12l18.75 -12l18.75 12M${X(10)} ${Y(210)}l18.75 12l18.75 -12l18.75 12l18.75 -12`} />
      {/* bedroom 1 wall and the bath */}
      <P c="i" t={0.6} d={`M${X(232)} ${y0}V${Y(135)}M${X(262)} ${Y(75)}H${X(367)}V${y0}`} />
      <P c="t" t={0.9} d={R(X(238), Y(5), 40, 16) + C(X(258), Y(13), 5) + R(X(289), Y(4), 18, 7) + C(X(298), Y(21), 9) + R(X(322), Y(5), 40, 65) + `M${X(322)} ${Y(5)}l40 65M${X(362)} ${Y(5)}l-40 65`} />
      {/* stairs */}
      <P c="i" t={0.8} d={R(X(285), Y(150), 52, 180) + `M${X(285)} ${Y(330)}V${y1}`} />
      <P c="t" t={1.0} d={Array.from({ length: 12 }, (_, k) => `M${X(285)} ${Y(150 + (k + 1) * 13.85)}h52`).join('')} />
      <P c="a" t={1.25} d={`M${X(311)} ${Y(322)}V${Y(162)}M${X(304)} ${Y(173)}L${X(311)} ${Y(162)}L${X(318)} ${Y(173)}`} />
      {/* door swings */}
      <path className="dash fade" style={{ '--d': '1.1s' }} d={`M${X(232)} ${Y(135)}A45 45 0 0 0 ${X(187)} ${Y(180)}M${X(250)} ${Y(180)}A35 35 0 0 0 ${X(285)} ${Y(215)}M${X(262)} ${Y(75)}A30 30 0 0 1 ${X(232)} ${Y(105)}`} />
      {/* lights and outlets */}
      <g className="fade" style={{ '--d': '1.5s' }}>
        {lights.map(([a, b]) => <g key={a + '-' + b}><circle className="lt" cx={X(a)} cy={Y(b)} r="6" /><circle className="ltd" cx={X(a)} cy={Y(b)} r="1.6" /></g>)}
        {outlets.map(([a, b]) => <circle key={a + '_' + b} className="ol" cx={X(a)} cy={Y(b)} r="3.4" />)}
      </g>
      <T x={X(112)} y={Y(88)}>Bedroom 1</T><T x={X(112)} y={Y(103)} c="sm">180 SF</T>
      <T x={X(140)} y={Y(288)}>Bedroom 2</T><T x={X(140)} y={Y(303)} c="sm">228 SF</T>
      <T x={X(445)} y={Y(165)}>Living area</T><T x={X(445)} y={Y(180)} c="sm">373 SF</T>
      <T x={X(276)} y={Y(52)} c="sm">Bath 55 SF</T>
      <T x={X(48)} y={Y(170)} c="sm">Cl.</T><T x={X(48)} y={Y(200)} c="sm">Cl.</T>
      <T x={X(311)} y={Y(346)} c="lv">Up</T>
      <DimH x1={x0} x2={x1} y={y0 - 26} label={'36′ 6″ inside the concrete'} />
      <DimV y1={y0} y2={Y(180)} x={x0 - 28} label={'12′'} />
      <DimV y1={Y(180)} y2={y1} x={x0 - 28} label={'12′'} />
      <DimH x1={x0} x2={X(285)} y={y1 + 34} label={'19′'} />
      <DimH x1={X(285)} x2={x1} y={y1 + 34} label={'17′ 6″'} />
    </Sheet>
  )
}

/* Construction: the deck on the sample house */
export function PlanDeck({ still }) {
  const x0 = 150, y0 = 110, w = 420, h = 250
  return (
    <Sheet still={still} label="Deck plan: a 16 by 12 ft composite deck against the house wall, with joists and stairs">
      <P d={R(x0 - 20, y0 - 34, w + 40, 24)} t={0} c="i" />
      <path className="hatch fade" style={{ '--d': '.3s' }} d={Array.from({ length: 23 }, (_, k) => `M${x0 - 20 + k * 20} ${y0 - 10}l20 -24`).join('')} />
      <P d={R(x0, y0, w, h)} t={0.2} />
      <P c="t" t={0.6} d={Array.from({ length: 11 }, (_, k) => `M${x0 + (k + 1) * 35} ${y0}v${h}`).join('')} />
      <path className="beam fade" style={{ '--d': '1.2s' }} d={`M${x0} ${y0 + h - 28}h${w}`} />
      <g className="fade" style={{ '--d': '1.3s' }}>{[0, 0.5, 1].map((k) => <rect key={k} className="post" x={x0 + k * w - 6} y={y0 + h - 34} width="12" height="12" />)}</g>
      <P c="i" t={0.9} d={R(x0 + 150, y0 + h, 110, 64)} />
      <P c="t" t={1.1} d={Array.from({ length: 6 }, (_, k) => `M${x0 + 150} ${y0 + h + (k + 1) * 9.1}h110`).join('')} />
      <T x={x0 + w / 2} y={y0 - 17} c="sm">House wall</T>
      <T x={x0 + w / 2} y={y0 + 105}>Composite deck</T>
      <T x={x0 + w / 2} y={y0 + 122} c="sm">192 sq ft, 2 ft up</T>
      <T x={x0 + w / 2} y={y0 + 138} c="sm">2×10 joists at 16 in., 3 posts on footings 48 in. deep</T>
      <T x={x0 + 205} y={y0 + h + 84} c="lv">7 risers, down</T>
      <DimH x1={x0} x2={x0 + w} y={y0 - 52} label={'16′'} />
      <DimV y1={y0} y2={y0 + h} x={x0 - 26} label={'12′'} />
    </Sheet>
  )
}

/* Farms: a 200 by 300 ft fenced field, drawn with its layers the way the app holds them */
export function PlanFarm({ still, off = {} }) {
  const fx = 170, fy = 75, fw = 510, fh = 340
  const poles = [[fx, fy], [fx + fw / 2, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw / 2, fy + fh], [fx + fw, fy + fh]]
  const cls = Object.keys(off).filter((k) => off[k]).map((k) => 'off-' + k).join(' ')
  const boxes = [[88, 'Lab'], [110, 'Power'], [126, 'Dry 1'], [142, 'Dry 2'], [158, 'Dry 3']]
  return (
    <Sheet still={still} className={cls} label="Farm site plan: a fenced field with twenty rows, six camera poles, the power line, containers and a hoop house">
      {/* the road and the drive to the gate */}
      <P c="t" t={0} d={`M28 20V450M150 300H28M150 320H28`} />
      <T x={20} y={240} c="sm" transform="rotate(-90 20 240)">Road</T>
      <g className="ly-fence">
        <P t={0.2} d={`M${fx} ${fy}h${fw}v${fh}h${-fw}V337M${fx} 327V320M${fx} 300V${fy}`} />
        <path className="dash fade" style={{ '--d': '1.1s' }} d={`M${fx} 300A20 20 0 0 0 150 320M${fx} 337A10 10 0 0 0 160 327`} />
        <T x={fx - 6} y={352} c="sm" a="end">Gates</T>
      </g>
      <g className="ly-rows">
        <P c="t" t={0.7} d={Array.from({ length: 20 }, (_, k) => R(198, 113 + k * 13.6, 462, 6.8)).join('')} />
        <T x={429} y={249} c="halo">20 rows of 272 ft</T>
      </g>
      <g className="ly-cont">
        <P c="i" t={1.0} d={boxes.map(([y]) => R(112, y, 68, 13.6)).join('')} />
        {boxes.map(([y, n]) => <T key={n} x={102} y={y + 10.5} c="sm" a="end" t={1.3}>{n}</T>)}
        <P c="i" t={1.2} d={R(48, 372, 78, 30) + 'M61 372v30M74 372v30M87 372v30M100 372v30M113 372v30'} />
        <T x={87} y={420} c="sm" t={1.4}>Hoop house</T>
      </g>
      <g className="ly-power">
        <path className="dash amb fade" style={{ '--d': '1.3s' }} d="M28 44H92M92 58L112 116" />
        <P c="a" t={1.3} d={C(92, 50, 8) + R(60, 60, 14, 14)} />
        <T x={92} y={54} c="lv sm" t={1.5}>M</T>
        <T x={104} y={40} c="lv" a="start" t={1.5}>400 A service</T>
        <T x={56} y={71} c="sm" a="end" t={1.5}>Well</T>
      </g>
      <g className="ly-cam fade" style={{ '--d': '1.5s' }}>
        {poles.map(([a, b]) => <g key={a + '-' + b}><path className="reach" d={`M${a - 34} ${b}A34 34 0 0 ${b === fy ? 0 : 1} ${a + 34} ${b}z`} clipPath="url(#st-in)" /><circle className="pole" cx={a} cy={b} r="5" /></g>)}
        <rect className="pole" x={fx + 6} y={306} width="7" height="7" /><rect className="pole" x={fx + 6} y={329} width="7" height="7" />
        <T x={fx + fw / 2} y={fy + 28} c="lv" t={1.6}>Camera pole, 16 ft</T>
      </g>
      <defs><clipPath id="st-in"><rect x={fx} y={fy} width={fw} height={fh} /></clipPath></defs>
      <DimH x1={fx} x2={fx + fw} y={fy - 24} label="300 ft" t={1.6} />
      <DimV y1={fy} y2={fy + fh} x={fx + fw + 28} label="200 ft" t={1.6} />
    </Sheet>
  )
}

/* Products: a 40 ft container set up as a drying room, side view and plan */
export function PlanContainer({ still }) {
  return (
    <Sheet still={still} label="A 40 ft container drawn in side view and plan: floor fans, hang lines, two dehumidifiers and two AC units">
      {/* side */}
      <P t={0} d={R(80, 64, 560, 126)} />
      <P c="t" t={0.4} d={Array.from({ length: 39 }, (_, k) => `M${94 + k * 14} 70v114`).join('')} />
      <P c="t" t={0.2} d="M50 190H690" />
      <P c="i" t={0.9} d={R(644, 112, 26, 40) + C(657, 132, 9)} />
      <T x={66} y={130} c="sm" a="end">Side</T>
      {/* plan */}
      <P t={0.5} d={R(80, 250, 560, 112)} />
      <P c="t" t={0.7} d={R(86, 256, 548, 100)} />
      <P c="t" t={1.1} d="M80 250H28M80 362H28" />
      <path className="dash fade" style={{ '--d': '1.3s' }} d="M28 250A52 52 0 0 0 80 302M28 362A52 52 0 0 1 80 310" />
      <P c="i" t={1.0} d={C(122, 281, 15) + C(122, 331, 15) + 'M111 270l22 22M133 270l-22 22M111 320l22 22M133 320l-22 22'} />
      <P c="t" t={1.0} d={[268, 287, 306, 325, 344].map((y) => `M156 ${y}H548`).join('')} />
      <P c="i" t={1.1} d={R(566, 262, 38, 30) + R(566, 320, 38, 30) + R(620, 268, 10, 30) + R(620, 314, 10, 30) + R(644, 264, 26, 38) + R(644, 310, 26, 38) + C(657, 283, 9) + C(657, 329, 9)} />
      <P c="a" t={1.4} d="M170 277.5H520M508 271.5l12 6l-12 6M170 334.5H520M508 328.5l12 6l-12 6" />
      <T x={66} y={310} c="sm" a="end">Plan</T>
      <T x={585} y={281} c="sm" t={1.3}>D</T><T x={585} y={339} c="sm" t={1.3}>D</T>
      <T x={122} y={392} c="sm">Floor fans</T>
      <T x={352} y={392} c="sm">Hang lines, air front to back</T>
      <T x={585} y={392} c="sm">Dehumidifiers</T>
      <T x={657} y={392} c="sm">AC</T>
      <DimH x1={80} x2={640} y={40} label="40 ft" />
      <DimV y1={250} y2={362} x={700} label="8 ft" />
    </Sheet>
  )
}

/* Software: the three arms and the crew's phone. Every item carries a date and a cost code. */
export function PlanSoftware({ still }) {
  const node = (x, y, name, sub, t) => (
    <g key={name}>
      <P d={R(x, y, 176, 62)} t={t} />
      <T x={x + 88} y={y + 28} c="hd" t={t + 0.3}>{name}</T>
      <T x={x + 88} y={y + 47} c="sm" t={t + 0.3}>{sub}</T>
    </g>
  )
  return (
    <Sheet still={still} label="Samana drawn as a triangle: Takeoff, Lean and Flow, with Farmmetric feeding Lean from the field">
      {node(272, 50, 'Takeoff', 'Buildout', 0)}
      {node(86, 236, 'Lean', 'Lean manufacturing', 0.3)}
      {node(458, 236, 'Flow', 'Cost analysis and budgeting', 0.6)}
      {node(86, 366, 'Farmmetric', 'The crew’s phone, in the field', 0.9)}
      <P c="a" t={1.1} d="M300 112L196 236M420 112L524 236M262 267H458M174 298V366" />
      <T x={228} y={170} c="lv" a="end" t={1.4}>What was built,</T><T x={228} y={186} c="lv" a="end" t={1.4}>and when it is ready</T>
      <T x={492} y={170} c="lv" a="start" t={1.4}>Capital,</T><T x={492} y={186} c="lv" a="start" t={1.4}>by date</T>
      <T x={360} y={259} c="lv" t={1.4}>Running costs, by week</T>
      <T x={186} y={338} c="lv" a="start" t={1.4}>Hours and amounts, as they happen</T>
      <T x={360} y={200} c="sm" t={1.6}>Every item has a date</T><T x={360} y={216} c="sm" t={1.6}>and a cost code</T>
    </Sheet>
  )
}

/* Government: a coordinated ceiling section, the kind of drawing MEP coordination produces */
export function PlanGov({ still }) {
  const beam = (x) => R(x - 26, 78, 52, 8) + R(x - 4, 86, 8, 46) + R(x - 26, 132, 52, 8)
  return (
    <Sheet still={still} label="A coordinated section through a corridor ceiling: beams, a supply duct, chilled water pipes, a sprinkler main and a cable tray above the ceiling line">
      <P t={0} d="M60 70H660M60 62H660" />
      <path className="hatch fade" style={{ '--d': '.4s' }} d={Array.from({ length: 30 }, (_, k) => `M${60 + k * 20} 70l12 -8`).join('')} />
      <P t={0.2} d="M84 70V430M636 70V430" />
      <P c="i" t={0.5} d={beam(150) + beam(570)} />
      <P c="i" t={0.8} d={R(206, 160, 196, 84)} />
      <P c="t" t={1.0} d="M206 160l196 84M402 160l-196 84M226 70V160M382 70V160" />
      <P c="i" t={1.0} d={C(452, 176, 16) + C(496, 176, 16) + C(476, 112, 9)} />
      <P c="t" t={1.1} d="M452 70V160M496 70V160M476 70V103" />
      <P c="i" t={1.2} d="M430 268v26h110v-26" />
      <P c="t" t={1.3} d="M436 70V268M534 70V268M440 286h90M440 280h90" />
      <path className="dash fade" style={{ '--d': '1.4s' }} d="M84 372H636" />
      <P c="i" t={1.4} d={R(256, 366, 96, 10)} />
      <T x={304} y={206}>Supply duct</T><T x={304} y={222} c="sm">30 × 14</T>
      <T x={452} y={210} c="sm">CHW S</T><T x={496} y={210} c="sm">CHW R</T>
      <T x={461} y={116} c="sm" a="end">Sprinkler main</T>
      <T x={485} y={312} c="sm">Cable tray</T>
      <T x={150} y={156} c="sm">W-beam</T>
      <T x={600} y={392} c="sm" a="end">Finished ceiling</T>
      <DimV y1={244} y2={372} x={206} label="Clear to ceiling" t={1.6} />
      <DimH x1={402} x2={436} y={254} label={'2″'} t={1.6} />
      <DimH x1={84} x2={636} y={44} label="Corridor, wall to wall" t={1.6} />
    </Sheet>
  )
}

/* Farms: the crew's phone view, drawn (the real screen recording replaces this) */
export function PhoneFarmmetric({ still }) {
  const tiles = ['My work', 'Timers', 'Spray and feed mixes', 'What to order', 'Harvest', 'Field map', 'Inspections', 'Weather']
  return (
    <Sheet still={still} box="0 0 360 600" label="Farmmetric on a phone: a home screen of tiles for the crew's work, timers, mixes, orders, harvest, the field map, inspections and weather">
      <P t={0} d="M70 24h220a26 26 0 0 1 26 26v500a26 26 0 0 1 -26 26h-220a26 26 0 0 1 -26 -26v-500a26 26 0 0 1 26 -26z" />
      <P c="t" t={0.4} d="M44 96H316M150 44h60" />
      <T x={64} y={76} c="hd" a="start" t={0.6}>Farmmetric</T>
      <T x={296} y={76} c="sm" a="end" t={0.6}>Today</T>
      {tiles.map((n, k) => {
        const x = 62 + (k % 2) * 122, y = 116 + Math.floor(k / 2) * 106
        return <g key={n}><P c={k === 0 ? 'a' : 'i'} t={0.6 + k * 0.08} d={`M${x + 8} ${y}h98a8 8 0 0 1 8 8v74a8 8 0 0 1 -8 8h-98a8 8 0 0 1 -8 -8v-74a8 8 0 0 1 8 -8z`} /><T x={x + 57} y={y + 50} c={k === 0 ? 'lv' : 'sm'} t={1 + k * 0.08}>{n}</T></g>
      })}
    </Sheet>
  )
}

/* The opening of the site (v3, 2026-10-12). Atul, 20:08: "the first thing you see is a drawing... technical but construction";
   20:20: "fit it out like it was just going to be a big retail pad site... some plugs, hvac in the dwg... a little more complicated".
   A typical retail pad: the building on its structural grid with storefront, back of house, the electrical service and panels,
   receptacles, rooftop units, the make-up air unit, supply ducts and diffusers, the parking field, a legend and a schedule.
   Not one customer's job. */
const REC = (x, y, v) => C(x, y, 5) + (v ? `M${x - 2} ${y - 9}v18M${x + 2} ${y - 9}v18` : `M${x - 9} ${y - 2}h18M${x - 9} ${y + 2}h18`)
const DIF = (x, y, s = 7) => R(x - s, y - s, 2 * s, 2 * s) + `M${x - s} ${y - s}l${2 * s} ${2 * s}M${x + s} ${y - s}l${-2 * s} ${2 * s}`
export function PlanRetail({ still }) {
  const bx0 = 140, bx1 = 740, by0 = 110, by1 = 390, boh = 190
  const gx = [140, 260, 380, 500, 620, 740], gy = [110, 250, 390], L = 'ABCDEF'
  const grid = gx.map((x) => `M${x} 88V${by1 + 14}`).join('') + gy.map((y) => `M118 ${y}H${bx1 + 14}`).join('')
  const cols = gx.flatMap((x) => gy.map((y) => R(x - 5, y - 5, 10, 10))).join('')
  const difs = []; for (const x of [200, 320, 440, 560, 680]) for (const y of [238, 342]) difs.push([x, y])
  const recs = [[149, 240, 1], [149, 330, 1], [731, 240, 1], [731, 330, 1], [190, 199, 0], [290, 199, 0], [400, 199, 0], [470, 199, 0], [690, 199, 0], [180, 119, 0], [400, 119, 0], [480, 119, 0]]
  const stalls = (y, h) => Array.from({ length: 17 }, (_, k) => `M${140 + k * 36} ${y}v${h}`).join('')
  const sched = [['RTU-1', 'Rooftop unit, 12.5 ton'], ['RTU-2', 'Rooftop unit, 12.5 ton'], ['MAU-1', 'Make-up air, 3,200 CFM'], ['EF-1, 2', 'Exhaust fans, toilet rooms'], ['MDP', '800 A, 480/277 V, 3 phase'], ['LP-1, RP-1', 'Lighting and receptacle panels']]
  const leg = [['rec', 'Duplex receptacle'], ['dif', 'Supply diffuser'], ['duct', 'Supply duct'], ['unit', 'Rooftop equipment, above'], ['svc', 'Electrical service'], ['pole', 'Site light pole']]
  return (
    <Sheet still={still} box="0 0 1200 690" label="Floor and MEP plan of a retail pad site: a 150 by 70 foot building on a structural grid with storefront, back of house, electrical room and service, receptacles, two rooftop units and a make-up air unit with supply ducts and diffusers, exhaust fans, a parking field with site lights, a legend and an equipment schedule">
      {/* property line */}
      <path className="pl fade" style={{ '--d': '0s' }} d={R(60, 34, 732, 640)} />
      <T x={66} y={28} c="sm" a="start" t={0.2}>Property line</T>
      {/* structural grid */}
      <path className="dash fade" style={{ '--d': '.05s' }} d={grid} />
      <g className="fade" style={{ '--d': '.15s' }}>
        {gx.map((x, n) => <g key={'c' + n}><circle className="bub" cx={x} cy={74} r={13} /><text className="tx bubt" x={x} y={79} textAnchor="middle">{L[n]}</text></g>)}
        {gy.map((y, n) => <g key={'r' + n}><circle className="bub" cx={104} cy={y} r={13} /><text className="tx bubt" x={104} y={y + 5} textAnchor="middle">{n + 1}</text></g>)}
      </g>
      {/* shell, storefront, columns */}
      <P t={0.3} d={`M${bx0} ${by0}H${bx1}V${by1}H620M260 ${by1}H${bx0}Z`} />
      <P c="i" t={0.45} d={`M${bx0 + 8} ${by0 + 8}H${bx1 - 8}V${by1 - 8}H620M260 ${by1 - 8}H${bx0 + 8}Z`} />
      <P c="t" t={0.55} d={`M260 ${by1}H620M260 ${by1 - 4}H620` + Array.from({ length: 9 }, (_, k) => `M${260 + k * 45} ${by1 - 6}v8`).join('')} />
      <path className="col fade" style={{ '--d': '.65s' }} d={cols} />
      {/* back of house: stock, office, toilet rooms, electrical */}
      <P c="i" t={0.75} d={`M${bx0 + 8} ${boh}H${bx1 - 8}M440 ${by0 + 8}V${boh}M530 ${by0 + 8}V${boh}M590 ${by0 + 8}V${boh}M650 ${by0 + 8}V${boh}`} />
      <P c="t" t={1.1} d={`M300 ${by0}v-30M300 ${by0 - 30}A30 30 0 0 1 330 ${by0}M420 ${boh}v-24M420 ${boh - 24}A24 24 0 0 0 396 ${boh}M510 ${boh}v-20M510 ${boh - 20}A20 20 0 0 0 490 ${boh}M570 ${boh}v-20M570 ${boh - 20}A20 20 0 0 0 550 ${boh}M630 ${boh}v-20M630 ${boh - 20}A20 20 0 0 0 610 ${boh}M700 ${boh}v-22M700 ${boh - 22}A22 22 0 0 0 678 ${boh}M410 ${by1}v-30M410 ${by1 - 30}A30 30 0 0 1 440 ${by1}M470 ${by1}v-30M470 ${by1 - 30}A30 30 0 0 0 440 ${by1}`} />
      {/* power: transformer pad to the main panel, panels, receptacles */}
      <path className="dash amb fade" style={{ '--d': '1.3s' }} d={`M812 70H700V${by0}M700 ${by0 + 8}V132`} />
      <P c="a" t={1.3} d={R(812, 52, 40, 36) + R(664, 132, 60, 14) + R(664, 154, 26, 10) + R(698, 154, 26, 10)} />
      <T x={860} y={58} c="lv" a="start" t={1.5}>Transformer pad</T>
      <T x={860} y={74} c="sm" a="start" t={1.5}>Utility, 480/277 V</T>
      <path className="rec fade" style={{ '--d': '1.4s' }} d={recs.map(([x, y, v]) => REC(x, y, v)).join('')} />
      {/* HVAC: supply mains from the rooftop units, branches to diffusers; MAU over the stockroom; toilet exhaust */}
      <path className="duct fade" style={{ '--d': '1.5s' }} d={`M200 286H680M200 294H680` + [200, 320, 440, 560, 680].map((x) => `M${x - 4} 286V246M${x + 4} 286V246M${x - 4} 294V334M${x + 4} 294V334`).join('') + `M340 150H436M340 158H436`} />
      <path className="unit fade" style={{ '--d': '1.6s' }} d={R(236, 270, 72, 40) + R(536, 270, 72, 40) + R(292, 134, 48, 40) + `M236 270l72 40M308 270l-72 40M536 270l72 40M608 270l-72 40M292 134l48 40M340 134l-48 40`} />
      <path className="dif fade" style={{ '--d': '1.7s' }} d={difs.map(([x, y]) => DIF(x, y)).join('')} />
      <path className="unit fade" style={{ '--d': '1.7s' }} d={C(560, 150, 9) + C(620, 150, 9)} />
      <T x={272} y={324} c="lv sm halo" t={1.8}>RTU-1</T>
      <T x={572} y={324} c="lv sm halo" t={1.8}>RTU-2</T>
      <T x={316} y={128} c="lv sm" t={1.8}>MAU-1</T>
      <T x={590} y={176} c="lv sm halo" t={1.8}>EF-1, 2</T>
      {/* rooms */}
      <T x={214} y={156} t={1.2}>Stockroom</T><T x={214} y={172} c="sm" t={1.25}>1,800 SF</T>
      <T x={485} y={154} c="sm" t={1.2}>Office</T>
      <T x={620} y={132} c="sm" t={1.2}>Toilets</T>
      <T x={694} y={182} c="sm" t={1.2}>Elec.</T>
      <T x={290} y={370} t={1.2}>Sales floor, 7,000 SF</T>
      <T x={440} y={by1 + 14} c="sm" t={1.3}>Storefront and entry</T>
      <T x={336} y={by0 - 12} c="sm" a="start" t={1.3}>Service door</T>
      {/* site: sidewalk, two rows of stalls, drive aisle, accessible stalls, lights, islands */}
      <P c="t" t={0.9} d={`M120 410H760M140 410v72M140 ${578}v72` + stalls(410, 72) + stalls(578, 72) + `M140 482H752M140 578H752`} />
      <path className="hatch fade" style={{ '--d': '1.2s' }} d={Array.from({ length: 8 }, (_, k) => `M${428 + k * 9} 482l9 -72`).join('')} />
      <path className="pole fade" style={{ '--d': '1.4s' }} d={C(122, 530, 5) + C(600, 530, 5) + C(770, 530, 5)} />
      <path className="tree fade" style={{ '--d': '1.2s' }} d={C(100, 446, 16) + C(100, 614, 16) + C(776, 446, 12) + C(776, 614, 12)} />
      <T x={440} y={536} c="sm" t={1.3}>Drive aisle, 24′</T>
      <T x={464} y={498} c="sm" t={1.35}>Accessible</T>
      <path className="dash fade" style={{ '--d': '1.3s' }} d="M60 520H96M60 540H96" />
      <T x={66} y={566} c="sm" a="start" t={1.4}>Curb cut</T>
      {/* dimensions */}
      <DimH x1={bx0} x2={bx1} y={664} label={'150′-0″'} t={1.9} />
      <DimV y1={by0} y2={by1} x={762} label={'70′-0″'} t={1.9} />
      {/* legend and schedule */}
      <g className="fade" style={{ '--d': '1.6s' }}>
        <path className="frame" d={R(824, 110, 344, 520) + 'M824 146H1168M824 352H1168M824 388H1168'} />
        <text className="tx hd2" x={840} y={134}>Legend</text>
        {leg.map(([k, n], i) => {
          const y = 170 + i * 30, x = 852
          const sym = k === 'rec' ? <path className="rec" d={REC(x, y, 0)} /> : k === 'dif' ? <path className="dif" d={DIF(x, y)} /> : k === 'duct' ? <path className="duct" d={`M${x - 14} ${y - 4}h28M${x - 14} ${y + 4}h28`} /> : k === 'unit' ? <path className="unit" d={R(x - 14, y - 9, 28, 18) + `M${x - 14} ${y - 9}l28 18M${x + 14} ${y - 9}l-28 18`} /> : k === 'svc' ? <path className="dash amb" d={`M${x - 14} ${y}h28`} /> : <path className="pole" d={C(x, y, 5)} />
          return <g key={k}>{sym}<text className="tx sm st" x={878} y={y + 4}>{n}</text></g>
        })}
        <text className="tx hd2" x={840} y={376}>Equipment schedule</text>
        {sched.map(([t, d], i) => <g key={t}><text className="tx lv sm st" x={840} y={414 + i * 34}>{t}</text><text className="tx sm st" x={940} y={414 + i * 34}>{d}</text></g>)}
        <text className="tx sm st" x={840} y={618}>Building 10,500 SF. Parking 34 stalls.</text>
      </g>
      <g className="fade" style={{ '--d': '2s' }}>
        <circle className="bub" cx={1140} cy={664} r={15} /><path className="ltd" d="M1140 647l7 21h-14z" /><text className="tx bubt sm" x={1112} y={669} textAnchor="middle">N</text>
      </g>
    </Sheet>
  )
}

/* The make-up air units on their steel frame, traced over the photo of the same roof (public/media/work/com-roof.jpg, 1600 by 721),
   so the drawing and the photo line up in the split on the home page. */
export function MauTrace({ still }) {
  return (
    <Sheet still={still} box="0 0 1600 721" label="Drawing of two make-up air units with hoods and condensing sections on roof curbs, set on a galvanized steel frame with legs on pads">
      <P t={0} d="M140 478L1040 538L1310 440M140 530L1040 595L1310 492M140 478V530M1040 538V595M1310 440V492" />
      <P c="i" t={0.25} d="M150 478V555M165 482V555M1018 540V670M1050 542V670M1300 444V486" />
      <P c="t" t={0.4} d="M300 486L860 470M420 470L880 520M760 462L1180 452M600 500L1000 448" />
      <P t={0.5} d="M320 432H750V490H320ZM880 405H1245V475H880Z" />
      <P t={0.7} d="M290 215H705V432H290ZM860 150H1270V405H860Z" />
      <P c="i" t={0.9} d="M190 270L290 225V315L190 285ZM190 270V285M790 240L860 175V295L790 245ZM230 360H395V440H230Z" />
      <P c="i" t={1.0} d="M460 280H748V432H460ZM540 322H746V430H540ZM1150 190L1270 225V400L1150 400Z" />
      <P c="t" t={1.2} d={Array.from({ length: 10 }, (_, k) => `M${545 + k * 20} 324V428`).join('') + Array.from({ length: 6 }, (_, k) => `M${1160 + k * 18} ${196 + k * 5}V398`).join('')} />
      <P c="a" t={1.4} d="M985 655H1085V672H985Z" />
      <T x={498} y={200} c="lv" t={1.5}>MAU-1</T>
      <T x={1064} y={136} c="lv" t={1.5}>MAU-2</T>
      <T x={560} y={630} c="halo" t={1.6}>Steel frame, galvanized</T>
      <T x={1120} y={700} c="sm" t={1.6}>Leg on pad</T>
      <T x={535} y={512} c="sm" t={1.6}>Roof curb</T>
    </Sheet>
  )
}
