import React from 'react'
import './LoadingIndicator.css'

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator-container">
      <div className="loading-indicator">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  )
}

export default LoadingIndicator
