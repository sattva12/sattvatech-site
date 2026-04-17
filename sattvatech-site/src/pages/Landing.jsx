import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DIVISIONS = [
  {
    path: '/gov',
    number: '01',
    title: 'Government Contracting',
    sub: 'Federal & State',
    description: 'SAM.gov registered small business providing MEP coordination, construction management, and owner\'s representation to federal agencies, state entities, and prime contractors.',
    tags: ['SAM.gov Active', 'CAGE: 19CM8', 'Small Business', 'MBE In Progress'],
  },
  {
    path: '/trades',
    number: '02',
    title: 'Construction Supervision',
    sub: 'Licensed GC Umbrella',
    description: 'Connecting skilled tradespeople with bigger, permitted jobs. Our unrestricted MA Construction Supervisor license and insurance umbrella opens doors for qualified handymen and contractors.',
    tags: ['CS-122574 Licensed', 'Insured & Bonded', 'MA Unrestricted', 'Inspection Ready'],
  },
  {
    path: '/agtech',
    number: '03',
    title: 'AgTech & Farmetric',
    sub: 'Controlled Environment Ag',
    description: 'Engineering meets agriculture. Process-driven MEP design for controlled-environment facilities, plus the Farmetric platform for farm operations management.',
    tags: ['Farmetric App', 'CEA Design', 'Process Engineering', 'MEP Integration'],
  },
]

const RED = '#c0392b'
const CREAM = '#f5f0e8'
const CREAM2 = '#ede8de'
const CHARCOAL = '#1c1c1c'
const BORDER = '#d8d0c0'
const MUTED = '#5a5248'
const FAINT = '#6a6258'

export default function Landing() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: CREAM, minHeight: '100vh', color: CHARCOAL }}>

      {/* NAV */}
      <nav style={{ background: CHARCOAL, padding: '0 2.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/sattva-logo.png" alt="Sattva" style={{ height: 34, objectFit: 'contain', filter: 'brightness(10) saturate(0)' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: CREAM, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>Technologies LLC</div>
            <div style={{ fontSize: 9, color: RED, letterSpacing: '0.12em', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>Est. 2019 · Seekonk, MA</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {DIVISIONS.map((d, i) => (
            <button key={d.path} onClick={() => navigate(d.path)}
              style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = '#aaa'}
            >{`0${i + 1} ${d.title.split(' ')[0]}`}</button>
          ))}
          <a href="mailto:apatel@sattvatech.com"
            style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: RED, border: `1px solid ${RED}`, padding: '7px 16px', textDecoration: 'none' }}
            onMouseEnter={e => { e.target.style.background = RED; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = RED; }}
          >Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ paddingTop: 64 }}>
        <div style={{ background: CREAM2, padding: '72px 2.5rem 56px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: RED, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 18 }}>Engineering · Construction · Technology</div>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)', fontWeight: 400, lineHeight: 1.08, color: CHARCOAL, margin: '0 0 10px' }}>
              One firm.<br /><span style={{ color: RED }}>Three platforms.</span>
            </h1>
            <div style={{ width: 48, height: 3, background: RED, margin: '20px 0' }} />
            <p style={{ fontSize: '1rem', color: MUTED, lineHeight: 1.78, maxWidth: 520, fontFamily: 'sans-serif', fontWeight: 300, margin: 0 }}>
              Sattva Technologies brings 25+ years of engineering and construction expertise across government contracting, licensed trade supervision, and agricultural technology.
            </p>
          </div>
        </div>

        {/* THREE TILES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', minHeight: 460 }}>
          {DIVISIONS.map((div, i) => (
            <div key={div.path} onClick={() => navigate(div.path)}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                padding: '48px 36px 40px', cursor: 'pointer',
                borderRight: i < 2 ? `1px solid ${BORDER}` : 'none',
                borderBottom: `1px solid ${BORDER}`,
                background: hovered === i ? CREAM2 : CREAM,
                transition: 'background 0.2s', position: 'relative', display: 'flex', flexDirection: 'column',
              }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: RED, transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s' }} />
              <div style={{ fontSize: 64, fontWeight: 400, color: hovered === i ? 'rgba(192,57,43,0.1)' : 'rgba(0,0,0,0.05)', lineHeight: 1, marginBottom: 24, fontFamily: 'sans-serif', transition: 'color 0.3s', letterSpacing: '-0.04em' }}>{div.number}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.22em', color: RED, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 8 }}>{div.sub}</div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 400, color: CHARCOAL, margin: '0 0 16px', lineHeight: 1.2 }}>{div.title}</h2>
              <p style={{ fontSize: 13, color: FAINT, fontFamily: 'sans-serif', lineHeight: 1.72, margin: '0 0 28px', flex: 1, fontWeight: 300 }}>{div.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                {div.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: hovered === i ? RED : '#8a8278', border: `1px solid ${hovered === i ? 'rgba(192,57,43,0.35)' : '#ccc8be'}`, padding: '3px 10px', background: hovered === i ? 'rgba(192,57,43,0.05)' : 'transparent', transition: 'all 0.2s' }}>{tag}</span>
                ))}
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: hovered === i ? RED : '#aaa8a0', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}>
                Explore <span style={{ display: 'inline-block', transform: hovered === i ? 'translateX(5px)' : 'translateX(0)', transition: 'transform 0.25s' }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* STATS STRIP */}
        <div style={{ background: CHARCOAL, padding: '28px 2.5rem', display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'center', flexWrap: 'wrap' }}>
          {[['25+', 'Years Experience'], ['500K SF', 'Largest Project'], ['6', 'Industry Sectors'], ['MA CS', 'Licensed GC'], ['SAM.gov', 'Active']].map(([v, l], i, arr) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: CREAM, fontWeight: 400 }}>{v}</div>
                <div style={{ fontSize: 9, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 4 }}>{l}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 36, background: '#333' }} />}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ background: CREAM2, borderTop: `1px solid ${BORDER}`, padding: '18px 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 10, color: '#8a8278', fontFamily: 'sans-serif' }}>© 2025 Sattva Technologies LLC · Seekonk, MA · SAM.gov Active · CAGE 19CM8</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="tel:5083430101" style={{ fontSize: 10, color: '#8a8278', fontFamily: 'sans-serif', textDecoration: 'none' }}>(508) 343-0101</a>
            <a href="mailto:apatel@sattvatech.com" style={{ fontSize: 10, color: '#8a8278', fontFamily: 'sans-serif', textDecoration: 'none' }}>apatel@sattvatech.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}
