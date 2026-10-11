import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { APP, FARM } from './Chrome.jsx'
import './site.css'

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

export function Clip({ name, label }) {
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

export function Platform() {
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


/* ---------- Farmmetric on a phone ---------- */
export function FarmmetricPhone() {
  return (
    <div className="st-two st-app st-green">
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
        <div className="st-panel-f"><a className="st-btn primary" href={FARM}>Try Farmmetric free for 30 days</a></div>
      </div>
    </div>
  )
}

/* ---------- Sai, the helper inside the app ---------- */
const SAI = [
  ['Tell it what you learned', 'A quote, a count, a rate or a time. Sai proposes the change and shows what it does to the price and the days.'],
  ['You approve every change', 'Apply, undo or skip. Sai never changes a number on its own and never makes one up.'],
  ['Ask it about the job', 'It answers from the job\u2019s own numbers.'],
  ['Give it your photos', 'It says what each one shows, asks where it belongs, and files it under the right step.'],
  ['Ask it where things are', 'It knows the app, and opens the page for you.'],
  ['On a farm job', 'It walks you through the open questions and files your answers.'],
]
export function Sai() {
  return (
    <div className="st-two st-wide">
      <div className="st-sheet">
        <div className="st-sheet-top"><span className="st-lvl">Example</span><b>Sai</b></div>
        <div className="st-stage">
          <div className="st-sai" role="img" aria-label="An example: the builder tells Sai the electrician's quote came in at $9,800. Sai finds the electrical rough-in line and proposes changing it from $8,400 to $9,800, which adds $1,400 to the price and leaves the days as they are, with Apply and Skip buttons. Then the builder sends three photos, and Sai says the first shows the panel wired and asks whether it belongs to the electrical rough-in step.">
            <div className="st-sai-h"><b>Sai</b><span>Sample house</span></div>
            <p className="me">The electrician’s quote came in at $9,800.</p>
            <p className="it">That is the Electrical rough-in line. Here is the change.</p>
            <div className="st-sai-c">
              <div><b>Electrical rough-in</b><span>$8,400 to $9,800</span></div>
              <dl><div><dt>Price</dt><dd>+$1,400</dd></div><div><dt>Days</dt><dd>No change</dd></div></dl>
              <div className="bt"><i className="go">Apply</i><i>Skip</i></div>
            </div>
            <p className="me">Here are 3 photos from today.</p>
            <p className="it">The first shows the panel wired. Does it go under Electrical rough-in?</p>
            <div className="st-sai-c"><div className="bt"><i className="go">File it</i><i>Pick another step</i></div></div>
          </div>
        </div>
        <div className="st-tb"><b>Sai proposes. You decide.</b><span>An example, not a real job</span></div>
      </div>
      <div className="st-panel">
        <div className="st-panel-h"><h2>What Sai does</h2></div>
        <div className="st-total"><h4>An AI helper that knows the job and the app.</h4><p>Talk to it the way you would talk to a good assistant on site. It does the typing and keeps the project book in order.</p></div>
        <div className="st-rows st-rtop st-rooms">{SAI.map(([a, b]) => <div className="st-row" key={a}><span>{a}</span><b>{b}</b></div>)}</div>
      </div>
    </div>
  )
}
