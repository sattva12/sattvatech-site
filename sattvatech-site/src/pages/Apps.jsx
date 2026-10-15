import { Page, Sec } from '../Kit.jsx'
import { APP, FARM } from '../Chrome.jsx'
import { Link } from 'react-router-dom'

/* v3 (2026-10-12): the sign-in page in the drawing-set look. */
export default function Apps() {
  return (
    <Page here="products" title="Sign in: Sattva Technologies">
      <section className="sx-open sx-ihero" id="top">
        <div className="sx-wrap">
          <div className="sx-ihero-in">
            <div>
              <h1>Sign in.</h1>
              <p className="sx-ihero-lede">Our two apps, each with its own sign-in. The one you use is the one your company signed up for.</p>
            </div>
          </div>
        </div>
      </section>
      <Sec>
        <div className="sx-apps sx-apps2">
          <article className="sx-app sx-app-samana">
            <h4 className="sx-app-lockup"><img src="/brand/samana-logo-wide.svg" alt="Samana, EMCRP Software" /></h4>
            <p>Takeoff, drawings, quotes, work orders, the team app and cash flow, from one drawing.</p>
            <div className="sx-price"><b>Free to start</b><span>One job, then $10, $20 or $30 a month</span></div>
            <div className="sx-acts"><a className="sx-btn sx-btn-ink" href={APP + '/login'}>Sign in to Samana</a><a className="sx-btn sx-btn-line" href="https://samana.tech">What it does</a></div>
          </article>
          <article className="sx-app sx-app-farmmetric">
            <h4 className="sx-app-lockup sx-fm-lockup"><span className="sx-fm-tile"><img src="/brand/farmmetric-logo-wide.svg" alt="Farmmetric, for farms and their crews" /></span></h4>
            <p>The farm's jobs, sprays, harvest and drying, logged from a phone.</p>
            <div className="sx-price"><b>Free</b><span>On the web now, Google Play soon</span></div>
            <div className="sx-acts"><a className="sx-btn sx-btn-ink" href={FARM}>Sign in to Farmmetric</a><Link className="sx-btn sx-btn-line" to="/farmmetric">What it does</Link></div>
          </article>
        </div>
      </Sec>
    </Page>
  )
}
