import { Link } from 'react-router-dom'
import { Page } from '../Kit.jsx'
import { Phone } from '../Chrome.jsx'
import { LEGAL } from '../legal.js'

/* sattvatech.com/contractors/privacy and /contractors/terms (Atul approved, Oct 19, 15:49) */
export default function Legal({ which }) {
  const doc = LEGAL[which]
  const parts = doc.html.split('@@PHONE@@')
  return (
    <Page here="construction" title={doc.title + ': Sattva Technologies'}>
      <section className="sx-open sx-legal-open">
        <div className="sx-wrap">
          <p className="sx-legal-back"><Link to="/contractors">Contractors</Link> / {which === 'privacy' ? 'Privacy' : 'Terms'}</p>
          <h1 className="sx-legal-h">{doc.title}</h1>
        </div>
      </section>
      <section className="sx-sec sx-legal-sec">
        <div className="sx-wrap">
          <article className="sx-legal">
            {parts.map((h, i) => <span key={i}><span dangerouslySetInnerHTML={{ __html: h }} />{i < parts.length - 1 && <Phone label="Show phone" />}</span>)}
          </article>
          <p className="sx-legal-other">{which === 'privacy' ? <Link to="/contractors/terms">Contractors Terms</Link> : <Link to="/contractors/privacy">Contractors Privacy Policy</Link>}</p>
        </div>
      </section>
    </Page>
  )
}
