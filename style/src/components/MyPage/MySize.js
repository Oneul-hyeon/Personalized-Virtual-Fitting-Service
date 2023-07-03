import ClassMerger from '../common/ClassNameGenerater'
import styles from './MyPage.module.css'
import FormBox from './SizeFormBox'
import { useState, useEffect } from 'react'

import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'
import { updateSize } from '../User/UpdateInfo'

function MySize({ userId, showAlert, setErrorCode }) {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [shoulderWidth, SetshoulderWidth] = useState(0)
  const [chestWidth, setChestWidth] = useState(0)
  const [length, setLength] = useState(0)
  // 저장한 후 sizeAPI로 변경된 데이터 다시 받아오게 함
  const [reFetchTrigger, setReFetchTrigger] = useState(0)

  const [isHeightInvalid, setIsHeightInvalid] = useState(0)
  const [isWeightInvalid, setIsWeightInvalid] = useState(0)

  const onSubmit = async (event) => {
    event.preventDefault()

    let modifySize = {}
    // 키 체크
    if (height) {
      setIsHeightInvalid(false)
      modifySize.height = height
    } else {
      setIsHeightInvalid(true)
    }
    // 몸무게 체크
    if (weight) {
      setIsWeightInvalid(false)
      modifySize.weight = weight
    } else {
      setIsWeightInvalid(true)
    }
    // 어깨너비
    if (shoulderWidth) {
      modifySize.shoulderWidth = shoulderWidth
    }
    // 가슴단면
    if (chestWidth) {
      modifySize.chestWidth = chestWidth
    }
    // 총장
    if (length) {
      modifySize.length = length
    }
    modifySize.userId = userId
    updateSize(modifySize).then((result) => {
      setErrorCode(result.code)
      showAlert()
      setReFetchTrigger((curr) => curr + 1)
    })
  }

  // 신체 정보 fetch
  // DB 제대로 만들어지면 어떻게 될 지 몰라서 일단 2번 fetch하게 만듦
  useEffect(() => {
    const fetchSize1 = async () => {
      try {
        const response = await authenticatedAxios.get(
          `${API_URL}/userInfo/api/size`,
          { params: { userId: userId } }
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
          `${API_URL}/userInfo/api/info`,
          { params: { userId: userId } }
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
    console.log('fetch')
  }, [userId, reFetchTrigger])

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.subRightContiner}>
        <FormBox
          id={'length'}
          label={'키(cm)'}
          placeholder={'키'}
          value={height}
          min={0}
          max={300}
          setState={setHeight}
          isInvalid={isHeightInvalid}
          invalidTest={'키의 값은 1~300 사이여야 합니다.'}
        />
        <FormBox
          id={'weight'}
          label={'몸무게(kg)'}
          placeholder={'몸무게'}
          value={weight}
          min={0}
          max={200}
          setState={setWeight}
          isInvalid={isWeightInvalid}
          invalidTest={'몸무게의 값은 1~200 사이여야 합니다.'}
        />
        <FormBox
          id={'shoulderWidth'}
          label={'가슴단면(cm)'}
          placeholder={'가슴단면'}
          value={shoulderWidth}
          min={0}
          max={200}
          setState={SetshoulderWidth}
        />
        <FormBox
          id={'chestWidth'}
          label={'가슴둘레(cm)'}
          placeholder={'가슴둘레'}
          value={chestWidth}
          min={0}
          max={200}
          setState={setChestWidth}
        />
        <FormBox
          id={'length'}
          label={'총장(cm)'}
          placeholder={'총장'}
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
