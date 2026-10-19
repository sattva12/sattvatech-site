import { Page, Hero, Sec, Spec, Steps, Band, Talk } from '../Kit.jsx'
import { FARM } from '../Chrome.jsx'
import { PlanFarm } from '../drawings.jsx'

/* v3 (2026-10-12): same words as before, the drawing-set look, farm green. */
export default function LeanAg() {
  return (
    <Page here="farms" title="Lean ag: Sattva Technologies" className="sx-farmpage">
      <Hero c="farms" title="We make the farm's process lean."
        lede="We plan a farm the way a good shop plans a line: every stage, every input and every hour, against the date it has to hit. Then we run it on data, with Farmmetric in the field and Samana's Lean and Flow behind it."
        acts={[['#talk', 'Talk about your farm', 'go'], ['/farmmetric', 'See Farmmetric']]}
        aside={<div className="sx-sheet sx-sheet-farm"><div className="sx-sheet-dw"><PlanFarm /></div><div className="sx-sheet-tb"><b>Farm site, 5.02 acres</b><span>Fence 200 by 300 ft</span><span>20 rows</span></div></div>} />

      <Sec id="how" title="Everything flows to cash." sub="Nothing is grown until the place is built and paid for. After that, every day a plan slips costs labor and pushes the sale. So we work in this order.">
        <Steps steps={[
          ['Build it', 'Fields, fence, power and drying, priced and dated before the first post goes in.'],
          ['Plan the season', 'Planting to sale in stages, with the people, inputs and hours each step needs, Monday to Friday.'],
          ['Run it on data', "The crew gets the day's jobs; every move, feed, spray, loss and harvest is logged as it happens."],
          ['Follow the cash', 'Plan against actual, by month: where time went, what it cost, when the crop can sell.'],
        ]} />
      </Sec>

      <Sec id="what" tone="farmtone" title="Where lean thinking pays on a farm." sub="Less waste, fewer hours, and plants and pounds that match the plan.">
        <Spec rows={[
          ['The season plan', 'Stages from planting to the final checks, lots that follow the rows, harvest and drying sized to what the farm can actually dry.', 'Lean'],
          ['Process and IPM', 'Feed, foliar and IPM schedules with product and rate, inspections with photos, findings that put a step on hold until they are handled.', 'Farmmetric'],
          ['Labor', "The farm manager assigns the day's jobs; the crew checks them off with hours and amounts used, so labor is measured, not guessed.", 'Team app'],
          ['Harvest and drying', 'Wet and dry weights, waste, bags and bins by lot, and the pounds per plant against plan.', 'Farmmetric'],
          ['Compliance', 'Records kept as the crew works and exported as a file today. Live API connectors are coming soon.', 'Farmmetric'],
          ['The money', 'Capital, running costs and sales timing by month, with every rev of the plan and how it moved.', 'Flow'],
        ]} />
      </Sec>

      <Sec id="box">
        <Band acts={[['/containers', 'See the containers', 'ink']]}><b>Drying, power and storage containers.</b> We build drying rooms and power and storage rooms in insulated 40 ft containers on your site, and sell the full design if you would rather build it yourself.</Band>
        <div style={{ height: 20 }} />
        <Band acts={[[FARM, 'Use Farmmetric free', 'ink'], ['/samana', 'See Samana']]}><b>It works for us. See if it works for you.</b> We run our own farm work on Farmmetric, our farm app, with Samana's Lean and Flow behind it. Farmmetric is free.</Band>
      </Sec>

      <Talk title="Talk about your farm." sub="Your farm, its size, and what is slowing you down." topic="Lean ag" prompt="Your farm, its size, and what is slowing you down" />
    </Page>
  )
}
