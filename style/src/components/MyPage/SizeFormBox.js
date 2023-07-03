import ClassMerger from '../common/ClassNameGenerater'
import { Form } from 'react-bootstrap'
import styles from './MyPage.module.css'

function FormBox({
  id,
  label,
  value,
  min,
  max,
  setState,
  placeholder,
  isInvalid = false,
  invalidTest,
}) {
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
        isInvalid={isInvalid}
        onChange={(event) => {
          const input = event.target.value
          // const filteredInput = parseFloat(input.replace(/\D/g, ''))
          const isValid = /^-?\d+(\.\d{0,1})?$/.test(input)
          const value = isNaN(input) ? 0 : input
          if (isValid && min <= value && value < max) {
            setState(value)
          }
        }}
      />
      <Form.Control.Feedback type="invalid">
        {invalidTest}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormBox
