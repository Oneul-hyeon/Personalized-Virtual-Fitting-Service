import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import './Nav.css'
import logo from '../../images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AuthenticationNav from './AuthenticationNav'
import DropdownMenu from './DropdownMenu'
import SignupTerms from '../User/SignupTerms'
import SignupPage from '../User/SignupPage'
import LoginPage from '../User/Login'

function Navigation() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

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
            isLoggedIn={isAuthenticated}
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
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
