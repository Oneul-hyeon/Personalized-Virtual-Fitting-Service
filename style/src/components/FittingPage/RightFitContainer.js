import React, { memo } from 'react'
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

import styles from './FittingPage.module.css'
import { API_URL } from '../../api/apiConfig'

import searchImage from '../../images/search.png'
import axios from 'axios'

// import clothes1 from '../../images/test_clothes1.png'
// import clothes2 from '../../images/test_clothes2.png'

function RightFitContainer() {
  const [mainMenu, setMainMenu] = useState('closet')
  const [subMenu1, setSubMenu1] = useState('all')
  const [subMenu2, setSubMenu2] = useState('all')
  const [clothes, setClothes] = useState([])
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
      setClothes(response.data.map((image) => ({ src: image })))
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
          {clothes.map((item, index) => (
            <MemoClothesElement
              key={index}
              index={index}
              src={item.src}
              favorite={item.favorite}
              onHeartClick={toggleFavorite}
              consolea={clothes}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default RightFitContainer

function ClothesElement({ index, src, favorite, onHeartClick, consolea }) {
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
        <button className={styles.wearingBtn}>
          <FontAwesomeIcon icon={solid('shirt')} />
        </button>
        <button className={styles.removeBtn}>
          <FontAwesomeIcon icon={solid('x')} />
        </button>
        <p>그냥 옷</p>
      </div>
    </div>
  )
}
const MemoClothesElement = memo(ClothesElement)
