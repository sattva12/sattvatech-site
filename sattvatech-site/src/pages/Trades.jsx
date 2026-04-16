import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const T = {
  bg1: '#0e0e0e', bg2: '#131313', bg3: '#080808',
  accent: '#c0392b', accentHover: '#e74c3c',
  text1: '#f5f0e8', text2: '#e8e4dc', text3: '#ccc',
  text4: '#999', text5: '#666', text6: '#444', text7: '#222',
  border: 'rgba(192,57,43,0.15)',
}

const HOW_IT_WORKS = [
  { step: '01', title: 'You bring the skill', desc: 'You are a licensed or experienced tradesperson — plumber, electrician, carpenter, HVAC tech. You do great work but lack the GC license to pull permits on bigger jobs.' },
  { step: '02', title: 'We bring the license', desc: 'Our MA Unrestricted Construction Supervisor license (CS-122574) covers the project. We handle inspections, permit coordination, and AHJ approval.' },
  { step: '03', title: 'We bring the insurance', desc: 'Our umbrella policy covers the team on the job. You work with confidence. Clients get the compliance they need. Jobs get done.' },
  { step: '04', title: 'Everybody wins', desc: 'You access jobs you couldn\'t touch before. Clients get vetted, insured contractors. We build the network. Revenue is split fairly based on scope and responsibility.' },
]

const WHO_ITS_FOR = [
  { trade: 'Handymen & General Tradespeople', desc: 'Skilled workers who hit the ceiling on job size without a GC license.' },
  { trade: 'Specialty Contractors', desc: 'Plumbers, electricians, HVAC techs who need a GC to coordinate permitted projects.' },
  { trade: 'Small Crews & Partnerships', desc: 'Teams doing great residential work who want to move into commercial.' },
  { trade: 'Experienced Supers Without a License', desc: 'Field-proven professionals who supervise well but aren\'t licensed yet.' },
]

export default function Trades() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ name: '', email: '', trade: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: T.bg1, minHeight: '100vh', color: T.text2 }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: `${T.bg1}f5`, borderBottom: `1px solid ${T.border}`, padding: '0 2.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, color: T.accent }}>←</span>
          <img src="/sattva-logo.png" alt="Sattva" style={{ height: 28 }} />
          <span style={{ fontSize: 10, color: T.text4, fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Construction Supervision</span>
        </button>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {['How It Works', 'Who It\'s For', 'Join the Network'].map(s => (
            <button key={s} onClick={() => document.getElementById(s.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: T.text4, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = T.text4}
            >{s}</button>
          ))}
          <button onClick={() => document.getElementById('join-the-network')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '7px 14px', cursor: 'pointer', fontFamily: 'sans-serif' }}
          >Join the Network</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${T.accent}06 1px, transparent 1px), linear-gradient(90deg, ${T.accent}06 1px, transparent 1px)`, backgroundSize: '70px 70px' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 2.5rem', position: 'relative' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 20 }}>Division 02 · Licensed GC Umbrella Network</div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: T.text1, margin: '0 0 20px', maxWidth: 700 }}>
            Your skills.<br />
            <span style={{ color: T.accent }}>Our license.</span><br />
            Bigger jobs.
          </h1>
          <p style={{ fontSize: '1.1rem', color: T.text4, lineHeight: 1.75, maxWidth: 560, margin: '0 0 16px', fontFamily: 'sans-serif', fontWeight: 300 }}>
            Sattva Technologies holds an unrestricted Massachusetts Construction Supervisor License. We partner with skilled tradespeople and handymen to unlock permitted, inspected, insured work that was previously out of reach.
          </p>
          <p style={{ fontSize: '0.95rem', color: T.text5, lineHeight: 1.7, maxWidth: 560, margin: '0 0 44px', fontFamily: 'sans-serif', fontWeight: 300 }}>
            Think of it as a professional network — not just a referral list. We vet, insure, supervise, and grow together.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('join-the-network')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}>
              Join the Network →
            </button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: `1px solid ${T.accent}50`, color: T.accent, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', cursor: 'pointer', fontFamily: 'sans-serif' }}>
              How It Works
            </button>
          </div>

          {/* Key facts */}
          <div style={{ display: 'flex', gap: 40, marginTop: 72, paddingTop: 40, borderTop: `1px solid ${T.border}`, flexWrap: 'wrap' }}>
            {[['CS-122574', 'MA Unrestricted License'], ['Insured', 'Umbrella Coverage'], ['Permitted', 'Inspection Ready'], ['Vetted', 'Pre-Qualified Crews']].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: '1.2rem', color: T.accent, fontFamily: 'sans-serif' }}>{v}</div><div style={{ fontSize: 10, color: T.text5, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 4 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: T.bg2, padding: '80px 2.5rem', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>The Model</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 56px' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: `${T.accent}15` }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ background: T.bg2, padding: '40px 32px' }}>
                <div style={{ fontSize: 48, fontWeight: 400, color: `${T.accent}20`, fontFamily: 'sans-serif', marginBottom: 20, lineHeight: 1 }}>{step.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 400, color: T.text1, margin: '0 0 16px' }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: T.text5, fontFamily: 'sans-serif', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="who-it-s-for" style={{ background: T.bg1, padding: '80px 2.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Who This Is For</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 52px' }}>Built for skilled people hitting a ceiling</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {WHO_ITS_FOR.map((item, i) => (
              <div key={i} style={{ border: `1px solid ${T.border}`, padding: '32px 28px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 28, width: 40, height: 2, background: T.accent }} />
                <h3 style={{ fontSize: 15, fontWeight: 400, color: T.text2, margin: '0 0 12px' }}>{item.trade}</h3>
                <p style={{ fontSize: 13, color: T.text5, fontFamily: 'sans-serif', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* What we check */}
          <div style={{ marginTop: 56, padding: '36px 40px', border: `1px solid ${T.border}`, background: T.bg2 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 20 }}>What We Look For In Partners</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {['Demonstrated trade skill', 'Clean work history', 'Reliability and communication', 'Willingness to follow process', 'Insurance-ready (or we help)', 'Local to New England'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ color: T.accent, fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 13, color: T.text4, fontFamily: 'sans-serif' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN FORM */}
      <section id="join-the-network" style={{ background: T.bg2, padding: '80px 2.5rem', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: T.accent, textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'center' }}>Apply to Partner</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, color: T.text1, textAlign: 'center', margin: '0 0 12px' }}>Join the Network</h2>
          <p style={{ color: T.text5, fontFamily: 'sans-serif', fontSize: 14, textAlign: 'center', margin: '0 0 48px' }}>Tell us about yourself and your trade. We'll reach out to discuss fit and next steps.</p>
          {submitted ? (
            <div style={{ border: `1px solid ${T.accent}50`, padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 28, color: T.accent, marginBottom: 12 }}>✓</div>
              <div style={{ color: T.text2, fontFamily: 'sans-serif', fontSize: 15, marginBottom: 8 }}>Application received</div>
              <div style={{ color: T.text5, fontFamily: 'sans-serif', fontSize: 13 }}>We'll be in touch within a few business days.</div>
            </div>
          ) : (
            <form onSubmit={async e => { e.preventDefault(); const res = await fetch('https://formspree.io/f/mbdpkqyj', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) }); if (res.ok) setSubmitted(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input name="name" type="text" placeholder="Your Name" required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }} />
              <input name="email" type="email" placeholder="Email Address" required value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }} />
              <input name="trade" type="text" placeholder="Your Trade / Specialty" required value={formState.trade} onChange={e => setFormState({ ...formState, trade: e.target.value })} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }} />
              <textarea name="message" placeholder="Tell us about your experience, the types of jobs you do, and what you're looking for" required rows={5}
                value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.accent}25`, color: T.text2, padding: '13px 14px', fontSize: 13, fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', borderRadius: 0, boxSizing: 'border-box' }}
              />
              <button type="submit" style={{ background: T.accent, border: 'none', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '15px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}
                onMouseEnter={e => e.target.style.background = T.accentHover}
                onMouseLeave={e => e.target.style.background = T.accent}
              >Submit Application</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: T.bg3, padding: '24px 2.5rem', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 10, color: T.text7, fontFamily: 'sans-serif' }}>© 2025 Sattva Technologies LLC — Construction Supervision Division</span>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: T.text5, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>← Back to Sattva Technologies</button>
      </footer>
    </div>
  )
}
