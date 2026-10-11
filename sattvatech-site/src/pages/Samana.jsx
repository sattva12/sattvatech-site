import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader, SiteFoot, APP, FARM } from '../Chrome.jsx'
import '../samana.css'

export { APP, FARM }

/* the hero drawing: the sample 3-floor job drawn line by line while the takeoff adds up */
const seg = (pts) => { let d = 0; for (let i = 1; i < pts.length; i++) d += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return Math.ceil(d) + 2 }
const P = (pts, close) => 'M' + pts.map((p) => p.join(' ')).join('L') + (close ? 'Z' : '')
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]
const LINES = [
  // basement: outside walls, bedrooms, bath, stairs
  { p: rect(20, 50, 270, 180), d: 0.1 },
  { p: [[120, 50], [120, 150], [20, 150]], d: 0.5, c: 'thin' },
  { p: [[120, 150], [190, 150], [190, 230]], d: 0.7, c: 'thin' },
  { p: rect(214, 60, 66, 90), d: 0.9, c: 'thin' },
  ...[0, 1, 2, 3, 4, 5].map((k) => ({ p: [[214, 72 + k * 13], [280, 72 + k * 13]], d: 1.0 + k * 0.05, c: 'thin' })),
  // first floor
  { p: rect(320, 50, 200, 180), d: 1.3 },
  { p: [[440, 50], [440, 160], [320, 160]], d: 1.7, c: 'thin' },
  ...[0, 1, 2, 3, 4, 5, 6].map((k) => ({ p: [[328 + k * 28, 50], [344 + k * 28, 50]], d: 1.9 + k * 0.04, c: 'amb' })),
  // second floor: bedrooms and the bath
  { p: rect(550, 50, 160, 180), d: 2.3 },
  { p: [[630, 50], [630, 150], [550, 150]], d: 2.7, c: 'thin' },
  { p: rect(630, 166, 80, 64), d: 2.9, c: 'amb' },
  // outside: the deck off the first floor, stairs down
  { p: rect(330, 268, 180, 120), d: 3.3 },
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => ({ p: [[348 + k * 16, 268], [348 + k * 16, 388]], d: 3.6 + k * 0.03, c: 'thin' })),
  { p: rect(392, 388, 56, 60), d: 3.9 },
  ...[0, 1, 2, 3, 4].map((k) => ({ p: [[392, 398 + k * 10], [448, 398 + k * 10]], d: 4.0 + k * 0.04, c: 'thin' })),
]
const LABELS = [
  { x: 20, y: 38, t: 'Basement', d: 0.2, c: 'lv' }, { x: 60, y: 108, t: 'Bedroom 1', d: 0.8 }, { x: 40, y: 196, t: 'Living', d: 0.9 }, { x: 132, y: 196, t: 'Bath', d: 0.9 },
  { x: 320, y: 38, t: 'First floor', d: 1.4, c: 'lv' }, { x: 348, y: 112, t: 'Hardwood', d: 1.9 }, { x: 452, y: 112, t: 'Paint', d: 2.0 }, { x: 330, y: 70, t: '7 windows', d: 2.1 },
  { x: 550, y: 38, t: 'Second floor', d: 2.4, c: 'lv' }, { x: 566, y: 104, t: 'Carpet', d: 2.8 }, { x: 640, y: 202, t: 'New bath', d: 3.0 },
  { x: 330, y: 260, t: 'Outside: composite deck, 16 by 12 ft', d: 3.4, c: 'lv' },
]
const TALLY = [
  ['Framing', '199 LF', 0.9], ['Wall board', '2,070 SF', 1.4], ['Hardwood', '368 SF', 2.0], ['Windows, full frame', '7', 2.3],
  ['Bathroom, gutted', '8 by 6 ft', 3.0], ['Composite deck', '192 SF', 3.8], ['Crew hours', '885', 4.4],
]
function HeroDrawing() {
  const [n, setN] = useState(0), [t, setT] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setN(142047); setT(99); return }
    let raf, t0 = performance.now()
    const tick = (now) => { const s = (now - t0) / 1000; setT(s); const f = Math.min(1, Math.max(0, (s - 0.3) / 4.4)); setN(Math.round(142047 * (1 - Math.pow(1 - f, 3)))); if (s < 5) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="sm-draw">
      <svg viewBox="0 0 730 470" role="img" aria-label="A three-floor house drawn as plans: the basement, the first floor, the second floor and a deck outside">
        {LINES.map((l, i) => <path key={i} d={P(l.p)} className={'ln ' + (l.c || '')} style={{ '--len': seg(l.p), '--d': l.d + 's' }} />)}
        {LABELS.map((l, i) => <text key={i} x={l.x} y={l.y} className={l.c || ''} style={{ '--d': l.d + 's' }}>{l.t}</text>)}
      </svg>
      <div className="sm-tally" aria-live="off">
        <div><div className="p">${n.toLocaleString('en-US')}</div>
        <div className="k">Sample 3-floor job,<br />priced as it is drawn</div></div>
        <ul>{TALLY.map(([a, b, at]) => <li key={a} className={t >= at ? 'on' : ''}><span>{a}</span><b>{b}</b></li>)}</ul>
      </div>
    </div>
  )
}

/* a recording of the real app; plays only while on screen, and not at all for people who turn motion off */
function Clip({ name, label }) {
  const ref = useRef(null)
  const [reduce] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const v = ref.current; if (!v || reduce || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.35 })
    io.observe(v); return () => io.disconnect()
  }, [reduce])
  return <video ref={ref} src={`/media/${name}.mp4`} poster={`/media/${name}.jpg`} muted loop playsInline preload="metadata" controls={reduce} aria-label={label} />
}

export function SamanaNav({ here }) {
  /* the company first: two divisions, the containers, the quote service; the apps live under their divisions and sign in from one place */
  const cta = here === 'quote' ? <a className="sm-btn go" href="tel:5089168447">Call or text</a>
    : here === 'samana' ? <a className="sm-btn go" href={APP}>Start free</a>
    : here === 'farmmetric' ? <a className="sm-btn go" href={FARM}>Free trial</a>
    : (here === 'ag' || here === 'construction' || here === 'containers') ? <a className="sm-btn go" href="#talk">Talk to us</a> : null
  const tab = (here === 'construction' || here === 'samana' || here === 'quote') ? 'construction' : (here === 'ag' || here === 'farmmetric') ? 'farms' : here === 'containers' ? 'products' : undefined
  return <SiteHeader here={tab} cta={cta} />
}
export function SamanaFoot() {
  return <SiteFoot />
}

const SHEETS = [
  { no: 'A-1', name: 'takeoff', title: 'Draw it once. Every line is priced.', clip: 'Changing the basement length and moving between levels; the price and every division follow.',
    p: 'Put in the sizes the way you measure them. Samana draws the plan to scale and builds the takeoff behind it: every stud, sheet, fixture and hour, each with material, labor and time.',
    li: ['Each level on its own tab: basement, first floor, second floor, outside', 'Prices by division, the way you hire: framing, drywall, electrical, plumbing', 'Guesses are marked until you measure, so nothing hides in a number', 'Profit view, reality check, fit check and a code check on every change'] },
  { no: 'A-2', name: 'layers', title: 'A real drawing set, with the trades on layers.', clip: 'The drawing set opening full screen, turning on electrical, HVAC, plumbing and framing layers.',
    p: 'Open the plan full screen and turn layers on and off: dimensions, framing, board, electrical, HVAC, plumbing, notes. Zoom in, pin a note where the work is.',
    li: ['Every trade sees its own runs on the same sheet', 'Notes stay on the drawing, at the spot they belong', 'Print the set or send it with the work order'] },
  { no: 'A-3', name: 'threed', title: 'Walk the customer through it before you build it.', clip: 'The basement in 3D, turned with the mouse.',
    p: 'The same plan in 3D, finished or as framing. Turn it, show the customer where the bath goes and why the closet is there.',
    li: ['Finished view for the customer, framing view for the crew', 'Floor, wall and trim colors on screen'] },
  { no: 'A-4', name: 'customer', title: 'A packet the customer actually reads.', clip: 'Scrolling the customer quote: work by trade, options, payment schedule and terms.',
    p: 'One click turns the takeoff into a proposal in your name: work by trade in plain words, options priced on their own, a payment schedule tied to the work, terms and what is not included.',
    li: ['Your logo, your prices, your terms', 'Options the customer can add without a new quote', 'Saves as a file or a PDF; the customer never needs a login'] },
  { no: 'A-5', name: 'revs', title: 'Every change is a rev. Everyone is told.', clip: 'Publishing Rev A, making the deck bigger, publishing Rev B, the compare table, then the team portal on the issued rev.',
    p: 'Publish a rev and it is kept exactly as sent, with its costs frozen. Change the job and Samana shows both revs side by side, division by division, up or down. The crew opens the issued rev, not your half-finished edits, and taps Got it when they have seen the change.',
    li: ['Rev A, B, C with what changed and the price change', 'Team portal opens on the latest issued set; the working copy is marked not issued', 'Who has marked the new rev, and who is still on an old one', 'Step-by-step work order with check-offs and notes from the field'] },
  { no: 'A-6', name: 'flow', title: 'Flow: the money, over time.', clip: 'The Flow page: what is due and when, cash by month, and the changes over time.',
    p: 'Flow turns the quote into a calendar: deposit in, materials out, labor out Monday to Friday, what is left. It tracks every rev, so you see the job get bigger or smaller and when.',
    li: ['Cash by month and the most cash you will need', 'Changes over time: each rev, its price and how far it moved', 'Every dollar carries a cost code, ready for the books'] },
]
const PIECES = [
  ['Basement finish', 'Framing, insulation, board or plaster, paint, floors, bath with an ejector pump, egress windows, stairs, electrical and HVAC, laid out room by room.', 'Fit check and code check on the layout'],
  ['Bathroom', 'Gut or remodel; tub with tiled walls, tiled shower or one-piece unit; vanity, toilet, tile floor, fan, lights, paint.', 'Plumbing moves are flagged for review'],
  ['Deck', 'Footings 48 in. deep, posts, ledger or freestanding, joists sized by span, decking, railing and stairs worked out from the height.', 'Railing added on its own at 30 in. up'],
  ['Windows and doors', 'Double-hung, casement, picture; insert or full frame; interior, outside, sliding and storm doors.', 'Old ones out and disposed of'],
  ['Flooring', 'Plank, laminate, hardwood, tile or carpet by room; underlayment, transitions, baseboard.', 'Up to eight rooms a piece'],
  ['Painting and trim', 'Walls, ceilings, trim and doors by room and wall height; baseboard, crown, chair rail and casings.', 'Primer only where it is needed'],
  ['Farms and properties', 'Fence, cameras, power, containers, drying, wells and hoop houses on the real lot line, with Lean planning the season.', 'Built for our own farm sites first'],
]

export default function Samana() {
  useEffect(() => { document.title = 'Samana: takeoffs, quotes and work orders for contractors' }, [])
  return (
    <div className="sm">
      <SamanaNav here="samana" />

      <header className="sm-hero sm-grid">
        <div className="sm-wrap">
          <div>
            <h1>Draw the job. Samana prices every stud.</h1>
            <p className="lede">Samana, from Sattva Technologies, is your own general contractor setup: the takeoff, the drawings, the customer's quote, the crew's work order and the cash, all from one drawing. Built by a licensed Massachusetts construction supervisor, for contractors who do the work.</p>
            <div className="acts"><a className="sm-btn go" href={APP}>Start with a free sample job</a><a className="sm-btn ghost" href="#sheets">See it work</a></div>
            <small>Sign in with Google or your email. Your first company comes with a sample 3-floor job to take apart.</small>
          </div>
          <HeroDrawing />
        </div>
        <div className="sm-tb"><div className="sm-wrap">
          <div>Project<b>Sample job: 3-floor house</b></div>
          <div>Levels<b>Basement, 1st, 2nd, outside</b></div>
          <div>Lines priced<b>100</b></div>
          <div>Time on site<b>56 working days</b></div>
        </div></div>
      </header>

      <section className="sm-arms" aria-labelledby="arms">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="arms">One drawing feeds three arms.</h2>
          <p className="sm-sub">Change a wall and the price, the work order and the cash flow change with it. No copying numbers between spreadsheets.</p>
          <div className="row">
            <div className="sm-arm"><h3>Takeoff</h3><p className="what">Builds the job.</p><ul><li>Plans, levels and pieces of work</li><li>Every material, hour and price</li><li>Quote, drawings and work order</li></ul></div>
            <div className="sm-arm"><h3>Lean</h3><p className="what">Plans the work.</p><ul><li>Steps in order, with the people each needs</li><li>Monday to Friday, unless you record an actual</li><li>For farms: the season from seed to sale</li></ul></div>
            <div className="sm-arm"><h3>Flow</h3><p className="what">Follows the cash.</p><ul><li>What comes in and goes out, by month</li><li>Every rev and how it moved the money</li><li>Cost codes on every dollar</li></ul></div>
          </div>
        </div>
      </section>

      <section className="sm-sheets" id="sheets" aria-label="What Samana does">
        <div className="sm-wrap">
          <h2 className="sm-h2">The drawing set.</h2>
          <p className="sm-sub">Recorded in the real app on the sample job. Nothing here is a mockup.</p>
          {SHEETS.map((s, i) => (
            <article className={'sm-sheet' + (i % 2 ? ' flip' : '')} key={s.no} aria-labelledby={'sh-' + s.no}>
              <div className="vid"><Clip name={s.name} label={s.clip} /></div>
              <div className="txt">
                <div className="body"><h3 id={'sh-' + s.no}>{s.title}</h3><p>{s.p}</p><ul>{s.li.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <div className="block"><div>Samana, sample 3-floor job<b>{['Takeoff', 'Drawing set and layers', '3D', 'Customer packet', 'Revisions and team portal', 'Flow'][i]}</b></div><div className="no">Sheet<b>{s.no}</b></div></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sm-pieces sm-grid" aria-labelledby="pieces">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="pieces">Every part of a job is its own piece.</h2>
          <p className="sm-sub">Two floors and a deck are three pieces on one job, one customer packet, one work order. Mark any piece an option and it is priced on its own.</p>
          <table className="sm-ptab"><tbody>{PIECES.map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="sm-roles" aria-labelledby="roles">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="roles">Everyone sees their part. Nobody sees yours.</h2>
          <p className="sm-sub">Each company's jobs are private to that company. The owner invites people and sets what each one can do.</p>
          <table className="sm-rtab">
            <thead><tr><th scope="col">Level</th><th scope="col">What they do in Samana</th></tr></thead>
            <tbody>
              <tr><th scope="row">Owner</th><td>Everything: jobs, prices, the profit view, who has access.</td></tr>
              <tr><th scope="row">Office</th><td>Builds and edits jobs, publishes revs, sends quotes.</td></tr>
              <tr><th scope="row">Crew</th><td>The team portal on the issued rev: steps, materials, check-offs, notes, Got it on every change.</td></tr>
              <tr><th scope="row">Sub</th><td>Their own trade's steps. Never your prices.</td></tr>
              <tr><th scope="row">Customer</th><td>Their published quote, and a way to ask a question.</td></tr>
              <tr><th scope="row">Reviewer</th><td>The specifications, without the customer's name or your prices.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="sm-next" aria-labelledby="next">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="next">What we are building next.</h2>
          <p className="sm-sub">In this order. Contractors using Samana now get each one as it lands.</p>
          <ol>
            <li><span className="tag">Next</span><h3>Step-by-step new job</h3><p>Answer one question at a time and finish on a priced takeoff.</p></li>
            <li><span className="tag">Then</span><h3>As-built drawings</h3><p>Each step the crew checks off becomes the as-built, with actual dates and field changes.</p></li>
            <li><span className="tag">Then</span><h3>Photos on the plan</h3><p>Pin a photo where it was taken. Lay the drawing over a photo of the wall.</p></li>
            <li><span className="tag">Then</span><h3>X-ray view on Android</h3><p>Point the phone at a wall and see the ducts, pipes and wires that are in the drawing.</p></li>
            <li><span className="tag">Then</span><h3>Takeoff from a print</h3><p>Drop in an engineered PDF set and get the quantities to confirm.</p></li>
          </ol>
        </div>
      </section>

      <section className="sm-plans" aria-labelledby="plans">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="plans">Plans.</h2>
          <p className="sm-sub">The first quote is free. You put in your own labor rates; we never see your customers or your prices unless you share them.</p>
          <div className="sm-ptwo">
            <div className="sm-plan"><h3>The app, monthly</h3><p>Automatic. Residential work.</p><dl>
              <div><dt>Quotes<small>A clear quote for your customer, in your name</small></dt><dd>$10<small>a month</small></dd></div>
              <div><dt>Quotes and materials list<small>Every item and quantity, ready to order</small></dt><dd>$20<small>a month</small></dd></div>
              <div><dt>Quotes, materials and work orders<small>Review recommended; required for structural work, moved plumbing and egress</small></dt><dd>$30<small>a month</small></dd></div>
            </dl></div>
            <div className="sm-plan"><h3>Reviewed by a licensed GC</h3><p>Our time, on top of a plan.</p><dl>
              <div><dt>Review<small>A construction supervisor checks the job before it goes out</small></dt><dd>$25<small>a job</small></dd></div>
              <div><dt>Full job write-up<small>Proposal, drawings, materials list and a work order for your crew</small></dt><dd>$100<small>a job</small></dd></div>
              <div><dt>GC service<small>Permits, supervision and project management, Massachusetts only</small></dt><dd>Estimate</dd></div>
            </dl></div>
          </div>
          <p className="note">Commercial work, three-families and anything beyond an unrestricted construction supervisor license always get a review. Every number is a recommendation the contractor checks; the work order says where it came from.</p>
        </div>
      </section>

      <section className="sm-end sm-grid" aria-labelledby="end">
        <div className="sm-wrap">
          <h2 id="end">Take the sample job apart. Then price your next one.</h2>
          <p>Sign in, and your company starts with a 3-floor sample: basement, two floors and a deck, already priced.</p>
          <div className="acts" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><a className="sm-btn go" href={APP}>Start free</a><Link className="sm-btn ghost" to="/quote">Or have us write your quote</Link></div>
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
