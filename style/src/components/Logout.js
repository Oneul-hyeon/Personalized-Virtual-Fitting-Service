import React from 'react'
import { NavLink } from 'react-router-dom'
import './Logout.css'

function Logout({ handleLogout }) {
  return (
    <NavLink to="/" onClick={() => handleLogout()} className="logout">
      로그아웃
    </NavLink>
  )
}

export default Logout
