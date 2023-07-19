import styles from './MyPage.module.css'
import profileImage from '../../images/profileImageLoading.png'
// import profileImage from '../../images/profile.jpg'
import Proptypes from 'prop-types'
import ClassMerger from '../common/ClassNameGenerater'
import ImageUploaders from './ImageUploaders'
import { API_URL } from '../../api/apiConfig'
import authenticatedAxios from '../../api/authenticatedAxios'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import getProfileImage from '../common/getProfileImage'

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
  const [profileUrl, setProfileUrl] = useState(profileImage)
  const uploadFile = useRef(null)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    getProfileImage(setProfileUrl)
  }, [])

  // 이미지 선택
  const handleImageChange = async (file) => {
    uploadFile.current = file
    if (!uploadFile.current) return

    const formData = new FormData()
    formData.append('userId', user._id)
    formData.append('file', uploadFile.current)

    try {
      const response = await authenticatedAxios.put(
        `${API_URL}/userinfo/api/userimage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.status >= 200) {
        setProfileUrl(`${response.data.url}?${Date.now()}`)
      } else {
        console.log('Profile Image Change failed.')
      }
    } catch (error) {
      console.error('Error fetching images', error)
    }
  }

  return (
    <div className={styles.subLeftContiner}>
      <h1 className={styles.title}>마이페이지</h1>
      <div className={styles.profileImageContainer}>
        <img src={profileUrl} alt="profile" className={styles.profileImage} />
      </div>
      <div className={styles.imageUploadButton}>
        <ImageUploaders onChange={handleImageChange} />
      </div>
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
