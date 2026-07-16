import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Revenue from './pages/Revenue'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Settings from './pages/Settings'
import HelpCenter from './pages/HelpCenter'
import SalesReport from './pages/SalesReport'
import SignOut from './pages/SignOut'
import Messages from './pages/Messages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
           <Route path="/sales-report" element={<SalesReport />} />
           <Route path="/messages" element={<Messages />} />
            <Route path="/logout" element={<SignOut />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
