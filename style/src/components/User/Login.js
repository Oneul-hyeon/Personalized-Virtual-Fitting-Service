import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Login.css'
import { useDispatch } from 'react-redux'
import { login } from '../../features/authSlices'
import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'

function LoginPage({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await authenticatedAxios.post(`${API_URL}/users/login`, {
        email,
        password,
      })
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('token', response.data.token)
        dispatch(login(response.data.user))
        onClose()
      }
    } catch (error) {
      console.log('Login Failed')
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <Modal show={true} onHide={onClose} className="login-modal">
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body className="login-modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          로그인
        </Button>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginPage
