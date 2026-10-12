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
