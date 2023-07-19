import authenticatedAxios from '../../api/authenticatedAxios'
import { API_URL } from '../../api/apiConfig'

// 피팅 / 마이페이지 모두 사용
// 나중에 redux store에 URL 추가하면 좋을듯
const getProfileImage = async (setState) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user._id) {
      console.error('User ID not found')
      return
    }
    const userId = user._id
    const response = await authenticatedAxios.get(
      `${API_URL}/userinfo/api/userimage`,
      {
        params: {
          userId: userId,
        },
      }
    )
    setState(response.data.image)
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

export default getProfileImage
