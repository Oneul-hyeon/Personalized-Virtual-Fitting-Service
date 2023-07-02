import { useState } from 'react'
import styles from './MyPage.module.css'
import LeftSubMyPage from './LeftSubMyPage'
import RightSubMyPage from './RightSubMyPage'
import Navigation from '../Navigationbar/Nav.js'
import { Navigate } from 'react-router-dom'
import AlertMessage from './AlertMessage'

function MyPage({ currPage = 'privacy' }) {
  const [page, setPage] = useState(currPage)
  const [isSaveComplete, setIsSaveComplete] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [errorCode, setErrorCode] = useState(false)

  const changePage = (pageName) => {
    setPage(pageName)
  }

  const lsUser = JSON.parse(localStorage.getItem('user'))
  const lsToken = localStorage.getItem('token')

  if (lsUser && lsToken) {
    return (
      <>
        <div className={styles.myPageRoot}></div>
        <Navigation />
        <div className={styles.mainContainer}>
          <LeftSubMyPage page={page} onClickHandler={changePage} />
          <RightSubMyPage
            page={page}
            setIsShowAlert={setIsShowAlert}
            setIsSaveComplete={setIsSaveComplete}
            setErrorCode={setErrorCode}
          />
        </div>
        {isSaveComplete && (
          <AlertMessage
            variant="success"
            message={'저장에 성공하였습니다.'}
            show={isShowAlert}
            setShow={setIsShowAlert}
          />
        )}
        {!isSaveComplete && errorCode === 11000 && (
          <AlertMessage
            variant="danger"
            message={'저장에 실패하였습니다. 중복되는 이메일입니다.'}
            show={isShowAlert}
            setShow={setIsShowAlert}
          />
        )}
        {!isSaveComplete && errorCode !== 11000 && (
          <AlertMessage
            variant="danger"
            message={'저장에 실패하였습니다. 다시 한번 시도해 주세요.'}
            show={isShowAlert}
            setShow={setIsShowAlert}
          />
        )}
      </>
    )
  } else {
    return <Navigate to={'/'} />
  }
}

export default MyPage
