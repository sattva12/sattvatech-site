import { useState } from 'react'
import { Page, Hero, Sec, Steps, Prices, Spec, End } from '../Kit.jsx'
import './quote.css'
import { Phone } from '../Chrome.jsx'

/* Emails here are sattvatech.com: this is GC work, not app work (Atul, Oct 19 11:45). Only the Samana sign-in is samana.tech.
   CQS, the contractor quoting system (internal name, Atul Oct 19 11:50; "conquo"): the contractor intake page (2026-10-19, Handyman email chat). The trifold's QR code opens it at /contractors;
   /quote and /handyman redirect here (App.jsx). Atul, Oct 19 11:49: never say "handyman" to customers (it reads as
   a put-down); say contractors, small, medium and large. Our look on top (who we are, the service, the menu), the Contractor Quote
   Questionnaire at the bottom. "Join forces" means the contractor owns the job and we help; it is not joining
   our crew. Each submission goes to Formspree, which emails it on. Later it lands in Samana as a quote request. */

const FORM = 'https://formspree.io/f/mbdpkqyj'
/* flip to true when a contractor can sign in to Samana and land on the quote request (Samana app chat) */
const APP_READY = false
const APP_LOGIN = 'https://app.samana.tech/login'

/* the kinds of work, and the questions each one asks: [label, type, options, required] */
/* what they want back, the same menu as the flyer: [value, title, what, price] */
const PACKS = [
  ['First quote (free)', 'First quote', 'Your first job, quoted. Free.', 'Free'],
  ['The quote ($25)', 'The quote', 'A clear quote for your customer, in your name.', '$25'],
  ['The full package ($100)', 'The full package', 'The quote, the materials list and the work order, plus a 1\u2011hour call with our GC.', '$100'],
  ['GC service (estimate)', 'GC service', 'We run the job with you: permits, supervision, project management. Massachusetts.', 'Estimate'],
]
const FLOORS = ['Basement', '1st floor', '2nd floor', '3rd floor', 'Garage', 'Attic']
const YN = ['Yes', 'No', 'Not sure']
const KINDS = {
  Deck: [
    ['Length along the house (ft)', 'text', null, true],
    ['Depth out from the house (ft)', 'text', null, true],
    ['Height of the deck surface (ft-in)', 'text', null, true],
    ['Attached to the house or freestanding', 'pick', ['Attached', 'Freestanding', 'Not sure']],
    ['House wall type (siding, brick, stucco)', 'text'],
    ['Decking', 'pick', ['Pressure-treated', 'Composite', 'Not sure']],
    ['Railing: where and what style', 'text'],
    ['Stairs: how many steps and which side', 'text'],
    ['Ground', 'pick', ['Flat grass', 'Sloped grass', 'Gravel', 'Concrete', 'Not sure']],
    ['Old deck to take down (size if yes)', 'text'],
    ['Anything under or near it (hot tub, gas, AC, dryer vent)', 'text'],
    ['Lighting or power', 'pick', YN],
  ],
  Flooring: [
    ['Which floor', 'pick', FLOORS, true],
    ['Each room: length x width (up to 8 rooms)', 'area', null, true],
    ['New floor type', 'pick', ['Plank (LVP)', 'Laminate', 'Hardwood', 'Tile', 'Carpet', 'Not sure'], true],
    ['What is down now', 'text'],
    ['What is under it (plywood, concrete, not sure)', 'text'],
    ['Soft spots, squeaks or out of level (say where)', 'text'],
    ['Baseboard', 'pick', ['New', 'Keep', 'Not sure']],
    ['Doors to trim (number)', 'text'],
    ['Stairs to cover (number of steps)', 'text'],
    ['Who buys the floor', 'pick', ['You', 'Customer', 'Us', 'Not sure']],
    ['Furniture to move', 'pick', YN],
  ],
  Doors: [
    ['Which floor', 'pick', FLOORS, true],
    ['How many: interior, outside, sliding patio, storm', 'text', null, true],
    ['Same opening or a new opening', 'pick', ['Same opening', 'New opening', 'Not sure']],
    ['Width and height', 'text'],
    ['Style and color (or "customer will pick")', 'text'],
    ['Locks (keyed alike, smart, deadbolt)', 'text'],
    ['Take out the old ones', 'pick', YN],
  ],
  Windows: [
    ['Which floor', 'pick', FLOORS, true],
    ['How many', 'text', null, true],
    ['Same opening or a new opening', 'pick', ['Same opening', 'New opening', 'Not sure']],
    ['Width and height', 'text'],
    ['Type', 'pick', ['Double-hung', 'Slider', 'Casement', 'Picture', 'Not sure']],
    ['Inside trim', 'pick', ['Reuse', 'New', 'Not sure']],
    ['Outside siding type', 'text'],
    ['Egress window in a bedroom', 'pick', YN],
  ],
  Bathroom: [
    ['Which floor', 'pick', FLOORS, true],
    ['Length, width and ceiling height', 'text', null, true],
    ['New bathroom or remodel', 'pick', ['New', 'Remodel'], true],
    ['Fixtures staying where they are or moving', 'pick', ['Staying', 'Moving', 'Not sure']],
    ['Shower, tub or tub/shower; prefab or tiled', 'text'],
    ['Vanity width and top', 'text'],
    ['Toilet', 'pick', ['New', 'Reuse', 'Not sure']],
    ['Floor', 'text'],
    ['Walls (tile height, paint)', 'text'],
    ['Exhaust fan vented outside', 'pick', YN],
    ['Lights and outlets', 'text'],
    ['Water damage, soft floor or mold', 'pick', YN],
    ['Who picks the fixtures and tile', 'pick', ['You', 'Customer', 'Us', 'Not sure']],
  ],
  'Basement finish': [
    ['Overall length and width', 'text', null, true],
    ['Ceiling height, slab to joists', 'text', null, true],
    ['Stairs: where, how wide, which way they run', 'text'],
    ['Rooms wanted', 'text'],
    ['Water now or in the past', 'pick', YN],
    ['Bath drain already in the slab', 'pick', YN],
    ['Below the sewer line (needs a pump)', 'pick', YN],
    ['Heat', 'pick', ['Ducts', 'Mini splits', 'Not sure']],
    ['Windows and egress', 'text'],
    ['Ceiling', 'pick', ['Drywall', 'Drop ceiling', 'Not sure']],
    ['Things in the way (poles, ducts, low pipes)', 'text'],
  ],
  'Room finish': [
    ['Which floor', 'pick', FLOORS, true],
    ['Room length, width and ceiling height', 'text', null, true],
    ['Work needed', 'pick', ['Framing, drywall and paint', 'Drywall and paint', 'Paint only', 'Not sure']],
    ['Windows, doors or closets in the room', 'text'],
    ['Things in the way (ducts, pipes, wiring)', 'text'],
  ],
  'Something else': [
    ['What is the work', 'area', null, true],
    ['Sizes and quantities', 'text'],
  ],
}

function Field({ name, label, type = 'text', options, required, hint }) {
  const t = <span>{label}{required && <em> required</em>}{hint && <small>{hint}</small>}</span>
  if (type === 'pick') return (
    <label>{t}
      <select name={name} required={required} defaultValue=""><option value="" disabled>Choose</option>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  )
  if (type === 'area') return <label className="wide">{t}<textarea name={name} rows="3" required={required} /></label>
  return <label>{t}<input name={name} type={type} required={required} /></label>
}

function Job({ n, kind, onRemove }) {
  const p = `Work ${n} (${kind}): `
  return (
    <fieldset className="qx-job">
      <legend><b>{n}</b>{kind}<button type="button" onClick={onRemove} aria-label={'Remove ' + kind}>Remove</button></legend>
      <input type="hidden" name={`Work ${n}`} value={kind} />
      <div className="qx-grid">
        {KINDS[kind].map(([label, type, options, req]) => <Field key={label} name={p + label} label={label} type={type} options={options} required={req} />)}
        <Field name={p + 'In the price, or an option the customer may add later'} label="In the price, or an option the customer may add later" type="pick" options={['In the price', 'Option for later', 'Not sure']} />
      </div>
    </fieldset>
  )
}

function Intake() {
  const [jobs, setJobs] = useState([])
  const [status, setStatus] = useState('')
  const [ref] = useState(() => 'CQS-' + new Date().toISOString().slice(5, 10).replace('-', '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase())
  const add = (kind) => setJobs((j) => [...j, { kind, id: Date.now() + Math.random() }])

  async function send(e) {
    e.preventDefault()
    if (!jobs.length) { setStatus('pick'); return }
    setStatus('sending')
    try {
      const res = await fetch(FORM, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) })
      if (res.ok) { setStatus('sent'); window.scrollTo({ top: document.getElementById('form').offsetTop - 40 }) } else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div className="qx-done" role="status">
      <h3>Got it. Your job number is {ref}.</h3>
      <p>Now text the photos (at least 3, every area), your sketch and a voice note of up to 2 minutes to <Phone sms label="our phone (tap to show)" />, or email them to <a href={'mailto:info@sattvatech.com?subject=' + ref}>info@sattvatech.com</a>, with {ref} in the message.</p>
      <p>We will be in touch within one business day, before your quote date.</p>
    </div>
  )

  return (
    <form className="qx-form" onSubmit={send}>
      <input type="hidden" name="_subject" value={'Contractor quote request ' + ref} />
      <input type="hidden" name="topic" value="Contractor quote request" />
      <input type="hidden" name="Job number" value={ref} />
      <input type="text" name="_gotcha" className="qx-trap" tabIndex="-1" autoComplete="off" aria-hidden="true" />

      <section>
        <h3><b>1</b>You and the job</h3>
        <div className="qx-grid">
          <Field name="Name" label="Your name" required />
          <Field name="Company" label="Company" required />
          <Field name="Phone" label="Phone" type="tel" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="License or registration" label="License or registration number" />
          <Field name="Job town and state" label="Job town and state" required hint="Town only. Never the customer's address." />
          <Field name="House year built" label="Year the house was built" hint="Before 1978 means we plan for lead paint." />
          <Field name="Floors in the house" label="Floors in the house" />
          <Field name="Occupied during the work" label="Lived in during the work" type="pick" options={YN} />
          <Field name="Permit" label="Who pulls the permit" type="pick" options={['You', 'Us', 'Not sure']} />
          <Field name="Work dates" label="When the work needs to happen" hint="A date, or 'flexible'." />
          <Field name="Quote needed by" label="When you need the quote back" type="date" required />
          <Field name="Anything we should know" label="Anything we should know (access, pets, parking, hours)" type="area" />
        </div>
      </section>

      <section>
        <h3><b>2</b>Pick the work</h3>
        <p className="qx-p">Add each kind of work on this job. You can add the same kind more than once, like two bathrooms.</p>
        <div className="qx-picks">{Object.keys(KINDS).map((k) => <button type="button" key={k} onClick={() => add(k)}>+ {k}</button>)}</div>
        {status === 'pick' && <p className="qx-err">Add at least one kind of work.</p>}
        {jobs.map((j, i) => <Job key={j.id} n={i + 1} kind={j.kind} onRemove={() => setJobs((all) => all.filter((x) => x.id !== j.id))} />)}
      </section>

      <section>
        <h3><b>3</b>Tell us in your words</h3>
        <div className="qx-grid">
          <Field name="Notes" type="area" label="What the customer wants and why now; what worries you; the one thing you are not sure how to price; anything about the customer (timing, how picky)." />
        </div>
        <p className="qx-p">Photos, a sketch with measurements and a voice note of up to 2 minutes: once you send this, we give you a job number and you text or email them to us.</p>
      </section>

      <section>
        <h3><b>4</b>What you want back</h3>
        <div className="qx-packs">
          {PACKS.map(([v, t, w, p], i) => (
            <label key={v} className="qx-pack">
              <input type="radio" name="Package" value={v} required defaultChecked={i === 0} />
              <span><b>{t}</b><small>{w}</small></span>
              <em>{p}</em>
            </label>
          ))}
        </div>
        <p className="qx-p" style={{ marginTop: 14 }}>Your first quote is free. After that you pay when the quote is sent back to you; nothing is charged on this form.</p>
      </section>

      <div className="qx-send">
        <p className="qx-promise">We check the specifications so your quote is complete and your job is organized. We never see your customer or your prices unless you send them to us. Anything not marked required can be answered "not sure".</p>
        <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending' : 'Send the job'}</button>
        {status === 'error' && <p className="qx-err">That did not send. Call or text us (<Phone />), or email info@sattvatech.com.</p>}
      </div>
    </form>
  )
}

export default function Quote() {
  return (
    <Page here="construction" title="Quotes for contractors: Sattva Technologies">
      <Hero c="construction" kicker="For Massachusetts contractors, small, medium and large" title="Quote more. Win more jobs."
        lede="Send us the job. We draw it, measure it and price every material and step, and it goes out in your name at your rates. Your first quote is free."
        acts={[['#form', 'Send us a job', 'go'], ['phone', 'Call or text']]}
        aside={<div className="sx-sheet"><div className="sx-sheet-dw sx-sheet-img"><img src="/media/customer.jpg" alt="A sample quote: the drawing beside every line, priced, with the total" width="1280" height="800" /></div><div className="sx-sheet-tb"><b>A quote, as your customer sees it</b><span>Drawn</span><span>Every line priced</span></div></div>}
        tb={[['First quote', 'Free'], ['In your name', 'Your logo on top'], ['Your customer', 'Stays yours'], ['Licensed', 'MA CSL CS-122574 · HIC 218120']]} />

      <Sec id="who" title="Who we are." sub="Sattva Technologies is a licensed Massachusetts builder. We run our own jobs with Samana, the software we built to draw, price and organize construction work, and we put it to work for contractors of every size, from a one-person outfit to a full company.">
        <div className="sx-two">
          <div>
            <h3 className="sx-h3">Join forces</h3>
            <p className="sx-p">You own the job. We back you up. You keep the customer, the relationship and the profit; we do the paperwork and step in when you ask. This is not joining our crew; it is us helping your business.</p>
          </div>
          <Spec rows={[
            ['Your quotes', 'Clear, complete and in your name, so you can send more of them.'],
            ['Your customer', 'Stays yours. We never contact them.'],
            ['Overflow', 'Too much work, or a job past what you take on alone? We can help run it.'],
            ['A licensed GC', 'Permits, supervision and project management when the job needs it.'],
          ]} />
        </div>
      </Sec>

      <Sec id="how" tone="alt" title="How it works.">
        <Steps steps={[
          ['Fill out the short form', 'The job, the sizes and what the customer wants. Then text us the photos.'],
          ['We draw and measure', 'Every material, labor hour and step, checked against the specifications.'],
          ['You set your rates', 'Your labor rates and your markup. We never see your prices unless you send them.'],
          ['It goes out as yours', 'Your name and logo on top. You stay in front of your customer.'],
        ]} />
      </Sec>

      <Sec id="menu" title="Pick what you need.">
        <Prices rows={[
          ['First quote', 'Your first job, quoted, to see how it works', 'Free'],
          ['The quote', 'A clear quote for your customer, in your name', '$25', 'a job'],
          ['The full package', 'The quote, the materials list and the work order, with a 1-hour call', '$100', 'a job'],
          ['GC service', 'Permits, supervision and project management, Massachusetts only', 'Estimate'],
        ]} foot="You pay when the quote is sent back to you." />
      </Sec>

      <Sec id="form" tone="alt" title="Send us a job." sub="About ten minutes. Never the customer's name, address or budget, and never your prices.">
        <div className="qx-ways">
          <div>
            <b>Have a Samana login?</b>
            <p>Sign in and send the job from the app. Your answers and photos stay with the job.</p>
            {APP_READY ? <a className="qx-way-go" href={APP_LOGIN}>Sign in to Samana</a> : <span className="qx-soon">Coming soon</span>}
          </div>
          <div>
            <b>Rather use paper?</b>
            <p>Print the questionnaire, fill it out on site, then text us a photo of each page.</p>
            <a className="qx-way-go" href="/contractor-questionnaire.pdf">Print the questionnaire (PDF)</a>
          </div>
        </div>
        <Intake />
      </Sec>

      <End title="Rather talk it through?" acts={[['phone', 'Call or text', 'ink'], ['mailto:info@sattvatech.com?subject=Contractor%20quote', 'Email info@sattvatech.com']]}>If a job needs more than your license or your crew can cover this week, we will say so, and we can run it as the GC.</End>
    </Page>
  )
}
