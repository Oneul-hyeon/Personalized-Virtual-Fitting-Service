import ClassMerger from '../tools/ClassNameGenerater'
import Proptypes from 'prop-types'
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
  inputHandler,
  value,
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
        isInvalid={true}
        value={value}
        onChange={(event) => {
          console.log(event)
          inputHandler(event, setState)
        }}
      />
      <Form.Control.Feedback type="invalid" isInvalid={true}>
        패턴에 맞지 않는 값입니다.
      </Form.Control.Feedback>
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

export default FormBox
