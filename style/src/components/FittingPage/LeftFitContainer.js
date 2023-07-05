import React, { useEffect, useState } from 'react'

import ButtonBar from './ButtonBar'

import styles from './FittingPage.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import getProfileImage from '../common/getProfileImage'

function LeftFitContainer({
  setErrorCode,
  showAlert,
  fittingImage,
  isDefaultPage,
  setIsDefaultPage,
  changeBackground,
}) {
  const [image, setImage] = useState('')

  useEffect(() => {
    getProfileImage(setImage)
  }, [])

  const defaultImageUrl = image

  return (
    <div>
      <ButtonBar
        setErrorCode={setErrorCode}
        showAlert={showAlert}
        setIsDefaultPage={setIsDefaultPage}
        image={image}
        changeBackground={changeBackground}
      />
      <div className={styles.imageContainer}>
        <img
          className={styles.fittingImage}
          src={isDefaultPage ? defaultImageUrl : fittingImage}
          alt="userImage"
        />
      </div>
    </div>
  )
}
export default LeftFitContainer
