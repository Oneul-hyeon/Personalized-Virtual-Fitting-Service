import React from 'react'

import styles from './FittingPage.module.css'

function CardButton({ src, alt, text, onClick }) {
  return (
    <button className={styles.cardButton} onClick={onClick}>
      <img className={styles.btnImage} src={src} alt={alt} />
      <span className={styles.btnText}>{text}</span>
    </button>
  )
}

export default CardButton
