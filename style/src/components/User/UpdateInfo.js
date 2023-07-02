import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'

export async function updateUser(userData) {
  try {
    const response = await authenticatedAxios.put(
      `${API_URL}/userInfo/api/privacy`,
      userData
    )
    if (response.status === 200 || response.status === 201) {
      return response.data
    }
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      return error.response.data
    } else {
      return error.response.data
    }
  }
}

export async function updateSize(userData) {
  try {
    const response = await authenticatedAxios.put(
      `${API_URL}/userInfo/api/privacy`,
      userData
    )

    if (response.status === 200 || response.status === 201) {
      return { success: true, result: response.data }
    }
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      return { success: false, error: 'Server error occurred.' }
    } else {
      return { success: false, error: error.message }
    }
  }
}
