import Navigation from '../Navigationbar/Nav'

import LeftFitContainer from './LeftFitContainer'
import RightFitContainer from './RightFitContainer'

import styles from './FittingPage.module.css'

import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import shoppingImage from '../../images/shopping-mall.png'

function FittingPage() {
  const user = useSelector((state) => state.auth.user)
  const [fittingImage, setFittingImage] = useState('')
  const [isDefaultPage, setIsDefaultPage] = useState(true)

  return (
    <>
      <Navigation />
      <div
        className={styles.mainContainer}
        style={{ backgroundImage: `url(${shoppingImage})` }}
      >
        <div className="empty-space" />
        <LeftFitContainer
          fittingImage={fittingImage}
          isDefaultPage={isDefaultPage}
        />
        <div className="empty-space" />
        <RightFitContainer
          setFittingImage={setFittingImage}
          setIsDefaultPage={setIsDefaultPage}
        />
        <div className="empty-space" />
      </div>
    </>
  )
}
export default FittingPage
