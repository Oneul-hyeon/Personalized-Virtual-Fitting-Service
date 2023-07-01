import ClassMerger from '../tools/ClassNameGenerater'
import styles from './MyPage.module.css'
import FormBox from './FormBox'
import { useEffect, useState } from 'react'
import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'

function MyPrivacy({ userId }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')

  // 신체 정보 fetch
  useEffect(() => {
    const fetchSize = async () => {
      console.log('fet2')
      try {
        const response = await authenticatedAxios.get(
          `${API_URL}/userInfo/api/info?userId=${userId}`
        )
        if (response.status === 200 || response.status === 201) {
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
    <form>
      <div className={styles.subRightContiner}>
        <FormBox id={'name'} label={'이름'} type={'text'} />
        <FormBox id={'email'} label={'이메일'} type={'email'} />
        {/* 성별 회원가입 처럼 button으로 바꿀 예정 */}
        <FormBox id={'sex'} label={'성별'} type={'select'} />
        <FormBox
          id={'phone'}
          label={'전화번호'}
          type={'tel'}
          pattern={'[0-9]{3}-[0-9]{4}-[0-9]{4}'}
          required
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
