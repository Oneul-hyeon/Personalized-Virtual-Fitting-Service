import React, { useEffect, useState } from 'react'

import CardButton from './CardButton'
import ButtonBar from './ButtonBar'

import styles from './FittingPage.module.css'
import axios from 'axios'
import { API_URL } from '../../api/apiConfig'

// import peopleTest from '../../images/people-test.png'

function LeftFitContainer({
  setErrorCode,
  showAlert,
  fittingImage,
  isDefaultPage,
}) {
  const [image, setImage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user || !user._id) {
          console.error('User ID not found')
          return
        }
        const userId = user._id
        const response = await axios.get(`${API_URL}/userinfo/api/userimage`, {
          params: {
            userId: userId,
          },
        })
        setImage(response.data.image)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [])

  const defaultImageUrl = image

  return (
    <div>
      <ButtonBar setErrorCode={setErrorCode} showAlert={showAlert} />
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
