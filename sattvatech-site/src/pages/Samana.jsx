import { useEffect, useRef, useState } from 'react'
import { SiteHeader, SiteFoot, APP, FARM } from '../Chrome.jsx'
import Proof from '../Proof.jsx'
import { Platform, Sai } from '../Walkthrough.jsx'
import '../samana.css'
import { Page, Hero, Sec, Spec, Prices, End } from '../Kit.jsx'

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
    : here === 'farmmetric' ? <a className="sm-btn go" href={FARM}>Use it free</a>
    : (here === 'ag' || here === 'construction' || here === 'containers') ? <a className="sm-btn go" href="#talk">Talk to us</a> : null
  const tab = (here === 'construction' || here === 'quote') ? 'construction' : here === 'ag' ? 'farms' : (here === 'containers' || here === 'samana' || here === 'farmmetric' || here === 'apps') ? 'products' : undefined
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
  return (
    <Page here="products" title="Samana: From input to output, by Sattva Technologies">
      <Hero kicker={<img className="sx-kicker-logo" src="/brand/samana-logo-wide-dark.svg" alt="Samana, EMCRP Software" />} title="From input to output."
        lede="For businesses that build, grow and make things. Samana takes a job from the first measurement to the last dollar. Takeoff counts every piece and prices it. Lean turns it into steps with dates, crews and materials, and tells you when to order. Flow shows the cash by month. We built it to run our own construction and farm work. It runs any operation that has steps, people and materials."
        acts={[[APP, 'Start with a free sample job', 'go'], ['https://samana.tech', 'Visit samana.tech'], ['#sheets', 'See it work']]}
        aside={<HeroDrawing />}
        tb={[['Project', 'Sample job: 3-floor house'], ['Levels', 'Basement, 1st, 2nd, outside'], ['Lines priced', '100'], ['Time on site', '56 working days']]} />

      <Sec id="arms" title="One drawing feeds three arms." sub="Change a wall and the price, the work order and the cash flow change with it. No copying numbers between spreadsheets.">
        <div className="sx-arms3">
          <div><h3>Takeoff</h3><p className="what">Buildout.</p><ul><li>Plans, levels and pieces of work</li><li>Every material, hour and price</li><li>Quote, drawings and work order</li></ul></div>
          <div><h3>Lean</h3><p className="what">Lean manufacturing.</p><ul><li>Steps in order, with the people each needs</li><li>Monday to Friday, unless you record an actual</li><li>A build, a season or a production run, stage by stage</li></ul></div>
          <div><h3>Flow</h3><p className="what">Cost analysis and budgeting.</p><ul><li>What comes in and goes out, by month</li><li>Every rev and how it moved the money</li><li>Cost codes on every dollar</li></ul></div>
        </div>
      </Sec>

      <Sec id="proof" tone="alt" title="One platform, three kinds of work." sub="Construction and farms are where we built it and proved it. A production run reads the same way: the same three views, whatever the job is.">
        <div className="st st-embed"><Proof /></div>
      </Sec>

      <Sec id="run" title="See it run." sub="Recorded in the real app: the sample house through Takeoff and Flow, and a sample farm through Lean and Farmmetric.">
        <div className="st st-embed"><Platform /></div>
      </Sec>

      <Sec id="sai" tone="alt" title="Sai, the helper that guides you through it." sub="Sai is the AI helper built into Samana. Tell it what changed on the job, or hand it your photos, and it works out where that goes. Sai is new: we are using it on our own jobs first, and it is not in the public sign-in yet.">
        <div className="st st-embed"><Sai /></div>
      </Sec>

      <Sec id="sheets" title="The drawing set." sub="Recorded in the real app on the sample job. Nothing here is a mockup.">
        <div className="sx-sheets">
          {SHEETS.map((x, i) => (
            <article className={'sx-shot' + (i % 2 ? ' flip' : '')} key={x.no} aria-labelledby={'sh-' + x.no}>
              <div className="sx-vid"><Clip name={x.name} label={x.clip} /></div>
              <div>
                <h3 id={'sh-' + x.no}>{x.title}</h3>
                <p>{x.p}</p>
                <ul>{x.li.map((y) => <li key={y}>{y}</li>)}</ul>
                <div className="sx-shot-tb"><div>Samana, sample 3-floor job<b>{['Takeoff', 'Drawing set and layers', '3D', 'Customer packet', 'Revisions and team portal', 'Flow'][i]}</b></div><div>Sheet<b>{x.no}</b></div></div>
              </div>
            </article>
          ))}
        </div>
      </Sec>

      <Sec id="pieces" tone="alt" title="Every part of a job is its own piece." sub="Two floors and a deck are three pieces on one job, one customer packet, one work order. Mark any piece an option and it is priced on its own.">
        <Spec rows={PIECES} />
      </Sec>

      <Sec id="roles" title="Everyone sees their part. Nobody sees yours." sub="Each company's jobs are private to that company. The owner invites people and sets what each one can do.">
        <Spec rows={[
          ['Owner', 'Everything: jobs, prices, the profit view, who has access.'],
          ['Office', 'Builds and edits jobs, publishes revs, sends quotes.'],
          ['Crew', 'The team portal on the issued rev: steps, materials, check-offs, notes, Got it on every change.'],
          ['Sub', "Their own trade's steps. Never your prices."],
          ['Customer', 'Their published quote, and a way to ask a question.'],
          ['Reviewer', "The specifications, without the customer's name or your prices."],
        ]} />
      </Sec>

      <Sec id="next" tone="alt" title="What we are building next." sub="In this order. Contractors using Samana now get each one as it lands.">
        <ol className="sx-next">
          {[['Next', 'Step-by-step new job', 'Answer one question at a time and finish on a priced takeoff.'],
            ['Then', 'As-built drawings', 'Each step the crew checks off becomes the as-built, with actual dates and field changes.'],
            ['Then', 'Photos on the plan', 'Pin a photo where it was taken. Lay the drawing over a photo of the wall.'],
            ['Then', 'X-ray view on Android', 'Point the phone at a wall and see the ducts, pipes and wires that are in the drawing.'],
            ['Then', 'Takeoff from a print', 'Drop in an engineered PDF set and get the quantities to confirm.']].map(([t, h, p]) => <li key={h}><span>{t}</span><b>{h}</b><p>{p}</p></li>)}
        </ol>
      </Sec>

      <Sec id="plans" title="Plans." sub="Some of the simplest ways to make money are saving it: less waste, less waiting, nothing done twice. A leaner process is everyone's bottom line, so start free with one job and see your own numbers before you pay anything. When it pays for itself, pick a plan; each is named for the part of Samana it opens. You put in your own labor rates; we never see your customers or your prices unless you share them.">
        <div className="sx-two">
          <Prices title="Samana, monthly" sub="Every plan has the sample job to compare with." rows={[
            ['Free', 'Takeoff for one job, and Farmmetric', '$0'],
            ['Takeoff', 'Drawn and priced quotes, 5 jobs', '$10', 'a month'],
            ['Flow', 'Adds the materials list, work orders, Flow and the team portal for 5 people; 5 jobs', '$20', 'a month'],
            ['Lean', 'Everything: Lean and all of Flow, 10 jobs, one business unit', '$30', 'a month'],
          ]} foot="More business units are $10 a month each. Past 10 jobs, $5 a job. Buying is inside the app: sign in, or start free, then pick the plan in Settings. You pay by card through Stripe and can cancel any time."
            acts={[[APP, 'Start free', 'ink'], [APP + '/settings', 'Buy a plan']]} />
          <Prices title="Reviewed by a licensed GC" sub="Our time, on top of a plan." rows={[
            ['Review', 'A construction supervisor checks the job before it goes out', '$25', 'a job'],
            ['Full job write-up', 'Proposal, drawings, materials list and a work order for your crew', '$100', 'a job'],
            ['GC service', 'Permits, supervision and project management, Massachusetts only', 'Estimate'],
          ]} />
        </div>
        <p className="sx-note">Commercial work, three-families and anything beyond an unrestricted construction supervisor license always get a review. Every number is a recommendation the contractor checks; the work order says where it came from.</p>
      </Sec>

      <End title="Take the sample job apart. Then price your next one." acts={[[APP, 'Start free', 'ink'], ['/quote', 'Or have us write your quote']]}>Sign in, and your company starts with a 3-floor sample: basement, two floors and a deck, already priced.</End>
    </Page>
  )
}
