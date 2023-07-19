import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './AlertMessage.module.css'

function AlertMessage({ variant, message, show, setShow }) {
  return (
    <Alert
      className={styles.alertMessageBox}
      variant={variant}
      show={show}
      onClose={() => setShow(false)}
      dismissible
      style={{ position: 'absolute' }}
    >
      {variant === 'success' && (
        <FontAwesomeIcon icon={solid('circle-check')} />
      )}
      {variant === 'danger' && (
        <FontAwesomeIcon icon={solid('circle-exclamation')} />
      )}
      {'  '}
      {message}
    </Alert>
  )
}

export default AlertMessage
