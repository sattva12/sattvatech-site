import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, FARM } from './Samana.jsx'
import '../samana.css'

const FEATURES = [
  ['Metrc Dashboard', 'A live view of veg, flower and immature plants against the license.'],
  ['Metrc Compliance', 'Plant tracking, location changes and state reporting without the manual upload.'],
  ['Location Changes', 'Scan tags and move batches between rooms and zones in seconds.'],
  ['Harvest Tracking', 'Wet and dry weights, waste, bags and bins for every harvest.'],
  ['Kill Logging', 'Plant and clone kills with method, medium and reason.'],
  ['Plant Inspections', 'Photo-documented inspections with issues tracked to resolution.'],
  ['Maintenance Logs', 'Equipment tickets opened and closed with photos.'],
  ['Feed & Foliar', 'Every nutrient input and foliar application, logged.'],
  ['Inventory Control', 'Supplies, usage and low-stock alerts across the facility.'],
]

export default function Farmmetric() {
  useEffect(() => { document.title = 'Farmmetric: crop compliance for licensed growers, by Sattva Technologies' }, [])
  return (
    <div className="sm fm">
      <SamanaNav here="farmmetric" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>Every plant on the books, without the spreadsheet.</h1>
          <p>Farmmetric is crop compliance software for licensed cannabis growers, from 10 plants in a greenhouse to 10,000 across a field. Tag scans, moves, harvests and kills go to Metrc from your phone, and the dashboard shows where every plant stands.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href={FARM}>Start the 30-day free trial</a>
            <a className="sm-btn ghost" href="#samana">How it works with Samana</a>
          </div>
        </div>
      </header>

      <section className="sm-arms" aria-labelledby="what">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="what">What a grower does in Farmmetric.</h2>
          <p className="sm-sub">Phones, tablets and desktops, with access set by role. Weights convert between grams, ounces, pounds and kilograms on their own.</p>
          <table className="sm-rtab"><tbody>{FEATURES.map(([a, b]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="sm-pieces sm-grid" id="samana" aria-labelledby="link">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="link">On its own, or connected to Samana.</h2>
          <p className="sm-sub">Farmmetric works by itself for any licensed grower. When the farm was built in Samana, the two share what they know, so nobody types the farm in twice.</p>
          <table className="sm-ptab"><tbody>
            <tr><th scope="row">Samana builds the farm</th><td>Fields and rows on the real lot line, fence, cameras, power, drying and the budget, priced in Takeoff.</td><td>Construction and capital</td></tr>
            <tr><th scope="row">Lean plans the season</th><td>Seed to sale: planting, lots, harvest and drying dates, with the people each step needs.</td><td>The plan</td></tr>
            <tr><th scope="row">Farmmetric runs it</th><td>Every plant tagged and moved, every harvest weighed, every input and inspection logged, and Metrc kept current.</td><td>The actuals</td></tr>
            <tr><th scope="row">Flow follows the money</th><td>Harvest weights and actual dates come back to the plan, so the cash by month is real.</td><td>Back to the books</td></tr>
          </tbody></table>
          <p className="sm-sub" style={{ marginTop: 24, marginBottom: 0 }}>The connection is in the works: one sign-in and one record for the farm, from the first fence post to the last harvest.</p>
        </div>
      </section>

      <section className="sm-plans" aria-labelledby="plans">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="plans">Plans, per license.</h2>
          <p className="sm-sub">Each plan includes one login; more people are $10 a month each. Every plan starts with a 30-day free trial and includes weather, daylight and a farm log.</p>
          <div className="sm-ptwo">
            <div className="sm-plan"><dl>
              <div><dt>Basic<small>Metrc Dashboard, clone and plant kills, CSV export and uploads, location changes</small></dt><dd>$10<small>a month</small></dd></div>
              <div><dt>Live<small>Adds Metrc sync, clone creation, transplants and harvest</small></dt><dd>$50<small>a month</small></dd></div>
            </dl></div>
            <div className="sm-plan"><dl>
              <div><dt>Operations, coming soon<small>Adds inspections, maintenance, feed and foliar, inventory, job scheduling and a grow dashboard</small></dt><dd>$100<small>a month</small></dd></div>
              <div><dt>More than one license<small>Ask about a multi-license price</small></dt><dd><a href="mailto:apatel@sattvatech.com?subject=Farmmetric%20multi-license" style={{ fontSize: 18 }}>Ask</a></dd></div>
            </dl></div>
          </div>
          <p className="note">Farmmetric is built by Sattva Technologies and offered to licensed operators through JMAKN.</p>
        </div>
      </section>

      <section className="sm-end sm-grid" aria-labelledby="end">
        <div className="sm-wrap">
          <h2 id="end">Built by people who build farms.</h2>
          <p>Sattva Technologies plans and builds licensed farms and runs them lean. Farmmetric is the tool we wanted on site, and we use it every day. See if it works for you.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><a className="sm-btn go" href={FARM}>Go to Farmmetric</a><Link className="sm-btn ghost" to="/lean-ag">Lean agriculture</Link></div>
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
