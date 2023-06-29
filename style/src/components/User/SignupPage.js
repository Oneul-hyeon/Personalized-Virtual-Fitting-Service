import React, { useState, useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import { Modal, Button } from 'react-bootstrap'
import ImageUploader from './ImageUploader'
import './SignupPage.css'
import registerUser from './Register'
import { login } from '../../features/authSlices'
import { useDispatch } from 'react-redux'
import {
  validateName,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateInteger,
} from './Validations'

function SignupPage({ onClose }) {
  const dispatch = useDispatch()
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

  // 오류 메시지 상태 변수
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [heightError, setHeightError] = useState('')
  const [weightError, setWeightError] = useState('')

  // 오류 메시지 상태 저장 및 버튼 상태 변경
  const formRef = useRef(null)
  const hasSubmitted = useRef(false)

  // 유효성 검사 후 에러메시지 세팅
  const onBlurHandler = (e, validationFunc, errorSetter) => {
    validationFunc(e.target.value, errorSetter)
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

  const handleNameChange = (e) => {
    setName(e.target.value)
    onBlurHandler(e, validateName, setNameError)
  }

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
    onBlurHandler(e, validatePhoneNumber, setPhoneError)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    onBlurHandler(e, validateEmail, setEmailError)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    onBlurHandler(e, validatePassword, setPasswordError)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    onBlurHandler(
      e,
      (value, setError) => validateConfirmPassword(value, password, setError),
      setConfirmPasswordError
    )
  }

  const handleHeightChange = (e) => {
    setHeight(e.target.value)
    onBlurHandler(e, validateInteger, setHeightError)
  }

  const handleWeightChange = (e) => {
    setWeight(e.target.value)
    onBlurHandler(e, validateInteger, setWeightError)
  }

  const handleGenderChange = (e) => {
    setGender(e.currentTarget.value)
  }

  const handleFileChange = (file) => {
    setFile(file)
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

    const isNameValid = validateName(name, setNameError)
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber, setPhoneError)
    const isEmailValid = validateEmail(email, setEmailError)
    const isPasswordValid = validatePassword(password, setPasswordError)
    const isConfirmPasswordValid = validateConfirmPassword(
      password,
      confirmPassword,
      setConfirmPasswordError
    )
    const isHeightValid = validateInteger(height, setHeightError)
    const isWeightValid = validateInteger(weight, setWeightError)

    const canSubmitted =
      isNameValid &&
      isPhoneNumberValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isHeightValid &&
      isWeightValid

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
      try {
        const userData = {
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
        const registerResult = await registerUser(userData)

        if (registerResult.success) {
          console.log('success')
          const { token, user } = registerResult.result
          localStorage.setItem('token', token)
          dispatch(login({ token, user }))
          onClose()
        }
      } catch (error) {
        console.log('registerfail')
        handleInvalidForm()
      }
    } else {
      console.log('submitfail')
      hasSubmitted.current = true
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
              className={`form-input ${nameError ? 'has-error' : ''}`}
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
              className={`form-input ${phoneError ? 'has-error' : ''}`}
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
              className={`form-input ${emailError ? 'has-error' : ''}`}
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
              className={`form-input ${passwordError ? 'has-error' : ''}`}
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
              className={`form-input ${
                confirmPasswordError ? 'has-error' : ''
              }`}
              type="password"
              value={confirmPassword}
              placeholder="비밀번호를 한번 더 입력해주세요."
              onChange={handleConfirmPasswordChange}
              onBlur={(e) =>
                onBlurHandler(
                  e,
                  (value, setError) =>
                    validateConfirmPassword(value, password, setError),
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
              <ImageUploader
                onChange={handleFileChange}
                onFileChange={handleFileChange}
              />
              <div data-tooltip-id="tooltipGuidelines">유의사항(보기)</div>
              <Tooltip
                id="tooltipGuidelines"
                place="top"
                effect="solid"
                multiline
              >
                <p> * 이미지 업로드 가이드라인</p>
                <p>
                  (1) 사용자 전신 사진 촬영 시,
                  <br /> 사용자의 무릎 위 부터 머리 끝까지
                  <br />
                  화면에 꽉 찰 수 있도록 촬영해주세요.
                </p>
                <p>(2) 상의, 하의 색이 다르게 해주세요.</p>
                <p>(3) 한 장만 업로드 해주세요.</p>
              </Tooltip>
            </div>
          </div>
          <div className="form-group size-input-group">
            <label className="form-label">신체 수치(사이즈)</label>
            <div className="size-input-container">
              <label className="form-label">키</label>
              <input
                className={`form-input ${heightError ? 'has-error' : ''}`}
                type="text"
                value={height}
                placeholder="숫자만 입력, 단위 : cm"
                onChange={handleHeightChange}
                onBlur={(e) =>
                  onBlurHandler(e, validateInteger, setHeightError)
                }
                required
              />
              {heightError && (
                <div className="error-message">{heightError}</div>
              )}
            </div>
            <div className="size-input-container">
              <label className="form-label">몸무게</label>
              <input
                className={`form-input ${weightError ? 'has-error' : ''}`}
                type="text"
                value={weight}
                placeholder="숫자만 입력, 단위 : kg"
                onChange={handleWeightChange}
                onBlur={(e) =>
                  onBlurHandler(e, validateInteger, setWeightError)
                }
                required
              />
              {weightError && (
                <div className="error-message">{weightError}</div>
              )}
            </div>
          </div>
          <div className="form-group style-input-group">
            <div className="style-input-container">
              <label className="form-label">스타일 (직접입력 가능)</label>
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
                  <li onClick={() => handleColorItemClick('노랑')}>노랑</li>
                  <li onClick={() => handleColorItemClick('하양')}>하양</li>
                  <li onClick={() => handleColorItemClick('초록')}>초록</li>
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
                placeholder="예시 : 정핏, 슬림핏, 오버핏"
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
                  <li onClick={() => handleFitItemClick('정핏')}>정핏</li>
                  <li onClick={() => handleFitItemClick('슬림핏')}>슬림핏</li>
                  <li onClick={() => handleFitItemClick('오버핏')}>오버핏</li>
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
