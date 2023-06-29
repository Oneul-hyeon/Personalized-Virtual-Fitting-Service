import { useState, useRef } from 'react'
import './ImageUploader.css'

//Single Image Upload

function ImageUploader({ onChange, onFileChange }) {
  const [uploadedImage, setUploadedImage] = useState(null)
  const inputRef = useRef()
  const allowedExtensions = ['png', 'jpg', 'jpeg', 'bmp']

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const extension = file.name.split('.').pop()?.toLowerCase()
      if (!allowedExtensions.includes(extension)) {
        alert('Invalid file extension. Only images are allowed.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = (e) => {
        const result = e.target.result
        if (result) {
          setUploadedImage(result)
          onChange(file)
        }
      }
      reader.readAsDataURL(file)

      if (typeof onFileChange === 'function') {
        onFileChange(file)
      }
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    onChange(null) // 이미지 파일 객체를 초기화
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        const result = e.target.result
        if (result) {
          setUploadedImage(result)
          onChange(file)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleClick = () => {
    inputRef.current.click()
  }

  return (
    <div className="ImageUploader">
      <div
        className={`image-container ${uploadedImage ? 'has-image' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {uploadedImage ? (
          <div className="image-container">
            <img src={uploadedImage} alt="preview" className="preview-image" />
            <div className="remove-button" onClick={handleRemoveImage}>
              X
            </div>
          </div>
        ) : (
          <div className="placeholder-text">
            드래그 또는 클릭하여 이미지 업로드
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImageUploader
