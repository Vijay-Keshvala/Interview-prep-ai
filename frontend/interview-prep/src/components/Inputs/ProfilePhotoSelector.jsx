import React, { useRef, useState } from 'react'
import { User, Upload, Trash } from 'lucide-react' // ✅ Correct import

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      if (setPreview) setPreview(preview)
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
    if (setPreview) setPreview(null)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className=''>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className='flex flex-col items-center gap-2'>
          <User className="w-16 h-16 text-gray-400" />
          <button
            type="button"
            onClick={onChooseFile}
            className="flex items-center cursor-pointer gap-1 bg-blue-500 text-white px-3 py-1 rounded"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-2'>
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded"
          >
            <Trash className="w-4 h-4" />
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector
