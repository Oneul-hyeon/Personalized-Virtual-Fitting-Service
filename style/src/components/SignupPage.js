import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ImageUploadBox from './ImageUploadBox'
import './SignupPage.css'

function SignupPage({ toggleModal }) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [file, setFile] = useState(null)
  const [favoriteStyle, setFavoriteStyle] = useState({
    style: '',
    color: '',
    fit: '',
  })
  const [styleListOpen, setStyleListOpen] = useState(false)
  const [colorListOpen, setColorListOpen] = useState(false)
  const [fitListOpen, setFitListOpen] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleHeightChange = (e) => {
    setHeight(e.target.value)
  }

  const handleWeightChange = (e) => {
    setWeight(e.target.value)
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }
  const handleStyleChange = (e) => {
    setFavoriteStyle({ ...favoriteStyle, style: e.target.value })
  }

  const handleColorChange = (e) => {
    setFavoriteStyle({ ...favoriteStyle, color: e.target.value })
  }

  const handleFitChange = (e) => {
    setFavoriteStyle({ ...favoriteStyle, fit: e.target.value })
  }

  const handleStyleListToggle = () => {
    setStyleListOpen(!styleListOpen)
  }

  const handleColorListToggle = () => {
    setColorListOpen(!colorListOpen)
  }

  const handleFitListToggle = () => {
    setFitListOpen(!fitListOpen)
  }

  const handleStyleItemClick = (style) => {
    setFavoriteStyle({ ...favoriteStyle, style })
    setStyleListOpen(false)
  }

  const handleColorItemClick = (color) => {
    setFavoriteStyle({ ...favoriteStyle, color })
    setColorListOpen(false)
  }

  const handleFitItemClick = (fit) => {
    setFavoriteStyle({ ...favoriteStyle, fit })
    setFitListOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 회원가입 로직을 처리하는 함수 호출
    console.log('Email:', email)
    console.log('Name:', name)
    console.log('Phone Number:', phoneNumber)
    console.log('Password:', password)
    console.log('Confirm Password:', confirmPassword)
    console.log('Height:', height)
    console.log('Weight:', weight)
    console.log('File:', file)
    console.log('Favorite Style:', favoriteStyle)

    toggleModal()
  }

  return (
    <Modal show={true} onHide={toggleModal} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              className="form-input"
              type="text"
              value={name}
              placeholder="예시 : 홍길동"
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">전화번호 ('-' 포함)</label>
            <input
              className="form-input"
              type="text"
              value={phoneNumber}
              placeholder="예시 : 010-1234-5678"
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              className="form-input"
              type="email"
              value={email}
              placeholder="예시 : modelfit@modelfit.com"
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
              placeholder="영문과 숫자로 구성된 8자리 이상"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호 확인</label>
            <input
              className="form-input"
              type="password"
              value={confirmPassword}
              placeholder="비밀번호를 한번 더 입력해주세요."
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div>
            <label className="form-label">고객 사진</label>
            <div>
              <p> * 전신 이미지 업로드</p>
              <ImageUploadBox onChange={handleFileChange} />
            </div>
          </div>
          <div className="form-group size-input-group">
            <label className="form-label">신체 수치(사이즈)</label>
            <div className="size-input-container">
              <label className="form-label">키</label>
              <input
                className="form-input size-input"
                type="text"
                value={height}
                placeholder="cm"
                onChange={handleHeightChange}
              />
            </div>
            <div className="size-input-container">
              <label className="form-label">몸무게</label>
              <input
                className="form-input size-input"
                type="text"
                value={weight}
                placeholder="kg"
                onChange={handleWeightChange}
              />
            </div>
          </div>
          <div className="form-group style-input-group">
            <div className="style-input-container">
              <label className="form-label">스타일</label>
              <input
                className="form-input style-input"
                type="text"
                value={favoriteStyle.style}
                placeholder="예시 : 스포츠, 캐주얼, 클래식"
                onChange={handleStyleChange}
              />
              <div
                className={`style-dropdown ${styleListOpen ? 'open' : ''}`}
                onClick={handleStyleListToggle}
              >
                <span className="dropdown-text">
                  {favoriteStyle.style || '스타일 선택'}
                </span>
                <span className="dropdown-icon">&#9660;</span>
              </div>
              {styleListOpen && (
                <ul className="style-list">
                  <li onClick={() => handleStyleItemClick('스포츠')}>스포츠</li>
                  <li onClick={() => handleStyleItemClick('캐주얼')}>캐주얼</li>
                  <li onClick={() => handleStyleItemClick('클래식')}>클래식</li>
                  {/* 다른 스타일 추가 */}
                </ul>
              )}
            </div>
          </div>
          <div className="form-group style-input-group">
            <div className="style-input-container">
              <label className="form-label">색상</label>
              <input
                className="form-input style-input"
                type="text"
                placeholder="예시 : 검정, 파랑, 빨강"
                value={favoriteStyle.color}
                onChange={handleColorChange}
              />
              <div
                className={`style-dropdown ${colorListOpen ? 'open' : ''}`}
                onClick={handleColorListToggle}
              >
                <span className="dropdown-text">
                  {favoriteStyle.color || '색상 선택'}
                </span>
                <span className="dropdown-icon">&#9660;</span>
              </div>
              {colorListOpen && (
                <ul className="style-list">
                  <li onClick={() => handleColorItemClick('검정')}>검정</li>
                  <li onClick={() => handleColorItemClick('파랑')}>파랑</li>
                  <li onClick={() => handleColorItemClick('빨강')}>빨강</li>
                  {/* 다른 색상 추가 */}
                </ul>
              )}
            </div>
          </div>
          <div className="form-group style-input-group">
            <div className="style-input-container">
              <label className="form-label">핏</label>
              <input
                className="form-input style-input"
                type="text"
                placeholder="예시 : 슬림핏, 오버핏"
                value={favoriteStyle.fit}
                onChange={handleFitChange}
              />
              <div
                className={`style-dropdown ${fitListOpen ? 'open' : ''}`}
                onClick={handleFitListToggle}
              >
                <span className="dropdown-text">
                  {favoriteStyle.fit || '핏 선택'}
                </span>
                <span className="dropdown-icon">&#9660;</span>
              </div>
              {fitListOpen && (
                <ul className="style-list">
                  <li onClick={() => handleFitItemClick('슬림핏')}>슬림핏</li>
                  <li onClick={() => handleFitItemClick('오버핏')}>오버핏</li>
                  {/* 다른 핏 추가 */}
                </ul>
              )}
            </div>
          </div>
          <div className="form-group"></div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          회원가입
        </Button>
        <Button variant="secondary" onClick={toggleModal}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignupPage
