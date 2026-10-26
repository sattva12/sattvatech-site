import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MAIL, SAMANA_SITE, FARM } from '../Chrome.jsx'
import '../home2.css'

/* sattvatech.com home, Oct 26, 2026. Built from the mock-up ATL approved section by section:
   https://claude.ai/artifact/BvadNVnF5tVaSLfkkahoKa (sections 1 to 8). Words are the live words; photos are ATL's own work. */

const KINDS = [
  ['Commercial', '/media/work/farm-power.jpg', 'A transformer lifted into place by crane', 'Roofs, rooms, power and water for working buildings: shells, fit-outs and the systems inside them.', '#work'],
  ['Homes', '/media/work/home-kitchen.jpg', 'A finished home kitchen', 'Quality homes and renovations, drawn and priced before we start, with one plan from first cut to handover.', '#work'],
  ['Ag facilities', '/media/work/farm-done.jpg', 'A finished ag site from above', 'Ag sites built from bare ground: clearing, roads, power, water, fencing, buildings and working yards.', '#work'],
  ['Containers', '/media/work/farm-containers.jpg', 'Containers on a finished site', 'Working rooms built to order inside a container: insulated, wired and conditioned.', '#products'],
]
const SHOTS = [
  ['COMMERCIAL', 'Make-up air units on a steel frame', 'com-roof', 'Commercial roof with make-up air units'],
  ['COMMERCIAL', 'Standby generator set and wired', 'com-generator', 'A commercial generator installation'],
  ['HOMES', 'A finished kitchen', 'home-kitchen', 'A finished home kitchen'],
  ['AG · BEFORE', 'The site as we found it', 'farm-before', 'An ag site before work'],
  ['AG · DONE', 'Paved, fenced and working', 'farm-done', 'The finished ag site from above'],
  ['COMMERCIAL · AFTER', 'A mill space made ready', 'mill-after', 'A finished commercial interior'],
]
const STEPS = [
  ['01', 'Drawn', 'We walk the site and draw it to scale, so you see the job before it starts.'],
  ['02', 'Priced', 'Every line is priced at today’s costs, by trade, so the number is one you can plan on.'],
  ['03', 'Planned', 'Permits, orders and inspections laid out in order, with dates for each.'],
  ['04', 'Built', 'Our crew and trusted trades build to the drawing, and changes are written down as they happen.'],
  ['05', 'Handed over', 'It is tested, working and documented before we call it done.'],
]
const WHY = [
  ['What we have seen', 'We have been in production a long time. We have seen good companies make money, barely survive, and fail, often for want of the right numbers at the right time.'],
  ['What we want', 'Every company making the best decision for itself, and whole industries working tighter, the way a GMP shop runs: clear steps, checked work, records kept, and the information reaching the people who decide, early in the pipeline.'],
  ['What we focus on', 'We are process, production and design people. Our focus is the customer, the quality of the final product, and the bottom line. At the end of the day that makes more money for everyone, and better information makes a better place to work.'],
]

function Split() {
  const [p, setP] = useState(50)
  return (
    <div className="h2-split" style={{ '--p': p + '%' }}>
      <img src="/media/work/com-roof.jpg" alt="Make-up air units installed on a galvanized steel frame on a commercial roof" />
      <div className="h2-plan" aria-hidden="true">
        <svg viewBox="0 0 800 361" preserveAspectRatio="xMinYMin meet">
          <g fill="none" stroke="#DFE6EE" strokeWidth="1.6">
            <rect x="40" y="208" width="660" height="34" />
            <path d="M40 242 L70 300 M200 242 L220 300 M360 242 L380 300 M520 242 L530 300" />
            <rect x="82" y="118" width="210" height="90" />
            <rect x="96" y="96" width="160" height="22" />
            <rect x="300" y="136" width="70" height="72" />
          </g>
          <g fill="none" stroke="#F6B70A" strokeWidth="1.2">
            <path d="M82 92 L82 72 M292 92 L292 72 M82 78 L292 78" />
            <path d="M30 208 L14 208 M30 242 L14 242 M20 208 L20 242" />
            <circle cx="187" cy="163" r="16" />
          </g>
          <g fill="#F6B70A" fontFamily="IBM Plex Mono, monospace" fontSize="11">
            <text x="160" y="70">16'-0"</text><text x="0" y="230">2'-10"</text><text x="178" y="167">1</text>
          </g>
          <g fill="#FFFFFF" fontFamily="IBM Plex Sans Condensed, sans-serif" fontSize="12" fontWeight="600">
            <text x="96" y="140">MAU-1</text><text x="96" y="156">MAKE-UP AIR UNIT</text>
            <text x="48" y="230">GALV. STEEL DUNNAGE FRAME</text><text x="304" y="128">ERV-1</text>
          </g>
        </svg>
      </div>
      <span className="h2-handle" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D2747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" /></svg>
      </span>
      <span className="h2-chip l" aria-hidden="true">PLAN</span>
      <span className="h2-chip r" aria-hidden="true">BUILT</span>
      <input type="range" min="0" max="100" value={p} onChange={(e) => setP(+e.target.value)} aria-label="Slide between the plan and the finished make-up air units" />
    </div>
  )
}

function TalkForm() {
  const [state, setState] = useState('idle')
  const send = async (e) => {
    e.preventDefault(); setState('sending')
    try {
      const res = await fetch('https://formspree.io/f/mbdpkqyj', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) })
      setState(res.ok ? 'sent' : 'error')
    } catch (err) { setState('error') }
  }
  if (state === 'sent') return <div className="h2-form" role="status"><p className="h2-lead">Thanks. We will get back to you within one business day.</p></div>
  return (
    <form className="h2-form" onSubmit={send}>
      <input type="hidden" name="topic" value="Home page" />
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>What is it?
        <select name="kind"><option>Commercial</option><option>A home</option><option>An ag facility</option><option>A container room</option><option>A quote for my customer (contractor)</option></select>
      </label>
      <label>Tell us about it<textarea name="message" rows="4" required /></label>
      <button className="h2-btn blue" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending' : 'Send'}</button>
      {state === 'error' && <span className="h2-err" role="alert">That did not send. Email {MAIL} instead.</span>}
    </form>
  )
}

export default function HomeNew() {
  return (
    <div className="h2">
      <div className="h2-dark" id="top">
        <header className="h2-head">
          <div className="h2-wrap">
            <Link to="/" aria-label="Sattva Technologies, home"><img className="logo" src="/brand/sattva-logo-dark.svg" alt="Sattva Technologies" /></Link>
            <nav className="h2-nav" aria-label="Main">
              <a href="#build">Construction</a><a href="#build">Ag</a><a href="#products">Products</a><a href="#contractors">Contractors</a><a href="#work">Our work</a>
            </nav>
            <div className="h2-head-r">
              <Phone className="h2-call" label="Call us" />
              <a className="h2-talk" href="#talk">Talk about a project</a>
            </div>
          </div>
        </header>
        <section className="h2-hero" aria-labelledby="h2-h1">
          <div className="h2-wrap">
            <div className="h2-hero-l">
              <span className="h2-eyebrow">Design · Build · Ag · Massachusetts</span>
              <h1 id="h2-h1">Making things work.</h1>
              <p className="b">We build commercial spaces, homes and ag facilities. Every job is drawn, priced and planned before the first cut, then built and handed over working.</p>
              <div className="h2-acts">
                <a className="h2-btn white" href="#talk">Talk about a project</a>
                <a className="h2-btn line-w" href="#contractors">For contractors →</a>
              </div>
              <p className="h2-lic">LICENSED MASSACHUSETTS BUILDER · CSL · HIC</p>
            </div>
            <figure className="h2-fig">
              <Split />
              <figcaption>Commercial roof: make-up air units on a galvanized steel frame. Drag from the plan to the finished work.</figcaption>
            </figure>
          </div>
        </section>
      </div>

      <section className="h2-sec h2-con" id="contractors" aria-labelledby="h2-con">
        <div className="h2-wrap">
          <div className="h2-con-l">
            <span className="h2-eyebrow">For contractors and small crews</span>
            <h2 className="h2-h2" id="h2-con">We take the quoting off your plate, so your nights go back to you.</h2>
            <p className="h2-lead">Send us the job and we send back a quote your customer can say yes to: drawn, priced and checked by a licensed GC, with materials at today’s costs, not last year’s. You keep the job and the customer; we stay behind you.</p>
            <div className="h2-prices">
              <div><b>Free</b><span>Your first quote, with a 1-hour call</span></div>
              <div><b>$50</b><span>Your first job’s materials list and work order</span></div>
              <div><b>$100</b><span>Each quote after, with a 1-hour call</span></div>
              <div><b>$150</b><span>The full package: quote, materials list, work order, call</span></div>
            </div>
            <p className="h2-note">Per job, not a subscription. Need us to run the job too? GC service in Massachusetts, by estimate.</p>
            <div className="h2-acts" style={{ paddingTop: 0 }}>
              <Link className="h2-btn blue" to="/contractors">Get your first quote free</Link>
              <Link className="h2-btn line-b" to="/contractors#how">How it works</Link>
            </div>
          </div>
          <figure className="h2-quotes">
            <img className="q2" src="/media/sample-quote-2.jpg" alt="A sample quote, page 2, with the prices blocked out" loading="lazy" />
            <img className="q1" src="/media/sample-quote-1.jpg" alt="A sample quote, page 1: Your Company Name and logo, the scope, the price blocked out" loading="lazy" />
            <figcaption>What you get: a quote under your name. Sample, prices blocked out.</figcaption>
          </figure>
        </div>
      </section>

      <section className="h2-sec h2-dark" id="build" aria-labelledby="h2-build">
        <div className="h2-wrap">
          <span className="h2-eyebrow">What we build</span>
          <h2 className="h2-h2" id="h2-build" style={{ marginTop: 12 }}>Four kinds of work, one way of doing it.</h2>
          <p className="h2-lead" style={{ marginTop: 12 }}>Drawn first, priced and planned before the first cut, then built and handed over working.</p>
          <div className="h2-kinds">
            {KINDS.map(([n, img, alt, what, href]) => (
              <a key={n} className="h2-kind" href={href}>
                <img src={img} alt={alt} loading="lazy" />
                <div><b>{n}</b><span>{what}</span><em>See the work →</em></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="h2-sec" id="work" aria-labelledby="h2-work">
        <div className="h2-wrap">
          <div className="h2-work-h">
            <div>
              <span className="h2-eyebrow">Our work</span>
              <h2 className="h2-h2" id="h2-work">Photos from our own jobs.</h2>
              <p className="h2-lead" style={{ color: 'var(--soft)' }}>Real sites, taken as the work went in: before, during and handed over.</p>
            </div>
            <Link className="h2-btn line-b" to="/construction">See all the work →</Link>
          </div>
          <div className="h2-shots">
            {SHOTS.map(([tag, cap, f, alt]) => (
              <figure key={f}>
                <img src={'/media/work/' + f + '.jpg'} alt={alt} loading="lazy" />
                <figcaption><small>{tag}</small><span>{cap}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="h2-sec h2-dark" id="how" aria-labelledby="h2-how">
        <div className="h2-wrap">
          <span className="h2-eyebrow">How a job runs</span>
          <h2 className="h2-h2" id="h2-how" style={{ marginTop: 12 }}>Drawn, priced and planned before the first cut.</h2>
          <p className="h2-lead" style={{ marginTop: 12 }}>The same five steps on every job, whatever we are building.</p>
          <div className="h2-steps">
            {STEPS.map(([n, name, what]) => <div key={n}><small>{n}</small><b>{name}</b><span>{what}</span></div>)}
          </div>
          <a className="h2-btn white" href="#talk">Talk about a project</a>
        </div>
      </section>

      <section className="h2-sec" id="products" aria-labelledby="h2-prod">
        <div className="h2-wrap">
          <span className="h2-eyebrow">Products</span>
          <h2 className="h2-h2" id="h2-prod" style={{ marginTop: 12, maxWidth: 720 }}>Things we make, and the tools we run our own work on.</h2>
          <div className="h2-prod">
            <div className="h2-cont">
              <img src="/media/work/farm-containers.jpg" alt="Containers on a finished site" loading="lazy" />
              <div>
                <small>BUILT TO ORDER</small>
                <b>Container rooms</b>
                <span>Working rooms built inside a 40 ft container: insulated, wired and conditioned, then delivered ready to use.</span>
                <Link className="h2-btn white" style={{ alignSelf: 'flex-start' }} to="/containers">Ask about a container room</Link>
              </div>
            </div>
            <div className="h2-links">
              <a href={SAMANA_SITE}>
                <span className="sam"><img src="/brand/samana-logo-wide-dark.svg" alt="Samana" /></span>
                <span>The planning software we run our own jobs on.</span>
                <em>samana.tech →</em>
              </a>
              <a href={FARM}>
                <b className="fm">Farmmetric</b>
                <span>A free crew app for farms of every kind.</span>
                <em>myfarmmetric.com →</em>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="h2-floor h2-dark" id="why" aria-labelledby="h2-why">
        <div className="h2-wrap">
          <span className="h2-eyebrow">Why some of it is free</span>
          <h2 className="h2-h2" id="h2-why" style={{ marginTop: 14 }}>Lift the floor for everyone.</h2>
          <p className="h2-lead" style={{ marginTop: 14 }}>A more efficient process is not only our bottom line. It is everyone’s: the owner’s, the crew’s and the customer’s.</p>
          <div className="h2-cols">
            {WHY.map(([h, p]) => <div key={h}><b>{h}</b><span>{p}</span></div>)}
          </div>
        </div>
      </section>

      <section className="h2-talk-sec" id="talk" aria-labelledby="h2-talk">
        <div className="h2-wrap">
          <div className="h2-talk-l">
            <span className="h2-eyebrow">Talk about a project</span>
            <h2 className="h2-h2" id="h2-talk">Tell us what you want built.</h2>
            <p className="h2-lead">A few lines is enough. We write back with the next step: a visit, a drawing or a price.</p>
            <Phone className="h2-tel btn" label="Call us" />
            <p className="h2-lic">Licensed Massachusetts builder · CSL · HIC</p>
          </div>
          <TalkForm />
        </div>
      </section>

      <footer className="h2-foot">
        <div className="h2-wrap">
          <div className="h2-foot-row">
            <img src="/brand/sattva-logo-dark.svg" alt="Sattva Technologies" />
            <nav aria-label="Footer">
              <a href="#build">Construction</a><a href="#build">Ag</a><a href="#products">Products</a><a href="#contractors">Contractors</a><a href="#work">Our work</a>
              <a href="https://app.samana.tech/privacy">Privacy</a><a href="https://app.samana.tech/terms">Terms</a>
            </nav>
            <address>
              <a href={'mailto:' + MAIL}>{MAIL}</a><br />
              Sattva Technologies LLC<br />179 Highland Ave #1003<br />Seekonk, MA 02771
            </address>
          </div>
          <small>© 2026 Sattva Technologies LLC. Licensed Massachusetts builder.</small>
        </div>
      </footer>
    </div>
  )
}
