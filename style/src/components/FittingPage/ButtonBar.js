import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

import CardButton from './CardButton'
import authenticatedAxios from '../../api/authenticatedAxios'
import styles from './FittingPage.module.css'

import saveImage from '../../images/save.png'
import uploadImage from '../../images/upload.png'
import changeBgImage from '../../images/landscape.png'
import resetImage from '../../images/reset.png'
import helpImage from '../../images/help.png'
import { API_URL } from '../../api/apiConfig'
import ClassMerger from '../common/ClassNameGenerater'

function ButtonBar({ setErrorCode, showAlert, setIsDefaultPage }) {
  // URL 입력 저장을 위한 state 생성
  const [inputUrl, setInputUrl] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clothes, setClothes] = useState([])
  const [selected, setSelected] = useState(-1)

  // 모달창 밖 클릭 시 모달 창 종료에 사용
  const uploadmodelBg = useRef()
  const mouseDownEvent = useRef()
  const mouseUpEvent = useRef()
  const closeModalBtn = useRef()

  const handleInputUrl = (e) => {
    setInputUrl(e.target.value)
  }

  // URL 업로드 버튼 클릭 이벤트 핸들러
  const handleImgUploadClick = async () => {
    if (selected < 0 || selected >= clothes.length) {
      // 이미지 선택이 없거나 범위를 벗어난 경우
      return
    }

    const file = await fetch(clothes[selected])
      .then((response) => response.blob())
      .then(
        (blob) =>
          new File([blob], `clothes-${Date.now()}.png`, { type: 'image/png' })
      )

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user._id) {
      console.error('User ID not found')
      return
    }
    const userId = user._id
    const urlWithoutQueryString = inputUrl.split('?')[0]

    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('clothingImage', file)
    formData.append('clothesUrl', urlWithoutQueryString)
    for (let value of formData.values()) {
      console.log(value)
    }
    try {
      const response = await authenticatedAxios.post(
        `${API_URL}/api/cloth-upload`,
        formData
      )
      if (response.status === 200) {
        console.log('업로드에 성공했습니다!', response.data)
      } else {
        console.error('이미지 업로드에 실패했습니다.', response)
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다.', error)
    }
  }

  // url 업로드 버튼 : url에서 이미지 목록 가져옴
  const handleUrlUploadClick = async (event) => {
    try {
      const response = await authenticatedAxios.get(
        `${API_URL}/cloth/api/clothesFromUrl?url=${inputUrl}`
      )

      setErrorCode(response.data.code)
      showAlert()
      if (response.status === 200) {
        setClothes(response.data.urls)
      }
    } catch (error) {
      console.log(error.response.data.code)
      setErrorCode(error.response.data.code)
      showAlert()
    }
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = (event) => {
    // close 버튼 누른 경우 창 닫기
    if (
      mouseDownEvent.current === closeModalBtn.current &&
      mouseUpEvent.current === closeModalBtn.current
    ) {
      setIsModalOpen(false)
    }
    // 모달창 바깥 클릭 시 창 닫기
    // 바깥 -(드래그)-> 안, 안 -(드래그)-> 밖도 꺼지지 않게 함
    // 위 경우도 꺼지게 하는 조건 (event.current === uploadmodelBg.current)
    else if (
      mouseDownEvent.current === uploadmodelBg.current &&
      mouseUpEvent.current === uploadmodelBg.current
    ) {
      setIsModalOpen(false)
    }
  }

  // 불러온 이미지 하나 선택
  const clothesImageSelect = (index) => {
    setSelected(index)
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
        onClick={() => setIsDefaultPage(true)}
      />
      <CardButton src={helpImage} alt="help" text="도움말" onClick={() => {}} />
      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={handleModalClose}
          onMouseDown={(event) => {
            mouseDownEvent.current = event.target
          }}
          onMouseUp={(event) => {
            mouseUpEvent.current = event.target
          }}
          ref={uploadmodelBg}
        >
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <h2>의류 올리기</h2>
            <span>ㅤ잘 나온 사진 하나를 선택해주세요!</span>
            <input
              type="text"
              placeholder="URL을 입력해주세요. ( https://... )"
              value={inputUrl}
              onChange={handleInputUrl}
            />
            <button
              className={styles.clothesImageSearchBtn}
              onClick={handleUrlUploadClick}
            >
              <FontAwesomeIcon icon={solid('magnifying-glass')} />
            </button>
            <div className={styles.modalImageContainer}>
              {clothes &&
                clothes.map((src, index) => (
                  <ClothesImageElement
                    key={index}
                    src={src}
                    index={index}
                    selected={selected}
                    onClick={clothesImageSelect}
                  />
                ))}
            </div>
            <div className={styles.modalButtonContainer}>
              <button onClick={handleImgUploadClick}>Upload</button>
              <button onClick={handleModalClose} ref={closeModalBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ClothesImageElement({ src, index, selected, onClick }) {
  return (
    <div
      className={ClassMerger([
        styles.clothesImageBox,
        selected === index ? styles.clothesChecked : '',
      ])}
      onClick={() => onClick(index)}
    >
      <button className={styles.imageCheckBtn}>
        {selected === index ? (
          <FontAwesomeIcon icon={regular('circle-check')} size="2x" />
        ) : (
          <FontAwesomeIcon icon={regular('circle')} />
        )}
      </button>
      <img src={src} alt="clothes" />
    </div>
  )
}

export default ButtonBar
