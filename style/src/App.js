import React from 'react'
import MainPage from './components/MainPage/MainPage'
import FittingPage from './components/FittingPage/FittingPage.js'
import RecommendPage from './components/RecommendPage.js'
import PolicyTerms from './components/Terms/PolicyTerms.js'
import PrivacyMain from './components/Terms/PrivacyMain.js'
import 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import MyPage from './components/MyPage/MyPage.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/fitting" element={<FittingPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route exact path="/policyterms" element={<PolicyTerms />} />
      <Route exact path="/privacymain" element={<PrivacyMain />} />
    </Routes>
  )
}

export default App
