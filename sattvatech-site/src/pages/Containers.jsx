import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, APP } from './Samana.jsx'
import ContactForm from './ContactForm.jsx'
import '../samana.css'

export default function Containers() {
  useEffect(() => { document.title = 'Drying and extraction containers: Sattva Technologies' }, [])
  return (
    <div className="sm fm">
      <SamanaNav here="ag" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>Drying and extraction rooms, built in a container and shipped anywhere.</h1>
          <p>We design and build 40 ft containers set up for drying or for cold ethanol extraction: insulated, wired, cooled and dehumidified, ready to set on a pad and connect. We ship them, build them on your site, or sell you the design.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href="#talk">Price a container</a>
            <Link className="sm-btn ghost" to="/lean-ag">How we plan a farm</Link>
          </div>
        </div>
      </header>

      <section className="sm-pieces sm-grid" aria-labelledby="ways">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="ways">Three ways to buy.</h2>
          <p className="sm-sub">The same design behind each one, sized to your harvest.</p>
          <table className="sm-ptab"><tbody>
            <tr><th scope="row">Built and shipped</th><td>We build the container in our shop, test it, and ship it to your site ready to set and connect.</td><td>Anywhere a truck can reach</td></tr>
            <tr><th scope="row">Built on your site</th><td>Our crew builds it where it will stand, with the pad, power and fence tie-in planned with the rest of the farm.</td><td>Our crew, your site</td></tr>
            <tr><th scope="row">The design</th><td>Drawings, the equipment list with quantities, the wiring and airflow layout, and a work order your own builder can follow.</td><td>Build it yourself</td></tr>
          </tbody></table>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="what">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="what">What goes inside.</h2>
          <p className="sm-sub">Every piece is sized to the pounds you need to move in a day, and priced before anything is ordered.</p>
          <table className="sm-rtab"><tbody>
            <tr><th scope="row">Drying container</th><td>Insulation, an air conditioner and a dehumidifier sized to the wet weight, racks or hang lines, airflow, wiring, panels and controls. Lots move through on a schedule so the harvest never waits for space.</td></tr>
            <tr><th scope="row">Extraction container</th><td>A cold ethanol line from wash to distillate: extractor and chiller, cold filter, solvent recovery, decarb and distillation. Built as a starter line or a full line, with room to upgrade. The room, its exhaust, its wiring and its ethanol storage are laid out for your engineer and fire marshal to approve before it is built.</td></tr>
            <tr><th scope="row">Power and storage containers</th><td>Panels, the camera recorder and backup power in one box at the fence line; dry storage beside it.</td></tr>
          </tbody></table>
        </div>
      </section>

      <section className="sq-steps" aria-labelledby="how">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="how">How it goes.</h2>
          <ol>
            <li><h3>Tell us the harvest</h3><p>Pounds a day, how you dry, what you extract, and where the farm is.</p></li>
            <li><h3>We size and price it</h3><p>Every piece, its labor and its date, in a quote you can check line by line.</p></li>
            <li><h3>We build it</h3><p>In our shop or on your site, checked off step by step with photos.</p></li>
            <li><h3>Set and running</h3><p>Shipped or finished in place, connected, tested and handed over with its drawings.</p></li>
          </ol>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="us">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="us">It works for us. See if it works for you.</h2>
          <p className="sm-sub">We plan our own farm builds, containers included, in Samana, and run the season on Farmmetric. The quote you get comes out of the same plan.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href="#talk">Price a container</a>
            <a className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} href={APP}>Try Samana free</a>
          </div>
        </div>
      </section>

      <section className="sm-plans" id="talk" aria-labelledby="talkh" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <h2 className="sm-h2" id="talkh">Price a container.</h2>
          <ContactForm topic="Containers" prompt="Drying or extraction, pounds a day, and where it is going" />
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
