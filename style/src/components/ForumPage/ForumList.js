import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForums } from '../../features/forumsSlice'
import { Link } from 'react-router-dom'
import { API_URL } from '../../api/apiConfig'
import axios from 'axios'

import './ForumList.css'

const client = `${API_URL}/api/outfitforums`

const Forum = ({ forum, refreshForums }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const isUserAuthor =
    forum.user && loggedInUser && forum.user._id === loggedInUser._id

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('이 게시글을 정말로 삭제하시겠습니까?')
    if (confirmDelete) {
      try {
        await axios.delete(`${client}/${forum._id}`, {
          data: { userId: loggedInUser._id, id: forum._id },
        })
        // 게시글이 성공적으로 삭제된 후 게시판 업데이트
        refreshForums()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="forum-card">
      <h3>{forum.title}</h3>
      <p>{forum.content}</p>
      {forum.image && <img src={`${API_URL}/${forum.image}`} alt="Forum" />}
      <Link to={`/outfitforums/${forum._id}`} className="forum-details-btn">
        자세히 보기
      </Link>
      {isUserAuthor && (
        <button onClick={handleDeletePost} className="forum-delete-btn">
          삭제
        </button>
      )}
    </div>
  )
}

const ForumList = () => {
  const dispatch = useDispatch()
  const { forums } = useSelector((state) => state.forums)

  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    dispatch(fetchForums({ title: searchKeyword }))
  }, [dispatch, searchKeyword])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchKeyword(e.target.searchKeyword.value)
  }

  const refreshForums = () => {
    dispatch(fetchForums({ title: searchKeyword }))
  }

  return (
    <div className="forum-list">
      <h1>코디 공유 게시판</h1>
      <div className="forum-header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="searchKeyword"
            placeholder="검색"
            className="forum-search"
          />
          <button type="submit" className="forum-search-btn">
            검색
          </button>
        </form>
        <Link to="/outfitforums/new" className="forum-new-btn">
          글 작성
        </Link>
      </div>
      <div className="forum-cards">
        {forums.map((forum) => (
          <Forum key={forum._id} forum={forum} refreshForums={refreshForums} />
        ))}
      </div>
    </div>
  )
}

export default ForumList
