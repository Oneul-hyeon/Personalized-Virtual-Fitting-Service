import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function DropdownMenu() {
  return (
    <NavDropdown title="게시판" id="collasible-nav-dropdown">
      <NavDropdown.Item as={Link} to="/qna" activeClassName="active-link">
        QnA 게시판
      </NavDropdown.Item>
      <NavDropdown.Item
        as={Link}
        to="/outfitforum"
        activeClassName="active-link"
      >
        코디 공유 게시판
      </NavDropdown.Item>
      {/* <NavDropdown.Divider /> */}
    </NavDropdown>
  )
}

export default DropdownMenu
