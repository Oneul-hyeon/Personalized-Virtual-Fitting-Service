import React, { useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ImageUploadBox from './ImageUploadBox'
import './SignupPage.css'
import registerUser from './Register'

function SignupPage({ onClose }) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
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

  // 에러 메시지 states
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  // 오류 메시지 상태 저장 및 버튼 상태 변경
  const formRef = useRef(null)
  const hasSubmitted = useRef(false)

  // 입력이 끝났을 때만 오류 메시지 표시
  const onBlurHandler = (e, validationFunc, errorSetter) => {
    if (validationFunc(e.target.value)) {
      errorSetter('')
    } else if (hasSubmitted) {
      errorSetter(validationFunc(e.target.value))
    }
  }

  // 에러 발생 시 회원가입 모달 진동
  const handleInvalidForm = () => {
    formRef.current.style.borderColor = 'red'
    formRef.current.style.animation = 'shake 0.5s'
    setTimeout(() => {
      formRef.current.style.borderColor = ''
      formRef.current.style.animation = ''
    }, 500)
  }

  // 유효성 검사 함수들
  const validateName = (name) => {
    if (/^[가-힣a-zA-Z\s]+$/.test(name)) {
      return true
    } else {
      setNameError('이름은 문자로만 구성되어야 합니다.')
      return false
    }
  }

  const validatePhoneNumber = (phoneNumber) => {
    if (/^\d{3}\-\d{4}\-\d{4}$/.test(phoneNumber)) {
      return true
    } else {
      setPhoneError('전화번호는 010-0000-0000 과 같은 양식이어야 합니다.')
      return false
    }
  }
  const validateEmail = (email) => {
    if (
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        email
      )
    ) {
      return true
    } else {
      setEmailError('이메일 양식에 맞지 않습니다.')
      return false
    }
  }
  const validatePassword = (password) => {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return true
    } else {
      setPasswordError(
        '비밀번호는 영문과 숫자를 포함하여 8자리 이상 구성하여야 합니다.'
      )
      return false
    }
  }

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true
    } else {
      setConfirmPasswordError('비밀번호가 다릅니다.')
      return false
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    validateName(e.target.value)
  }

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
    validatePhoneNumber(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    validateConfirmPassword(password, e.target.value)
  }

  const handleGenderChange = (e) => {
    setGender(e.currentTarget.value)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const canSubmitted =
      validateName(name) &&
      validatePhoneNumber(phoneNumber) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword)

    console.log('Email:', email)
    console.log('Name:', name)
    console.log('Phone Number:', phoneNumber)
    console.log('Password:', password)
    console.log('Confirm Password:', confirmPassword)
    console.log('gender', gender)
    console.log('Height:', height)
    console.log('Weight:', weight)
    console.log('File:', file)
    console.log('Favorite Style:', favoriteStyle)

    if (canSubmitted) {
      const data = {
        email,
        name,
        phoneNumber,
        password,
        gender,
        height,
        weight,
        file,
        favoriteStyle,
      }

      const registerResult = await registerUser(data)

      if (registerResult.success) {
        console.log('success')
        localStorage.setItem('token', registerResult.result.token)
        onClose()
      } else {
        console.log('registerfail')
        handleInvalidForm()
      }
    } else {
      console.log('submitfail')
      handleInvalidForm()
    }
  }

  return (
    <Modal show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="signup-form" onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              className={`form-input error ${nameError ? 'has-error' : ''}`}
              type="text"
              value={name}
              placeholder="예시 : 홍길동"
              onChange={handleNameChange}
              onBlur={(e) => onBlurHandler(e, validateName, setNameError)}
              required
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">전화번호 ('-' 포함)</label>
            <input
              className={`form-input error ${phoneError ? 'has-error' : ''}`}
              type="text"
              value={phoneNumber}
              placeholder="예시 : 010-1234-5678"
              onChange={handlePhoneNumberChange}
              onBlur={(e) =>
                onBlurHandler(e, validatePhoneNumber, setPhoneError)
              }
              required
            />
            {phoneError && <div className="error-message">{phoneError}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              className={`form-input error ${emailError ? 'has-error' : ''}`}
              type="email"
              value={email}
              placeholder="예시 : modelfit@modelfit.com"
              onChange={handleEmailChange}
              onBlur={(e) => onBlurHandler(e, validateEmail, setEmailError)}
              required
            />
          </div>
          {emailError && <div className="error-message">{emailError}</div>}
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              className={`form-input error ${passwordError ? 'has-error' : ''}`}
              type="password"
              value={password}
              placeholder="영문과 숫자로 구성된 8자리 이상"
              onChange={handlePasswordChange}
              onBlur={(e) =>
                onBlurHandler(e, validatePassword, setPasswordError)
              }
              required
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호 확인</label>
            <input
              className={`form-input error ${
                confirmPasswordError ? 'has-error' : ''
              }`}
              type="password"
              value={confirmPassword}
              placeholder="비밀번호를 한번 더 입력해주세요."
              onChange={handleConfirmPasswordChange}
              onBlur={(e) =>
                onBlurHandler(
                  e,
                  validateConfirmPassword,
                  setConfirmPasswordError
                )
              }
              required
            />
            {confirmPasswordError && (
              <div className="error-message">{confirmPasswordError}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">성별</label>
            <div>
              <div className="gender-select">
                <button
                  type="button"
                  value="male"
                  onClick={handleGenderChange}
                  className={`gender-btn ${
                    gender === 'male' ? 'selected' : ''
                  }`}
                >
                  남자
                </button>
                <button
                  type="button"
                  value="female"
                  onClick={handleGenderChange}
                  className={`gender-btn ${
                    gender === 'female' ? 'selected' : ''
                  }`}
                >
                  여자
                </button>
              </div>
            </div>
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
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignupPage
