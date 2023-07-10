import React from 'react'
import Navigation from '../Navigationbar/Nav'
import Footer from '../Footer'
import './QnAPage.css'
import comingSoonImage from '../../images/commingsoon.png'

function QnAPage() {
  return (
    <div>
      <Navigation></Navigation>
      <div className="qna-container">
        <h2>QnA 페이지는 개설 중입니다.</h2>
        <p>조그만 기다려 주세요.</p>
        <img
          src={comingSoonImage}
          alt="Coming Soon"
          className="coming-soon-image"
        />
      </div>
      <Footer></Footer>
    </div>
  )
}
export default QnAPage
