import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const T = {
  bg1: '#f5f0e8', bg2: '#ede8de', bg3: '#1c1c1c',
  accent: '#c0392b', accentHover: '#a93226',
  text1: '#1c1c1c', text2: '#2a2522', text3: '#444',
  text4: '#5a5248', text5: '#6a6258', text6: '#8a8278', text7: '#ccc8be',
  border: '#d8d0c0',
}

const SERVICES = [
  { icon: '◈', title: 'CEA Facility Design', items: ['Controlled-environment MEP from day one', 'HVAC, lighting, irrigation integration', 'Process flow engineered before construction', 'Inspection-ready on first submission'] },
  { icon: '⬡', title: 'Process Engineering', items: ['Production workflow optimization', 'Lean / Six Sigma applied to ag operations', '30–50% operational cost reductions', 'Equipment selection & installation'] },
  { icon: '◇', title: 'Farmetric Platform', items: ['Farm operations management software', 'Environmental monitoring & controls', 'Production tracking & compliance', 'Data-driven yield optimization'] },
  { icon: '◉', title: 'Sectors Served', items: ['Indoor vertical farming', 'Greenhouse & controlled-environment ag', 'Specialty crop production facilities', 'Research & development farm builds'] },
]

const PROJECTS = [
  { type: 'Ground-Up Agricultural Facility', location: 'Uxbridge, MA', desc: '12+ month development compressed to 4 months. Full MEP from raw land through operations. 30–50% year-over-year cost reductions through process-driven design.' },
  { type: 'Emergency CEA Structures', location: 'Sheffield, MA', desc: 'Two custom controlled-environment structures engineered and delivered in 2 months against a 12+ month standard lead time. Zero rework.' },
  { type: 'Lab & Production Integration', location: 'Attleboro, MA', desc: 'Designed lab, kitchen, and processing equipment layouts integrated directly into MEP — systems built around the operation, not retrofitted.' },
]

export default function AgTech() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ name: '', email: '', project: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: T.bg1, minHeight: '100vh', color: T.text2 }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#1c1c1c', borderBottom: `1px solid ${T.border}`, padding: '0 2.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, color: T.accent }}>←</span>
          <img src="/sattva-logo.png" alt="Sattva" style={{ height: 28 }} />
          <span style={{ fontSize: 10, color: T.text4, fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AgTech & Farmetric</span>
        </button>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {['Services', 'Projects', 'Farmetric', 'Contact'].map(s => (
            <button key={s} onClick={() => document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: T.text4, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = T.text4}
            >{s}</button>
          ))}
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '7px 14px', cursor: 'pointer', fontFamily: 'sans-serif' }}>
            Get In Touch
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${T.accent}06 1px, transparent 1px), linear-gradient(90deg, ${T.accent}06 1px, transparent 1px)`, backgroundSize: '70px 70px' }} />
        <div style={{ position: 'absolute', right: '5%', top: '15%', width: 360, height: 360, borderRadius: '50%', border: `1px solid ${T.border}`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 2.5rem', position: 'relative' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 20 }}>Division 03 · Agricultural Technology</div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: T.text1, margin: '0 0 20px', maxWidth: 700 }}>
            Engineering meets<br />
            <span style={{ color: T.accent }}>the farm.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: T.text4, lineHeight: 1.75, maxWidth: 560, margin: '0 0 16px', fontFamily: 'sans-serif', fontWeight: 300 }}>
            25 years of process engineering applied to controlled-environment agriculture. We design and build facilities where MEP systems, production workflows, and technology are integrated from the first drawing — not retrofitted after the fact.
          </p>
          <p style={{ fontSize: '0.95rem', color: T.text5, lineHeight: 1.7, maxWidth: 560, margin: '0 0 44px', fontFamily: 'sans-serif', fontWeight: 300 }}>
            Plus Farmetric — our farm operations management platform built from real experience running these facilities.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}>
              Start a Project
            </button>
            <button onClick={() => document.getElementById('farmetric')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: `1px solid ${T.accent}50`, color: T.accent, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', cursor: 'pointer', fontFamily: 'sans-serif' }}>
              Farmetric Platform →
            </button>
          </div>
          <div style={{ display: 'flex', gap: 40, marginTop: 72, paddingTop: 40, borderTop: `1px solid ${T.border}`, flexWrap: 'wrap' }}>
            {[['4 Months', 'Fastest Ground-Up Build'], ['30-50%', 'Operational Cost Reduction'], ['20K–500K', 'SF Range Delivered'], ['Zero Rework', 'First-Pass Inspection Record']].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: '1.1rem', color: T.accent, fontFamily: 'sans-serif' }}>{v}</div><div style={{ fontSize: 10, color: T.text5, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 4 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: T.bg2, padding: '80px 2.5rem', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>What We Do</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 52px' }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: `${T.accent}15` }}>
            {SERVICES.map((svc, i) => (
              <div key={i} style={{ background: T.bg2, padding: 36 }}>
                <div style={{ fontSize: 20, color: T.accent, marginBottom: 14 }}>{svc.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: T.text2, margin: '0 0 16px', fontFamily: 'sans-serif' }}>{svc.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {svc.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 12, color: T.text5, fontFamily: 'sans-serif', padding: '4px 0 4px 12px', position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ position: 'absolute', left: 0, color: T.accent, fontSize: 8, top: 8 }}>—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: T.bg1, padding: '80px 2.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Project Experience</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 52px' }}>What We've Built</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: `${T.accent}10` }}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ background: T.bg1, padding: '36px 32px' }}>
                <div style={{ fontSize: 12, color: T.text6, fontFamily: 'sans-serif', marginBottom: 10 }}>{p.location}</div>
                <h3 style={{ fontSize: 16, fontWeight: 400, color: T.text2, margin: '0 0 14px' }}>{p.type}</h3>
                <p style={{ fontSize: 13, color: T.text5, fontFamily: 'sans-serif', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FARMETRIC */}
      <section id="farmetric" style={{ background: T.bg2, padding: '80px 2.5rem', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 16 }}>The Platform</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: T.text1, margin: '0 0 20px', lineHeight: 1.2 }}>Farmetric</h2>
            <p style={{ fontSize: '1rem', color: T.text4, lineHeight: 1.8, margin: '0 0 20px', fontFamily: 'sans-serif', fontWeight: 300 }}>
              Farm operations management built by people who have actually designed, built, and run these facilities — not software engineers guessing at what farmers need.
            </p>
            <p style={{ fontSize: '0.95rem', color: T.text5, lineHeight: 1.75, margin: '0 0 36px', fontFamily: 'sans-serif', fontWeight: 300 }}>
              Farmetric brings process engineering discipline to daily farm management: environmental monitoring, production tracking, compliance documentation, and data-driven insights to continuously reduce costs and increase yields.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Environmental Monitoring', 'Production Tracking', 'Compliance Docs', 'Yield Analytics', 'Cost Optimization', 'Mobile Ready'].map(tag => (
                <span key={tag} style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: T.text5, border: `1px solid ${T.border}`, padding: '4px 10px' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ border: `1px solid ${T.border}`, padding: 40, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: 40, right: 40, height: 2, background: T.accent }} />
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 28 }}>Platform Status</div>
            {[
              ['Status', 'In Active Development'],
              ['Focus', 'CEA & Indoor Farming'],
              ['Built From', 'Real Facility Experience'],
              ['Integration', 'MEP + Process + Operations'],
              ['Availability', 'Early Access — Contact Us'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid rgba(255,255,255,0.04)`, alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 11, color: T.text5, fontFamily: 'sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{k}</span>
                <span style={{ fontSize: 12, color: T.text3, fontFamily: 'sans-serif', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ marginTop: 28, width: '100%', background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '13px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}>
              Request Early Access
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: T.bg1, padding: '80px 2.5rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Start a Conversation</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 12px' }}>Contact</h2>
          <p style={{ color: T.text5, fontFamily: 'sans-serif', fontSize: 14, textAlign: 'center', margin: '0 0 48px' }}>Facility design, Farmetric early access, or process engineering questions.</p>
          {submitted ? (
            <div style={{ border: `1px solid ${T.accent}50`, padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 28, color: T.accent, marginBottom: 12 }}>✓</div>
              <div style={{ color: T.text2, fontFamily: 'sans-serif', fontSize: 15 }}>Message received — we'll be in touch shortly.</div>
            </div>
          ) : (
            <form onSubmit={async e => { e.preventDefault(); const res = await fetch('https://formspree.io/f/mbdpkqyj', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) }); if (res.ok) setSubmitted(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input name="name" type="text" placeholder="Your Name" required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} style={{ background: '#fff', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }} />
              <input name="email" type="email" placeholder="Email Address" required value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} style={{ background: '#fff', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }} />
              <input name="project" type="text" placeholder="Project Type / Interest" required value={formState.project} onChange={e => setFormState({ ...formState, project: e.target.value })} style={{ background: '#fff', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }} />
              <textarea name="message" placeholder="Tell us about your project or what you're looking to build" required rows={5}
                value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                style={{ background: '#fff', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', borderRadius: 0, boxSizing: 'border-box' }}
              />
              <button type="submit" style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '15px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}
                onMouseEnter={e => e.target.style.background = T.accentHover}
                onMouseLeave={e => e.target.style.background = T.accent}
              >Send Message</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: T.bg3, padding: '24px 2.5rem', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 10, color: T.text7, fontFamily: 'sans-serif' }}>© 2025 Sattva Technologies LLC — AgTech & Farmetric Division</span>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: T.text5, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>← Back to Sattva Technologies</button>
      </footer>
    </div>
  )
}
