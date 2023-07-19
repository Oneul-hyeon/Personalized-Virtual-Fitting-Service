import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'

async function registerUser(userData) {
  const formData = new FormData()
  formData.append('email', userData.email)
  formData.append('name', userData.name)
  formData.append('phoneNumber', userData.phoneNumber)
  formData.append('password', userData.password)
  formData.append('gender', userData.gender)
  formData.append('height', userData.height)
  formData.append('weight', userData.weight)
  formData.append('favoriteStyle', userData.favoriteStyle)

  if (userData.file) {
    formData.append('file', userData.file)
  } else {
    return { success: false, error: '이미지를 업로드 해주세요.' }
  }

  try {
    const response = await authenticatedAxios.post(
      `${API_URL}/users/register`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    if (response.status >= 200 && response.status < 300) {
      return { success: true, result: response.data }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || 'Registration failed.',
      }
    }
  } catch (error) {
    if (error.response) {
      return { success: false, error: error.response.data.error }
    } else if (error.request) {
      return { success: false, error: 'Network error occurred.' }
    } else {
      return { success: false, error: 'An unknown error occurred.' }
    }
  }
}

export default registerUser
