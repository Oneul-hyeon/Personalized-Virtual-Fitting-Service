import React, { useState } from 'react'

import CardButton from './CardButton'

import styles from './FittingPage.module.css'

import saveImage from '../../images/save.png'
import uploadImage from '../../images/upload.png'
import changeBgImage from '../../images/landscape.png'
import resetImage from '../../images/reset.png'

// 아직 버튼에 이벤트 없음
// 각 버튼 누르면 모달창 띄워서 업로드/배경 변경 창 띄우면 좋을듯?
// 원본 디자인에서 공유 버튼 필요 없을 것 같아 제외 함
function ButtonBar() {
  // URL 입력 저장을 위한 state 생성
  const [imageUrl, setImageUrl] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputUrl = (e) => {
    setImageUrl(e.target.value)
  }

  // URL 업로드 버튼 클릭 이벤트 핸들러
  const handleUrlUploadClick = () => {
    // URL 크롤링 하는 함수 작성
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.buttonContainer}>
      <CardButton
        src={saveImage}
        alt="upload"
        text="옷 링크 업로드"
        onClick={handleModalOpen}
      />
      <CardButton
        src={uploadImage}
        alt="upload"
        text="이미지 저장"
        onClick={() => {}}
      />
      <CardButton
        src={changeBgImage}
        alt="changeBackground"
        text="배경 변경"
        onClick={() => {}}
      />
      <CardButton
        src={resetImage}
        alt="reset"
        text="되돌리기"
        onClick={getUserImage}
      />
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>의류 올리기</h2>
            <input
              type="text"
              placeholder="옷 링크 입력"
              value={imageUrl}
              onChange={handleInputUrl}
            />
            <button onClick={handleUrlUploadClick}>Upload</button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

async function getUserImage() {
  // 데이터베이스에서 유저의 이미지를 불러오는 함수를 호출
  //const userImage = await fetchUserImageFromDB();
  // 상태를 업데이트하여 이미지가 표시되는 곳에 사용자 이미지를 표시합니다.
  //setImageUrl(userImage);
}

export default ButtonBar
