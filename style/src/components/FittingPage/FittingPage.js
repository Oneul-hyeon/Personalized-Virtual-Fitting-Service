import Navigation from '../Navigationbar/Nav'

import LeftFitContainer from './LeftFitContainer'
import RightFitContainer from './RightFitContainer'

import styles from './FittingPage.module.css'

import React from 'react'
import { useSelector } from 'react-redux'

import shoppingImage from '../../images/shopping-mall.png'

function FittingPage() {
  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <Navigation />
      <div
        className={styles.mainContainer}
        style={{ backgroundImage: `url(${shoppingImage})` }}
      >
        <div className="empty-space" />
        <LeftFitContainer />
        <div className="empty-space" />
        <RightFitContainer />
        <div className="empty-space" />
      </div>
    </>
  )
}
export default FittingPage
