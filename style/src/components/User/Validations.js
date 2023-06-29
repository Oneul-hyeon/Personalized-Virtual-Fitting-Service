export const validateName = (name, setNameError) => {
  if (/^[가-힣a-zA-Z\s]+$/.test(name)) {
    setNameError('')
    return true
  } else {
    setNameError('이름은 문자로만 구성되어야 합니다.')
    return false
  }
}

export const validatePhoneNumber = (phoneNumber, setPhoneError) => {
  if (/^\d{3}\-\d{4}\-\d{4}$/.test(phoneNumber)) {
    setPhoneError('')
    return true
  } else {
    setPhoneError('전화번호는 010-0000-0000 과 같은 양식이어야 합니다.')
    return false
  }
}

export const validateEmail = (email, setEmailError) => {
  if (
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      email
    )
  ) {
    setEmailError('')
    return true
  } else {
    setEmailError('이메일 양식에 맞지 않습니다.')
    return false
  }
}

export const validatePassword = (password, setPasswordError) => {
  if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    setPasswordError('')
    return true
  } else {
    setPasswordError(
      '비밀번호는 영문과 숫자를 포함하여 8자리 이상 구성하여야 합니다.'
    )
    return false
  }
}

export const validateConfirmPassword = (
  confirmPassword,
  password,
  setConfirmPasswordError
) => {
  if (password === confirmPassword) {
    setConfirmPasswordError('')
    return true
  } else {
    setConfirmPasswordError('비밀번호가 다릅니다.')
    return false
  }
}

export const validateInteger = (number, setNumberError) => {
  if (Number.isInteger(Number(number))) {
    setNumberError('')
    return true
  } else {
    setNumberError('정수만 입력 가능합니다.')
    return false
  }
}
