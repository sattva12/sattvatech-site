import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Construction from './pages/Construction.jsx'
import LeanAg from './pages/LeanAg.jsx'
import Containers from './pages/Containers.jsx'
import Apps from './pages/Apps.jsx'
import Samana from './pages/Samana.jsx'
import Quote from './pages/Quote.jsx'
import Farmmetric from './pages/Farmmetric.jsx'

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
      <Route path="/quote" element={<Quote />} />
      <Route path="/farmmetric" element={<Farmmetric />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
