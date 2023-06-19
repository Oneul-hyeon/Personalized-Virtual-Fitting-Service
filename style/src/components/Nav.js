import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './Nav.css'
import logo from '../images/logo.png'
import { useState } from 'react'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container className="navbar-custom">
        <img src={logo} alt="Logo" />
        <Navbar.Brand href="/" className="brand-name">
          model.fit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="fitting">피팅</Nav.Link>
            <Nav.Link href="recommend">코디 추천</Nav.Link>
            <NavDropdown title="게시판" id="collasible-nav-dropdown">
              <NavDropdown.Item href="qna">QnA 게시판</NavDropdown.Item>
              <NavDropdown.Item href="prideforum">
                코디 공유 게시판
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link href="join">회원가입</Nav.Link>
                <Nav.Link eventKey={2} href="login">
                  로그인
                </Nav.Link>
              </>
            ) : (
              <Nav.Link eventKey={2} href="mypage">
                마이페이지
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
