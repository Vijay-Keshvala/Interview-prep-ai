import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {
    const inputRef = useRef(null)
    const [previewUrl,setPreviewUrl] = useState(null)

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            //update image state
            setImage(file)

            //preview url

            const preview = URL.createObjectURL(file)
            if(setPreview){
                setPreview(preview)
            }
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = () =>{
        //remove image from state
        setImage(null)
        setPreviewUrl(null)

        if(setPreview){
            setPreview(null)
        }
    }

    const onChooseFile = ()=>{
        inputRef.current.click()
    }
    return (

    <div>
      
    </div>
  )
}

export default ProfilePhotoSelector
