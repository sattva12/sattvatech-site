import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, FARM } from './Samana.jsx'
import ContactForm from './ContactForm.jsx'
import '../samana.css'

export default function LeanAg() {
  useEffect(() => { document.title = 'Lean agriculture: Sattva Technologies' }, [])
  return (
    <div className="sm fm">
      <SamanaNav here="ag" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>Lean production for licensed farms.</h1>
          <p>We plan a farm the way a good shop plans a line: every stage, every input and every hour, against the date it has to hit. Then we run it on data, with Farmmetric in the field and Samana's Lean and Flow behind it.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href="#talk">Talk about your farm</a>
            <Link className="sm-btn ghost" to="/farmmetric">See Farmmetric</Link>
          </div>
        </div>
      </header>

      <section className="sq-steps" aria-labelledby="how">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="how">Everything flows to cash.</h2>
          <p className="sm-sub">Nothing is grown until the place is built and the license is paid. After that, every day a plan slips costs labor and pushes the sale. So we work in this order.</p>
          <ol>
            <li><h3>Build it</h3><p>Fields, fence, power, drying and the license, priced and dated before the first post goes in.</p></li>
            <li><h3>Plan the season</h3><p>Seed to sale in stages, with the people, inputs and hours each step needs, Monday to Friday.</p></li>
            <li><h3>Run it on data</h3><p>The crew gets the day's jobs; every move, feed, spray, kill and harvest is logged as it happens.</p></li>
            <li><h3>Follow the cash</h3><p>Plan against actual, by month: where time went, what it cost, when the crop can sell.</p></li>
          </ol>
        </div>
      </section>

      <section className="sm-pieces sm-grid" aria-labelledby="what">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="what">Where lean thinking pays on a farm.</h2>
          <p className="sm-sub">Less waste, fewer hours, and plants and pounds that match the plan.</p>
          <table className="sm-ptab"><tbody>
            <tr><th scope="row">The season plan</th><td>Stages from seed pop to compliance, lots that follow the rows, harvest and drying sized to what the farm can actually dry.</td><td>Lean</td></tr>
            <tr><th scope="row">Process and IPM</th><td>Feed, foliar and IPM schedules with product and rate, inspections with photos, findings that put a step on hold until they are handled.</td><td>Farmmetric</td></tr>
            <tr><th scope="row">Labor</th><td>The master grower assigns the day's jobs; the crew checks them off with hours and amounts used, so labor is measured, not guessed.</td><td>Team app</td></tr>
            <tr><th scope="row">Harvest and drying</th><td>Wet and dry weights, waste, bags and bins by lot, and the pounds per plant against plan.</td><td>Farmmetric</td></tr>
            <tr><th scope="row">Compliance</th><td>Plant counts kept current with Metrc by CSV today; live sync through T3 on request.</td><td>Farmmetric</td></tr>
            <tr><th scope="row">The money</th><td>Capital, running costs and sales timing by month, with every rev of the plan and how it moved.</td><td>Flow</td></tr>
          </tbody></table>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="us">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="us">It works for us. See if it works for you.</h2>
          <p className="sm-sub">We run our own farm work on these tools. Farmmetric starts with a 30-day free trial; Samana starts with a sample job you can take apart.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href={FARM}>Try Farmmetric free for 30 days</a>
            <Link className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} to="/samana">See Samana</Link>
          </div>
        </div>
      </section>

      <section className="sm-plans" id="talk" aria-labelledby="talkh" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <h2 className="sm-h2" id="talkh">Talk about your farm.</h2>
          <ContactForm topic="Lean agriculture" prompt="Your license, your canopy, and what is slowing you down" />
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
