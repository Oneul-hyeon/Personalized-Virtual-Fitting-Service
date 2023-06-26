import authenticatedAxios from '../api/authenticatedAxios'

const API_URL = 'http://localhost:3000'

const registerUser = async (data) => {
  try {
    const response = await authenticatedAxios.post(
      `${API_URL}/users/register`,
      data
    )

    console.log('API Response:', response.data)

    if (response.status === 200 || response.status === 201) {
      return { success: true, result: response.data }
    } else {
      return { success: false, error: 'Registration failed.' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default registerUser
