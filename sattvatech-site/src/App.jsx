import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Gov from './pages/Gov.jsx'
import Trades from './pages/Trades.jsx'
import AgTech from './pages/AgTech.jsx'
import Samana from './pages/Samana.jsx'
import Quote from './pages/Quote.jsx'
import Farmmetric from './pages/Farmmetric.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/gov" element={<Gov />} />
      <Route path="/trades" element={<Trades />} />
      <Route path="/agtech" element={<AgTech />} />
      <Route path="/samana" element={<Samana />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/farmmetric" element={<Farmmetric />} />
    </Routes>
  )
}
