import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/authSlices'
import MainPage from './components/MainPage/MainPage'
import FittingPage from './components/FittingPage.js'
import RecommendPage from './components/RecommendPage.js'
import PolicyTerms from './components/Terms/PolicyTerms.js'
import PrivacyMain from './components/Terms/PrivacyMain.js'
import 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && token) {
      dispatch(login(user))
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/fitting" element={<FittingPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route exact path="/policyterms" element={<PolicyTerms />} />
      <Route exact path="/privacymain" element={<PrivacyMain />} />
    </Routes>
  )
}

export default App
