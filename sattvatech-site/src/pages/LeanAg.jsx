import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, FARM } from './Samana.jsx'
import ContactForm from './ContactForm.jsx'
import '../samana.css'

export default function LeanAg() {
  useEffect(() => { document.title = 'Lean farming: Sattva Technologies' }, [])
  return (
    <div className="sm fm">
      <SamanaNav here="ag" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>We make the farm's process lean.</h1>
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
          <p className="sm-sub">Nothing is grown until the place is built and paid for. After that, every day a plan slips costs labor and pushes the sale. So we work in this order.</p>
          <ol>
            <li><h3>Build it</h3><p>Fields, fence, power and drying, priced and dated before the first post goes in.</p></li>
            <li><h3>Plan the season</h3><p>Planting to sale in stages, with the people, inputs and hours each step needs, Monday to Friday.</p></li>
            <li><h3>Run it on data</h3><p>The crew gets the day's jobs; every move, feed, spray, loss and harvest is logged as it happens.</p></li>
            <li><h3>Follow the cash</h3><p>Plan against actual, by month: where time went, what it cost, when the crop can sell.</p></li>
          </ol>
        </div>
      </section>

      <section className="sm-pieces sm-grid" aria-labelledby="what">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="what">Where lean thinking pays on a farm.</h2>
          <p className="sm-sub">Less waste, fewer hours, and plants and pounds that match the plan.</p>
          <table className="sm-ptab"><tbody>
            <tr><th scope="row">The season plan</th><td>Stages from planting to the final checks, lots that follow the rows, harvest and drying sized to what the farm can actually dry.</td><td>Lean</td></tr>
            <tr><th scope="row">Process and IPM</th><td>Feed, foliar and IPM schedules with product and rate, inspections with photos, findings that put a step on hold until they are handled.</td><td>Farmmetric</td></tr>
            <tr><th scope="row">Labor</th><td>The farm manager assigns the day's jobs; the crew checks them off with hours and amounts used, so labor is measured, not guessed.</td><td>Team app</td></tr>
            <tr><th scope="row">Harvest and drying</th><td>Wet and dry weights, waste, bags and bins by lot, and the pounds per plant against plan.</td><td>Farmmetric</td></tr>
            <tr><th scope="row">Compliance</th><td>Records kept as the crew works and exported as a file today. Live API connectors are coming soon.</td><td>Farmmetric</td></tr>
            <tr><th scope="row">The money</th><td>Capital, running costs and sales timing by month, with every rev of the plan and how it moved.</td><td>Flow</td></tr>
          </tbody></table>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="box">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="box">Drying, power and storage containers.</h2>
          <p className="sm-sub">We build drying rooms and power and storage rooms in insulated 40 ft containers on your site, and sell the full design if you would rather build it yourself.</p>
          <Link className="sm-btn go" to="/containers">See the containers</Link>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="us">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="us">It works for us. See if it works for you.</h2>
          <p className="sm-sub">We run our own farm work on <Link to="/farmmetric" style={{ color: 'inherit' }}>Farmmetric</Link>, our farm app, with Samana's Lean and Flow behind it. Farmmetric is free.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href={FARM}>Use Farmmetric free</a>
            <Link className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} to="/samana">See Samana</Link>
          </div>
        </div>
      </section>

      <section className="sm-plans" id="talk" aria-labelledby="talkh" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <h2 className="sm-h2" id="talkh">Talk about your farm.</h2>
          <ContactForm topic="Lean farming" prompt="Your farm, its size, and what is slowing you down" />
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
