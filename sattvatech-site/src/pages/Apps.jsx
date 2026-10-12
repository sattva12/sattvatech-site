import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SamanaNav, SamanaFoot, APP, FARM } from './Samana.jsx'
import '../samana.css'

export default function Apps() {
  useEffect(() => { document.title = 'Sign in: Sattva Technologies' }, [])
  return (
    <div className="sm">
      <SamanaNav here="apps" />
      <section className="sm-arms" aria-labelledby="signin" style={{ minHeight: '60vh' }}>
        <div className="sm-wrap">
          <h1 className="sm-h2" id="signin">Sign in.</h1>
          <p className="sm-sub">Our two apps, each with its own sign-in. The one you use is the one your company signed up for.</p>
          <div className="sm-apps">
            <div className="sm-app">
              <span className="who">For contractors and builders, from Construction</span>
              <h2>Samana</h2>
              <p>Takeoff, drawings, quotes, work orders, the team app and cash flow, from one drawing.</p>
              <div className="acts"><a className="sm-btn go" href={APP + '/login'}>Sign in to Samana</a><Link className="sm-btn" style={{ border: '2px solid #16212c', color: '#16212c' }} to="/samana">What it does</Link></div>
            </div>
            <div className="sm-app fmc">
              <span className="who">For farms and their crews</span>
              <h2>Farmmetric</h2>
              <p>The farm's jobs, sprays, harvest and drying, logged from a phone. Free.</p>
              <div className="acts"><a className="sm-btn go" href={FARM}>Sign in to Farmmetric</a><Link className="sm-btn" style={{ border: '2px solid #23613f', color: '#23613f' }} to="/farmmetric">What it does</Link></div>
            </div>
          </div>
          <p className="sm-sub" style={{ marginTop: 22 }}>New to either one? Samana starts free with one job; Farmmetric is free.</p>
        </div>
      </section>
      <SamanaFoot />
    </div>
  )
}
