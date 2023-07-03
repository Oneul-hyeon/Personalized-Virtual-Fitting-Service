import Proptypes from 'prop-types'
import MyPrivacy from './MyPrivacy'
import MySize from './MySize'
import { useSelector } from 'react-redux'

function RightSubMyPage({ page, showAlert, setErrorCode }) {
  // 새로고침 or 제출 버튼 누르면 웹 페이지 리프레쉬 되면서 redux 초기화 됨
  // redux 초기화 되면서 user에 저장된 데이터 없어져서 오류 발생.
  const user = useSelector((state) => state.auth.user)

  switch (page) {
    case 'privacy':
      return (
        <MyPrivacy
          userId={user._id}
          showAlert={showAlert}
          setErrorCode={setErrorCode}
        />
      )
    case 'size':
      return (
        <MySize
          userId={user._id}
          showAlert={showAlert}
          setErrorCode={setErrorCode}
        />
      )
    // case 'closet':
    //   return (
    //     <>옷장 - 어떻게 해야할 지 생각 중. 무슨 데이터가 들어가야 할까요?</>
    //   )
    // case 'style':
    //   return (
    //     <>스타일 - 어떻게 해야할 지 생각 중. 무슨 데이터가 들어가야 할까요?</>
    //   )
    default:
      return <>error!</>
  }
}

RightSubMyPage.propTypes = {
  page: Proptypes.string.isRequired,
}

export default RightSubMyPage
