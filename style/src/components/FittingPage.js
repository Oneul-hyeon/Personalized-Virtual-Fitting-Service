import Navigation from './Navigationbar/Nav'
import Footer from './Footer'

import React from 'react'
import { useSelector } from 'react-redux'

function FittingPage() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div>
      <Navigation></Navigation>
      {user && (
        <div>
          <h2>환영합니다, {user.email}님!</h2>
        </div>
      )}
      <Footer></Footer>
    </div>
  )
}
export default FittingPage
