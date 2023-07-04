import React, { memo } from 'react'
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

import styles from './FittingPage.module.css'
import { API_URL } from '../../api/apiConfig'

import searchImage from '../../images/search.png'
import axios from 'axios'

import LoadingIndicator from '../LoadingIndicator'

function RightFitContainer({
  setFittingImage,
  setIsDefaultPage,
  setErrorCode,
  showAlert,
}) {
  const [mainMenu, setMainMenu] = useState('closet')
  const [subMenu1, setSubMenu1] = useState('all')
  const [subMenu2, setSubMenu2] = useState('all')
  const [clothes, setClothes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const list_subMenu1 = ['all', 'top', 'bottom']

  //서버에서 clothes 이미지 데이터를 가져오는 함수
  const fetchClothesImages = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user._id) {
      console.error('User ID not found')
      return
    }
    const userId = user._id
    try {
      const response = await axios.get(`${API_URL}/cloth/api/clothes`, {
        params: {
          userId: userId,
        },
      })
      console.log(response)
      setClothes(
        response.data.map((imageItem) => ({
          id: imageItem._id,
          src: imageItem.clothesImageLink,
        }))
      )
    } catch (err) {
      console.error('Error fetching clothes images:', err)
    }
  }
  useEffect(() => {
    fetchClothesImages()
  }, [])

  const toggleFavorite = (indexToToggle) => {
    setClothes(
      clothes.map((item, index) =>
        index === indexToToggle ? { ...item, favorite: !item.favorite } : item
      )
    )
  }

  //피팅
  const handleFittingCloth = async (clothID) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user._id) {
      console.error('User ID not found')
      return
    }
    const userId = user._id
    try {
      setIsLoading(true)
      const response = await fetch('/api/fitting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, clothID }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.fittingImageLink)

        setFittingImage(data.fittingImageLink)
        setIsDefaultPage(false)
        setIsLoading(false)
      } else {
        console.error('Error loading fitting image')
      }
    } catch (error) {
      console.error('Fitting Request Error:', error)
      setIsLoading(false)
    }
  }

  //옷 제거
  const handleDeleteCloth = async (clothId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user._id) {
      console.error('User ID not found')
      return
    }

    const confirmation = window.confirm('옷을 삭제하시겠습니까?')
    if (!confirmation) {
      return
    }
    console.log(clothId)
    try {
      const response = await axios.delete(
        `${API_URL}/cloth/api/delete/${clothId}`
      )
      fetchClothesImages()
      setErrorCode(response.data.code)
      showAlert()
    } catch (error) {
      console.error('Error deleting cloth:', error)
    }
  }

  //사이즈 추천
  const handleRecommendSize = async (clothId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user._id) {
      console.error('User ID not found')
      return
    }
    const userId = user._id

    try {
      const response = await axios.post(`${API_URL}/cloth/cloth_size`, {
        userId,
        clothId,
      })

      if (response.status === 200) {
        const recommendedSize = response.data.size
        alert(`Recommended size: ${recommendedSize}`)
      } else {
        alert(`Error: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Size Recommendation Error:', error)
    }
  }

  return (
    <div className={styles.rightFitContainer}>
      <div className={styles.closetContainer}>
        <div className={styles.closetNavbar}>
          <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
              <img
                className={styles.searchImage}
                src={searchImage}
                alt="search button"
              />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="검색어를 입력해주세요."
              />
            </div>
          </div>
          <div className={styles.mainMenuContainer}>
            <div className={styles.mainMenu}>
              <button
                className={
                  mainMenu === 'closet'
                    ? styles.mainMenuBtn_selected
                    : styles.mainMenuBtn
                }
                onClick={() => {
                  setMainMenu('closet')
                }}
              >
                옷장
              </button>
              <button
                className={
                  mainMenu === 'rank'
                    ? styles.mainMenuBtn_selected
                    : styles.mainMenuBtn
                }
                onClick={() => {
                  setMainMenu('rank')
                }}
              >
                순위
              </button>
              <button
                className={
                  mainMenu === 'recommend'
                    ? styles.mainMenuBtn_selected
                    : styles.mainMenuBtn
                }
                onClick={() => {
                  setMainMenu('recommend')
                }}
              >
                추천
              </button>
            </div>
          </div>
          <div className={styles.subMenu1Container}>
            <button
              className={styles.menuControlBtn}
              onClick={() => {
                let next = list_subMenu1.indexOf(subMenu1) - 1
                if (next < 0) next = list_subMenu1.length - 1
                setSubMenu1(list_subMenu1[next])
              }}
            >
              <FontAwesomeIcon icon={solid('chevron-left')} />
            </button>
            <div className={styles.subMenu1}>
              <button
                className={
                  subMenu1 === 'all'
                    ? styles.subMenu1Btn_selected
                    : styles.subMenu1Btn
                }
                onClick={() => {
                  setSubMenu1('all')
                }}
              >
                전체
              </button>
              <button
                className={
                  subMenu1 === 'top'
                    ? styles.subMenu1Btn_selected
                    : styles.subMenu1Btn
                }
                onClick={() => {
                  setSubMenu1('top')
                }}
              >
                상의
              </button>
              <button
                className={
                  subMenu1 === 'bottom'
                    ? styles.subMenu1Btn_selected
                    : styles.subMenu1Btn
                }
                onClick={() => {
                  setSubMenu1('bottom')
                }}
              >
                하의
              </button>
            </div>
            <button
              className={styles.menuControlBtn}
              onClick={() => {
                let next = list_subMenu1.indexOf(subMenu1) + 1
                if (next >= list_subMenu1.length) next = 0
                setSubMenu1(list_subMenu1[next])
              }}
            >
              <FontAwesomeIcon icon={solid('chevron-right')} />
            </button>
          </div>
          <div className={styles.subMenu2Container}>
            <div>
              <button
                className={
                  subMenu2 === 'all'
                    ? styles.subMenu2Btn_selected
                    : styles.subMenu2Btn
                }
                onClick={() => {
                  setSubMenu2('all')
                }}
              >
                • 전체
              </button>
              <button
                className={
                  subMenu2 === 'favorite'
                    ? styles.subMenu2Btn_selected
                    : styles.subMenu2Btn
                }
                onClick={() => {
                  setSubMenu2('favorite')
                }}
              >
                • 즐겨찾기
              </button>
            </div>
            <button className={styles.filterBtn}>
              <FontAwesomeIcon icon={solid('sliders')} />
            </button>
          </div>
        </div>
        <div className={styles.closet}>
          {isLoading && <LoadingIndicator />}
          {clothes.map((item, index) => (
            <MemoClothesElement
              key={index}
              id={item.id}
              index={index}
              src={item.src}
              favorite={item.favorite}
              onHeartClick={toggleFavorite}
              consolea={clothes}
              handleFittingCloth={handleFittingCloth}
              handleDeleteCloth={handleDeleteCloth}
              handleRecommendSize={handleRecommendSize}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default RightFitContainer

function ClothesElement({
  id,
  index,
  src,
  favorite,
  onHeartClick,
  consolea,
  handleFittingCloth,
  handleDeleteCloth,
  handleRecommendSize,
}) {
  return (
    <div className={styles.clothesElement}>
      <div className={styles.clothesInner}>
        <img className={styles.clothesImage} src={src} alt="clothes" />
        <button
          className={styles.favoriteBtn}
          onClick={async () => {
            await onHeartClick(index)
          }}
        >
          {favorite ? (
            <FontAwesomeIcon icon={solid('heart')} color="#FF5959" />
          ) : (
            <FontAwesomeIcon icon={regular('heart')} />
          )}
        </button>
        <button
          className={styles.wearingBtn}
          onClick={() => {
            handleFittingCloth(id)
          }}
        >
          <FontAwesomeIcon icon={solid('shirt')} />
        </button>
        <button
          className={styles.sizeBtn}
          onClick={() => {
            handleRecommendSize(id)
          }}
        >
          <FontAwesomeIcon icon={solid('ruler-combined')} />
        </button>

        <button
          className={styles.removeBtn}
          onClick={() => handleDeleteCloth(id)}
        >
          <FontAwesomeIcon icon={solid('x')} />
        </button>
      </div>
    </div>
  )
}

const MemoClothesElement = memo(ClothesElement)
