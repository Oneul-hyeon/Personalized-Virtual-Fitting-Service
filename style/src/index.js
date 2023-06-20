import React from 'react'
import ReactDOM from 'react-dom/client'
import MyPage from './MyPage'
import './index.css'
import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    {/* <React.StrictMode> */}
    <Nav />
    <MyPage />
    {/* </React.StrictMode> */}
  </>
)
