import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RED = '#c0392b'
const CREAM = '#f5f0e8'
const CREAM2 = '#ede8de'
const CHARCOAL = '#1c1c1c'
const BORDER = '#d8d0c0'
const MUTED = '#5a5248'
const FAINT = '#6a6258'
const NAVY = '#1a2d4a'

const NAICS = [
  { code: '541330', label: 'Engineering Services', primary: true },
  { code: '236220', label: 'Commercial Building Construction' },
  { code: '238220', label: 'Plumbing, Heating & A/C' },
  { code: '238210', label: 'Electrical Contractors' },
  { code: '238910', label: 'Site Preparation Contractors' },
  { code: '562910', label: 'Remediation Services' },
]

const CAPABILITIES = [
  { title: "Owner's Representation & PM", items: ['Pre-design through occupancy oversight', 'MEP design-to-construction coordination', 'Subcontractor assembly, vetting & management', 'IBC/IRC code compliance & AHJ approval'] },
  { title: 'MEP Coordination & Engineering', items: ['Full MEP+AS integration', 'Clash detection — first-pass inspection ready', 'Permit-ready drawing coordination', 'Submittal review, tracking & schedule integration'] },
  { title: 'General Contracting', items: ['Trade bid solicitation, review & award', 'Pre-vetted subcontractor network', 'Budget management and cost control', 'Post-construction commissioning & closeout'] },
  { title: 'Manufacturing & Process Engineering', items: ['Process-to-MEP integration from day one', 'Lean / Six Sigma applied to facility design', 'MIL-SPEC & aerospace quality standards', 'Capital equipment installation coordination'] },
]

const PAST_PERF = [
  { type: 'Industrial Production Facility', location: 'Central, MD', size: '300,000 SF', desc: 'Rehabilitation of abandoned industrial building. Full MEP design-build. 50% area occupancy achieved in 5 months from construction start.' },
  { type: 'Regulated Production Facility', location: 'Attleboro, MA', size: 'Flagship Build', desc: 'Recognized #1 building in the city by municipal officials. All licenses and certificates of occupancy approved on first submission.' },
  { type: 'Ground-Up Agricultural Facility', location: 'Uxbridge, MA', size: 'Ground-Up', desc: '12+ month development timeline compressed to 4 months. 30–50% operational cost reductions through process-driven MEP design.' },
  { type: 'Commercial MEP Renovation', location: 'Pawtucket, RI', size: '20,000 SF', desc: 'Full MEP coordinated through preconstruction. Secured occupancy and passed state inspection on first attempt.' },
  { type: 'Controlled-Environment Structures', location: 'Sheffield, MA', size: '2 Structures', desc: 'Delivered in 2 months vs. 12+ month standard lead time. Zero rework on accelerated schedule.' },
  { type: 'Large-Scale Industrial Facility', location: 'Central, DE', size: '500,000 SF', desc: 'Complete MEP design and process layout across 500,000 SF industrial footprint.' },
]

function NavBar({ navigate }) {
  return (
    <nav style={{ background: CHARCOAL, padding: '0 2.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: RED, fontSize: 16 }}>←</span>
        <img src="/sattva-logo.png" alt="Sattva" style={{ height: 28, filter: 'brightness(10) saturate(0)' }} />
        <span style={{ fontSize: 10, color: '#aaa', fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Government Contracting</span>
      </button>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {['Capabilities', 'Past Performance', 'Contact'].map(s => (
          <button key={s} onClick={() => document.getElementById(s.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}
            onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = '#aaa'}
          >{s}</button>
        ))}
        <a href="/capability-statement.pdf" download style={{ fontSize: 10, color: RED, border: `1px solid ${RED}`, padding: '6px 14px', textDecoration: 'none', fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cap Statement ↓</a>
      </div>
    </nav>
  )
}

export default function Gov() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ fontFamily: "'Georgia',serif", background: CREAM, minHeight: '100vh', color: CHARCOAL }}>
      <NavBar navigate={navigate} />

      {/* PROFILE HEADER — FedLinks style */}
      <div style={{ paddingTop: 64 }}>
        <div style={{ background: CHARCOAL, padding: '48px 2.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Logo block */}
            <div style={{ background: '#fff', padding: '20px 28px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 180 }}>
              <img src="/sattva-logo.png" alt="Sattva Technologies" style={{ height: 56, objectFit: 'contain' }} />
            </div>
            {/* Company info */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 400, color: CREAM, margin: '0 0 6px' }}>Sattva Technologies LLC</h1>
              <p style={{ fontSize: 13, color: '#aaa', fontFamily: 'sans-serif', margin: '0 0 12px' }}>Seekonk, MA 02771 · (508) 343-0101 · <a href="mailto:apatel@sattvatech.com" style={{ color: RED, textDecoration: 'none' }}>apatel@sattvatech.com</a> · <a href="https://sattvatech.com" style={{ color: RED, textDecoration: 'none' }}>sattvatech.com</a></p>
              <p style={{ fontSize: 13, color: '#ccc', fontFamily: 'sans-serif', lineHeight: 1.7, maxWidth: 660, margin: '0 0 20px', fontWeight: 300 }}>
                Sattva Technologies LLC is a small business providing MEP coordination, construction management, and owner's representation services. With 25+ years spanning aerospace, semiconductor, and construction sectors, we bring manufacturing-grade process engineering to federal and commercial construction projects. SAM.gov registered and actively pursuing government contracting opportunities with DOD, USACE, and VA agencies.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['Small Business', 'SAM.gov Active', 'MBE In Progress', 'NMSDC ~45%', 'COMMBUYS Registered'].map(tag => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#aaa', border: '1px solid #444', padding: '3px 10px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CREDENTIALS PANEL — FedLinks data block style */}
        <div style={{ background: CREAM2, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
              {[
                { label: 'CAGE Code', value: '19CM8', link: 'https://sam.gov' },
                { label: 'SAM UEI', value: 'MZ3PU9BANPS1', link: 'https://sam.gov/entity/MZ3PU9BANPS1' },
                { label: 'SAM.gov Status', value: 'Active through 03/01/2027', link: 'https://sam.gov' },
                { label: 'CS License', value: 'CS-122574 (MA)', link: null },
                { label: 'Entity Type', value: 'Small Business', link: null },
                { label: 'State Registrations', value: 'COMMBUYS · Ocean State', link: null },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px 24px', borderRight: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 9, color: '#8a8278', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 6 }}>{item.label}</div>
                  {item.link
                    ? <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: NAVY, fontFamily: 'sans-serif', fontWeight: 500, textDecoration: 'underline' }}>{item.value}</a>
                    : <div style={{ fontSize: 14, color: CHARCOAL, fontFamily: 'sans-serif', fontWeight: 500 }}>{item.value}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NAICS CODES */}
        <div style={{ background: '#fff', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 2.5rem', display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 4, minWidth: 100 }}>NAICS Codes</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {NAICS.map(n => (
                <div key={n.code} style={{ border: n.primary ? `1.5px solid ${RED}` : `1px solid ${BORDER}`, padding: '7px 16px', display: 'flex', gap: 10, alignItems: 'center', background: n.primary ? 'rgba(192,57,43,0.04)' : '#fff' }}>
                  <span style={{ fontSize: 12, color: n.primary ? RED : '#8a8278', fontFamily: 'monospace', fontWeight: n.primary ? 600 : 400 }}>{n.code}</span>
                  <span style={{ fontSize: 12, color: n.primary ? CHARCOAL : FAINT, fontFamily: 'sans-serif' }}>{n.label}</span>
                  {n.primary && <span style={{ fontSize: 8, color: RED, letterSpacing: '0.08em' }}>PRIMARY</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK LINKS ROW — like FedLinks */}
        <div style={{ background: CREAM2, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 2.5rem', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', color: MUTED, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>Quick Links</div>
            {[
              { label: 'View Federal Past Performance (USASpending)', href: `https://www.usaspending.gov/search/?hash=` },
              { label: 'SAM.gov Registration', href: 'https://sam.gov' },
              { label: 'SBA Profile', href: 'https://web.sba.gov' },
              { label: 'Download Capability Statement', href: '/capability-statement.pdf', download: true },
            ].map((link, i) => (
              <a key={i} href={link.href} download={link.download} target={link.download ? undefined : '_blank'} rel="noreferrer"
                style={{ fontSize: 12, color: NAVY, fontFamily: 'sans-serif', textDecoration: 'underline' }}>{link.label}</a>
            ))}
          </div>
        </div>

        {/* CAPABILITIES */}
        <section id="capabilities" style={{ padding: '64px 2.5rem', background: CREAM }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 40, paddingBottom: 16, borderBottom: `2px solid ${BORDER}` }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 400, color: CHARCOAL, margin: 0 }}>Core Competencies</h2>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: RED, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>Wide Array of Services</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
              {CAPABILITIES.map((cap, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL, margin: '0 0 14px', fontFamily: 'sans-serif', paddingBottom: 8, borderBottom: `1px solid ${BORDER}` }}>{cap.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cap.items.map((item, j) => (
                      <li key={j} style={{ fontSize: 13, color: FAINT, fontFamily: 'sans-serif', padding: '5px 0 5px 14px', position: 'relative', lineHeight: 1.5 }}>
                        <span style={{ position: 'absolute', left: 0, color: RED, fontSize: 10, top: 8 }}>▸</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Differentiators */}
            <div style={{ marginTop: 48, padding: '28px 32px', background: CREAM2, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: MUTED, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 16 }}>Differentiators</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {['Triple Discipline: Mfg. Engineer + ME + Licensed GC', 'First-Pass Inspection Track Record', '500,000 SF Single-Project Delivery', 'Real-Time Field Decision Making', 'Active MBE/SDO & NMSDC Certifications In Progress', 'Registered on COMMBUYS & Ocean State Procures'].map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: RED, fontSize: 12, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: FAINT, fontFamily: 'sans-serif', lineHeight: 1.5 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAST PERFORMANCE */}
        <section id="past-performance" style={{ padding: '64px 2.5rem', background: '#fff', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 40, paddingBottom: 16, borderBottom: `2px solid ${BORDER}` }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 400, color: CHARCOAL, margin: 0 }}>Past Performance</h2>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: RED, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>MA · RI · DE · MD</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {PAST_PERF.map((p, i) => (
                <div key={i} style={{ border: `1px solid ${BORDER}`, padding: '24px', background: CREAM }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'flex-start', gap: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL, margin: 0, fontFamily: 'sans-serif', lineHeight: 1.3 }}>{p.type}</h3>
                    <span style={{ fontSize: 10, color: RED, border: `1px solid rgba(192,57,43,0.35)`, padding: '2px 8px', fontFamily: 'sans-serif', flexShrink: 0 }}>{p.size}</span>
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, fontFamily: 'sans-serif', marginBottom: 10 }}>{p.location}</div>
                  <p style={{ fontSize: 13, color: FAINT, fontFamily: 'sans-serif', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: '64px 2.5rem', background: CREAM2, borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ paddingBottom: 16, borderBottom: `2px solid ${BORDER}`, marginBottom: 40 }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 400, color: CHARCOAL, margin: 0 }}>Contact</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 56, alignItems: 'start' }}>
              <div>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 10, color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 10 }}>Primary Contact</div>
                  <div style={{ fontSize: 16, color: CHARCOAL, marginBottom: 4 }}>Atul Patel</div>
                  <div style={{ fontSize: 12, color: FAINT, fontFamily: 'sans-serif', marginBottom: 10 }}>CEO & Owner/Operator</div>
                  <a href="tel:5083430101" style={{ display: 'block', fontSize: 14, color: RED, fontFamily: 'sans-serif', marginBottom: 4, textDecoration: 'none' }}>(508) 343-0101</a>
                  <a href="mailto:apatel@sattvatech.com" style={{ display: 'block', fontSize: 13, color: RED, fontFamily: 'sans-serif', textDecoration: 'none' }}>apatel@sattvatech.com</a>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 10, color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 8 }}>Address</div>
                  <div style={{ fontSize: 13, color: FAINT, fontFamily: 'sans-serif', lineHeight: 1.7 }}>Seekonk, MA 02771<br />Greater Boston / Providence Area</div>
                </div>
                <a href="/capability-statement.pdf" download style={{ display: 'inline-block', background: RED, color: '#fff', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '11px 20px', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 600 }}>↓ Capability Statement</a>
              </div>
              <div>
                {submitted ? (
                  <div style={{ border: `1px solid ${BORDER}`, padding: 40, textAlign: 'center', background: '#fff' }}>
                    <div style={{ fontSize: 28, color: RED, marginBottom: 12 }}>✓</div>
                    <div style={{ color: CHARCOAL, fontFamily: 'sans-serif', fontSize: 15, marginBottom: 6 }}>Message received</div>
                    <div style={{ color: FAINT, fontFamily: 'sans-serif', fontSize: 13 }}>We'll be in touch shortly.</div>
                  </div>
                ) : (
                  <form onSubmit={async e => { e.preventDefault(); const res = await fetch('https://formspree.io/f/mbdpkqyj', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) }); if (res.ok) setSubmitted(true); }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[['name','text','Your Name',true],['email','email','Email Address',true],['company','text','Company / Organization',false]].map(([field,type,ph,req]) => (
                      <input key={field} name={field} type={type} placeholder={ph} required={req}
                        value={formState[field]} onChange={e => setFormState({...formState,[field]:e.target.value})}
                        style={{ background: '#fff', border: `1px solid ${BORDER}`, color: CHARCOAL, padding: '12px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, width: '100%', boxSizing: 'border-box' }} />
                    ))}
                    <textarea name="message" placeholder="Tell us about your project or contracting opportunity" required rows={4}
                      value={formState.message} onChange={e => setFormState({...formState,message:e.target.value})}
                      style={{ background: '#fff', border: `1px solid ${BORDER}`, color: CHARCOAL, padding: '12px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', borderRadius: 0, width: '100%', boxSizing: 'border-box' }} />
                    <button type="submit" style={{ background: RED, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}
                      onMouseEnter={e => e.target.style.background='#e74c3c'} onMouseLeave={e => e.target.style.background=RED}
                    >Send Message</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: CHARCOAL, padding: '20px 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 10, color: '#555', fontFamily: 'sans-serif' }}>© 2025 Sattva Technologies LLC — Government Contracting Division · CAGE 19CM8 · UEI MZ3PU9BANPS1</span>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#888', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>← Back to Sattva Technologies</button>
        </footer>
      </div>
    </div>
  )
}
