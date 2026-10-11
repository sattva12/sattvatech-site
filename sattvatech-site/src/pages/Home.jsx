import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader, SiteFoot, APP, FARM, TEL, TEL_HREF, MAIL } from '../Chrome.jsx'
import ContactForm from './ContactForm.jsx'
import { PlanBasement, PlanDeck, PlanFarm, PlanContainer, PlanSoftware } from '../drawings.jsx'
import Proof from '../Proof.jsx'
import '../samana.css'
import '../site.css'

/* a link that stays in the page for #anchors, uses the router for our own pages, and leaves for anything else */
function Go({ to, className, children, ...rest }) {
  if (to.startsWith('/') && !to.includes('.') && !to.startsWith('/#')) return <Link to={to} className={className} {...rest}>{children}</Link>
  return <a href={to} className={className} {...rest}>{children}</a>
}

/* ---------- the opening: one sheet, five levels ---------- */
const LEVELS = [
  { id: 'construction', tab: 'Construction', sub: 'Basements, baths, decks, fit-outs', Drawing: PlanBasement,
    tb: ['Sample house, basement level', '876 SF gross', '836 SF finished', 'Ceiling 7′ 6″'],
    big: '$142,047', cap: 'The sample house, priced as it is drawn.',
    m: [['15', 'steps in order'], ['885', 'crew hours'], ['100', 'material lines']],
    kpis: [['Material', '$55,014'], ['Labor', '$48,670'], ['Time on site', '56 days']],
    rows: [['Work in order', '15 steps, 885 hr'], ['Materials list', '100 lines'], ['Trades on layers', 'Electrical, HVAC, plumbing'], ['License', 'MA CS-122574']],
    to: '#construction', cta: 'See construction' },
  { id: 'farms', tab: 'Farms', sub: 'Site builds and lean farming', Drawing: PlanFarm,
    tb: ['Farm site, 5.02 acres', 'Fence 1,000 ft', '20 rows of 272 ft', '400 A service'],
    big: '5.02 acres', cap: 'A farm site in Minnesota, drawn and priced from clearing to power.',
    m: [['6', 'camera poles'], ['400 A', 'service'], ['5', 'containers']],
    kpis: [['Fence', '1,000 ft'], ['Rows', '20'], ['Cameras', '14']],
    rows: [['Camera poles', '6, at 16 ft'], ['Power', '400 A, 330 ft line'], ['Containers', 'Power, drying, lab'], ['The season', 'Planned in Lean']],
    to: '#farms', cta: 'See farms' },
  { id: 'samana', tab: 'Samana', sub: 'Lean operations software', Drawing: PlanSoftware,
    tb: ['Samana: Takeoff, Lean, Flow', 'Farmmetric in the field', 'One job, one set of numbers'],
    big: 'Samana', fig: '', cap: 'Lean operations software for businesses that build, grow and make things.',
    m: [['4', 'parts'], ['9', 'steps on film'], ['Free', 'sample job']],
    kpis: [['Takeoff', 'Buildout'], ['Lean', 'Lean manufacturing'], ['Flow', 'Cost analysis and budgeting']],
    rows: [['Takeoff', 'Counts and prices every piece'], ['Lean', 'Steps, crews, dates, orders'], ['Flow', 'The budget and the cash flow'], ['Farmmetric', 'The crew\u2019s phone']],
    to: '#samana', cta: 'See Samana' },
  { id: 'products', tab: 'Products', sub: 'Container rooms, built to order', Drawing: PlanContainer,
    tb: ['Drying room in a 40 ft container', '2 AC units', '2 dehumidifiers', '2 fans'],
    big: '40 ft', cap: 'A working room built inside a container, in our shop or on your site.',
    m: [['6', 'kinds of room'], ['3', 'ways to buy'], ['1', 'page flyer']],
    kpis: [['AC', '2 units'], ['Dehumidifiers', '2'], ['Fans', '3,500 CFM']],
    rows: [['Rooms', 'Drying, lab, grow, storage'], ['Also', 'Site office, power room'], ['Ways to buy', 'Shipped, built, or the design'], ['Flyer', 'One page, PDF']],
    to: '#products', cta: 'See products' },
]

/* the three parts of Samana, in the words a buyer looks for */
const ARMS = [['Takeoff', 'Buildout'], ['Lean', 'Lean manufacturing'], ['Flow', 'Cost analysis and budgeting']]

function Opening() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (!auto || hold) return undefined
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setTimeout(() => setI((n) => (n + 1) % LEVELS.length), 7000)
    return () => clearTimeout(id)
  }, [i, auto, hold])
  const pick = (n) => { setAuto(false); setI((n + LEVELS.length) % LEVELS.length) }
  const L = LEVELS[i]
  return (
    <section className="st-open" id="top" aria-labelledby="st-h1">
      <div className="st-wrap">
        <div className="st-head">
          <h1 id="st-h1">Making things work.</h1>
          <div>
            <p className="st-lede"><b>We do the work, and we built the software that runs it.</b> Homes, farms and container rooms, each one drawn, priced and scheduled in Samana, our lean operations platform.</p>
            <div className="st-acts">
              <a className="st-btn primary" href="#construction">See the work</a>
              <a className="st-btn" href="#talk">Talk about a project</a>
            </div>
          </div>
        </div>

        <div className="st-work" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
          <div className="st-col">
            <div className="st-panel">
              <div className="st-panel-h"><i className="st-chev" /><h2>What we do</h2></div>
              <div className="st-acc st-scope">
                {LEVELS.map((l, n) => (
                  <div key={l.id} className={n === i ? 'on' : undefined}>
                    <button type="button" aria-expanded={n === i} onClick={() => pick(n)}><i /><b>{l.tab}</b><small>{l.sub}</small><strong>{l.fig !== undefined ? l.fig : l.big}</strong></button>
                    {n === i && (
                      <div className="st-acc-b">
                        <div className="st-rows">{l.rows.map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}</div>
                        <div className="st-panel-f"><Go className="st-btn primary" to={l.to}>{l.cta}</Go></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="st-panel">
              <div className="st-panel-h"><h2>Run on Samana</h2><a className="st-btn" href="#samana">See the platform</a></div>
              <div className="st-rows">
                {ARMS.map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
              </div>
            </div>
          </div>

          <div className="st-rcol">
            <div className="st-hl">
              <div className="st-hl-in">
                <div className="st-hl-t"><div className="st-big">{L.big}</div><p>{L.cap}</p></div>
                <dl className="st-kpis">{L.kpis.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </div>
              <div className="st-hl-m">{L.m.map(([v, k]) => <span key={k}><b>{v}</b>{k}</span>)}</div>
            </div>
            <div className="st-sheet">
              <div className="st-sheet-top st-lvlrow">
                <span className="st-lvl">Level</span>
                <span className="st-seg" role="group" aria-label="Level">
                  {LEVELS.map((l, n) => <button key={l.id} type="button" aria-pressed={n === i} onClick={() => pick(n)}>{l.tab}</button>)}
                </span>
              </div>
              <div className="st-stage"><L.Drawing key={L.id} /></div>
              <div className="st-tb"><b>{L.tb[0]}</b>{L.tb.slice(1).map((x) => <span key={x}>{x}</span>)}</div>
            </div>
          </div>
        </div>

        <div className="st-strip">
          <div><span>Company</span><b>Sattva Technologies LLC</b></div>
          <div><span>Based in</span><b>Seekonk, Massachusetts</b></div>
          <div><span>Engineering and construction</span><b>25+ years</b></div>
          <div><span>MA Construction Supervisor</span><b>CS-122574</b></div>
          <div><span>Call or text</span><b><a href={TEL_HREF}>{TEL}</a></b></div>
        </div>
      </div>
    </section>
  )
}

/* ---------- a project, shown both ways: the photo and its drawing ---------- */
function PhotoSlot({ note }) {
  return <div className="st-ph"><div><b>Photo to add</b><span>{note}</span></div></div>
}
function ProjectSheet({ p }) {
  const [view, setView] = useState(p.photo ? 'photo' : (p.Drawing ? 'drawing' : 'photo'))
  return (
    <article className="st-proj">
      <div className="st-sheet">
        <div className="st-sheet-top">
          <span className="st-lvl">{p.kind}</span>
          {p.Drawing && (
            <span className="st-seg" role="group" aria-label={'Show ' + p.name + ' as'}>
              <button type="button" aria-pressed={view === 'photo'} onClick={() => setView('photo')}>Photo</button>
              <button type="button" aria-pressed={view === 'drawing'} onClick={() => setView('drawing')}>Drawing</button>
            </span>
          )}
        </div>
        <div className="st-stage">
          {view === 'drawing' && p.Drawing ? <p.Drawing still /> : (p.photo ? <img src={p.photo} alt={p.name + ', ' + p.place} loading="lazy" /> : <PhotoSlot note={p.note} />)}
        </div>
        <div className="st-tb"><b>{p.name}</b><span>{p.place}</span></div>
      </div>
      <dl className="st-pfacts">{p.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </article>
  )
}

const BUILDS = [
  { name: 'Basement finish', place: 'Richmond, Rhode Island', kind: 'Residential', Drawing: PlanBasement, note: 'The finished basement',
    facts: [['Area', '876 SF'], ['Rooms', '2 bed, 1 bath'], ['Ceiling', '7′ 6″']] },
  { name: 'Composite deck', place: 'From the sample house', kind: 'Residential', Drawing: PlanDeck, note: 'A finished deck',
    facts: [['Size', '16′ by 12′'], ['Framing', '2×10 at 16 in.'], ['Footings', '48 in. deep']] },
  { name: 'Bathroom remodel', place: 'Narragansett, Rhode Island', kind: 'Residential', note: 'The finished bathroom',
    facts: [['Scope', 'Full bathroom'], ['Drawing', 'To add']] },
]

/* ---------- the platform: one job going through Samana, on the real clips ---------- */
const STEPS = [
  { k: 'Measure', arm: 'Takeoff', s: '199 LF of framing', clip: 'takeoff', h: 'Put in the sizes the way you measure them.', p: 'Samana draws the plan to scale and builds the takeoff behind it. Guesses stay marked until they are measured.',
    facts: [['Wall framing', '199 LF'], ['Wall board', '2,070 SF'], ['Time on site', '56 days']] },
  { k: 'Draw', arm: 'Takeoff', s: '8 layers', clip: 'layers', h: 'A real drawing set, with the trades on layers.', p: 'Electrical, HVAC, plumbing and framing each sit on their own layer, with dimensions and notes on top.',
    facts: [['Outlets', '25'], ['Lights', '24'], ['Layers', '8']] },
  { k: 'See it', arm: 'Takeoff', s: 'In 3D', clip: 'threed', h: 'Walk the job in 3D before anything is ordered.', p: 'Finished or framing view, level by level, from the same drawing.',
    facts: [['Levels', '4 and the property'], ['Views', 'Finished, framing'], ['Source', 'The same drawing']] },
  { k: 'Price', arm: 'Takeoff', s: '$142,047', clip: 'customer', h: 'The customer sees every line.', p: 'The quote carries the drawing, an allowance for each thing they choose, and options priced on their own.',
    facts: [['Base price', '$123,719'], ['Allowances', '$18,328'], ['Total', '$142,047']] },
  { k: 'Change', arm: 'Takeoff', s: '+$3,569', clip: 'revs', h: 'Every change is a Rev.', p: 'Move a wall and the price moves with it, division by division, written up before the work is done.',
    facts: [['Rev A', '$142,047'], ['Rev B', '$145,616'], ['Change', '+$3,569']] },
  { k: 'Plan', arm: 'Lean', s: '5 steps in field prep', clip: 'lean-plan', h: 'Every stage becomes steps with dates and people.', p: 'Lean lays the steps on the calendar, shows who is needed each day, and raises an alert for anything to order or check in the next two weeks. Nothing starts until someone presses Go.',
    facts: [['Steps in field prep', '5'], ['Busiest day', '4 people'], ['Alerts', '14']] },
  { k: 'Order', arm: 'Lean', s: '17 materials', clip: 'lean-order', h: 'It tells you what to order, and by when.', p: 'Every material the plan uses, with what is on hand, how long it takes to arrive and the day to order by. Ask a team member to order it and the request lands in their app.',
    facts: [['Materials', '17'], ['To order soon', '8'], ['First needed', 'May 3']] },
  { k: 'Do the work', arm: 'Farmmetric', s: 'From the field', clip: 'farmmetric-crew', h: 'The crew sees its own list and logs what happened.', p: 'Each person opens the jobs released to them, runs a timer or types the hours, and marks the step done. What they log becomes the real numbers in the plan.',
    facts: [['On now', '2 jobs'], ['Waiting for Go', '4 steps'], ['Logged', '3 hours']] },
  { k: 'Cash', arm: 'Flow', s: 'By month', clip: 'flow', h: 'Every dollar has a cost code and a date.', p: 'Material and labor roll up by division into cash by month, so you know what is due and when.',
    facts: [['Material', '$55,014'], ['Labor', '$48,670'], ['Revenue', '$142,047']] },
]

function Clip({ name, label }) {
  const ref = useRef(null)
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const v = ref.current
    if (!v || still || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [name, still])
  return <video ref={ref} key={name} src={`/media/${name}.mp4`} poster={`/media/${name}.jpg`} muted loop playsInline preload="metadata" controls={still} aria-label={label} />
}

function Platform() {
  const [i, setI] = useState(0)
  const s = STEPS[i]
  return (
    <div className="st-plat-b">
      <div className="st-screen"><Clip name={s.clip} label={s.h} /></div>
      <div className="st-panel">
        <div className="st-panel-h"><h2>Samana, step by step</h2></div>
        <div className="st-acc">
          {STEPS.map((x, n) => (
            <div key={x.k} className={n === i ? 'on' : undefined}>
              <button type="button" aria-expanded={n === i} onClick={() => setI(n)}><i /><span>{n + 1}</span><b>{x.k}</b><em data-arm={x.arm}>{x.arm}</em><small>{x.s}</small></button>
              {n === i && (
                <div className="st-acc-b">
                  <h4>{x.h}</h4><p>{x.p}</p>
                  <dl className="st-kpis">{x.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="st-panel-f">
          <a className="st-btn primary" href={APP}>Try it on the sample house</a>
          <Link className="st-btn" to="/samana">What Samana does</Link>
        </div>
      </div>
    </div>
  )
}

/* ---------- the farm site, with its layers ---------- */
const LAYERS = [['rows', 'Rows'], ['fence', 'Fence'], ['cam', 'Cameras'], ['power', 'Power and water'], ['cont', 'Containers'], ['dim', 'Dimensions']]
function FarmSite() {
  const [off, setOff] = useState({})
  return (
    <div className="st-two st-wide">
      <div className="st-sheet">
        <div className="st-sheet-top st-chips" role="group" aria-label="Layers">
          <span className="st-lvl">Layers</span>
          {LAYERS.map(([k, n]) => <button key={k} type="button" className="st-chip" aria-pressed={!off[k]} onClick={() => setOff({ ...off, [k]: !off[k] })}>{n}</button>)}
        </div>
        <div className="st-stage"><PlanFarm still off={off} /></div>
        <div className="st-tb"><b>Farm site, 5.02 acres</b><span>Minnesota</span><span>Fence 200 by 300 ft</span><span>Rows run front to back</span></div>
      </div>
      <div className="st-panel">
        <div className="st-panel-h"><h2>What the drawing adds up to</h2></div>
        <div className="st-total"><div className="st-big">1,000 ft</div><p>of fence around the field, and everything inside it counted.</p></div>
        <div className="st-rows">
          {[['Fence', '6 ft, with screen'], ['Gates', '10 ft and a man gate'], ['Rows', '20 of 272 ft'], ['Camera poles', '6, at 16 ft'], ['Cameras', '14'], ['Service', '400 A, 330 ft line'], ['Containers', '5'], ['Buildings', 'Hoop house, well shed']]
            .map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
        </div>
        <div className="st-panel-f"><Link className="st-btn primary" to="/lean-ag">How we build a farm</Link></div>
      </div>
    </div>
  )
}

const SEASON = [
  ['Seed start', 'May 1 to June 1', 1, 3],
  ['Field prep', 'Ready by June 1', 1, 3],
  ['Planting', 'From June 1', 3, 4],
  ['Season', 'Feeding, scouting and spraying, on a schedule', 4, 9],
  ['Harvest and drying', 'September 1 to October 15', 9, 12],
  ['Records', 'Kept at every step', 1, 13],
]
function Season() {
  return (
    <div className="st-panel st-season">
      <div className="st-panel-h"><h2>A season, planned in Lean</h2></div>
      <div className="st-gantt" role="img" aria-label="A season from May to October: seed start and field prep in May, planting from June 1, the season through August, harvest and drying from September 1 to October 15, with records kept all the way through">
        <div className="st-gm"><span />{['May', 'June', 'July', 'August', 'September', 'October'].map((m) => <b key={m}>{m}</b>)}</div>
        {SEASON.map(([n, w, a, b]) => (
          <div className="st-gr" key={n}>
            <span>{n}<small>{w}</small></span>
            <i style={{ gridColumn: `${a + 1} / ${b + 1}` }}>{b - a >= 2 && <em>{w}</em>}</i>
            {b - a < 2 && <em style={{ gridColumn: `${b + 1} / -1` }}>{w}</em>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- products ---------- */
const ROOMS = [
  ['Drying room', 'AC, dehumidifiers, fans and hang lines, sized to the wet weight'],
  ['Lab', 'Benches, ventilation, power and storage, laid out for your engineer to approve'],
  ['Grow room', 'Lights, air, irrigation and controls, bench by bench'],
  ['Storage', 'Shelving, locks, lighting and climate control'],
  ['Site office', 'Finished, conditioned, wired and networked'],
  ['Power room', 'Panels, the camera recorder and backup power in one box'],
]

export default function Home() {
  const [here, setHere] = useState(null)
  useEffect(() => { document.title = 'Sattva Technologies: we do the work, and we built the software that runs it' }, [])
  useEffect(() => {
    if (window.location.hash) { const el = document.getElementById(window.location.hash.slice(1)); if (el) el.scrollIntoView() }
    if (!('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setHere(e.target.id) }) }, { rootMargin: '-45% 0px -50% 0px' })
    ;['top', 'construction', 'farms', 'samana', 'products', 'talk'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <div className="st">
      <SiteHeader here={here} />
      <main>
        <Opening />

        <section className="st-sec" id="construction" aria-labelledby="h-con">
          <div className="st-wrap">
            <div className="st-head2">
              <h2 className="st-h2" id="h-con">Construction</h2>
              <p className="st-lede">Residential and commercial work, run the way a production line runs: every step planned with its material, labor and time, and checked as it is done.</p>
            </div>
            <div className="st-two">
              <div className="st-panel">
                <div className="st-panel-h"><h2>What we take on</h2></div>
                <div className="st-rows">
                  {[['Basements', 'Framed, wired, insulated, finished'], ['Bathrooms', 'From the studs out'], ['Decks and outside work', 'Footings, framing, stairs, rails'], ['Floors, doors and windows', 'Supplied and installed'], ['Commercial fit-outs', 'Planned around your opening date'], ['GC for small crews', 'Permitted jobs under our license']]
                    .map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
                </div>
                <div className="st-panel-f"><Link className="st-btn primary" to="/construction">More on construction</Link><Link className="st-btn" to="/quote">Quote service for small crews</Link></div>
              </div>
              <div className="st-panel">
                <div className="st-panel-h"><h2>How a job runs</h2></div>
                <ol className="st-run">
                  <li><b>Take it off</b><span>Every material, hour and price from the drawing, with the guesses marked until they are measured.</span></li>
                  <li><b>Plan the work</b><span>Steps in order, the trades each one needs, and the inspections between them.</span></li>
                  <li><b>Build and check</b><span>The crew works from the issued Rev. Each step is checked off with photos before the next starts.</span></li>
                  <li><b>Follow the cash</b><span>Payments tied to the work, costs against plan, and every change written up first.</span></li>
                </ol>
              </div>
            </div>

            <h3 className="st-h3" id="work">Examples</h3>
            <p className="st-sub">Every job exists twice: as the thing we built and as its drawing. Flip any project between the two.</p>
            <div className="st-cards">{BUILDS.map((p) => <ProjectSheet key={p.name} p={p} />)}</div>

            <div className="st-bridge">
              <p><b>Drawn, priced and scheduled in Samana.</b> We run our construction work on our own software, from the first measurement to the last payment.</p>
              <a className="st-btn" href="#samana">See the platform</a>
            </div>
          </div>
        </section>

        <section className="st-sec st-farm" id="farms" aria-labelledby="h-farm">
          <div className="st-wrap">
            <div className="st-head2">
              <h2 className="st-h2" id="h-farm">Farms</h2>
              <p className="st-lede">We clear, fence, power and lay out the farm. Then we run the season on a plan, the way a good shop runs a line. That is lean farming.</p>
            </div>
            <FarmSite />

            <h3 className="st-h3">On the ground</h3>
            <p className="st-sub">Photos from our farm builds.</p>
            <div className="st-cards st-photos">
              <div className="st-sheet"><div className="st-stage"><PhotoSlot note="The field and its rows" /></div><div className="st-tb"><b>Field</b><span>Rows and irrigation</span></div></div>
              <div className="st-sheet"><div className="st-stage"><PhotoSlot note="Fence, gates and camera poles" /></div><div className="st-tb"><b>Fence</b><span>Gates and camera poles</span></div></div>
              <div className="st-sheet"><div className="st-stage"><PhotoSlot note="The drying rooms" /></div><div className="st-tb"><b>Drying rooms</b><span>Built in containers</span></div></div>
            </div>

            <h3 className="st-h3">Lean farming</h3>
            <p className="st-sub">Each stage is broken into its steps, with the people, materials and hours each one needs. The crew logs what happened, and the plan shows where to speed up to hold the date.</p>
            <Season />

            <h3 className="st-h3" id="farmmetric">The app: Farmmetric</h3>
            <div className="st-two st-app">
              <div className="st-sheet st-phone">
                <div className="st-stage"><div className="st-bezel"><Clip name="farmmetric-phone" label="Farmmetric on a phone: my work, the spray and feed mixes, and sending an unplanned job to the boss" /></div></div>
                <div className="st-tb"><b>Farmmetric</b><span>On a phone, sample farm</span></div>
              </div>
              <div className="st-panel">
                <div className="st-panel-h"><h2>The crew's day, on a phone</h2></div>
                <div className="st-total"><h4>The plan reaches the field on a phone, and the field answers back.</h4><p>Each person sees the jobs released to them. What they log comes back as hours, amounts and photos, and the plan moves to match.</p></div>
                <div className="st-rows st-rtop">
                  {[['My work', 'The jobs released to each person, with timers'], ['Spray and feed', 'Each mix, with product and rate'], ['What to order', 'Before it runs out'], ['Harvest', 'Weights by row and lot'], ['Inspections', 'With photos'], ['Unplanned jobs', 'Reported from the field'], ['Field map', 'Weather and daylight with it']]
                    .map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
                </div>
                <div className="st-panel-f"><a className="st-btn primary" href={FARM}>Try Farmmetric free for 30 days</a><Link className="st-btn" to="/farmmetric">What Farmmetric does</Link></div>
              </div>
            </div>
          </div>
        </section>

        <section className="st-sec" id="samana" aria-labelledby="h-sam">
          <div className="st-wrap">
            <div className="st-head2">
              <h2 className="st-h2" id="h-sam">Samana</h2>
              <p className="st-lede"><b>Buildout, lean manufacturing, cost analysis and budgeting, in one platform.</b> Lean operations software for businesses that build, grow and make things.</p>
            </div>
            <div className="st-two st-wide">
              <div className="st-sheet">
                <div className="st-sheet-top"><span className="st-lvl">Platform</span><b>Takeoff, Lean, Flow</b></div>
                <div className="st-stage"><PlanSoftware still /></div>
                <div className="st-tb"><b>Samana</b><span>Every item has a date and a cost code</span><span>One job, one set of numbers</span></div>
              </div>
              <div className="st-panel">
                <div className="st-panel-h"><h2>From the first measurement to the last dollar</h2></div>
                <div className="st-total"><h4>We built it to run our own construction and farm work.</h4><p>It runs any operation that has steps, people and materials: plan the work, price every piece, schedule it, hand it to the crew, check it was done, and see the money by month.</p></div>
                <div className="st-rows st-rtop st-rooms">
                  {[['Takeoff: buildout', 'Counts every piece and prices it'], ['Lean: lean manufacturing', 'Turns it into steps with dates, crews and materials, and tells you when to order'], ['Flow: cost analysis and budgeting', 'Shows the cash by month, against the budget'], ['Farmmetric: the crew', 'The crew works from a phone, and what they log becomes the real numbers']]
                    .map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
                </div>
                <div className="st-panel-f"><a className="st-btn primary" href={APP}>Start with a free sample job</a><Link className="st-btn" to="/samana">What Samana does</Link></div>
              </div>
            </div>

            <h3 className="st-h3">One platform, three kinds of work</h3>
            <p className="st-sub">Construction and farms are where we built it and proved it. A production run reads the same way: the same three views, whatever the job is.</p>
            <Proof />

            <h3 className="st-h3" id="platform">See it run</h3>
            <p className="st-sub">Recorded in the real app: the sample house through Takeoff and Flow, and a sample farm through Lean and Farmmetric.</p>
            <Platform />
          </div>
        </section>

        <section className="st-sec" id="products" aria-labelledby="h-prod">
          <div className="st-wrap">
            <div className="st-head2">
              <h2 className="st-h2" id="h-prod">Products</h2>
              <p className="st-lede">Working rooms we build to order inside a container, and the software you can sign in to today.</p>
            </div>
            <div className="st-two st-wide">
              <div className="st-sheet">
                <div className="st-sheet-top"><span className="st-lvl">Container</span><b>Drying room</b></div>
                <div className="st-stage"><PlanContainer still /></div>
                <div className="st-tb"><b>40 ft container</b><span>Insulated, wired and conditioned</span><span>Ready to set on a pad and connect</span></div>
              </div>
              <div className="st-panel">
                <div className="st-panel-h"><h2>Container rooms</h2></div>
                <div className="st-rows st-rooms">{ROOMS.map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}</div>
                <dl className="st-kpis"><div><dt>Built</dt><dd>and shipped</dd></div><div><dt>Built</dt><dd>on your site</dd></div><div><dt>Or just</dt><dd>the design</dd></div></dl>
                <div className="st-panel-f"><Link className="st-btn primary" to="/containers">See the containers</Link><a className="st-btn" href="/sattva-container-flyer.pdf">Flyer (PDF)</a></div>
              </div>
            </div>

            <h3 className="st-h3">Software</h3>
            <p className="st-sub">It works for us. See if it works for you.</p>
            <div className="st-cards st-apps">
              <div className="st-panel st-prod">
                <div className="st-band">Samana<small>For any operation</small></div>
                <p>Lean operations software: the takeoff, the plan, the crew and the cash, for any business that runs on steps, people and materials.</p>
                <div className="st-price">From $10<small>a month</small></div>
                <div className="st-panel-f"><a className="st-btn primary" href={APP}>Start with a free sample job</a><Link className="st-btn" to="/samana">What it does</Link></div>
              </div>
              <div className="st-panel st-prod st-green">
                <div className="st-band">Farmmetric<small>For growers</small></div>
                <p>The crew's jobs, logs, inspections and records from a phone, with the season plan behind it.</p>
                <div className="st-price">Free<small>for 30 days</small></div>
                <div className="st-panel-f"><a className="st-btn primary" href={FARM}>Start the free trial</a><Link className="st-btn" to="/farmmetric">What it does</Link></div>
              </div>
              <div className="st-panel st-prod st-ink">
                <div className="st-band">Quote service<small>For handymen and small crews</small></div>
                <p>Send us the job. We send back a clear quote in your name, with every material, hour and step priced.</p>
                <div className="st-price">Free<small>for your first quote</small></div>
                <div className="st-panel-f"><a className="st-btn primary" href={TEL_HREF}>Call or text {TEL}</a><Link className="st-btn" to="/quote">How it works</Link></div>
              </div>
            </div>
          </div>
        </section>

        <section className="st-sec st-talk" id="talk" aria-labelledby="h-talk">
          <div className="st-wrap"><div className="st-two">
            <div>
              <h2 className="st-h2" id="h-talk">Talk about a project.</h2>
              <p className="st-lede">Tell us where it is, what it is, and when it needs to be done.</p>
              <p className="st-contact"><a href={TEL_HREF}>{TEL}</a><a href={'mailto:' + MAIL}>{MAIL}</a><span>Seekonk, Massachusetts</span></p>
            </div>
            <div className="st-panel st-formp"><ContactForm topic="Home page" prompt="Where it is, what it is, and when it needs to be done" /></div>
          </div></div>
        </section>
      </main>
      <SiteFoot />
    </div>
  )
}
