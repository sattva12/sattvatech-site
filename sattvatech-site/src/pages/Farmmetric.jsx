import { Page, Hero, Sec, Spec, Prices, End } from '../Kit.jsx'
import { FARM } from '../Chrome.jsx'
import { FarmmetricPhone } from '../Walkthrough.jsx'

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

/* v3 (2026-10-12): same words as before, the drawing-set look. */
export default function Farmmetric() {
  return (
    <Page here="products" title="Farmmetric: farm compliance and records, free, by Sattva Technologies">
      <Hero c="farms" title="Farm compliance, and a simple way to enter your data."
        lede="Farmmetric is a free farm app for the people doing the work. Every job goes on a phone: what to do, where, who is on it and how long it took. Sprays, harvest and drying are logged as they happen, so the records are there when you have to show them. Live API connectors are coming soon."
        acts={[[FARM + '/signup', 'Start free', 'go'], ['#samana', 'How it works with Samana']]}
        tb={[['Price', 'Free'], ['On the web', 'Phone, tablet, desktop'], ['Google Play', 'Coming soon'], ['With Samana', 'Linked through Lean']]} />

      <Sec id="phone" title="The crew's day, on a phone." sub="Recorded in the real app on a sample farm.">
        <div className="st st-embed"><FarmmetricPhone /></div>
      </Sec>

      <Sec id="what" tone="alt" title="What you enter, and what you get back." sub="Phones, tablets and desktops, with access set by role. Weights convert between grams, ounces, pounds and kilograms on their own.">
        <Spec rows={FEATURES} />
      </Sec>

      <Sec id="samana" tone="farmtone" title="On its own, or connected to Samana." sub="Farmmetric works by itself for any farm. Farms that plan in Samana's Lean link the two at no extra cost: the plan comes to the crew's phones, and what they do goes back to the plan.">
        <Spec rows={[
          ['Samana builds the farm', 'Fields and rows on the real lot line, fence, cameras, power, drying and the budget, priced in Takeoff.', 'Construction and capital'],
          ['Lean plans the season', 'Planting to sale: lots, harvest and drying dates, with the people each step needs.', 'The plan'],
          ['Farmmetric runs it', 'Every batch tagged and moved, every harvest weighed, every input and inspection logged, and the compliance records kept current.', 'The actuals'],
          ['Flow follows the money', 'Harvest weights and actual dates come back to the plan, so the cash by month is real.', 'Back to the books'],
        ]} />
        <p className="sx-note">The link is live: a farm on Lean gets its Farmmetric farm made and linked from Samana, so the plan and the field share one record, from the first fence post to the last harvest.</p>
      </Sec>

      <Sec id="plans" title="Free." sub="Farmmetric is free to use, with one plan for everyone. A leaner farm is everyone's bottom line, the owner's, the crew's and the buyer's, so the first step costs nothing. Sign up and the farm is yours to set up.">
        <div className="sx-two">
          <Prices rows={[['On the web', 'Sign in from a phone, a tablet or a desktop', 'Free'], ['On Google Play', 'The app for Android phones', 'Coming soon']]} />
          <Prices rows={[['Linked to Samana', "For farms on Samana's Lean plan", 'Included'], ['Live API connectors', 'Your records sent on to the systems you report to, without the upload', 'Coming soon']]} />
        </div>
        <p className="sx-note">Farmmetric is built by Sattva Technologies.</p>
      </Sec>

      <End title="Built by people who build farms." acts={[[FARM, 'Go to Farmmetric', 'ink'], ['/lean-ag', 'Lean farming']]}>Sattva Technologies sets farms up, builds them and makes the process lean. Farmmetric is the tool we wanted on site, and we use it ourselves. See if it works for you.</End>
    </Page>
  )
}
