import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NAICS = [
  { code: '541330', label: 'Engineering Services', primary: true },
  { code: '236220', label: 'Commercial Building Construction' },
  { code: '238220', label: 'Plumbing, Heating & A/C' },
  { code: '238210', label: 'Electrical Contractors' },
  { code: '238910', label: 'Site Preparation' },
  { code: '562910', label: 'Remediation Services' },
]

const CAPABILITIES = [
  { icon: '◈', title: "Owner's Rep & PM", items: ['Pre-design through occupancy', 'MEP design-to-field coordination', 'Subcontractor assembly & vetting', 'Code compliance & AHJ approval'] },
  { icon: '⬡', title: 'MEP Coordination', items: ['Full MEP+AS integration', 'Clash detection — first-pass ready', 'Permit-ready drawing review', 'Submittal review & tracking'] },
  { icon: '◇', title: 'General Contracting', items: ['Trade bid solicitation & award', 'Pre-vetted subcontractor network', 'Budget management', 'Post-construction commissioning'] },
  { icon: '⬙', title: 'Mfg. & Process Eng.', items: ['Process-to-MEP integration', 'Lean / Six Sigma facility design', 'MIL-SPEC & aerospace standards', 'Capital equipment coordination'] },
]

const PAST_PERF = [
  { type: 'Industrial Production Facility', location: 'Central, MD', size: '300,000 SF', desc: 'Rehabilitation of abandoned industrial building. Full MEP design-build with process integration. 50% area occupancy in 5 months from construction start.' },
  { type: 'Regulated Production Facility', location: 'Attleboro, MA', size: 'Flagship', desc: 'Recognized #1 building in the city by municipal officials. All CO approvals on first submission.' },
  { type: 'Ground-Up Agricultural Facility', location: 'Uxbridge, MA', size: 'Ground-Up', desc: '12+ month timeline compressed to 4 months. 30–50% year-over-year operational cost reductions.' },
  { type: 'Commercial MEP Renovation', location: 'Pawtucket, RI', size: '20,000 SF', desc: 'Full MEP coordinated through preconstruction. Passed state inspection on first attempt.' },
  { type: 'Controlled-Environment Structures', location: 'Sheffield, MA', size: '2 Structures', desc: 'Delivered in 2 months vs. 12+ month standard lead time. Zero rework on accelerated schedule.' },
  { type: 'Large-Scale Industrial Facility', location: 'Central, DE', size: '500,000 SF', desc: 'Complete MEP design and process layout across 500,000 SF footprint.' },
]

const T = {
  bg1: '#0e0e0e', bg2: '#131313', bg3: '#080808',
  accent: '#c0392b', accentHover: '#e74c3c',
  text1: '#f5f0e8', text2: '#e8e4dc', text3: '#ccc',
  text4: '#999', text5: '#666', text6: '#444', text7: '#222',
  border: 'rgba(192,57,43,0.15)',
}

export default function Gov() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: T.bg1, minHeight: '100vh', color: T.text2 }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: `${T.bg1}f5`, borderBottom: `1px solid ${T.border}`, padding: '0 2.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, color: T.accent }}>←</span>
          <img src="/sattva-logo.png" alt="Sattva" style={{ height: 28 }} />
          <span style={{ fontSize: 10, color: T.text4, fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Government Contracting</span>
        </button>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {['Capabilities', 'Credentials', 'Past Performance', 'Contact'].map(s => (
            <button key={s} onClick={() => document.getElementById(s.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: T.text4, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = T.text4}
            >{s}</button>
          ))}
          <a href="/capability-statement.pdf" download style={{ fontSize: 10, color: T.accent, border: `1px solid ${T.accent}`, padding: '6px 12px', textDecoration: 'none', fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cap Statement ↓</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', background: `linear-gradient(160deg, ${T.bg1} 0%, ${T.bg2} 60%, ${T.bg1} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${T.accent}08 1px, transparent 1px), linear-gradient(90deg, ${T.accent}08 1px, transparent 1px)`, backgroundSize: '70px 70px' }} />
        <div style={{ position: 'absolute', right: '5%', top: '15%', width: 360, height: 360, borderRadius: '50%', border: `1px solid ${T.border}`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 2.5rem', position: 'relative' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 20 }}>Division 01 · Federal & State Contracting</div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: T.text1, margin: '0 0 20px' }}>
            Engineering precision.<br /><span style={{ color: T.accent }}>Government delivered.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: T.text4, lineHeight: 1.75, maxWidth: 580, margin: '0 0 44px', fontFamily: 'sans-serif', fontWeight: 300 }}>
            SAM.gov registered small business providing MEP coordination, construction management, and owner's representation to federal agencies, state entities, and prime contractors.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}
              onMouseEnter={e => e.target.style.background = T.accentHover}
              onMouseLeave={e => e.target.style.background = T.accent}
            >Get In Touch</button>
            <a href="/capability-statement.pdf" download
              style={{ background: 'none', border: `1px solid ${T.accent}50`, color: T.accent, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', fontFamily: 'sans-serif', textDecoration: 'none' }}
            >Capability Statement ↓</a>
          </div>
          <div style={{ display: 'flex', gap: 40, marginTop: 72, paddingTop: 40, borderTop: `1px solid ${T.border}`, flexWrap: 'wrap' }}>
            {[['25+', 'Yrs Experience'], ['500K SF', 'Largest Project'], ['6', 'Industry Sectors'], ['MA CS', 'Licensed GC']].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: '1.8rem', color: T.accent }}>{v}</div><div style={{ fontSize: 10, color: T.text5, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 4 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS BAR */}
      <section style={{ background: T.bg2, padding: '0 2.5rem', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', padding: '28px 0' }}>
          {[['UEI', 'MZ3PU9BANPS1'], ['CAGE Code', '19CM8'], ['SAM.gov', 'Active — 2027'], ['CS License', 'CS-122574'], ['OSHA', '10 Certified'], ['Entity', 'Small Business']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ fontSize: 9, color: T.text5, fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</span>
              <span style={{ fontSize: 13, color: T.text2, fontFamily: 'sans-serif' }}>{v}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: 9, color: T.accent, border: `1px solid ${T.accent}40`, padding: '4px 10px', fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>MBE In Progress</span>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" style={{ background: T.bg1, padding: '80px 2.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Core Competencies</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 52px' }}>What We Deliver</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: `${T.accent}15` }}>
            {CAPABILITIES.map((cap, i) => (
              <div key={i} style={{ background: T.bg1, padding: 36 }}>
                <div style={{ fontSize: 20, color: T.accent, marginBottom: 14 }}>{cap.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: T.text2, margin: '0 0 16px', fontFamily: 'sans-serif' }}>{cap.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cap.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 12, color: T.text5, fontFamily: 'sans-serif', padding: '4px 0 4px 12px', position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ position: 'absolute', left: 0, color: T.accent, fontSize: 8, top: 8 }}>—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {NAICS.map(n => (
              <div key={n.code} style={{ border: n.primary ? `1px solid ${T.accent}` : `1px solid ${T.accent}25`, padding: '8px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: n.primary ? T.accent : T.text6, fontFamily: 'monospace' }}>{n.code}</span>
                <span style={{ fontSize: 11, color: n.primary ? T.text3 : T.text6, fontFamily: 'sans-serif' }}>{n.label}</span>
                {n.primary && <span style={{ fontSize: 8, color: T.accent }}>★ PRIMARY</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST PERFORMANCE */}
      <section id="past-performance" style={{ background: T.bg2, padding: '80px 2.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Project History</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 52px' }}>Past Performance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: `${T.accent}10` }}>
            {PAST_PERF.map((p, i) => (
              <div key={i} style={{ background: T.bg2, padding: '32px 28px' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: T.text6, fontFamily: 'sans-serif' }}>{p.location}</span>
                  <span style={{ fontSize: 10, color: T.accent, border: `1px solid ${T.accent}40`, padding: '2px 8px', fontFamily: 'sans-serif' }}>{p.size}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 400, color: T.text2, margin: '0 0 12px' }}>{p.type}</h3>
                <p style={{ fontSize: 12, color: T.text5, fontFamily: 'sans-serif', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 11, color: T.text6, fontFamily: 'sans-serif' }}>MA · RI · DE · MD · Expanding nationwide</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: T.bg1, padding: '80px 2.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Get In Touch</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 48px' }}>Contact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48 }}>
            <div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: T.text5, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 8 }}>Contact</div>
                <div style={{ fontSize: 15, color: T.text2, marginBottom: 6 }}>Atul Patel, CEO</div>
                <a href="tel:5083430101" style={{ display: 'block', fontSize: 14, color: T.accent, fontFamily: 'sans-serif', marginBottom: 4, textDecoration: 'none' }}>(508) 343-0101</a>
                <a href="mailto:apatel@sattvatech.com" style={{ display: 'block', fontSize: 13, color: T.accent, fontFamily: 'sans-serif', textDecoration: 'none' }}>apatel@sattvatech.com</a>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: T.text5, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 8 }}>Registrations</div>
                <div style={{ fontSize: 12, color: T.text4, fontFamily: 'sans-serif', lineHeight: 1.8 }}>COMMBUYS (MA)<br />Ocean State Procures (RI)<br />SAM.gov — Active</div>
              </div>
              <a href="/capability-statement.pdf" download style={{ display: 'inline-block', border: `1px solid ${T.accent}`, color: T.accent, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '10px 16px', textDecoration: 'none', fontFamily: 'sans-serif' }}>↓ Capability Statement</a>
            </div>
            <div>
              {submitted ? (
                <div style={{ border: `1px solid ${T.accent}50`, padding: 36, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, color: T.accent, marginBottom: 10 }}>✓</div>
                  <div style={{ color: T.text2, fontFamily: 'sans-serif', fontSize: 14 }}>Message received — we'll be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={async e => { e.preventDefault(); const res = await fetch('https://formspree.io/f/mbdpkqyj', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) }); if (res.ok) setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[['name', 'text', 'Your Name', true], ['email', 'email', 'Email Address', true], ['company', 'text', 'Company / Organization', false]].map(([field, type, placeholder, req]) => (
                    <input key={field} name={field} type={type} placeholder={placeholder} required={req}
                      value={formState[field]} onChange={e => setFormState({ ...formState, [field]: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.accent}25`, color: T.text2, padding: '12px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, width: '100%', boxSizing: 'border-box' }}
                    />
                  ))}
                  <textarea name="message" placeholder="Tell us about your project or opportunity" required rows={4}
                    value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.accent}25`, color: T.text2, padding: '12px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', borderRadius: 0, width: '100%', boxSizing: 'border-box' }}
                  />
                  <button type="submit" style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}
                    onMouseEnter={e => e.target.style.background = T.accentHover}
                    onMouseLeave={e => e.target.style.background = T.accent}
                  >Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: T.bg3, padding: '24px 2.5rem', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 10, color: T.text7, fontFamily: 'sans-serif' }}>© 2025 Sattva Technologies LLC — Government Contracting Division</span>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: T.text5, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>← Back to Sattva Technologies</button>
      </footer>
    </div>
  )
}
