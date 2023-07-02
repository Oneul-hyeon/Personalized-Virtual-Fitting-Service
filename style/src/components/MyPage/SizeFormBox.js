import ClassMerger from '../common/ClassNameGenerater'
import { Form } from 'react-bootstrap'
import styles from './MyPage.module.css'

function FormBox({ id, label, value, min, max, setState, placeholder }) {
  return (
    <Form.Group className={styles.formGroup} controlId={id}>
      <Form.Label className={ClassMerger([styles.formLabel, styles.basicFont])}>
        {label}
      </Form.Label>
      <Form.Control
        className={styles.formControl}
        type="text"
        placeholder={`${placeholder}을(를) 입력해주세요.`}
        value={value}
        onChange={(event) => {
          const input = event.target.value
          const filteredInput = input.replace(/\D/g, '')
          if (filteredInput < max) setState(filteredInput)
        }}
      />
    </Form.Group>
  )
}

export default FormBox
