import ClassMerger from '../tools/ClassNameGenerater'
import styles from './MyPage.module.css'
import FormBox from './SizeFormBox'
import { useState, useEffect } from 'react'

import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'

function MySize({ userId, setIsShowAlert, setIsSaveComplete }) {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [shoulderWidth, SetshoulderWidth] = useState(0)
  const [chestWidth, setChestWidth] = useState(0)
  const [length, setLength] = useState(0)

  const onSubmit = async (event) => {
    event.preventDefault()

    // 나중에 키/몸무게만 입력 된 경우 size api 사용해서
    // 나머지 값 채우게 수정 예정
    if (height && weight && shoulderWidth && chestWidth && length) {
      const modifySize = {
        userId: userId,
        height: height,
        weight,
        shoulderWidth: shoulderWidth,
        chestWidth: chestWidth,
        length: length,
      }
    }
  }

  // 신체 정보 fetch
  // DB 제대로 만들어지면 어떻게 될 지 몰라서 일단 2번 fetch하게 만듦
  useEffect(() => {
    const fetchSize1 = async () => {
      try {
        const response = await authenticatedAxios.get(
          `${API_URL}/userInfo/api/size?userId=${userId}`
        )
        if (response.status === 200 || response.status === 201) {
          setLength(response.data.message.length)
          SetshoulderWidth(response.data.message.shoulderWidth)
          setChestWidth(response.data.message.chestWidth)
          return { success: true, result: response.data }
        } else {
          return { success: false, error: 'Size Fetch Failed.' }
        }
      } catch (error) {
        if (error.response && error.response.status >= 500) {
          return { success: false, error: 'Server error occurred.' }
        } else {
          return { success: false, error: error.message }
        }
      }
    }
    const fetchSize2 = async () => {
      try {
        const response = await authenticatedAxios.get(
          `${API_URL}/userInfo/api/info?userId=${userId}`
        )
        if (response.status === 200 || response.status === 201) {
          setHeight(response.data.user.height)
          setWeight(response.data.user.weight)
          return { success: true, result: response.data }
        } else {
          return { success: false, error: 'Size Fetch Failed.' }
        }
      } catch (error) {
        if (error.response && error.response.status >= 500) {
          return { success: false, error: 'Server error occurred.' }
        } else {
          return { success: false, error: error.message }
        }
      }
    }
    fetchSize1()
    fetchSize2()
  }, [userId])

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.subRightContiner}>
        <FormBox
          id={'length'}
          label={'키(cm)'}
          placeholder={'키'}
          value={height}
          min={0}
          max={200}
          setState={setHeight}
        />
        <FormBox
          id={'weight'}
          label={'몸무게(kg)'}
          placeholder={'몸무게'}
          value={weight}
          min={0}
          max={200}
          setState={setWeight}
        />
        <FormBox
          id={'shoulderWidth'}
          label={'어깨너비(cm)'}
          placeholder={'어깨너비'}
          value={shoulderWidth}
          min={0}
          max={200}
          setState={SetshoulderWidth}
        />
        <FormBox
          id={'chestWidth'}
          label={'가슴너비(cm)'}
          placeholder={'가슴너비'}
          value={chestWidth}
          min={0}
          max={200}
          setState={setChestWidth}
        />
        <FormBox
          id={'length'}
          label={'기장(cm)'}
          placeholder={'기장'}
          value={length}
          min={0}
          max={200}
          setState={setLength}
        />
        <div></div>
        <div></div>
        <div className={styles.submitWarpper}>
          <input
            type="submit"
            className={ClassMerger([styles.submitButton, styles.basicFont])}
          />
        </div>
      </div>
    </form>
  )
}

export default MySize
