import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, FARM } from './Samana.jsx'
import { FarmmetricPhone } from '../Walkthrough.jsx'
import '../samana.css'

const FEATURES = [
  ['My work', "Today's and this week's jobs, each with the mix or the instructions, where it is, the crew and a timer."],
  ['Unplanned jobs', 'A leak, a broken line, weeds: what was done, where, how long, who helped, with a photo.'],
  ['The season', 'Field prep to close out, each stage with its dates and how many of its jobs are done.'],
  ['Programs', 'IPM sprays, feeding and soil tests on the days you pick, with the product and the rate.'],
  ['Field map', 'Blocks and rows you can tap. Sketch a block in seconds, or bring in the rows drawn in Samana.'],
  ['Harvest and drying', 'Wet weights by lot, room checks day by day, and the dry weight with how much came off.'],
  ['Inventory', 'On hand, deliveries, amounts used on jobs, and a warning when something runs low.'],
  ['Weather', 'The 7-day forecast, the spray window hour by hour, and growing degree days. Spray records keep the wind and temperature at the time.'],
  ['Records and roll-ups', 'Hours by kind of work, planned against actual, and every job, spray and harvest kept as you go, ready when you have to show it.'],
]

export default function Farmmetric() {
  useEffect(() => { document.title = 'Farmmetric: farm compliance and records, free, by Sattva Technologies' }, [])
  return (
    <div className="sm fm">
      <SamanaNav here="farmmetric" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>Farm compliance, and a simple way to enter your data.</h1>
          <p>Farmmetric is a free farm app for the people doing the work. Every job goes on a phone: what to do, where, who is on it and how long it took. Sprays, harvest and drying are logged as they happen, so the records are there when you have to show them. Live API connectors are coming soon.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href={FARM + '/signup'}>Start free</a>
            <a className="sm-btn ghost" href="#samana">How it works with Samana</a>
          </div>
        </div>
      </header>

      <section className="sm-arms" aria-labelledby="phone-h">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="phone-h">The crew's day, on a phone.</h2>
          <p className="sm-sub">Recorded in the real app on a sample farm.</p>
          <div className="st st-embed"><FarmmetricPhone /></div>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="what">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="what">What you enter, and what you get back.</h2>
          <p className="sm-sub">Phones, tablets and desktops, with access set by role. Weights convert between grams, ounces, pounds and kilograms on their own.</p>
          <table className="sm-rtab"><tbody>{FEATURES.map(([a, b]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="sm-pieces sm-grid" id="samana" aria-labelledby="link">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="link">On its own, or connected to Samana.</h2>
          <p className="sm-sub">Farmmetric works by itself for any farm. Farms that plan in Samana's Lean link the two at no extra cost: the plan comes to the crew's phones, and what they do goes back to the plan.</p>
          <table className="sm-ptab"><tbody>
            <tr><th scope="row">Samana builds the farm</th><td>Fields and rows on the real lot line, fence, cameras, power, drying and the budget, priced in Takeoff.</td><td>Construction and capital</td></tr>
            <tr><th scope="row">Lean plans the season</th><td>Planting to sale: lots, harvest and drying dates, with the people each step needs.</td><td>The plan</td></tr>
            <tr><th scope="row">Farmmetric runs it</th><td>Every batch tagged and moved, every harvest weighed, every input and inspection logged, and the compliance records kept current.</td><td>The actuals</td></tr>
            <tr><th scope="row">Flow follows the money</th><td>Harvest weights and actual dates come back to the plan, so the cash by month is real.</td><td>Back to the books</td></tr>
          </tbody></table>
          <p className="sm-sub" style={{ marginTop: 24, marginBottom: 0 }}>The connection is in the works: one sign-in and one record for the farm, from the first fence post to the last harvest.</p>
        </div>
      </section>

      <section className="sm-plans" aria-labelledby="plans">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="plans">Free.</h2>
          <p className="sm-sub">Farmmetric is free to use, with one plan for everyone. A leaner farm is everyone's bottom line, the owner's, the crew's and the buyer's, so the first step costs nothing. Sign up and the farm is yours to set up.</p>
          <div className="sm-ptwo">
            <div className="sm-plan"><dl>
              <div><dt>On the web<small>Sign in from a phone, a tablet or a desktop</small></dt><dd>Free</dd></div>
              <div><dt>On Google Play<small>The app for Android phones</small></dt><dd style={{ fontSize: 18 }}>Coming soon</dd></div>
            </dl></div>
            <div className="sm-plan"><dl>
              <div><dt>Linked to Samana<small>For farms on Samana's Lean plan</small></dt><dd style={{ fontSize: 18 }}>Included</dd></div>
              <div><dt>Live API connectors<small>Your records sent on to the systems you report to, without the upload</small></dt><dd style={{ fontSize: 18 }}>Coming soon</dd></div>
            </dl></div>
          </div>
          <p className="note">Farmmetric is built by Sattva Technologies and offered through JMAKN.</p>
        </div>
      </section>

      <section className="sm-end sm-grid" aria-labelledby="end">
        <div className="sm-wrap">
          <h2 id="end">Built by people who build farms.</h2>
          <p>Sattva Technologies sets farms up, builds them and makes the process lean. Farmmetric is the tool we wanted on site, and we use it ourselves. See if it works for you.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><a className="sm-btn go" href={FARM}>Go to Farmmetric</a><Link className="sm-btn ghost" to="/lean-ag">Lean farming</Link></div>
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
