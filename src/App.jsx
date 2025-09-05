import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import AICreative from './pages/AICreative'
import Automation from './pages/Automation'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/ai-creative" element={<AICreative />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
