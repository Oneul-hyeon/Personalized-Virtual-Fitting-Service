import React from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Logout from '../User/Logout'

function AuthenticationNav({
  isLoggedIn,
  handleSignupClick,
  handleLoginClick,
  handleLogoutClick,
}) {
  return (
    <>
      {!isLoggedIn ? (
        <>
          <Nav.Link onClick={handleSignupClick}>회원가입</Nav.Link>
          <Nav.Link onClick={handleLoginClick}>로그인</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link as={NavLink} to="/mypage">
            마이페이지
          </Nav.Link>
          <Logout handleLogout={handleLogoutClick} />
        </>
      )}
    </>
  )
}

export default AuthenticationNav
