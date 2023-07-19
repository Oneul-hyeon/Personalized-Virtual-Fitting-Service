import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../api/apiConfig'
import axios from 'axios'

const ForumDetails = () => {
  const { id } = useParams()
  const [forum, setForum] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/outfitforums/${id}`)
        setForum(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div>
      {forum && (
        <>
          <h1>{forum.title}</h1>
          <p>{forum.content}</p>
          {forum.image && <img src={`${API_URL}/${forum.image}`} alt="Forum" />}
        </>
      )}
    </div>
  )
}

export default ForumDetails
