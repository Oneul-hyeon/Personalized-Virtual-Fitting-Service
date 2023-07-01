import ClassMerger from '../tools/ClassNameGenerater'
import Proptypes from 'prop-types'
import { Form } from 'react-bootstrap'
import styles from './MyPage.module.css'

function FormBox({ id, label, value, min, max, setState }) {
  return (
    <Form.Group className={styles.formGroup} controlId={id}>
      <Form.Label className={ClassMerger([styles.formLabel, styles.basicFont])}>
        {label}
      </Form.Label>
      <Form.Control
        className={styles.formControl}
        type="text"
        placeholder={`${label}를 입력해주세요.`}
        isInvalid={true}
        value={value}
        onChange={(event) => {
          const input = event.target.value
          const filteredInput = input.replace(/\D/g, '')
          if (filteredInput < max) setState(filteredInput)
        }}
      />
      <Form.Control.Feedback type="invalid">
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
