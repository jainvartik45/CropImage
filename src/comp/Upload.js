import React, { useState } from 'react'
import {ReactCrop , makeAspectCrop , centerCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


const Upload = () => {
    const [fs , setFs] = useState(null)
    const handleFileChange = e =>{
        setFs(URL.createObjectURL(e.target.files[0]))
    }
    const [crop, setCrop] = useState({aspect:16/9})
    const [image , setImage] = useState(null);
    const [result , setResult] = useState(null);



function onImageLoad(e) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
  
    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: '%',
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    )
  
    setCrop(crop)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-6'>
                <input type ='file'  accept='image/*' onChange={handleFileChange}/>
            </div> 
            
                {fs && <div className='col-6'>
                    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                        <img src={fs} onLoad={onImageLoad} />
                    </ReactCrop>
                    
                    </div>}
               {result && <div>
                <img src={result} alt='cropped Image'/>
                </div>}
        </div>
    </div>
  )
}

export default Upload