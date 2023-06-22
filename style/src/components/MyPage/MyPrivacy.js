import ClassMerger from '../../tools/ClassNameGenerater'
import styles from '../../styles/MyPage.module.css'
import FormBox from './FormBox'

function MyPrivacy() {
  return (
    <form>
      <div className={styles.subRightContiner}>
        <FormBox id={'name'} label={'이름'} type={'text'} data={''} />
        <FormBox id={'email'} label={'이메일'} type={'email'} data={''} />
        <FormBox
          id={'birth'}
          label={'생일'}
          type={'date'}
          data={''}
          min={'1900-01-01'}
          max={'2099-12-31'}
        />
        <FormBox id={'sex'} label={'성별'} type={'select'} data={''} />
        <FormBox
          id={'phone'}
          label={'전화번호'}
          type={'tel'}
          data={''}
          pattern={'[0-9]{3}-[0-9]{4}-[0-9]{4}'}
          required
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

export default MyPrivacy
