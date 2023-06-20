import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './Nav.css'
import logo from '../images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import SignupTerms from './SignupTerms'
import SignupPage from './SignupPage'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal)
  }

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal)
  }

  const handleSignupClick = () => {
    toggleTermsModal()
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
            <NavDropdown title="게시판" id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="qna"
                activeClassName="active-link"
              >
                QnA 게시판
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="outfitforum"
                activeClassName="active-link"
              >
                코디 공유 게시판
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link onClick={handleSignupClick}>회원가입</Nav.Link>
                <Nav.Link eventKey={2} as={NavLink} to="login">
                  로그인
                </Nav.Link>
              </>
            ) : (
              <Nav.Link eventKey={2} as={NavLink} to="mypage">
                마이페이지
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {showTermsModal && (
        <SignupTerms
          onClose={toggleTermsModal}
          toggleModal={toggleSignupModal}
        />
      )}
      {showSignupModal && <SignupPage onClose={toggleSignupModal} />}
    </Navbar>
  )
}

export default Navigation
