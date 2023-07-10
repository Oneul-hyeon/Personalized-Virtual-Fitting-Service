import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createForumPost } from '../../features/forumsSlice'
import { useNavigate } from 'react-router-dom'
import './NewForumPost.css'

const NewForumPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user._id

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      user: userId,
      title: title,
      content: content,
      image: image,
    }

    dispatch(createForumPost(data)).then(() => {
      setTitle('')
      setContent('')
      setImage(null)

      navigate('/outfitforums')
    })
  }

  return (
    <div className="new-forum-post">
      <h1>새 게시글 작성</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="제목"
          className="new-forum-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="본문"
          className="new-forum-post-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="file"
          className="new-forum-post-file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="new-forum-post-submit">
          작성하기
        </button>
      </form>
    </div>
  )
}

export default NewForumPost
