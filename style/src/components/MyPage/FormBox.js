import ClassMerger from '../../tools/ClassNameGenerater'
import Proptypes from 'prop-types'
import { Form } from 'react-bootstrap'
import styles from '../../styles/MyPage.module.css'

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

export default FormBox
