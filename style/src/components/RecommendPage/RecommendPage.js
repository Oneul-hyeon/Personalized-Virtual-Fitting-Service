import React from 'react'
import Navigation from '../Navigationbar/Nav'
import Footer from '../Footer'
import './RecommendPage.css'
import comingSoonImage from '../../images/commingsoon.png'

function RecommendPage() {
  return (
    <div>
      <Navigation></Navigation>
      <div className="recommend-container">
        <h2>추천 시스템이 곧 도입됩니다.</h2>
        <p>최고의 제품을 추천 받아보세요.</p>
        <p>여러분께 딱 맞는 아이템을 찾아드립니다.</p>
        <h3>COMING SOON...</h3>
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
export default RecommendPage
