import ClassMerger from '../common/ClassNameGenerater'
// import Proptypes from 'prop-types'
import { Form } from 'react-bootstrap'
import styles from './MyPage.module.css'

function FormBox({
  id,
  label,
  type,
  min,
  max,
  pattern,
  setState,
  value,
  isInvalid,
  invalidTest,
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
        placeholder={`${label}을(를) 입력해주세요.`}
        min={min}
        max={max}
        pattern={pattern}
        disabled={disabled}
        isInvalid={isInvalid}
        value={value}
        formNoValidate
        onChange={(event) => {
          const input = event.target.value
          setState(input)
        }}
      />
      <Form.Control.Feedback type="invalid">
        {invalidTest}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

// FormBox.propTypes = {
//   id: Proptypes.string.isRequired,
//   label: Proptypes.string.isRequired,
//   type: Proptypes.string.isRequired,
//   min: Proptypes.string,
//   max: Proptypes.string,
//   pattern: Proptypes.string,
//   setState: Proptypes.func,
//   disabled: Proptypes.bool,
// }

export default FormBox
