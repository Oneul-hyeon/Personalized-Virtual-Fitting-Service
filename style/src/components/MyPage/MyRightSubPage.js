import Proptypes from 'prop-types'
import MyPrivacy from './MyPrivacy'

function MyRightSubPage({ page }) {
  switch (page) {
    case 'privacy':
      return <MyPrivacy />
    case 'size':
      return <>사이즈정보</>
    case 'closet':
      return (
        <>옷장 - 어떻게 해야할 지 생각 중. 무슨 데이터가 들어가야 할까요?</>
      )
    case 'style':
      return (
        <>스타일 - 어떻게 해야할 지 생각 중. 무슨 데이터가 들어가야 할까요?</>
      )
    default:
      return <>error!</>
  }
}

MyRightSubPage.propTypes = {
  page: Proptypes.string.isRequired,
}

export default MyRightSubPage
