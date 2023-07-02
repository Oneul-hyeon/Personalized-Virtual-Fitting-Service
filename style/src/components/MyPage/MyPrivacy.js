import ClassMerger from '../tools/ClassNameGenerater'
import styles from './MyPage.module.css'
import FormBox from './FormBox'
import { useEffect, useRef, useState } from 'react'
import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'
import { updateUser } from '../User/UpdateInfo.js'

function MyPrivacy({ userId, setIsShowAlert, setIsSaveComplete }) {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const user = useRef({})

  const [isNameInvalid, setIsNameInvalid] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false)

  const maleButtonHandler = (event) => {
    if (gender !== 'male') {
      setGender('male')
    }
  }
  const femaleButtonHandler = (event) => {
    if (gender !== 'female') {
      setGender('female')
    }
  }

  // 입력갑 검사 및 제출
  const onSubmit = async (event) => {
    event.preventDefault()

    let modifyUser = {}

    if (/^[가-힣a-zA-Z\s]+$/.test(name)) {
      setIsNameInvalid(false)
      // user.current.name = name
      modifyUser.name = name
    } else {
      setIsNameInvalid(true)
    }
    if (
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        email
      )
    ) {
      setIsEmailInvalid(false)
      // user.current.email = email
      modifyUser.email = email
    } else {
      setIsEmailInvalid(true)
    }
    if (/^\d{3}-\d{4}-\d{4}$/.test(phone)) {
      setIsPhoneInvalid(false)
      // user.current.phoneNumber = phone
      modifyUser.phoneNumber = phone
    } else {
      setIsPhoneInvalid(true)
    }
    if (!isNameInvalid && !isEmailInvalid && !isPhoneInvalid) {
      modifyUser.userId = userId
      modifyUser.gender = gender
      updateUser(modifyUser).then((result) => {
        setIsSaveComplete(result.success)
        setIsShowAlert(true)
        setTimeout(() => {
          setIsShowAlert(false)
        }, 3000)
      })
    }
  }

  // 신체 정보 fetch
  useEffect(() => {
    const fetchSize = async () => {
      try {
        const response = await authenticatedAxios.get(
          `${API_URL}/userInfo/api/info?userId=${userId}`
        )
        if (response.status === 200 || response.status === 201) {
          user.current = response.data.user
          setName(response.data.user.name)
          setEmail(response.data.user.email)
          setGender(response.data.user.gender)
          setPhone(response.data.user.phoneNumber)

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
    fetchSize()
  }, [userId])
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={styles.subRightContiner}>
        <FormBox
          id={'name'}
          label={'이름'}
          type={'text'}
          value={name}
          setState={setName}
          isInvalid={isNameInvalid}
          invalidTest=" * 이름은 한글/영어로만 구성되어야 합니다."
        />
        <div>
          <p className={ClassMerger([styles.formLabel, styles.basicFont])}>
            성별
          </p>
          <button
            type="button"
            className={ClassMerger([
              styles.maleButton,
              gender === 'male' ? styles.maleSelected : '',
            ])}
            onClick={maleButtonHandler}
          >
            남자
          </button>
          <button
            type="button"
            className={ClassMerger([
              styles.femaleButton,
              gender === 'female' ? styles.femaleSelected : '',
            ])}
            onClick={femaleButtonHandler}
          >
            여자
          </button>
        </div>
        <FormBox
          id={'email'}
          label={'이메일'}
          type={'email'}
          value={email}
          setState={setEmail}
          isInvalid={isEmailInvalid}
          invalidTest=" * 이메일 양식에 맞지 않습니다. : xxx@xxx.xxx"
        />
        <FormBox
          id={'phone'}
          label={'전화번호'}
          type={'tel'}
          pattern={'[0-9]{3}-[0-9]{4}-[0-9]{4}'}
          value={phone}
          setState={setPhone}
          isInvalid={isPhoneInvalid}
          invalidTest=" * 전화번호 양식에 맞지 않습니다. : xxx-xxxx-xxxx"
        />
        <div></div>
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

export default MyPrivacy
