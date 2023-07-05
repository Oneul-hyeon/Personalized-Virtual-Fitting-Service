import Navigation from '../Navigationbar/Nav'

import LeftFitContainer from './LeftFitContainer'
import RightFitContainer from './RightFitContainer'

import styles from './FittingPage.module.css'

import React from 'react'
import { useState } from 'react'

import bg1 from '../../images/bg1.png'
import bg2 from '../../images/bg2.jpg'
import bg3 from '../../images/bg3.jpg'
import bg4 from '../../images/bg4.jpg'

import { Navigate } from 'react-router-dom'
import FittingPageAlert from './FittingPageAlert'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { current } from '@reduxjs/toolkit'

function FittingPage() {
  // const user = useSelector((state) => state.auth.user)
  const [fittingImage, setFittingImage] = useState('')
  const [isDefaultPage, setIsDefaultPage] = useState(true)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [errorCode, setErrorCode] = useState(null)
  const [bgIndex, setBgIndex] = useState(0)

  const backgroundList = [bg1, bg2, bg3, bg4]

  const lsUser = JSON.parse(localStorage.getItem('user'))
  const lsToken = localStorage.getItem('token')

  const showAlert = (time = 3000) => {
    setIsShowAlert(true)
    setTimeout(() => {
      setIsShowAlert(false)
    }, time)
  }

  const changeBackground = () =>
    setBgIndex((current) => (current + 1) % backgroundList.length)

  if (lsUser && lsToken) {
    return (
      <>
        <Navigation />
        <div
          className={styles.mainContainer}
          style={{
            backgroundImage: `url(${backgroundList[bgIndex]})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        >
          <div className="empty-space" />
          <LeftFitContainer
            fittingImage={fittingImage}
            setIsDefaultPage={setIsDefaultPage}
            isDefaultPage={isDefaultPage}
            setErrorCode={setErrorCode}
            showAlert={showAlert}
            changeBackground={changeBackground}
          />
          <div className="empty-space" />
          <RightFitContainer
            setFittingImage={setFittingImage}
            setIsDefaultPage={setIsDefaultPage}
            setErrorCode={setErrorCode}
            showAlert={showAlert}
          />
          <div className="empty-space" />
        </div>
        <FittingPageAlert
          errorCode={errorCode}
          isShowAlert={isShowAlert}
          setIsShowAlert={setIsShowAlert}
        />
      </>
    )
  } else {
    return <Navigate to={'/'} />
  }
}
export default FittingPage
