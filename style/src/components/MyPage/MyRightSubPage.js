import styles from '../../styles/MyPage.module.css'
import { Form, Button } from 'react-bootstrap'
import Proptypes, { func } from 'prop-types'
import ClassMerger from '../../tools/ClassNameGenerater'
import { useState } from 'react'

function FormBox({
  id,
  label,
  type,
  data,
  min,
  max,
  pattern,
  disabled = false,
}) {
  return (
    <Form.Group className={styles.formGroup} controlId={id}>
      <Form.Label className={ClassMerger([styles.formLabel, styles.basicFont])}>
        {label}
      </Form.Label>
      <Form.Control
        className={styles.formControl}
        type={type}
        placeholder={data}
        min={min}
        max={max}
        pattern={pattern}
        disabled={disabled}
      />
    </Form.Group>
  )
}

FormBox.propTypes = {
  id: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  data: Proptypes.string.isRequired,
  min: Proptypes.string,
  max: Proptypes.string,
  pattern: Proptypes.string,
  disabled: Proptypes.bool,
}

function MyPrimary() {
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

function MyRightSubPage({ page }) {
  switch (page) {
    case 'privacy':
      return <MyPrimary />
    case 'size':
      return <>사이즈정보</>
    case 'closet':
      return (
        <>옷장 - 어떻게 해야할 지 생각 중. 무슨 데이터가 들어가야 할까요?</>
      )
    case 'style':
      return (
        <>스타일 - 어떻게 해야할 지 생각 중. 무슨 데이터가 들어가야 할까요?</>
      )
    default:
      return <>error!</>
  }
}

MyRightSubPage.propTypes = {
  page: Proptypes.string.isRequired,
}

export default MyRightSubPage
