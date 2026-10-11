import { Link } from 'react-router-dom'
import { Logo } from './brand.jsx'
import './site.css'

export const APP = 'https://app.sattvatech.com'
export const FARM = 'https://www.myfarmmetric.com'
export const TEL = '508-916-8447'
export const TEL_HREF = 'tel:5089168447'
export const MAIL = 'apatel@sattvatech.com'

/* The app's own top bar, used across the site: the name, the lines of work as tabs, sign in on the right. */
const TABS = [
  { id: 'construction', name: 'Construction', sub: 'Homes and commercial', href: '/#construction' },
  { id: 'farms', name: 'Farms', sub: 'Lean farming', href: '/#farms' },
  { id: 'samana', name: 'Samana', sub: 'Lean operations software', href: '/#samana' },
  { id: 'products', name: 'Products', sub: 'Containers and apps', href: '/#products' },
]

export function SiteHeader({ here, cta }) {
  return (
    <header className="st-top">
      <Link to="/" className="st-name" aria-label="Sattva Technologies, home"><Logo size={36} fill="silver" /><span>Technologies</span></Link>
      <nav className="st-tabs" aria-label="Sattva Technologies">
        {TABS.map((t) => t.href.startsWith('/#')
          ? <a key={t.id} href={t.href} aria-current={here === t.id ? 'true' : undefined}><b>{t.name}</b><small>{t.sub}</small></a>
          : <Link key={t.id} to={t.href} aria-current={here === t.id ? 'true' : undefined}><b>{t.name}</b><small>{t.sub}</small></Link>)}
      </nav>
      <div className="st-right">
        <a className="st-tel" href={TEL_HREF}>{TEL}</a>
        <Link className="st-hbtn" to="/sign-in">Sign in</Link>
        {cta}
        <span className="st-motto">Sattva: making things work</span>
      </div>
    </header>
  )
}

export function SiteFoot() {
  return (
    <footer className="st-foot">
      <div className="st-wrap">
        <div>
          <Logo className="st-foot-logo" size={44} fill="silver" />
          <p>Sattva Technologies LLC, Seekonk, Massachusetts.<br />Construction Supervisor CS-122574, HIC 218120.</p>
        </div>
        <nav aria-label="Pages">
          <Link to="/construction">Construction</Link>
          <Link to="/lean-ag">Lean farming</Link>
          <Link to="/containers">Containers</Link>
          <Link to="/samana">Samana</Link>
          <Link to="/farmmetric">Farmmetric</Link>
          <Link to="/quote">Quote service</Link>
          <Link to="/sign-in">Sign in</Link>
        </nav>
        <div className="st-foot-c">
          <a href={TEL_HREF}>{TEL}</a>
          <a href={'mailto:' + MAIL}>{MAIL}</a>
          <span><a href={APP + '/privacy'}>Privacy</a> <a href={APP + '/terms'}>Terms</a></span>
        </div>
      </div>
    </footer>
  )
}
