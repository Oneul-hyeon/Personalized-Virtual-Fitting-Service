import styles from '../../styles/MyPage.module.css'
import Proptypes from 'prop-types'

function MyRightSubPage({ page }) {
  switch (page) {
    case 'privacy':
      return (
        <div className={styles.subRightContiner}>
          <span>hello</span>
          <span>hello</span>
        </div>
      )
    case 'size':
      return <>사이즈정보</>
    case 'closet':
      return <>옷장</>
    case 'style':
      return <>스타일</>
    default:
      return <>error!</>
  }
}

MyRightSubPage.propTypes = {
  page: Proptypes.string.isRequired,
}

export default MyRightSubPage
