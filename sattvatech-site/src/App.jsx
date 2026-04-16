import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Gov from './pages/Gov.jsx'
import Trades from './pages/Trades.jsx'
import AgTech from './pages/AgTech.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/gov" element={<Gov />} />
      <Route path="/trades" element={<Trades />} />
      <Route path="/agtech" element={<AgTech />} />
    </Routes>
  )
}
