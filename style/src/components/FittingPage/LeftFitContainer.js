import React from 'react'
import { useSelector } from 'react-redux'

import CardButton from './CardButton'
import ButtonBar from './ButtonBar'

import styles from './FittingPage.module.css'

import peopleTest from '../../images/people-test.png'

function LeftFitContainer() {
  return (
    <div>
      <ButtonBar />
      <div className={styles.imageContainer}>
        <img
          className={styles.fittingImage}
          src={peopleTest}
          alt="after-fitting"
        />
      </div>
    </div>
  )
}
export default LeftFitContainer
