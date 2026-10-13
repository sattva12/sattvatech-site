import { Page, Hero, Sec, Steps, Prices, End, Acts } from '../Kit.jsx'
import { APP } from '../Chrome.jsx'

/* v3 (2026-10-12): same words as before, the drawing-set look. */
export default function Quote() {
  return (
    <Page here="construction" title="Quote service for handymen and small crews: Sattva Technologies">
      <Hero c="construction" title="We write the quote. You win the job."
        lede="For handymen, carpenters, painters and small crews in Massachusetts. Send us the job; we send back a clear quote in your name, with every material, hour and step priced so your profit is in it. Your first quote is free."
        acts={[['tel:5089168447', 'Call or text 508-916-8447', 'go'], ['mailto:info@sattvatech.com?subject=Quote%20for%20a%20job', 'Email the job']]}
        tb={[['First quote', 'Free'], ['In your name', 'Your logo on top'], ['Your customer', 'Stays yours'], ['Review', 'By a licensed supervisor']]} />

      <Sec id="how" title="How it works." sub="A short conversation, then the paperwork is ours.">
        <Steps steps={[
          ['Send us the job', 'Measurements, photos and what the customer wants. A two-minute voice note works.'],
          ['We build it', 'Every material, labor hour and step, in Samana, at your own labor rates.'],
          ['It goes out as yours', 'Your name and logo on top. You stay in front of your customer; we never contact them.'],
          ['First quote free', 'See it before you pay. After that, pick a plan or pay by the job.'],
        ]} />
      </Sec>

      <Sec id="menu" tone="alt" title="Pick what you need.">
        <div className="sx-two">
          <Prices title="Do it yourself in Samana" sub="The app, monthly. You put in your own labor rates." rows={[
            ['Free', 'One job, drawn and priced', '$0'],
            ['Takeoff', 'A clear quote for your customer, in your name; 5 jobs', '$10', 'a month'],
            ['Flow', 'Adds the materials list and work orders for your crew; review recommended', '$20', 'a month'],
          ]} foot={<a href="/samana#plans">All Samana plans</a>} />
          <Prices title="Have a licensed GC do it" sub="Our time, on top of a plan." rows={[
            ['Review', 'A construction supervisor checks the job before it goes out', '$25', 'a job'],
            ['Full job write-up', 'Proposal, drawings, materials list and a work order', '$100', 'a job'],
            ['GC service', 'Permits, supervision and project management, Massachusetts only', 'Estimate'],
          ]} />
        </div>
        <p className="sx-note">Structural work, moved plumbing, egress, commercial work, three-families and anything beyond an unrestricted construction supervisor license always get a review. Your customer and your prices stay yours.</p>
      </Sec>

      <Sec id="flyer">
        <div className="sx-flyer">
          <img src="/media/quote-flyer.jpg" alt="The quote service flyer: we write the quote, you win the job, with the plans and how it works" width="1088" height="1408" loading="lazy" />
          <div>
            <h2 className="sx-h3" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}>Pass it on.</h2>
            <p className="sx-p">The flyer, letter size, ready to print or text to a crew you know.</p>
            <Acts acts={[['/sattva-quote-flyer.pdf', 'Download the flyer (PDF)', 'ink'], ['/samana', 'See the app it is built on']]} />
          </div>
        </div>
      </Sec>

      <End title="Got a job to price this week?" acts={[['tel:5089168447', 'Call or text 508-916-8447', 'ink'], [APP, 'Try Samana yourself']]}>Send it over. If it is past what a handyman should take on alone, we will say so, and we can run it as the GC.</End>
    </Page>
  )
}
