import Navigation from '../Navigationbar/Nav.js'
import Footer from '../Footer.js'
import Content from './Content.js'

function MainPage() {
  return (
    <div className="mainPage">
      <Navigation></Navigation>
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default MainPage
