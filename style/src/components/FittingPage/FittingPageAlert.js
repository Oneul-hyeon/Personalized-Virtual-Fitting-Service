import AlertMessage from '../common/AlertMessage'

function FittingPageAlert({ errorCode, isShowAlert, setIsShowAlert }) {
  return (
    <>
      {errorCode === 'FETCH_DONE' && (
        <AlertMessage
          variant={errorCode === 'FETCH_DONE' ? 'success' : 'danger'}
          message={'이미지 목록을 성공적으로 불러왔습니다.'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
      {errorCode === 'URL_ERROR_HTTP' && (
        <AlertMessage
          variant={errorCode === 'FETCH_DONE' ? 'success' : 'danger'}
          message={'잘못된 URL입니다. URL은 "http"로 시작해야합니다.'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
      {errorCode === 'URL_ERROR_INVALID_IMAGE' && (
        <AlertMessage
          variant={errorCode === 'FETCH_DONE' ? 'success' : 'danger'}
          message={'잘못된 URL입니다. 이미지의 URL을 다시 확인해주세요'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
      {errorCode === 'ERR_BAD_REQUEST' && (
        <AlertMessage
          variant={errorCode === 'FETCH_DONE' ? 'success' : 'danger'}
          message={'잘못된 URL입니다. URL을 다시 확인해주세요.'}
          show={isShowAlert}
          setShow={setIsShowAlert}
        />
      )}
    </>
  )
}

export default FittingPageAlert
