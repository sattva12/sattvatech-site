import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { APP, FARM, Phone, MAIL } from '../Chrome.jsx'
import { Top, Foot } from '../Shell.jsx'
import ContactForm from './ContactForm.jsx'
import { TeamBuild } from '../Kit.jsx'
import { PlanFarm, PlanContainer, PlanFitout } from '../drawings.jsx'
import { Logo } from '../brand.jsx'
import '../site.css'
import '../v3.css'

/* v3 home (2026-10-12): Atul, 22:43 the night before: "super technical and nice, like an expensive website,
   because we are a tech company. The app is sick, so the site has to follow."
   Same order and the same words he approved; a new look. Leads with the work: Construction, Farms, Products. */

/* ---------- the opening: a drawing first (Atul, 20:08: "the first thing you see is a drawing... technical but construction") ---------- */
const LINES = [
  { id: 'construction', name: 'Construction', sub: 'Commercial work and quality homes, planned step by step and checked as built.' },
  { id: 'farms', name: 'Ag', sub: 'Land set up into a working farm, then run on a plan and a budget.' },
  { id: 'products', name: 'Products', sub: 'Container rooms built to order, and the software we run our work on.' },
]

/* The opening sheet: two pictures on one sheet, the plan and the finished work (Atul, 20:47: "the drawing should be something
   Samana can do, like a commercial build... no CAD files of HVAC... the design shows the install of it... so just the 2 pics").
   The plan inks in, then the seam glides once to show the make-up air units installed; drag to compare. */
function DrawnBuilt() {
  const [p, setP] = useState(100)
  useEffect(() => {
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (still) { setP(58); return undefined }
    let raf, t0
    const id = setTimeout(() => {
      const step = (t) => { if (!t0) t0 = t; const k = Math.min(1, (t - t0) / 1100); const e = 1 - Math.pow(1 - k, 3); setP(100 - 42 * e); if (k < 1) raf = requestAnimationFrame(step) }
      raf = requestAnimationFrame(step)
    }, 2600)
    return () => { clearTimeout(id); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="sx-db-box" style={{ '--p': p + '%' }}>
      <img src="/media/work/com-roof.jpg" alt="Make-up air units installed on a galvanized steel frame on a commercial roof" />
      <div className="sx-db-dw"><PlanFitout /></div>
      <span className="sx-db-seam" aria-hidden="true"><i /></span>
      <span className="sx-db-tag sx-db-l" aria-hidden="true">Drawn</span>
      <span className="sx-db-tag sx-db-r" aria-hidden="true">Built</span>
      <input type="range" min="0" max="100" value={Math.round(p)} onChange={(e) => setP(+e.target.value)} aria-label="Slide between the floor plan and the finished make-up air units" />
    </div>
  )
}

function Opening() {
  return (
    <section className="sx-open" id="top" aria-labelledby="sx-h1">
      <div className="sx-wrap">
        <div className="sx-open-head">
          <h1 id="sx-h1">Making things work.</h1>
          <div className="sx-open-r">
            <p>We do the work, and we draw it first. Commercial construction and quality homes, farms set up and built into businesses, and the things we make: container rooms, and the software we run it all on.</p>
            <div className="sx-acts">
              <a className="sx-btn sx-btn-go" href="#construction">See the work</a>
              <a className="sx-btn sx-btn-line" href="#talk">Talk about a project</a>
            </div>
          </div>
        </div>

        <div className="sx-dwg">
          <div className="sx-dwg-sheet"><DrawnBuilt /></div>
          <dl className="sx-dwg-tb">
            <div className="sx-dwg-logo"><Logo size={30} tone="dark" /></div>
            <div><dt>Drawing</dt><dd>Commercial fit-out, plan and built</dd></div>
            <div><dt>Engineering and construction</dt><dd>25+ years</dd></div>
            <div><dt>MA Construction Supervisor</dt><dd>CS-122574</dd></div>
            <div><dt>Home Improvement Contractor</dt><dd>HIC 218120</dd></div>
            <div><dt>Based in</dt><dd>Massachusetts</dd></div>
            <div><dt>Call or text</dt><dd><Phone /></dd></div>
            <div className="sx-dwg-no"><dt>Sheet</dt><dd>A-101</dd></div>
          </dl>
        </div>


        <nav className="sx-lines" aria-label="What we do">
          {LINES.map((l) => (
            <a key={l.id} href={'#' + l.id} className={'sx-c-' + l.id}>
              <b><i aria-hidden="true" />{l.name}</b>
              <span>{l.sub}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}

/* ---------- why: Atul's reasons, 2026-10-12 ---------- */
const WHY = [
  ['What we have seen', 'We have been in production a long time. We have seen good companies make money, barely survive, and fail, often for want of the right numbers at the right time.'],
  ['What we want', 'Every company making the best decision for itself, and whole industries working tighter, the way a GMP shop runs: clear steps, checked work, records kept, and the information reaching the people who decide, early in the pipeline.'],
  ['What we focus on', 'We are process, production and design people. Our focus is the customer, the quality of the final product, and the bottom line. At the end of the day that makes more money for everyone, and better information makes a better place to work.'],
]

/* ---------- construction ---------- */
const MILL = [
  ['Before', 'mill-before', 'The building as we found it', 'A derelict brick mill building with broken windows and debris in the yard'],
  ['Inside, before', 'mill-before-inside', 'Bare timber and a worn floor', 'The empty upper floor before work: old timber posts and a worn floor'],
  ['During', 'mill-during', 'New floor, new steel framing', 'A new sealed floor with steel wall framing going up between the columns'],
  ['Inside, after', 'mill-after-inside', 'Finished rooms, lit and sprinklered', 'A finished white room with a sealed floor, new lighting and sprinklers'],
  ['After', 'mill-after', 'The finished building', 'The finished building from the street: new windows, new doors, painted walls and planted edges'],
]
const CARRY = [
  ['Design', 'Mechanical, electrical and plumbing, and the production rooms and labs'],
  ['Pricing', 'Every trade quoted and compared'],
  ['Hiring', 'The contractors and trades for the job'],
  ['Permits', 'The city and the state'],
  ['Fire marshal', 'Reviews, inspections and sign-off'],
  ['Power', 'The electric company: new service and transformers'],
  ['On site', 'Project manager and builder, from start to finish'],
]
const TAKE_ON = [
  ['Commercial fit-outs', 'Planned around your opening date'],
  ['Basements', 'Framed, wired, insulated, finished'],
  ['Bathrooms', 'From the studs out'],
  ['Decks and outside work', 'Footings, framing, stairs, rails'],
  ['Floors, doors and windows', 'Supplied and installed'],
  ['GC for contractors', 'Permitted jobs under our license'],
]
const RUN = [
  ['Measure and price', 'Every material, hour and price from the drawing, with the guesses marked until they are measured.'],
  ['Plan the work', 'Steps in order, the trades each one needs, and the inspections between them.'],
  ['Build and check', 'The crew works from the issued Rev. Each step is checked off with photos before the next starts.'],
  ['Follow the cash', 'Payments tied to the work, costs against plan, and every change written up first.'],
]
const EXAMPLES = [
  { photo: 'com-room', name: 'Commercial fit-out', meta: 'Sattva Technologies, 2019 to 2020', note: 'Design, permits, power and finished washable rooms', alt: 'A finished white room with a washable floor, a steel sink and capped services' },
  { photo: 'com-generator', name: 'Power for the building', meta: 'Sattva Technologies, 2019 to 2020', note: 'New service, switchgear and a standby generator', alt: 'A standby generator being lifted into place by crane behind a new retaining wall' },
  { photo: 'com-switchgear', name: 'Switchgear', meta: 'Sattva Technologies, 2019 to 2020', note: 'The new service gear, wired in', alt: 'Open electrical switchgear with new breakers and colour-coded feeders' },
  { photo: 'home-kitchen', name: 'Kitchen remodel', meta: 'Massachusetts, 2015', note: 'Cabinets, stone counters, an island, wall ovens and a hood', alt: 'A finished kitchen with cherry cabinets, stone counters, an island, wall ovens and a range hood' },
]

function Rebuild() {
  const [i, setI] = useState(0)
  const [k, f, cap, alt] = MILL[i]
  return (
    <div className="sx-rebuild">
      <figure className="sx-fig">
        <div className="sx-fig-img sx-ratio-wide"><img key={f} src={'/media/work/' + f + '.jpg'} alt={alt} loading="lazy" /></div>
        <figcaption>
          <ol className="sx-steps" aria-label="Stage of the job">
            {MILL.map(([n], x) => (
              <li key={n}><button type="button" aria-pressed={x === i} onClick={() => setI(x)}><span>{x + 1}</span>{n}</button></li>
            ))}
          </ol>
          <p><b>{k}.</b> {cap}. An old mill building, 2017 to 2018, as owner's representative.</p>
        </figcaption>
      </figure>
      <div className="sx-rebuild-t">
        <h3>Commercial work, carried end to end</h3>
        <p>Owner's representative, engineer, project manager and builder, in one. We take the whole job, from the first drawing to the final sign-off, and deal with everyone it takes to get there.</p>
        <dl className="sx-spec">{CARRY.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
      </div>
    </div>
  )
}

/* ---------- farms ---------- */
const FARM_PHOTOS = [
  ['farm-before', 'Before', 'Woods, marked out', 'The site from above before the build: woods, with the first clearing and access roads cut in'],
  ['farm-clearing', 'Clearing', 'Trees down and chipped', 'An excavator with a mulching head clearing trees'],
  ['farm-bridge-set', 'The bridge', 'Precast sections, set by crane', 'Four precast concrete bridge sections set side by side in the woods'],
  ['farm-bridge-done', 'The bridge, finished', 'Walled, fenced and in use', 'The finished bridge in winter: the road running between concrete walls and a screened fence'],
  ['farm-after', 'Graded', 'The field and the yard take shape', 'The site from above part way through: the field graded and fenced, the yard and the storm pond in'],
  ['farm-water', 'The well', 'Pumps, pressure tank and controls', 'The well room: pumps, pressure tank and controls on the wall'],
  ['farm-paved', 'Paving', 'The road in and the yard', 'The paved road and yard from above, with the gate, the containers and the corner of the field'],
  ['farm-hoops', 'Hoop houses', 'Frames up over the field', 'Rows of steel hoop house frames standing over the whole field'],
  ['farm-done', 'After', 'Paved, fenced and working', 'The finished site from above: the paved road, the fenced yard with its buildings and containers, and the field'],
]
const LAYERS = [['rows', 'Rows'], ['fence', 'Fence'], ['cam', 'Cameras'], ['power', 'Power and water'], ['cont', 'Containers'], ['dim', 'Dimensions']]
const SITE = [['Fence', '6 ft, with screen'], ['Gates', '10 ft and a man gate'], ['Rows', '20 of 272 ft'], ['Camera poles', '6, at 16 ft'], ['Cameras', '14'], ['Service', '400 A, 330 ft line'], ['Containers', '5'], ['Buildings', 'Hoop house, well shed']]
const SEASON = [
  ['Seed start', 'May 1 to June 1', 1, 3],
  ['Field prep', 'Ready by June 1', 1, 3],
  ['Planting', 'From June 1', 3, 4],
  ['Season', 'Feeding, scouting and spraying, on a schedule', 4, 9],
  ['Harvest and drying', 'September 1 to October 15', 9, 12],
  ['Records', 'Kept at every step', 1, 13],
]
const BUDGET = [['Capital', 'What it costs to set up, phase by phase'], ['Running costs', 'People, materials and power, month by month'], ['Sales', 'What the harvest brings in, and when'], ['Cash', 'The most you will need, and the month it turns']]

function FarmSite() {
  const [off, setOff] = useState({})
  return (
    <div className="sx-site">
      <div className="sx-sheet">
        <div className="sx-sheet-bar" role="group" aria-label="Layers">
          {LAYERS.map(([k, n]) => <button key={k} type="button" aria-pressed={!off[k]} onClick={() => setOff({ ...off, [k]: !off[k] })}>{n}</button>)}
        </div>
        <div className="sx-sheet-dw"><PlanFarm still off={off} /></div>
        <div className="sx-sheet-tb"><b>Farm site, 5.02 acres</b><span>Fence 200 by 300 ft</span><span>Rows run front to back</span></div>
      </div>
      <div className="sx-site-t">
        <p className="sx-figure"><b>1,000 ft</b> of fence around the field, and everything inside it counted.</p>
        <dl className="sx-spec sx-spec-dark">{SITE.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
    </div>
  )
}

function Strip() {
  const ref = useRef(null)
  const step = (d) => { const el = ref.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: 'smooth' }) }
  return (
    <div className="sx-strip">
      <div className="sx-strip-bar">
        <p>One farm site in Massachusetts, from woods to a working site. Built by Sattva Technologies.</p>
        <span><button type="button" onClick={() => step(-1)} aria-label="Earlier photos">‹</button><button type="button" onClick={() => step(1)} aria-label="Later photos">›</button></span>
      </div>
      <ol className="sx-strip-row" ref={ref} tabIndex={0} aria-label="The farm build, in order">
        {FARM_PHOTOS.map(([f, k, v, alt], n) => (
          <li key={f}>
            <div className="sx-strip-img"><img src={'/media/work/' + f + '.jpg'} alt={alt} loading="lazy" /></div>
            <p><span>{n + 1}</span><b>{k}</b>{v}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Season() {
  return (
    <div className="sx-gantt" role="img" aria-label="A season from May to October: seed start and field prep in May, planting from June 1, the season through August, harvest and drying from September 1 to October 15, with records kept all the way through">
      <div className="sx-gm"><span />{['May', 'June', 'July', 'Aug', 'Sept', 'Oct'].map((m) => <b key={m}>{m}</b>)}</div>
      {SEASON.map(([n, w, a, b]) => (
        <div className="sx-gr" key={n}>
          <span>{n}</span>
          <i style={{ gridColumn: `${a + 1} / ${b + 1}` }} title={w} />
        </div>
      ))}
    </div>
  )
}

/* ---------- products ---------- */
const ROOMS = [
  ['Drying room', 'Insulated, with AC, dehumidifiers, fans and hang lines, sized to the wet weight'],
  ['Power and storage', 'Insulated, with the 200 A panel, the camera recorder and shelving'],
  ['Option: lab air flow', 'Supply and exhaust air laid out for a lab. The room, not the equipment'],
  ['Option: plug locations', 'Outlets and circuits placed where your equipment will stand'],
]
const APPS = [
  { id: 'samana', logo: '/brand/samana-logo-wide.svg', name: 'Samana', sub: 'From input to output', text: 'The app our own jobs run on. Takeoff draws and prices the job, Lean plans the steps and the crew, and Flow shows the budget and the cash by month.',
    price: 'From $50 a month', small: 'Coming soon · 30-day money-back guarantee', go: ['https://samana.tech/#contact', 'Coming soon'], more: ['https://samana.tech', 'See it on samana.tech'] },
  { id: 'farmmetric', logo: '/brand/farmmetric-lockup.svg', name: 'Farmmetric', sub: 'Free farm app', text: 'The farm’s jobs, sprays, harvest and drying, logged from a phone, with the records kept as you go. Live API connectors are coming soon.',
    price: 'Free', small: 'Google Play soon', go: [FARM, 'Use it free'], more: ['/farmmetric', 'What it does'] },
  { id: 'quote', name: 'Quote service', sub: 'For contractors, small, medium and large', text: 'Send us the job. We send back a clear quote in your name, with every material, hour and step priced.',
    price: 'First quote free', small: 'Then $100 a quote, $150 the full package', go: ['/#talk', 'Call or text'], more: ['/contractors', 'How it works'] },
]

function Go({ to, className, children }) {
  if (to.startsWith('/') && !to.startsWith('/#')) return <Link to={to} className={className}>{children}</Link>
  return <a href={to} className={className}>{children}</a>
}

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
    <div className="sx">
      <Top here={here} />
      <main>
        <Opening />

        <section className="sx-sec sx-crews" id="contractors" aria-labelledby="h-crews">
          <div className="sx-wrap">
            <div className="sx-free sx-crew-box">
              <div>
                <h2 id="h-crews">We back up contractors and small crews.</h2>
                <p>Send us the job and we send back a quote your customer can say yes to: drawn, priced and checked by a licensed GC. <b>Your first quote is free.</b> You keep the job and the customer; we stay behind you.</p>
              </div>
              <div className="sx-acts"><Link className="sx-btn sx-btn-go" to="/contractors">Contractors, click here</Link></div>
            </div>
          </div>
        </section>

        <section className="sx-sec sx-why" id="why" aria-labelledby="h-why">
          <div className="sx-wrap sx-why-in">
            <div className="sx-why-h">
              <h2 id="h-why">Lift the floor for everyone.</h2>
              <p>A more efficient process is not only our bottom line. It is everyone’s: the owner’s, the crew’s and the customer’s.</p>
            </div>
            <dl className="sx-why-cols">{WHY.map(([h, p]) => <div key={h}><dt>{h}</dt><dd>{p}</dd></div>)}</dl>
          </div>
        </section>

        <section className="sx-sec" id="construction" aria-labelledby="h-con">
          <div className="sx-wrap">
            <header className="sx-sec-h sx-c-construction">
              <h2 id="h-con"><i aria-hidden="true" />Construction</h2>
              <p>Commercial work and quality homes. Every step is planned with its material, labor and time, and checked before the next one starts.</p>
            </header>
            <Rebuild />

            <div className="sx-split">
              <div>
                <h3 className="sx-h3">What we take on</h3>
                <dl className="sx-spec">{TAKE_ON.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <div className="sx-acts"><Link className="sx-btn sx-btn-ink" to="/construction">More on construction</Link><Link className="sx-btn sx-btn-line" to="/contractors">Quote service for contractors</Link></div>
              </div>
              <div>
                <h3 className="sx-h3">How a job runs</h3>
                <ol className="sx-run">{RUN.map(([k, v], n) => <li key={k}><span>{n + 1}</span><b>{k}</b><p>{v}</p></li>)}</ol>
              </div>
            </div>

            <h3 className="sx-h3" id="work">Examples</h3>
            <div className="sx-ex">
              {EXAMPLES.map((e) => (
                <figure key={e.name}>
                  <div className="sx-fig-img"><img src={'/media/work/' + e.photo + '.jpg'} alt={e.alt} loading="lazy" /></div>
                  <figcaption><b>{e.name}</b><span>{e.meta}</span><p>{e.note}</p></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <TeamBuild />

        <section className="sx-sec sx-farm" id="farms" aria-labelledby="h-farm">
          <div className="sx-wrap">
            <header className="sx-sec-h sx-c-farms">
              <h2 id="h-farm"><i aria-hidden="true" />Ag</h2>
              <p>We set the farm up, then build it into a business that works. Clearing, roads, fence, power, water and buildings first. Then a plan for the season and a budget for the money.</p>
            </header>
            <FarmSite />
          </div>
          <Strip />
          <div className="sx-wrap">
            <div className="sx-split sx-plan">
              <div>
                <h3 className="sx-h3">A plan and a budget</h3>
                <p className="sx-p">A farm is a business. Each stage is broken into its steps, with the people, materials and hours each one needs, and every dollar has a month. That is lean ag.</p>
                <dl className="sx-spec sx-spec-dark">{BUDGET.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <div className="sx-acts"><Link className="sx-btn sx-btn-go" to="/lean-ag">How we build a farm</Link></div>
              </div>
              <div>
                <h3 className="sx-h3">The season, on a plan</h3>
                <Season />
              </div>
            </div>
          </div>
        </section>

        <section className="sx-sec" id="products" aria-labelledby="h-prod">
          <div className="sx-wrap">
            <header className="sx-sec-h sx-c-products">
              <h2 id="h-prod"><i aria-hidden="true" />Products</h2>
              <p>Working rooms built to order inside a container, and the software we run our own work on.</p>
            </header>
            <div className="sx-site sx-cont">
              <div className="sx-sheet">
                <div className="sx-sheet-dw"><PlanContainer still /></div>
                <div className="sx-sheet-tb"><b>Drying room</b><span>40 ft container</span><span>Insulated, wired and conditioned</span></div>
              </div>
              <div className="sx-site-t">
                <h3 className="sx-h3">Container rooms</h3>
                <p className="sx-p">Two rooms right now, both insulated. We build it on your site, which we recommend, or you buy the design: the drawing set and a work order for putting it together.</p>
                <dl className="sx-spec">{ROOMS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <div className="sx-acts"><Link className="sx-btn sx-btn-ink" to="/containers">See the containers</Link></div>
              </div>
            </div>

            <h3 className="sx-h3" id="apps">Software</h3>
            <p className="sx-p sx-p-lead">We are users first. We built these to run our own jobs and farms, and they hold the work together.</p>
            <div className="sx-apps">
              {APPS.map((a) => (
                <article key={a.id} className={'sx-app sx-app-' + a.id}>
                  {a.logo
                    ? (a.tile
                      ? <h4 className="sx-app-lockup sx-fm-lockup"><span className="sx-fm-tile"><img src={a.logo} alt={a.name + ', ' + a.sub} /></span></h4>
                      : <h4 className="sx-app-lockup"><img src={a.logo} alt={a.name + ', ' + a.sub} /></h4>)
                    : <h4>{a.name}<span>{a.sub}</span></h4>}
                  <p>{a.text}</p>
                  <div className="sx-price"><b>{a.price}</b><span>{a.small}</span></div>
                  <div className="sx-acts"><Go to={a.go[0]} className="sx-btn sx-btn-ink">{a.go[1]}</Go><Go to={a.more[0]} className="sx-btn sx-btn-line">{a.more[1]}</Go></div>
                </article>
              ))}
            </div>
            <p className="sx-sai" id="sai"><b>Sai guides you through it.</b> The AI helper inside Samana takes a quote, a count or a photo, works out where it goes, and waits for your OK before anything changes. <Link to="/samana#sai">Meet Sai</Link></p>
          </div>
        </section>

        <section className="sx-sec sx-talk" id="talk" aria-labelledby="h-talk">
          <div className="sx-wrap sx-talk-in">
            <div>
              <h2 id="h-talk">Talk about a project.</h2>
              <p>Tell us where it is, what it is, and when it needs to be done.</p>
              <Phone className="sx-talk-tel" label="Show phone number" />
              <a className="sx-talk-mail" href={'mailto:' + MAIL}>{MAIL}</a>
            </div>
            <div className="sx-form"><ContactForm topic="Home page" prompt="Where it is, what it is, and when it needs to be done" /></div>
          </div>
        </section>

        <section className="sx-sec sx-freesec" id="free" aria-labelledby="h-free">
          <div className="sx-wrap">
            <div className="sx-free">
              <p><b id="h-free">Why some of it is free.</b> Some of the simplest ways to make money are saving it: less waste, less waiting, nothing done twice. So Farmmetric is free, and every Samana plan comes with a 30-day money-back guarantee. You see your own numbers in your first month. Win-win means you are working with winners.</p>
              <div className="sx-acts"><a className="sx-btn sx-btn-go" href="https://samana.tech/#contact">Samana: coming soon</a><a className="sx-btn sx-btn-line" href="https://samana.tech/#plans">See the plans</a></div>
            </div>
          </div>
        </section>
      </main>
      <Foot />
    </div>
  )
}
