import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <Navbar.Brand href="/">메인페이지</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">피팅</Nav.Link>
            <Nav.Link href="#pricing">상품 조회</Nav.Link>
            <NavDropdown title="게시판" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">QnA 게시판</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                코디 공유 게시판
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">회원가입</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              마이페이지
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
