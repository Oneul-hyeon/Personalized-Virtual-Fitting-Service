import styles from './MyPage.module.css'
import profileImage from '../../images/profile.jpg'
import Proptypes from 'prop-types'
import ClassMerger from '../common/ClassNameGenerater'

// 선택된 버튼에 주황색 넣어주는 함수
function TransButton({ context, option, page, onClick }) {
  return (
    <button
      className={ClassMerger([
        styles.transparentButton,
        styles.basicFont,
        page === option ? styles.selected : '',
      ])}
      onClick={() => onClick(option)}
    >
      {context}
    </button>
  )
}

TransButton.propTypes = {
  context: Proptypes.string.isRequired,
  option: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired,
}

function LeftSubMyPage({ page, onClickHandler }) {
  return (
    <div className={styles.subLeftContiner}>
      <h1 className={styles.title}>마이페이지</h1>
      <img
        src={profileImage}
        alt="profile"
        className={styles.profileImage}
      ></img>
      <TransButton
        context={'개인정보'}
        option={'privacy'}
        page={page}
        onClick={onClickHandler}
      />
      <TransButton
        context={'사이즈 정보'}
        option={'size'}
        page={page}
        onClick={onClickHandler}
      />
      {/* <TransButton
        context={'옷장'}
        option={'closet'}
        page={page}
        onClick={onClickHandler}
      />
      <TransButton
        context={'스타일'}
        option={'style'}
        page={page}
        onClick={onClickHandler}
      /> */}
    </div>
  )
}

LeftSubMyPage.propTypes = {
  page: Proptypes.string.isRequired,
  onClickHandler: Proptypes.func.isRequired,
}

export default LeftSubMyPage
