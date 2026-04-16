import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DIVISIONS = [
  {
    path: '/gov',
    number: '01',
    title: 'Government Contracting',
    sub: 'Federal & State',
    description: 'SAM.gov registered. MEP coordination, construction management, and owner\'s representation for DOD, USACE, VA, and prime contractors.',
    tags: ['SAM.gov Active', 'CAGE: 19CM8', 'Small Business', 'MBE In Progress'],
    accent: '#c0392b',
  },
  {
    path: '/trades',
    number: '02',
    title: 'Construction Supervision',
    sub: 'Licensed GC Umbrella',
    description: 'Connecting skilled tradespeople with bigger, permitted jobs. Our unrestricted MA Construction Supervisor license and insurance umbrella opens doors for qualified handymen and contractors.',
    tags: ['CS-122574 Licensed', 'Insured & Bonded', 'MA Unrestricted', 'Inspection Ready'],
    accent: '#c0392b',
  },
  {
    path: '/agtech',
    number: '03',
    title: 'AgTech & Farmetric',
    sub: 'Controlled Environment Ag',
    description: 'Engineering meets agriculture. Process-driven MEP design for controlled-environment facilities, plus the Farmetric platform for farm operations management.',
    tags: ['Farmetric App', 'CEA Design', 'Process Engineering', 'MEP Integration'],
    accent: '#c0392b',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: '#0e0e0e',
      minHeight: '100vh',
      color: '#e8e4dc',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* NAV */}
      <nav style={{
        padding: '0 3rem',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(192,57,43,0.15)',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        background: 'rgba(14,14,14,0.96)',
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/sattva-logo.png" alt="Sattva" style={{ height: 36, objectFit: 'contain' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: '#f0ece4', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>Technologies LLC</div>
            <div style={{ fontSize: 9, color: '#c0392b', letterSpacing: '0.15em', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>Seekonk, MA · Est. 2019</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['01 Gov', '02 Trades', '03 AgTech'].map((label, i) => (
            <button key={label} onClick={() => navigate(DIVISIONS[i].path)}
              style={{ background: 'none', border: 'none', color: '#888', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#c0392b'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >{label}</button>
          ))}
          <a href="mailto:apatel@sattvatech.com"
            style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#c0392b', border: '1px solid #c0392b', padding: '7px 14px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = '#c0392b'; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#c0392b'; }}
          >Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        paddingTop: 72,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top wordmark area */}
        <div style={{
          padding: '80px 3rem 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(192,57,43,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          {/* Red accent line */}
          <div style={{ position: 'absolute', bottom: 0, left: '3rem', right: '3rem', height: 1, background: 'rgba(192,57,43,0.2)' }} />

          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#c0392b', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 20 }}>
              Engineering · Construction · Technology
            </div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1.08, color: '#f5f0e8', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
              One firm.<br />
              <span style={{ color: '#c0392b' }}>Three platforms.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.7, maxWidth: 540, fontFamily: 'sans-serif', fontWeight: 300, margin: 0 }}>
              Sattva Technologies brings 25+ years of engineering and construction expertise across government contracting, licensed trade supervision, and agricultural technology.
            </p>
          </div>
        </div>

        {/* THE 3 TILES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          flex: 1,
          minHeight: 480,
        }}>
          {DIVISIONS.map((div, i) => (
            <div
              key={div.path}
              onClick={() => navigate(div.path)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                padding: '56px 40px 48px',
                cursor: 'pointer',
                borderRight: i < 2 ? '1px solid rgba(192,57,43,0.12)' : 'none',
                borderTop: '1px solid rgba(192,57,43,0.12)',
                background: hovered === i ? '#161616' : '#0e0e0e',
                transition: 'background 0.25s',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Hover accent top bar */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                background: '#c0392b',
                transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease',
              }} />

              {/* Number */}
              <div style={{
                fontSize: 72,
                fontWeight: 400,
                color: hovered === i ? 'rgba(192,57,43,0.15)' : 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                marginBottom: 32,
                letterSpacing: '-0.04em',
                transition: 'color 0.3s',
                fontFamily: 'sans-serif',
              }}>{div.number}</div>

              {/* Sub label */}
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#c0392b', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12 }}>{div.sub}</div>

              {/* Title */}
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 400, color: '#f0ece4', margin: '0 0 20px', lineHeight: 1.2 }}>{div.title}</h2>

              {/* Description */}
              <p style={{ fontSize: 14, color: '#666', fontFamily: 'sans-serif', lineHeight: 1.7, margin: '0 0 32px', flex: 1, fontWeight: 300 }}>{div.description}</p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 36 }}>
                {div.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'sans-serif', color: '#555',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '3px 10px',
                    transition: 'all 0.2s',
                    ...(hovered === i ? { color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)' } : {}),
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA arrow */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
                color: hovered === i ? '#c0392b' : '#444',
                transition: 'color 0.2s',
              }}>
                <span>Explore</span>
                <span style={{
                  display: 'inline-block',
                  transform: hovered === i ? 'translateX(6px)' : 'translateX(0)',
                  transition: 'transform 0.25s',
                }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER STRIP */}
        <div style={{
          borderTop: '1px solid rgba(192,57,43,0.1)',
          padding: '20px 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#080808',
        }}>
          <span style={{ fontSize: 11, color: '#333', fontFamily: 'sans-serif' }}>© 2025 Sattva Technologies LLC · Seekonk, MA · SAM.gov Active · CAGE 19CM8</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="tel:5083430101" style={{ fontSize: 11, color: '#444', fontFamily: 'sans-serif', textDecoration: 'none' }}>(508) 343-0101</a>
            <a href="mailto:apatel@sattvatech.com" style={{ fontSize: 11, color: '#444', fontFamily: 'sans-serif', textDecoration: 'none' }}>apatel@sattvatech.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}
