import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Top, Foot } from './Shell.jsx'
import ContactForm from './pages/ContactForm.jsx'
import { TEL, TEL_HREF, MAIL } from './Chrome.jsx'
import './site.css'
import './v3.css'

/* The v3 page kit (2026-10-12): the inner pages are built from the same parts as the home page,
   so every page wears the drawing-set look. */

/* a link that uses the router for our own pages and leaves for anything else */
export function Go({ to, className, children }) {
  if (to.startsWith('/') && !to.startsWith('/#') && !to.includes('.')) return <Link to={to} className={className}>{children}</Link>
  return <a href={to} className={className}>{children}</a>
}

/* acts: [[href, label, kind]] where kind is 'go' (solid), 'line' (outline) or 'ink' */
export function Acts({ acts, className = '' }) {
  if (!acts || !acts.length) return null
  return <div className={'sx-acts ' + className}>{acts.map(([to, label, kind = 'line']) => <Go key={label} to={to} className={'sx-btn sx-btn-' + kind}>{label}</Go>)}</div>
}

export function Page({ here, title, children, className = '' }) {
  useEffect(() => { document.title = title }, [title])
  useEffect(() => { if (window.location.hash) { const el = document.getElementById(window.location.hash.slice(1)); if (el) el.scrollIntoView() } }, [])
  return (
    <div className={'sx ' + className}>
      <Top here={here} />
      <main>{children}</main>
      <Foot />
    </div>
  )
}

/* the dark opening of an inner page: the headline, a line or two, the buttons, an optional picture,
   and an optional title block of facts under it */
export function Hero({ title, lede, acts, aside, tb, c, kicker }) {
  return (
    <section className={'sx-open sx-ihero' + (c ? ' sx-c-' + c : '')} id="top">
      <div className="sx-wrap">
        <div className={'sx-ihero-in' + (aside ? ' has-aside' : '')}>
          <div>
            {kicker && <p className="sx-kicker">{kicker}</p>}
            <h1>{c && <i aria-hidden="true" />}{title}</h1>
            <p className="sx-ihero-lede">{lede}</p>
            <Acts acts={acts} />
          </div>
          {aside && <div className="sx-ihero-aside">{aside}</div>}
        </div>
        {tb && <dl className="sx-title sx-title-n">{tb.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
      </div>
    </section>
  )
}

export function Sec({ id, title, sub, children, tone, wide }) {
  return (
    <section className={'sx-sec' + (tone ? ' sx-' + tone : '')} id={id} aria-labelledby={id ? id + '-h' : undefined}>
      <div className="sx-wrap">
        {title && (
          <header className={'sx-ih' + (wide ? ' wide' : '')}>
            <h2 id={id ? id + '-h' : undefined}>{title}</h2>
            {sub && <p>{sub}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

/* a specification: rows of [term, value] or [term, value, tag] */
export function Spec({ rows, dark }) {
  const three = rows.some((r) => r.length > 2)
  return (
    <dl className={'sx-spec' + (three ? ' sx-spec3' : '') + (dark ? ' sx-spec-dark' : '')}>
      {rows.map(([a, b, c]) => <div key={a}><dt>{a}</dt><dd>{b}</dd>{three && <dd className="tag">{c}</dd>}</div>)}
    </dl>
  )
}

/* steps that happen in order: numbered */
export function Steps({ steps }) {
  return <ol className="sx-run sx-run-row">{steps.map(([k, v], n) => <li key={k}><span>{n + 1}</span><b>{k}</b><p>{v}</p></li>)}</ol>
}

/* a price list: [name, what, price, unit] */
export function Prices({ title, sub, rows, foot, acts }) {
  return (
    <div className="sx-prices">
      {title && <h3>{title}</h3>}
      {sub && <p className="sx-prices-sub">{sub}</p>}
      <dl>{rows.map(([a, b, p, u]) => <div key={a}><dt><b>{a}</b><span>{b}</span></dt><dd>{p}{u && <small>{u}</small>}</dd></div>)}</dl>
      {foot && <p className="sx-prices-foot">{foot}</p>}
      <Acts acts={acts} />
    </div>
  )
}

/* a band that bridges to another page */
export function Band({ children, acts }) {
  return (
    <div className="sx-free sx-band">
      <p>{children}</p>
      <Acts acts={acts} />
    </div>
  )
}

export function Talk({ title = 'Talk about a project.', sub = 'Tell us where it is, what it is, and when it needs to be done.', topic, prompt }) {
  return (
    <section className="sx-sec sx-talk" id="talk" aria-labelledby="talk-h">
      <div className="sx-wrap sx-talk-in">
        <div>
          <h2 id="talk-h">{title}</h2>
          <p>{sub}</p>
          <a className="sx-talk-tel" href={TEL_HREF}>{TEL}</a>
          <a className="sx-talk-mail" href={'mailto:' + MAIL}>{MAIL}</a>
        </div>
        <div className="sx-form"><ContactForm topic={topic} prompt={prompt} /></div>
      </div>
    </section>
  )
}

/* the end of a page: a last word and the buttons */
export function End({ title, children, acts }) {
  return (
    <section className="sx-sec sx-end">
      <div className="sx-wrap sx-end-in">
        <h2>{title}</h2>
        <div><p>{children}</p><Acts acts={acts} /></div>
      </div>
    </section>
  )
}

/* How we build a team (Atul, 2026-10-12, 21:19): we can do the work, and we partner well with the other trades
   through project management, communication and a finished product to aim at (the production process brought
   to construction); every process defined and labelled, improved every time; a job for everyone, matched to
   their skills; across Takeoff and Lean. */
const TEAM = [
  ['The finished product first', 'We bring the production side to construction. Before the first wall goes up, every trade knows what the finished building has to do, so the whole team is aiming at the same thing.'],
  ['Every process defined', 'Each step is named, written down and labelled with who does it, what it needs and how it is checked. Every time we run it, we make it better.'],
  ['A job for everyone', "We find each person's skill set and give everyone a clear job, on our crew and on the partner trades alike."],
  ['Partners, kept in the loop', 'We do the work ourselves, and we partner well with other trades. Project management and plain communication: the same plan, the same changes and the same dates for everyone, so nobody waits on a phone call.'],
]
const TEAM_APP = [
  ['Takeoff', 'Every piece of work defined, priced and tagged with the trade that does it.'],
  ['Lean', 'Every step in order, with who is on it, what it needs and when, checked off as it is done.'],
  ['Portals', 'The crew, subs and partner trades each get their own page with their part of the job, and never your prices.'],
]
export function TeamBuild({ id = 'team', tone = 'alt' }) {
  return (
    <Sec id={id} tone={tone} title="How we build a team." sub="We can do the work, and we partner well with the other trades. Good project management, clear communication and a finished product to aim at give the whole team the same target.">
      <div className="sx-two">
        <div>
          <h3 className="sx-h3">How we run it</h3>
          <Spec rows={TEAM} />
        </div>
        <div>
          <h3 className="sx-h3">Across Takeoff and Lean</h3>
          <Spec rows={TEAM_APP} />
          <p className="sx-note">The same way of working runs a construction job, a farm season or a production run.</p>
        </div>
      </div>
    </Sec>
  )
}
