import { Page, Hero, Sec, Spec, Steps, Band, Talk, TeamBuild } from '../Kit.jsx'
import { APP } from '../Chrome.jsx'
import { PlanBasement } from '../drawings.jsx'

/* v3 (2026-10-12): same words as before, the drawing-set look. */
export default function Construction() {
  return (
    <Page here="construction" title="Construction: Sattva Technologies">
      <Hero c="construction" title="Data and quality, so the job hits its date."
        lede="Residential and commercial work run the way a production line runs: every step planned with its material, labor and time, checked as it is done, and measured against the deadline."
        acts={[['#talk', 'Talk about a project', 'go'], ['/samana', 'See how we plan it']]}
        aside={<div className="sx-sheet"><div className="sx-sheet-dw"><PlanBasement /></div><div className="sx-sheet-tb"><b>A finished basement, as drawn</b><span>876 SF</span><span>2 bedrooms, 1 bath</span></div></div>}
        tb={[['MA Construction Supervisor', 'CS-122574 (unrestricted)'], ['Home Improvement Contractor', 'HIC 218120'], ['Work', 'Residential and commercial'], ['Based in', 'Massachusetts']]} />

      <Sec id="how" title="How a job runs." sub="The same order on a basement, a deck or a commercial fit-out.">
        <Steps steps={[
          ['Take it off', 'Every material, hour and price from the drawing, with the guesses marked until they are measured.'],
          ['Plan the work', 'Steps in order, the trades each one needs, the inspections between them, Monday to Friday.'],
          ['Build and check', 'The crew works from the issued rev; each step is checked off with photos before the next starts.'],
          ['Follow the cash', 'Payments tied to the work, costs against plan, and every change written up before it is done.'],
        ]} />
      </Sec>

      <TeamBuild tone="alt" />

      <Sec id="what" title="What we do." sub="Residential and commercial, in Massachusetts.">
        <Spec rows={[
          ['Construction management', 'Takeoffs, schedules, the trades lined up, inspections passed, and the owner kept current on every change.', 'Residential and commercial'],
          ['GC for tradespeople', 'Contractors of any size take on permitted jobs under our license and insurance, with the job planned and supervised.', 'The licensed umbrella'],
          ['Quote service', 'We write the quote, materials list and work order for contractors who would rather be on the tools.', <a href="/quote">Quote service</a>],
          ['Farm and facility builds', 'Fence, cameras, power, containers, drying and wells for farms, priced and sequenced with the season.', <a href="/lean-ag">Lean agriculture</a>],
        ]} />
      </Sec>

      <Sec id="box">
        <Band acts={[['/containers', 'See the containers', 'ink']]}><b>Working rooms, built in a container.</b> Drying rooms and power and storage rooms in insulated 40 ft containers: built on site by our crew, or the full design for your builder.</Band>
        <div style={{ height: 20 }} />
        <Band acts={[[APP, 'Try Samana free', 'ink'], ['/contractors', 'Have us write your quote']]}><b>It works for us. See if it works for you.</b> Every job we run is planned, priced and tracked in Samana, our app. Contractors can use the same app, starting with a free sample job.</Band>
      </Sec>

      <Talk topic="Construction" prompt="Where it is, what it is, and when it needs to be done" />
    </Page>
  )
}
