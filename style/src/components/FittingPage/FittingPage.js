import Navigation from '../Navigationbar/Nav'

import LeftFitContainer from './LeftFitContainer'
import RightFitContainer from './RightFitContainer'

import styles from './FittingPage.module.css'

import React from 'react'
import { useState } from 'react'

import shoppingImage from '../../images/shopping-mall.png'
import { Navigate } from 'react-router-dom'
import FittingPageAlert from './FittingPageAlert'

function FittingPage() {
  // const user = useSelector((state) => state.auth.user)
  const [fittingImage, setFittingImage] = useState('')
  const [isDefaultPage, setIsDefaultPage] = useState(true)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [errorCode, setErrorCode] = useState(null)

  const lsUser = JSON.parse(localStorage.getItem('user'))
  const lsToken = localStorage.getItem('token')

  const showAlert = (time = 3000) => {
    setIsShowAlert(true)
    setTimeout(() => {
      setIsShowAlert(false)
    }, time)
  }

  if (lsUser && lsToken) {
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
            setErrorCode={setErrorCode}
            showAlert={showAlert}
          />
          <div className="empty-space" />
          <RightFitContainer
            setFittingImage={setFittingImage}
            setIsDefaultPage={setIsDefaultPage}
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
