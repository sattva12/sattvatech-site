import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader, SiteFoot, APP, FARM, TEL, TEL_HREF, MAIL } from '../Chrome.jsx'
import ContactForm from './ContactForm.jsx'
import { PlanBasement, PlanFarm, PlanContainer } from '../drawings.jsx'
import '../samana.css'
import '../site.css'

/* a link that stays in the page for #anchors, uses the router for our own pages, and leaves for anything else */
function Go({ to, className, children, ...rest }) {
  if (to.startsWith('/') && !to.includes('.') && !to.startsWith('/#')) return <Link to={to} className={className} {...rest}>{children}</Link>
  return <a href={to} className={className} {...rest}>{children}</a>
}

/* ---------- the opening: the work we do, three lines of it ---------- */
const LEVELS = [
  { id: 'construction', tab: 'Construction', sub: 'Homes and commercial', Drawing: PlanBasement,
    tb: ['A finished basement, as drawn', '876 SF', '2 bedrooms, 1 bath', 'Ceiling 7′ 6″'],
    big: 'Homes and commercial', cap: 'Quality work, planned step by step and checked as it is built.',
    m: [['Licensed', 'in Massachusetts'], ['Every step', 'checked with photos'], ['Every change', 'written up first']],
    kpis: [['Construction Supervisor', 'CS-122574'], ['Home Improvement', 'HIC 218120'], ['Experience', '25+ years']],
    rows: [['Homes', 'Basements, bathrooms, decks, floors, windows'], ['Commercial', 'Fit-outs, planned around your opening date'], ['Quality', 'Each step checked before the next starts'], ['License', 'MA CS-122574, HIC 218120']],
    to: '#construction', cta: 'See construction' },
  { id: 'farms', tab: 'Farms', sub: 'Set up, and made to work', Drawing: PlanFarm,
    tb: ['Farm site, 5.02 acres', 'Fence 1,000 ft', '20 rows of 272 ft', '400 A service'],
    big: 'From bare land to a working farm', cap: 'We set the farm up, then build it into a business with a plan and a budget.',
    m: [['Set up', 'clearing, fence, power, water'], ['A plan', 'for every stage of the season'], ['A budget', 'by month']],
    kpis: [['Fence', '1,000 ft'], ['Rows', '20'], ['Service', '400 A']],
    rows: [['Set up', 'Clearing, fence, power, water, buildings'], ['The plan', 'Every stage in steps, with people and dates'], ['The budget', 'Capital, running costs and cash by month'], ['The season', 'Run on the plan, checked as it goes']],
    to: '#farms', cta: 'See farms' },
  { id: 'products', tab: 'Products', sub: 'Containers and apps', Drawing: PlanContainer,
    tb: ['Drying room in a 40 ft container', '2 AC units', '2 dehumidifiers', '2 fans'],
    big: 'Things we make', cap: 'Working rooms built inside a container, and the apps we run our own work on.',
    m: [['6', 'kinds of room'], ['3', 'ways to buy'], ['2', 'apps you can sign in to']],
    kpis: [['Containers', 'Built to order'], ['Samana', 'Takeoff, Lean, Flow'], ['Farmmetric', 'For the crew']],
    rows: [['Container rooms', 'Drying, lab, grow, storage, office, power'], ['Ways to buy', 'Shipped, built on site, or the design'], ['Apps', 'Samana and Farmmetric'], ['Quote service', 'For handymen and small crews']],
    to: '#products', cta: 'See products' },
]

/* how every job is run, whatever it is */
const HOW = [['Drawn', 'To scale, before anything is ordered'], ['Priced', 'Every material and every hour'], ['Scheduled', 'Steps, crews and dates'], ['Checked', 'Each step, with photos']]

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
            <p className="st-lede"><b>We do the work.</b> Quality homes and commercial construction. Farms set up and built into businesses that work, with a plan and a budget. And products of our own: container rooms and apps.</p>
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
                    <button type="button" aria-expanded={n === i} onClick={() => pick(n)}><i /><b>{l.tab}</b><small>{l.sub}</small></button>
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
              <div className="st-panel-h"><h2>How every job is run</h2></div>
              <div className="st-rows">
                {HOW.map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
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
                <span className="st-lvl">Work</span>
                <span className="st-seg" role="group" aria-label="Line of work">
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
  { name: 'Basement finish', place: 'Richmond, Rhode Island', kind: 'Home', Drawing: PlanBasement, note: 'The finished basement',
    facts: [['Area', '876 SF'], ['Rooms', '2 bed, 1 bath'], ['Ceiling', '7′ 6″']] },
  { name: 'Bathroom remodel', place: 'Narragansett, Rhode Island', kind: 'Home', note: 'The finished bathroom',
    facts: [['Scope', 'Full bathroom'], ['From', 'The studs out']] },
  { name: 'Commercial project', place: 'Photos to come', kind: 'Commercial', note: 'A commercial job',
    facts: [['Scope', 'Fit-out'], ['Planned around', 'The opening date']] },
]

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
      <div className="st-panel-h"><h2>The season, on a plan</h2></div>
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
  useEffect(() => { document.title = 'Sattva Technologies: construction, farms and products. Making things work.' }, [])
  useEffect(() => {
    if (window.location.hash) { const el = document.getElementById(window.location.hash.slice(1)); if (el) el.scrollIntoView() }
    if (!('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setHere(e.target.id) }) }, { rootMargin: '-45% 0px -50% 0px' })
    ;['top', 'construction', 'farms', 'products', 'talk'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
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
              <p className="st-lede"><b>Quality homes and commercial work.</b> Every step is planned with its material, labor and time, and checked before the next one starts.</p>
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
                  <li><b>Measure and price</b><span>Every material, hour and price from the drawing, with the guesses marked until they are measured.</span></li>
                  <li><b>Plan the work</b><span>Steps in order, the trades each one needs, and the inspections between them.</span></li>
                  <li><b>Build and check</b><span>The crew works from the issued Rev. Each step is checked off with photos before the next starts.</span></li>
                  <li><b>Follow the cash</b><span>Payments tied to the work, costs against plan, and every change written up first.</span></li>
                </ol>
              </div>
            </div>

            <h3 className="st-h3" id="work">Examples</h3>
            <p className="st-sub">The finished work first. Flip any project to see its drawing.</p>
            <div className="st-cards">{BUILDS.map((p) => <ProjectSheet key={p.name} p={p} />)}</div>

            <div className="st-bridge">
              <p><b>We run our own jobs on our own software.</b> Every job is drawn, priced and scheduled before work starts, and checked off as it is built.</p>
              <Link className="st-btn" to="/samana">How we run a job</Link>
            </div>
          </div>
        </section>

        <section className="st-sec st-farm" id="farms" aria-labelledby="h-farm">
          <div className="st-wrap">
            <div className="st-head2">
              <h2 className="st-h2" id="h-farm">Farms</h2>
              <p className="st-lede"><b>We set the farm up, then build it into a business that works.</b> Clearing, fence, power, water and buildings first. Then a plan for the season and a budget for the money.</p>
            </div>
            <FarmSite />

            <h3 className="st-h3">On the ground</h3>
            <p className="st-sub">Photos from our farm builds.</p>
            <div className="st-cards st-photos">
              <div className="st-sheet"><div className="st-stage"><PhotoSlot note="The field and its rows" /></div><div className="st-tb"><b>Field</b><span>Rows and irrigation</span></div></div>
              <div className="st-sheet"><div className="st-stage"><PhotoSlot note="Fence, gates and camera poles" /></div><div className="st-tb"><b>Fence</b><span>Gates and camera poles</span></div></div>
              <div className="st-sheet"><div className="st-stage"><PhotoSlot note="The drying rooms" /></div><div className="st-tb"><b>Drying rooms</b><span>Built in containers</span></div></div>
            </div>

            <h3 className="st-h3">A plan and a budget</h3>
            <p className="st-sub">A farm is a business. Each stage is broken into its steps, with the people, materials and hours each one needs, and every dollar has a month. That is lean farming.</p>
            <div className="st-two st-wide">
              <div className="st-panel">
                <div className="st-panel-h"><h2>The budget</h2></div>
                <div className="st-total"><h4>What it costs to set up, what it costs to run, and when the money comes back.</h4></div>
                <div className="st-rows st-rtop">
                  {[['Capital', 'What it costs to set up, phase by phase'], ['Running costs', 'People, materials and power, month by month'], ['Sales', 'What the harvest brings in, and when'], ['Cash', 'The most you will need, and the month it turns']]
                    .map(([k, v]) => <div className="st-row" key={k}><span>{k}</span><b>{v}</b></div>)}
                </div>
                <div className="st-panel-f"><Link className="st-btn primary" to="/lean-ag">How we build a farm</Link></div>
              </div>
              <Season />
            </div>
          </div>
        </section>

        <section className="st-sec" id="products" aria-labelledby="h-prod">
          <div className="st-wrap">
            <div className="st-head2">
              <h2 className="st-h2" id="h-prod">Products</h2>
              <p className="st-lede"><b>Things we make.</b> Working rooms built to order inside a container, and the apps we run our own work on.</p>
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

            <h3 className="st-h3" id="apps">Apps</h3>
            <p className="st-sub">We are users first. We built these to run our own jobs and farms, and they hold the work together. You can sign in to them too.</p>
            <div className="st-cards st-apps">
              <div className="st-panel st-prod">
                <div className="st-band">Samana<small>Takeoff, Lean, Flow</small></div>
                <p>The app our own jobs run on. Takeoff draws and prices the job, Lean plans the steps and the crew, and Flow shows the budget and the cash by month.</p>
                <div className="st-price">From $10<small>a month</small></div>
                <div className="st-panel-f"><a className="st-btn primary" href={APP}>Start with a free sample job</a><Link className="st-btn" to="/samana">See it work</Link></div>
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
