import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, APP } from './Samana.jsx'
import '../samana.css'

export default function Quote() {
  useEffect(() => { document.title = 'Quote service for handymen and small crews: Sattva Technologies' }, [])
  return (
    <div className="sm">
      <SamanaNav here="quote" />
      <header className="sq-hero sm-grid">
        <div className="sm-wrap">
          <h1>We write the quote. You win the job.</h1>
          <p>For handymen, carpenters, painters and small crews in Massachusetts. Send us the job; we send back a clear quote in your name, with every material, hour and step priced so your profit is in it. Your first quote is free.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="sm-btn go" href="tel:5089168447">Call or text 508-916-8447</a>
            <a className="sm-btn ghost" href="mailto:apatel@sattvatech.com?subject=Quote%20for%20a%20job">Email the job</a>
          </div>
        </div>
      </header>

      <section className="sq-steps" aria-labelledby="how">
        <div className="sm-wrap">
          <h2 className="sm-h2" id="how">How it works.</h2>
          <p className="sm-sub">A short conversation, then the paperwork is ours.</p>
          <ol>
            <li><h3>Send us the job</h3><p>Measurements, photos and what the customer wants. A two-minute voice note works.</p></li>
            <li><h3>We build it</h3><p>Every material, labor hour and step, in Samana, at your own labor rates.</p></li>
            <li><h3>It goes out as yours</h3><p>Your name and logo on top. You stay in front of your customer; we never contact them.</p></li>
            <li><h3>First quote free</h3><p>See it before you pay. After that, pick a plan or pay by the job.</p></li>
          </ol>
        </div>
      </section>

      <section className="sm-plans" aria-labelledby="menu" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <h2 className="sm-h2" id="menu">Pick what you need.</h2>
          <div className="sm-ptwo">
            <div className="sm-plan"><h3>Do it yourself in Samana</h3><p>The app, monthly. You put in your own labor rates.</p><dl>
              <div><dt>Free<small>One job, drawn and priced</small></dt><dd>$0</dd></div>
              <div><dt>Takeoff<small>A clear quote for your customer, in your name; 5 jobs</small></dt><dd>$10<small>a month</small></dd></div>
              <div><dt>Flow<small>Adds the materials list and work orders for your crew; review recommended</small></dt><dd>$20<small>a month</small></dd></div>
            </dl><p style={{ margin: '10px 0 0', fontSize: 14 }}><a href="/samana#plans" style={{ color: 'inherit' }}>All Samana plans</a></p></div>
            <div className="sm-plan"><h3>Have a licensed GC do it</h3><p>Our time, on top of a plan.</p><dl>
              <div><dt>Review<small>A construction supervisor checks the job before it goes out</small></dt><dd>$25<small>a job</small></dd></div>
              <div><dt>Full job write-up<small>Proposal, drawings, materials list and a work order</small></dt><dd>$100<small>a job</small></dd></div>
              <div><dt>GC service<small>Permits, supervision and project management, Massachusetts only</small></dt><dd>Estimate</dd></div>
            </dl></div>
          </div>
          <p className="note">Structural work, moved plumbing, egress, commercial work, three-families and anything beyond an unrestricted construction supervisor license always get a review. Your customer and your prices stay yours.</p>
        </div>
      </section>

      <section className="sq-flyer" aria-labelledby="flyer">
        <div className="sm-wrap two">
          <img src="/media/quote-flyer.jpg" alt="The quote service flyer: we write the quote, you win the job, with the plans and how it works" width="1088" height="1408" loading="lazy" />
          <div>
            <h2 className="sm-h2" id="flyer">Pass it on.</h2>
            <p className="sm-sub">The flyer, letter size, ready to print or text to a crew you know.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a className="sm-btn go" href="/sattva-quote-flyer.pdf" download>Download the flyer (PDF)</a>
              <Link className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} to="/samana">See the app it is built on</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sm-end sm-grid" aria-labelledby="end">
        <div className="sm-wrap">
          <h2 id="end">Got a job to price this week?</h2>
          <p>Send it over. If it is past what a handyman should take on alone, we will say so, and we can run it as the GC.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><a className="sm-btn go" href="tel:5089168447">Call or text 508-916-8447</a><a className="sm-btn ghost" href={APP}>Try Samana yourself</a></div>
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
