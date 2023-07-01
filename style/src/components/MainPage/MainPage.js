import Navigation from '../Navigationbar/Nav.js'
import Footer from '../Footer.js'
import Content from './Content.js'
import { useSelector } from 'react-redux'

function MainPage() {
  const user = useSelector((state) => state.auth.user)
  console.log('aa')
  console.log(user)
  return (
    <div className="mainPage">
      <Navigation></Navigation>
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default MainPage
