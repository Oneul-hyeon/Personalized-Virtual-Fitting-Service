import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import './Nav.css'
import logo from '../images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthenticationNav from './AuthenticationNav'
import DropdownMenu from './DropdownMenu'
import SignupTerms from './SignupTerms'
import SignupPage from './SignupPage'
import LoginPage from './Login'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal)
  }

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal)
  }

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
  }

  const handleSignupClick = () => {
    toggleTermsModal()
  }

  const handleLoginClick = () => {
    toggleLoginModal()
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    alert('로그아웃 되었습니다.')
    setIsLoggedIn(false)
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container className="navbar-custom">
        <img src={logo} alt="Logo" />
        <Navbar.Brand as={Link} to="/" className="brand-name">
          model.fit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/fitting" activeClassName="active-link">
              피팅
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/recommend"
              activeClassName="active-link"
            >
              코디 추천
            </Nav.Link>
            <DropdownMenu />
          </Nav>
          <AuthenticationNav
            isLoggedIn={isLoggedIn}
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
            handleLogoutClick={handleLogoutClick}
          />
        </Navbar.Collapse>
      </Container>

      {showTermsModal && (
        <SignupTerms
          onClose={toggleTermsModal}
          toggleModal={toggleSignupModal}
        />
      )}
      {showSignupModal && <SignupPage onClose={toggleSignupModal} />}
      {showLoginModal && <LoginPage onClose={toggleLoginModal} />}
    </Navbar>
  )
}

export default Navigation
