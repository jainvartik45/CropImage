import React,{useState,useCallback } from 'react'

import Upload from './comp/Upload'



const App = () => {
//  const [selectedImage , setSelectedImage] = useState(null)
//  const CONTAINER_HEIGHT = 300
//  const [crop, onCropChange] = React.useState({ x: 0, y: 0 })
//   const [zoom, onZoomChange] = React.useState(1)

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     console.log(croppedArea, croppedAreaPixels)
//   }, [])
 
 

  return (
    <div>
      <Upload/>

    </div>
  )
}

export default App