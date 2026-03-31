import { useState, useEffect } from "react";

const THEMES = {
  navy: {
    bg1: "#0a1628", bg2: "#0d1e38", bg3: "#070f1e",
    accent: "#b4a06e", accentHover: "#c9b88a", accentText: "#0a1628",
    text1: "#f0ece4", text2: "#e8e4dc", text3: "#c8c2b4", text4: "#9a9488",
    text5: "#7a7468", text6: "#5a5448", text7: "#3a3830",
    border: "rgba(180,160,110,0.15)", borderAccent: "#b4a06e",
    grid: "rgba(180,160,110,0.6)", inputBg: "rgba(255,255,255,0.04)",
    inputBorder: "rgba(180,160,110,0.2)", cardHover: "#0d1e38", cardHover2: "#0c1a30",
    logoFilter: "brightness(10) saturate(0)",
  },
  red: {
    bg1: "#181818", bg2: "#202020", bg3: "#101010",
    accent: "#c0392b", accentHover: "#e74c3c", accentText: "#ffffff",
    text1: "#f5f5f5", text2: "#eeeeee", text3: "#cccccc", text4: "#999999",
    text5: "#777777", text6: "#555555", text7: "#333333",
    border: "rgba(192,57,43,0.2)", borderAccent: "#c0392b",
    grid: "rgba(192,57,43,0.5)", inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(192,57,43,0.25)", cardHover: "#242020", cardHover2: "#201c1c",
    logoFilter: "none",
  },
};

const NAV_LINKS = ["About", "Capabilities", "Credentials", "Past Performance", "Contact"];

const NAICS = [
  { code: "541330", label: "Engineering Services", primary: true },
  { code: "236220", label: "Commercial Building Construction" },
  { code: "238220", label: "Plumbing, Heating & A/C" },
  { code: "238210", label: "Electrical Contractors" },
  { code: "238910", label: "Site Preparation" },
  { code: "562910", label: "Remediation Services" },
  { code: "541512", label: "Computer Systems Design" },
  { code: "541620", label: "Environmental Consulting" },
];

const CAPABILITIES = [
  {
    title: "Owner's Representation & PM",
    icon: "◈",
    items: [
      "Pre-design through occupancy oversight",
      "MEP design-to-construction coordination",
      "Subcontractor assembly, vetting & management",
      "IBC/IRC/IEC code compliance & AHJ approval",
    ],
  },
  {
    title: "MEP Coordination & Engineering",
    icon: "⬡",
    items: [
      "Full MEP+AS integration including security systems",
      "Clash detection & resolution — field-ready on first pass",
      "Permit-ready drawing coordination & AutoCAD review",
      "Submittal review, tracking & schedule integration",
    ],
  },
  {
    title: "General Contracting & Procurement",
    icon: "◇",
    items: [
      "Trade bid solicitation, review & award",
      "Pre-vetted MEP, trades & specialty subcontractor network",
      "Budget management and cost control",
      "Post-construction commissioning & closeout",
    ],
  },
  {
    title: "Manufacturing & Process Engineering",
    icon: "⬙",
    items: [
      "Process-to-MEP integration from day one",
      "Lean / Six Sigma applied to facility design",
      "MIL-SPEC & aerospace quality standards",
      "Capital equipment installation coordination",
    ],
  },
];

const PAST_PERFORMANCE = [
  {
    type: "Industrial Production Facility",
    location: "Central, MD",
    size: "300,000 SF",
    description: "Rehabilitation of a large abandoned industrial building. Full MEP design-build with process integration driving the layout from day one. Achieved 50% area occupancy in just 5 months from construction start.",
    sector: "Industrial / Production",
  },
  {
    type: "Regulated Production Facility",
    location: "Attleboro, MA",
    size: "Flagship Build",
    description: "Recognized as the #1 building in the city by municipal officials. All licenses and certificates of occupancy approved on first submission. Full MEP coordination from preconstruction through closeout.",
    sector: "Regulated Production",
  },
  {
    type: "Ground-Up Agricultural Facility",
    location: "Uxbridge, MA",
    size: "Ground-Up Build",
    description: "Full MEP coordination from raw land through operations. 12+ month development timeline compressed to 4 months. 30–50% year-over-year operational cost reductions through process-driven MEP design.",
    sector: "Agricultural / Industrial",
  },
  {
    type: "Commercial MEP Renovation",
    location: "Pawtucket, RI",
    size: "20,000 SF",
    description: "MEP constructability analysis, high-level humidity control, and precision airflow systems. All trades coordinated through preconstruction. Secured occupancy and passed state inspection on first attempt.",
    sector: "Commercial",
  },
  {
    type: "Controlled-Environment Structures",
    location: "Sheffield, MA",
    size: "2 Structures",
    description: "Custom controlled-environment structures delivered in 2 months against a 12+ month standard lead time. Full MEP with zero rework under an accelerated schedule.",
    sector: "Specialty / Industrial",
  },
  {
    type: "Large-Scale Industrial Facility",
    location: "Central, DE",
    size: "500,000 SF",
    description: "Complete MEP design and process layout for a 500,000 SF industrial facility. Full mechanical, electrical, and plumbing system coordination across the entire footprint.",
    sector: "Industrial / Large-Scale",
  },
];

const CREDENTIALS = [
  { label: "MA CS License", value: "CS-122574", sub: "Expires 04/2029 — Unrestricted" },
  { label: "SAM.gov", value: "Active", sub: "Through 03/01/2027" },
  { label: "CAGE Code", value: "19CM8", sub: "UEI: MZ3PU9BANPS1" },
  { label: "OSHA", value: "10 Certified", sub: "OSHA 30 In Progress" },
  { label: "Kaizen", value: "Black Belt", sub: "ISO 9001 Familiar" },
  { label: "MBE / SDO", value: "In Progress", sub: "MA & NMSDC (~45%)" },
];

export default function App() {
  const [theme, setTheme] = useState("navy");
  const t = THEMES[theme];
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: t.bg1, minHeight: "100vh", color: t.text2, transition: "background 0.4s, color 0.4s" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? `${t.bg1}f5` : "transparent", borderBottom: scrolled ? `1px solid ${t.border}` : "none", transition: "all 0.3s", padding: "0 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/sattva-logo.png" alt="Sattva Technologies" style={{ height: 38, filter: t.logoFilter, objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: t.text2, fontFamily: "sans-serif", textTransform: "uppercase" }}>Technologies LLC</div>
              <div style={{ fontSize: 9, color: t.accent, letterSpacing: "0.15em", fontFamily: "sans-serif", textTransform: "uppercase" }}>Est. 2019 · Seekonk, MA</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{ background: "none", border: "none", color: t.text3, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" }}
                onMouseEnter={e => e.target.style.color = t.accent}
                onMouseLeave={e => e.target.style.color = t.text3}
              >{link}</button>
            ))}
            <a href="/capability-statement.pdf" download
              style={{ background: "none", border: `1px solid ${t.accent}`, color: t.accent, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "8px 14px", textDecoration: "none", fontFamily: "sans-serif" }}
              onMouseEnter={e => { e.target.style.background = t.accent; e.target.style.color = t.accentText; }}
              onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = t.accent; }}
            >Capability Statement ↓</a>
            {/* Theme toggle */}
            <button onClick={() => setTheme(theme === "navy" ? "red" : "navy")}
              style={{ background: "none", border: `1px solid ${t.border}`, color: t.text5, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 12px", cursor: "pointer", fontFamily: "sans-serif" }}
              title="Toggle color theme"
            >{theme === "navy" ? "⬤ Red" : "⬤ Navy"}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(160deg, ${t.bg1} 0%, ${t.bg2} 50%, ${t.bg1} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(${t.grid} 1px, transparent 1px), linear-gradient(90deg, ${t.grid} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", right: "8%", top: "20%", width: 400, height: 400, borderRadius: "50%", border: `1px solid ${t.border}`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "12%", top: "25%", width: 280, height: 280, borderRadius: "50%", border: `1px solid ${t.border}`, opacity: 0.5, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 2rem 80px", position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 28 }}>
            Seekonk, MA · Government & Commercial Contracting
          </div>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 400, lineHeight: 1.12, color: t.text1, margin: "0 0 12px", maxWidth: 760 }}>
            Engineering precision.<br />
            <span style={{ color: t.accent }}>Construction delivered.</span>
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: t.text4, lineHeight: 1.78, maxWidth: 600, margin: "24px 0 48px", fontFamily: "sans-serif", fontWeight: 300 }}>
            Sattva Technologies LLC eliminates project delays by ensuring 100% alignment between design drawings, building codes, and client specifications — delivering projects that pass inspection on the first attempt.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Contact")}
              style={{ background: t.accent, border: "none", color: t.accentText, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 32px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600 }}
              onMouseEnter={e => e.target.style.background = t.accentHover}
              onMouseLeave={e => e.target.style.background = t.accent}
            >Get In Touch</button>
            <button onClick={() => scrollTo("Capabilities")}
              style={{ background: "none", border: `1px solid ${t.accent}60`, color: t.accent, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 32px", cursor: "pointer", fontFamily: "sans-serif" }}
            >Our Capabilities →</button>
          </div>
          <div style={{ display: "flex", gap: 48, marginTop: 80, paddingTop: 48, borderTop: `1px solid ${t.border}`, flexWrap: "wrap" }}>
            {[["25+", "Years Experience"], ["500K SF", "Largest Single Project"], ["6", "Industry Sectors"], ["MA CS", "Licensed GC"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: t.accent }}>{val}</div>
                <div style={{ fontSize: 11, color: t.text5, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: t.bg2, padding: "100px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 20 }}>About the Company</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 400, color: t.text1, lineHeight: 1.2, margin: "0 0 28px" }}>Bridging design intent with construction reality</h2>
            <p style={{ color: t.text4, lineHeight: 1.85, margin: "0 0 18px", fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.95rem" }}>
              Atul Patel, CEO and founder, brings 25+ years spanning aerospace (GE, Pratt &amp; Whitney, Rolls Royce), automotive, semiconductor, and construction — a rare combination of manufacturing process engineer, mechanical engineer, and licensed general contractor.
            </p>
            <p style={{ color: t.text4, lineHeight: 1.85, margin: "0 0 18px", fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.95rem" }}>
              Sattva Technologies operates as a connector and project manager: identifying contracts, assembling the right subcontractor teams, and managing delivery end-to-end across government and commercial sectors.
            </p>
            <p style={{ color: t.text4, lineHeight: 1.85, margin: 0, fontFamily: "sans-serif", fontWeight: 300, fontSize: "0.95rem" }}>
              Our manufacturing engineering background means we catch what pure construction professionals miss — process-level integration before a single trade touches the field.
            </p>
          </div>
          <div style={{ border: `1px solid ${t.border}`, padding: 40, position: "relative" }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 2, background: t.accent }} />
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 28 }}>Corporate Data</div>
            {[
              ["UEI", "MZ3PU9BANPS1"], ["CAGE Code", "19CM8"], ["Entity Type", "Small Business"],
              ["SAM.gov", "Active through 03/01/2027"], ["Location", "Seekonk, MA"],
              ["Work Area", "Nationwide (NE preferred)"], ["State Registrations", "COMMBUYS · Ocean State Procures"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${t.bg1}60`, alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 11, color: t.text5, fontFamily: "sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{k}</span>
                <span style={{ fontSize: 12, color: t.text3, fontFamily: "sans-serif", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" style={{ background: t.bg1, padding: "100px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 16 }}>Core Competencies</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: t.text1 }}>What We Deliver</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: `${t.accent}18` }}>
            {CAPABILITIES.map((cap, i) => (
              <div key={i} style={{ background: t.bg1, padding: 40, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = t.cardHover}
                onMouseLeave={e => e.currentTarget.style.background = t.bg1}
              >
                <div style={{ fontSize: 22, color: t.accent, marginBottom: 16 }}>{cap.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: t.text2, margin: "0 0 18px", fontFamily: "sans-serif", lineHeight: 1.35 }}>{cap.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {cap.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 12, color: t.text5, fontFamily: "sans-serif", padding: "4px 0 4px 14px", position: "relative", lineHeight: 1.55 }}>
                      <span style={{ position: "absolute", left: 0, color: t.accent, fontSize: 9, top: 7 }}>—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: t.text5, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 20, textAlign: "center" }}>NAICS Codes</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {NAICS.map(n => (
                <div key={n.code} style={{ border: n.primary ? `1px solid ${t.accent}` : `1px solid ${t.accent}28`, padding: "8px 16px", display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: n.primary ? t.accent : t.text6, fontFamily: "monospace" }}>{n.code}</span>
                  <span style={{ fontSize: 11, color: n.primary ? t.text3 : t.text6, fontFamily: "sans-serif" }}>{n.label}</span>
                  {n.primary && <span style={{ fontSize: 8, color: t.accent }}>★ PRIMARY</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section id="credentials" style={{ background: t.bg2, padding: "100px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 16 }}>Certifications & Registrations</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: t.text1 }}>Credentials</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 20 }}>
            {CREDENTIALS.map((c, i) => (
              <div key={i} style={{ textAlign: "center", padding: "32px 16px", border: `1px solid ${t.border}`, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 36, height: 2, background: t.accent }} />
                <div style={{ fontSize: 10, letterSpacing: "0.18em", color: t.text5, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 10 }}>{c.label}</div>
                <div style={{ fontSize: 17, color: t.text2, fontWeight: 400, marginBottom: 6 }}>{c.value}</div>
                <div style={{ fontSize: 10, color: t.text6, fontFamily: "sans-serif" }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 44, padding: "24px 36px", border: `1px solid ${t.border}`, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: t.text5, fontFamily: "sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>Key Differentiators</span>
            {["Triple Discipline: Mfg. Engineer + ME + Licensed GC", "First-Pass Inspection Track Record", "500,000 SF Single-Project Delivery", "Real-Time Field Decisions", "Active MBE/SDO & NMSDC In Progress"].map((d, i) => (
              <span key={i} style={{ fontSize: 12, color: t.text4, fontFamily: "sans-serif" }}>· {d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PAST PERFORMANCE */}
      <section id="past-performance" style={{ background: t.bg1, padding: "100px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 16 }}>Project History</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: t.text1 }}>Past Performance</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: `${t.accent}10` }}>
            {PAST_PERFORMANCE.map((p, i) => (
              <div key={i} style={{ background: t.bg1, padding: "34px 30px", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = t.cardHover2}
                onMouseLeave={e => e.currentTarget.style.background = t.bg1}
              >
                <div style={{ fontSize: 10, color: t.accent, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 10 }}>{p.sector}</div>
                <h3 style={{ fontSize: 15, fontWeight: 400, color: t.text2, margin: "0 0 6px" }}>{p.type}</h3>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: t.text6, fontFamily: "sans-serif" }}>{p.location}</span>
                  <span style={{ fontSize: 10, color: t.accent, fontFamily: "sans-serif", border: `1px solid ${t.accent}40`, padding: "2px 8px" }}>{p.size}</span>
                </div>
                <p style={{ fontSize: 13, color: t.text5, fontFamily: "sans-serif", lineHeight: 1.68, margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: t.text6, fontFamily: "sans-serif" }}>
            Geographic coverage: MA · RI · DE · MD · and expanding nationwide
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: t.bg2, padding: "100px 2rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: t.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 16 }}>Get In Touch</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: t.text1, marginBottom: 14 }}>Contact</h2>
            <p style={{ color: t.text5, fontFamily: "sans-serif", fontSize: 14 }}>Government contracting, subcontracting opportunities, or project management engagements.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48 }}>
            <div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: t.text5, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 8 }}>Contact</div>
                <div style={{ fontSize: 16, color: t.text2, marginBottom: 6 }}>Atul Patel, CEO</div>
                <a href="tel:5089168447" style={{ display: "block", fontSize: 14, color: t.accent, fontFamily: "sans-serif", marginBottom: 4, textDecoration: "none" }}>(508) 916-8447</a>
                <a href="mailto:apatel@sattvatech.com" style={{ display: "block", fontSize: 13, color: t.accent, fontFamily: "sans-serif", textDecoration: "none" }}>apatel@sattvatech.com</a>
              </div>
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, color: t.text5, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 8 }}>Location</div>
                <div style={{ fontSize: 14, color: t.text4, fontFamily: "sans-serif", lineHeight: 1.6 }}>Seekonk, MA<br />Greater Boston / Providence Area</div>
              </div>
              <a href="/capability-statement.pdf" download
                style={{ display: "inline-block", border: `1px solid ${t.accent}`, color: t.accent, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 18px", textDecoration: "none", fontFamily: "sans-serif" }}
                onMouseEnter={e => { e.target.style.background = t.accent; e.target.style.color = t.accentText; }}
                onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = t.accent; }}
              >↓ Capability Statement</a>
            </div>
            <div>
              {submitted ? (
                <div style={{ border: `1px solid ${t.accent}50`, padding: 40, textAlign: "center" }}>
                  <div style={{ fontSize: 24, color: t.accent, marginBottom: 12 }}>✓</div>
                  <div style={{ color: t.text2, fontFamily: "sans-serif", fontSize: 15, marginBottom: 6 }}>Message received</div>
                  <div style={{ color: t.text5, fontFamily: "sans-serif", fontSize: 13 }}>We'll be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["name", "text", "Your Name", true], ["email", "email", "Email Address", true], ["company", "text", "Company / Organization", false]].map(([field, type, placeholder, req]) => (
                    <input key={field} type={type} placeholder={placeholder} required={req}
                      value={formState[field]} onChange={e => setFormState({ ...formState, [field]: e.target.value })}
                      style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 0, color: t.text2, padding: "13px 14px", fontSize: 13, fontFamily: "sans-serif", outline: "none", width: "100%", boxSizing: "border-box" }}
                    />
                  ))}
                  <textarea placeholder="Tell us about your project or opportunity" required rows={4}
                    value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                    style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 0, color: t.text2, padding: "13px 14px", fontSize: 13, fontFamily: "sans-serif", outline: "none", resize: "vertical", width: "100%", boxSizing: "border-box" }}
                  />
                  <button type="submit"
                    style={{ background: t.accent, border: "none", color: t.accentText, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "15px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600 }}
                    onMouseEnter={e => e.target.style.background = t.accentHover}
                    onMouseLeave={e => e.target.style.background = t.accent}
                  >Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: t.bg3, padding: "36px 2rem", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/sattva-logo.png" alt="Sattva" style={{ height: 22, filter: t.logoFilter, opacity: 0.35 }} />
            <span style={{ fontSize: 11, color: t.text7, fontFamily: "sans-serif" }}>© 2025 Sattva Technologies LLC · Seekonk, MA · SAM.gov Active · CAGE 19CM8</span>
          </div>
          <span style={{ fontSize: 11, fontFamily: "sans-serif" }}>
            <a href="mailto:apatel@sattvatech.com" style={{ color: t.text6, textDecoration: "none" }}>apatel@sattvatech.com</a>
            {" · "}
            <a href="tel:5089168447" style={{ color: t.text6, textDecoration: "none" }}>(508) 916-8447</a>
          </span>
        </div>
      </footer>

    </div>
  );
}
