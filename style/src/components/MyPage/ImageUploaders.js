import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import './ImageUploaders.css'

//Single Image Upload

function ImageUploaders({ onChange }) {
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
          // onChange(file)
        }
      }
      reader.readAsDataURL(file)

      if (typeof onChange === 'function') {
        onChange(file)
      }
    }
  }

  const handleClick = () => {
    inputRef.current.click()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="ImageUploaders">
      <div className="placeholder-texts">
        <div
          className="image-containers"
          onClick={handleClick}
          onDragOver={handleDragOver}
        >
          {/* <button className="image-add-button" onClick={handleClick}> */}
          <FontAwesomeIcon icon={solid('camera')} />
          {/* </button> */}
        </div>
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

export default ImageUploaders
