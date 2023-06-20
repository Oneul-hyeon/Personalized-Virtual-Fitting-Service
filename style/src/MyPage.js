import { useEffect, useState } from 'react'
import styles from './styles/MyPage.module.css'
import MyLeftSubPage from './components/MyPage/MyLeftSubPage'
import MyRightSubPage from './components/MyPage/MyRightSubPage'

function MyPage() {
  const [page, setPage] = useState('privacy')
  const changePage = (pageName) => {
    setPage(pageName)
    console.log(pageName)
  }
  return (
    <div className={styles.mainContainer}>
      <MyLeftSubPage page={page} onClickHandler={changePage} />
      <MyRightSubPage page={page} />
    </div>
  )
}

export default MyPage
