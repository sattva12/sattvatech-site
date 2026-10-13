import { Page, Hero, Sec, Spec, Steps, Band, Talk } from '../Kit.jsx'
import { APP } from '../Chrome.jsx'
import { PlanContainer } from '../drawings.jsx'

/* v3 (2026-10-12): same words as before, the drawing-set look. */
export default function Containers() {
  return (
    <Page here="products" title="Containers: Sattva Technologies">
      <Hero c="products" title="Working rooms, built in a container."
        lede="We design and build insulated 40 ft containers set up as drying rooms and as power and storage rooms: wired and conditioned, ready to set on a pad and connect. We build them on your site, or sell you the design so your own builder can."
        acts={[['#talk', 'Price a container', 'go'], ['#what', 'What goes inside']]}
        aside={<div className="sx-sheet"><div className="sx-sheet-dw"><PlanContainer /></div><div className="sx-sheet-tb"><b>Drying room</b><span>40 ft container</span><span>Insulated, wired and conditioned</span></div></div>} />

      <Sec id="ways" title="Two ways to buy." sub="The same design behind each one, sized to what the room has to do.">
        <Spec rows={[
          ['Built on your site', 'Our crew builds it where it will stand, with the pad and power planned with the rest of the site.', 'Recommended'],
          ['The design', 'A drawing set for the drying container and its power supply: equipment, air and water, power layout, site runs and circuits, the one-line, the panel schedule, the material list with quantities, and a work order your own builder can follow to put it together.', 'Build it yourself'],
        ]} />
      </Sec>

      <Sec id="what" tone="alt" title="What goes inside." sub="Every piece is sized to the work the room has to do, and priced before anything is ordered.">
        <Spec rows={[
          ['Drying container', 'Insulation, air conditioning and dehumidifiers sized to the wet weight, racks or hang lines, air flow, wiring, panels and controls. Lots move through on a schedule so the harvest never waits for space.'],
          ['Power and storage container', "Insulated, with the 200 A panel that feeds the drying containers, the camera recorder, and shelving, locks and lighting for supplies and equipment: the site's power and its stores in one box."],
        ]} />
      </Sec>

      <Sec id="opt" title="Set up for your work." sub="The same insulated container, laid out for what you are going to do in it.">
        <Spec rows={[
          ['Air flow for a lab', 'Supply and exhaust air laid out for lab work. We build the room and its air flow; the lab equipment is yours.', 'The room, not the equipment'],
          ['Plug locations', 'Outlets and circuits placed where your equipment will stand, drawn before anything is wired.', 'Your layout'],
        ]} />
      </Sec>

      <Sec id="how" tone="alt" title="How it goes.">
        <Steps steps={[
          ['Tell us the room', 'What it is for, how much it has to dry or hold, and where it is going.'],
          ['We size and price it', 'Every piece, its labor and its date, in a quote you can check line by line.'],
          ['We build it', 'On your site, checked off step by step with photos. Or your builder does, from the design.'],
          ['Set and running', 'Finished in place, connected, tested and handed over with its drawings.'],
        ]} />
      </Sec>

      <Sec id="us">
        <Band acts={[['#talk', 'Price a container', 'ink'], [APP, 'Try Samana free']]}><b>It works for us. See if it works for you.</b> We plan our own farm builds, containers included, in Samana, and run the season on Farmmetric. The quote you get comes out of the same plan.</Band>
      </Sec>

      <Talk title="Price a container." sub="What the room is for, how big, and where it is going." topic="Containers" prompt="What the room is for, how big, and where it is going" />
    </Page>
  )
}
