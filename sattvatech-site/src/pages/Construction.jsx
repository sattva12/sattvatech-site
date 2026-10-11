import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, APP } from './Samana.jsx'
import ContactForm from './ContactForm.jsx'
import '../samana.css'

export default function Construction() {
  useEffect(() => { document.title = 'Construction: Sattva Technologies' }, [])
  return (
    <div className="sm">
      <SamanaNav here="construction" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>Data and quality, so the job hits its date.</h1>
          <p>Residential and commercial work run the way a production line runs: every step planned with its material, labor and time, checked as it is done, and measured against the deadline. Massachusetts unrestricted Construction Supervisor, CS-122574.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href="#talk">Talk about a project</a>
            <Link className="sm-btn ghost" to="/samana">See how we plan it</Link>
          </div>
        </div>
      </header>

      <section className="sq-steps" aria-labelledby="how">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="how">How a job runs.</h2>
          <p className="sm-sub">The same order on a basement, a deck or a commercial fit-out.</p>
          <ol>
            <li><h3>Take it off</h3><p>Every material, hour and price from the drawing, with the guesses marked until they are measured.</p></li>
            <li><h3>Plan the work</h3><p>Steps in order, the trades each one needs, the inspections between them, Monday to Friday.</p></li>
            <li><h3>Build and check</h3><p>The crew works from the issued rev; each step is checked off with photos before the next starts.</p></li>
            <li><h3>Follow the cash</h3><p>Payments tied to the work, costs against plan, and every change written up before it is done.</p></li>
          </ol>
        </div>
      </section>

      <section className="sm-pieces sm-grid" aria-labelledby="what">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="what">What we do.</h2>
          <p className="sm-sub">Residential and commercial, in Massachusetts.</p>
          <table className="sm-ptab"><tbody>
            <tr><th scope="row">Construction management</th><td>Takeoffs, schedules, the trades lined up, inspections passed, and the owner kept current on every change.</td><td>Residential and commercial</td></tr>
            <tr><th scope="row">GC for tradespeople</th><td>Skilled handymen and small crews take on permitted jobs under our license and insurance, with the job planned and supervised.</td><td>The licensed umbrella</td></tr>
            <tr><th scope="row">Quote service</th><td>We write the quote, materials list and work order for contractors who would rather be on the tools.</td><td><Link to="/quote" style={{ color: '#eaf2fc' }}>Quote service</Link></td></tr>
            <tr><th scope="row">Farm and facility builds</th><td>Fence, cameras, power, containers, drying and wells for licensed farms, priced and sequenced with the season.</td><td><Link to="/lean-ag" style={{ color: '#eaf2fc' }}>Lean agriculture</Link></td></tr>
          </tbody></table>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="box">
        <div className="sm-wrap sm-flyer">
          <a href="/sattva-container-flyer.pdf"><img src="/media/container-flyer.jpg" alt="The container flyer" loading="lazy" /></a>
          <div>
            <h2 className="sm-h2" id="box">Containers, built in our shop and shipped anywhere.</h2>
            <p className="sm-sub">Drying and extraction rooms in 40 ft containers: shipped ready to set, built on site by our crew, or the full design for your builder.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><Link className="sm-btn go" to="/containers">See the containers</Link><a className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} href="/sattva-container-flyer.pdf">Flyer (PDF)</a></div>
          </div>
        </div>
      </section>

      <section className="sm-arms" aria-labelledby="us">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="us">It works for us. See if it works for you.</h2>
          <p className="sm-sub">Every job we run is planned, priced and tracked in <Link to="/samana" style={{ color: 'inherit' }}>Samana</Link>, our app. Contractors can use the same app, starting with a free sample job.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href={APP}>Try Samana free</a>
            <Link className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} to="/quote">Have us write your quote</Link>
          </div>
        </div>
      </section>

      <section className="sm-plans" id="talk" aria-labelledby="talkh" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <h2 className="sm-h2" id="talkh">Talk about a project.</h2>
          <ContactForm topic="Construction" prompt="Where it is, what it is, and when it needs to be done" />
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
