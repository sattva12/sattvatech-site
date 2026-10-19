import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './brand.jsx'
import { APP, FARM, TEL, TEL_HREF, MAIL } from './Chrome.jsx'
import './v3.css'

/* The v3 top bar: the logo, the three lines of work, the phone and sign in.
   It sits clear over the dark opening and turns solid once the page scrolls. */
const NAV = [
  ['construction', 'Construction', '/#construction'],
  ['farms', 'Ag', '/#farms'],
  ['products', 'Products', '/#products'],
]

export function Top({ here }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={'sx-top' + (solid ? ' solid' : '') + (open ? ' open' : '')}>
      <div className="sx-top-in">
        <Link to="/" className="sx-brand" aria-label="Sattva Technologies, home">
          <Logo className="sx-logo-wide" size={34} tone="dark" />
          <Logo className="sx-logo-small" size={28} tone="dark" tech={false} />
        </Link>
        <nav className="sx-nav" aria-label="Lines of work">
          {NAV.map(([id, name, href]) => <a key={id} href={href} aria-current={here === id ? 'true' : undefined} onClick={() => setOpen(false)}>{name}</a>)}
        </nav>
        <div className="sx-top-r">
          <a className="sx-tel" href={TEL_HREF}>{TEL}</a>
          <Link className="sx-signin" to="/sign-in">Sign in</Link>
          <button type="button" className="sx-menu" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
        </div>
      </div>
    </header>
  )
}

export function Foot() {
  return (
    <footer className="sx-foot">
      <div className="sx-wrap sx-foot-in">
        <div className="sx-foot-id">
          <Logo size={46} tone="dark" />
          <p>Sattva Technologies LLC<br />Massachusetts</p>
        </div>
        <nav aria-label="Work">
          <h2>Work</h2>
          <Link to="/construction">Construction</Link>
          <Link to="/lean-ag">Lean ag</Link>
          <Link to="/containers">Containers</Link>
        </nav>
        <nav aria-label="Software">
          <h2>Software</h2>
          <Link to="/samana">Samana</Link>
          <a href={FARM}>Farmmetric</a>
          <Link to="/contractors">Quote service</Link>
          <a href={APP}>Sign in to Samana</a>
        </nav>
        <div className="sx-foot-c">
          <h2>Contact</h2>
          <a href={TEL_HREF}>{TEL}</a>
          <a href={'mailto:' + MAIL}>{MAIL}</a>
        </div>
      </div>
      <div className="sx-wrap sx-foot-base">
        <span>Massachusetts Construction Supervisor CS-122574</span>
        <span>Home Improvement Contractor HIC 218120</span>
        <span><a href={APP + '/privacy'}>Privacy</a><a href={APP + '/terms'}>Terms</a></span>
      </div>
    </footer>
  )
}
