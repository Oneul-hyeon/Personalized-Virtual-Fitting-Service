import { useState } from 'react'
import styles from './MyPage.module.css'
import LeftSubMyPage from './LeftSubMyPage'
import RightSubMyPage from './RightSubMyPage'
import Navigation from '../Navigationbar/Nav.js'
import { Navigate } from 'react-router-dom'
import MyPageAlert from './MyPageAlert'

function MyPage({ currPage = 'privacy' }) {
  const [page, setPage] = useState(currPage)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [errorCode, setErrorCode] = useState(false)

  const showAlert = (time = 3000) => {
    setIsShowAlert(true)
    setTimeout(() => {
      setIsShowAlert(false)
    }, time)
  }

  const changePage = (pageName) => {
    setPage(pageName)
  }

  const lsUser = JSON.parse(localStorage.getItem('user'))
  const lsToken = localStorage.getItem('token')

  if (lsUser && lsToken) {
    return (
      <>
        <Navigation />
        <div className={styles.mainContainer}>
          <LeftSubMyPage page={page} onClickHandler={changePage} />
          <RightSubMyPage
            page={page}
            showAlert={showAlert}
            setErrorCode={setErrorCode}
          />
        </div>
        <MyPageAlert
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

export default MyPage
