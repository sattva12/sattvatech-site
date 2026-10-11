import './site.css'

/* One platform, three kinds of work: each shown as the same three views. Numbers are the app's own, on the sample house and our Minnesota site. */
const VIEWS = [['Takeoff', 'Count it and price it'], ['Lean', 'Steps, crews and dates'], ['Flow', 'Cash by month']]
const ROWS = [
  { name: 'A construction job', what: 'The sample house: a basement, two floors and a deck',
    cells: [['$142,047', '100 material lines, each one priced'], ['15 steps', '885 crew hours, 56 days on site'], ['$142,047 in', 'Material $55,014 and labor $48,670 out, by month']] },
  { name: 'A farm season', what: 'A five-acre site in Minnesota',
    cells: [['1,000 ft of fence', '20 rows, 6 camera poles, 5 containers'], ['May to October', 'Planting from June 1, harvest from September 1'], ['By month', 'The build as capital, the season as running cost']] },
  { name: 'A production run', what: 'A lab line: material in, product out',
    cells: [['Piece by piece', 'The room and every machine in it'], ['Lot by lot', 'Material in, each step, the crew, output and packaging'], ['By run', 'Equipment as capital, each run as operating cost']] },
]

export default function Proof() {
  return (
    <table className="st-proof">
      <thead>
        <tr><td />{VIEWS.map(([v, s]) => <th scope="col" key={v}>{v}<small>{s}</small></th>)}</tr>
      </thead>
      <tbody>
        {ROWS.map((r) => (
          <tr key={r.name}>
            <th scope="row">{r.name}<small>{r.what}</small></th>
            {r.cells.map(([b, s], i) => <td key={i} data-view={VIEWS[i][0]}><b>{b}</b><span>{s}</span></td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
