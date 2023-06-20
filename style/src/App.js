import React from 'react'
import MainPage from './components/MainPage.js'
import FittingPage from './components/FittingPage.js'
import RecommendPage from './components/RecommendPage.js'
import 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/fitting" element={<FittingPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
    </Routes>
  )
}

export default App
