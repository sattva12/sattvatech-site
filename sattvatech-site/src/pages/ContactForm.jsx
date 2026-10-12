import { useState } from 'react'

/* the same Formspree form the rest of the site uses; topic says which page it came from */
export default function ContactForm({ topic, prompt }) {
  const [state, setState] = useState('idle')
  const send = async (e) => {
    e.preventDefault(); setState('sending')
    try {
      const res = await fetch('https://formspree.io/f/mbdpkqyj', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) })
      setState(res.ok ? 'sent' : 'error')
    } catch (err) { setState('error') }
  }
  if (state === 'sent') return <p className="sm-sub" role="status">Thanks. We will get back to you within one business day.</p>
  return (
    <form className="sm-form" onSubmit={send}>
      <input type="hidden" name="topic" value={topic} />
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label className="wide">{prompt}<textarea name="message" rows="4" required /></label>
      <div className="wide"><button className="sm-btn go" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending' : 'Send'}</button>
        {state === 'error' && <span className="sm-err" role="alert"> That did not send. Email info@sattvatech.com instead.</span>}</div>
    </form>
  )
}
