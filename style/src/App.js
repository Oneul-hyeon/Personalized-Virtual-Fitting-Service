import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './features/authSlices'
import MainPage from './components/MainPage/MainPage'
import FittingPage from './components/FittingPage/FittingPage.js'
import RecommendPage from './components/RecommendPage/RecommendPage.js'
import PolicyTerms from './components/Terms/PolicyTerms.js'
import PrivacyMain from './components/Terms/PrivacyMain.js'
import 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import MyPage from './components/MyPage/MyPage.js'
import ForumList from './components/ForumPage/ForumList'
import NewForumPost from './components/ForumPage/NewForumPost'
import { fetchForums } from './features/forumsSlice'
import ForumDetails from './components/ForumPage/ForumDetails'
import QnA from './components/QnAPage/QnAPage'

function App() {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const lsUser = JSON.parse(localStorage.getItem('user'))
  const lsToken = localStorage.getItem('token')

  //게시판
  useEffect(() => {
    dispatch(fetchForums())
  }, [dispatch])

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
      <Route path="/outfitforums" element={<ForumList />} />
      <Route path="/outfitforums/new" element={<NewForumPost />} />
      <Route path="/outfitforums/:id" element={<ForumDetails />} />
      <Route path="/qna" element={<QnA />} />
    </Routes>
  )
}

export default App
