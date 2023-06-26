import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlices'
import './Logout.css'

function Logout() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    alert('정상적으로 로그아웃 되었습니다.')
  }
  return (
    <NavLink to="/" onClick={() => handleLogout()} className="logout">
      로그아웃
    </NavLink>
  )
}

export default Logout
