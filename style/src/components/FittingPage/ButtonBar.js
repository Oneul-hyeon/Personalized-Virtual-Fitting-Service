import React from 'react'

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
  return (
    <div className={styles.buttonContainer}>
      <CardButton
        src={saveImage}
        alt="save"
        text="이미지 업로드"
        onClick={() => {}}
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
        onClick={() => {}}
      />
    </div>
  )
}

export default ButtonBar
