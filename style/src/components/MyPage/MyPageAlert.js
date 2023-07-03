import AlertMessage from '../common/AlertMessage'

function MyPageAlert({ errorCode, isShowAlert, setIsShowAlert }) {
  const errorCodeList = ['UPDATE_DONE', 'DuplicateKey']
  return (
    <>
      {errorCode === 'UPDATE_DONE' && (
        <AlertMessage
          variant={errorCode === 'UPDATE_DONE' ? 'success' : 'danger'}
          message={'저장에 성공하였습니다.'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
      {errorCode === 'DuplicateKey' && (
        <AlertMessage
          variant={errorCode === 'UPDATE_DONE' ? 'success' : 'danger'}
          message={'저장에 실패하였습니다. 중복되는 이메일입니다.'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
      {!errorCodeList.includes(errorCode) && (
        <AlertMessage
          variant={errorCode === 'UPDATE_DONE' ? 'success' : 'danger'}
          message={'저장에 실패하였습니다. 다시 한번 시도해 주세요.'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
    </>
  )
}

export default MyPageAlert
