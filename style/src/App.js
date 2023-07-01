import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './features/authSlices'
import MainPage from './components/MainPage/MainPage'
import FittingPage from './components/FittingPage/FittingPage.js'
import RecommendPage from './components/RecommendPage.js'
import PolicyTerms from './components/Terms/PolicyTerms.js'
import PrivacyMain from './components/Terms/PrivacyMain.js'
import 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import MyPage from './components/MyPage/MyPage.js'

function App() {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const lsUser = JSON.parse(localStorage.getItem('user'))
  const lsToken = localStorage.getItem('token')

  useEffect(() => {
    if (!isAuthenticated && lsUser && lsToken) {
      dispatch(login({ user: lsUser, token: lsToken }))
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/fitting" element={<FittingPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route exact path="/policyterms" element={<PolicyTerms />} />
      <Route exact path="/privacymain" element={<PrivacyMain />} />
    </Routes>
  )
}

export default App
