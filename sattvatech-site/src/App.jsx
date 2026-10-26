import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

/* old addresses for the contractor page (CQS): keep any #part or ?query (Atul, Oct 19 11:51) */
function ToContractors() {
  const { search, hash } = useLocation()
  return <Navigate to={'/contractors' + search + hash} replace />
}
import Home from './pages/HomeNew.jsx'
import Construction from './pages/Construction.jsx'
import LeanAg from './pages/LeanAg.jsx'
import Containers from './pages/Containers.jsx'
import Apps from './pages/Apps.jsx'
import Samana from './pages/Samana.jsx'
import Quote, { Paid } from './pages/Quote.jsx'
import Farmmetric from './pages/Farmmetric.jsx'
import Legal from './pages/Legal.jsx'

function Go({ to }) { if (typeof window !== 'undefined') window.location.replace(to); return null }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trades" element={<Construction />} />
      <Route path="/agtech" element={<LeanAg />} />
      <Route path="/construction" element={<Construction />} />
      <Route path="/lean-ag" element={<LeanAg />} />
      <Route path="/containers" element={<Containers />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/sign-in" element={<Apps />} />
      <Route path="/samana" element={<Samana />} />
      <Route path="/contractors" element={<Quote />} />
      <Route path="/contractors/paid" element={<Paid />} />
      <Route path="/contractors/thanks" element={<Paid />} />
      <Route path="/thanks" element={<Paid />} />
      <Route path="/contractors/privacy" element={<Legal which="privacy" />} />
      <Route path="/contractors/terms" element={<Legal which="terms" />} />
      <Route path="/quote" element={<ToContractors />} />
      <Route path="/handyman" element={<ToContractors />} />
      <Route path="/farmmetric" element={<Farmmetric />} />
      <Route path="/farms" element={<Go to="/#farms" />} />
      <Route path="/contact" element={<Go to="/#talk" />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
