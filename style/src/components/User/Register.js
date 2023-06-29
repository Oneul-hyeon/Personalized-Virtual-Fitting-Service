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

    if (response.status === 200 || response.status === 201) {
      return { success: true, result: response.data }
    } else {
      return { success: false, error: 'Registration failed.' }
    }
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      return { success: false, error: 'Server error occurred.' }
    } else {
      return { success: false, error: error.message }
    }
  }
}

export default registerUser
