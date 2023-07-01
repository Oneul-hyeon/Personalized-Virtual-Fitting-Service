import { useEffect, useRef, useState } from 'react'
import styles from './MyPage.module.css'
import LeftSubMyPage from './LeftSubMyPage'
import RightSubMyPage from './RightSubMyPage'
import Navigation from '../Navigationbar/Nav.js'
import { useSelector } from 'react-redux'

function MyPage() {
  const [page, setPage] = useState('privacy')
  const changePage = (pageName) => {
    setPage(pageName)
    console.log(pageName)
  }

  return (
    <>
      <Navigation />
      <div className={styles.mainContainer}>
        <LeftSubMyPage page={page} onClickHandler={changePage} />
        <RightSubMyPage page={page} />
      </div>
    </>
  )
}

export default MyPage
