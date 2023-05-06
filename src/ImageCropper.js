import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper() {
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [height,setHeight] = useState(300)
  const [width,setWidth] = useState(300)
  const [nheight,setNHeight] = useState(300)
  const [nwidth,setNWidth] = useState(300)

  const handleSubmit=(e)=>{
    e.preventDefault();
        setNHeight(height)
        setNWidth(width);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedAreaPixels, croppedAreaPercentages) => {
    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.onload = () => {
      ctx.drawImage(
        imageElement,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      setCroppedImage(canvas.toDataURL());
    };
  };

 
  

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <ReactCrop
          
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleCropComplete}
        >
            <img src={image}/>
        </ReactCrop>
      )}
      {croppedImage &&(<>
       <img src={croppedImage} alt="Cropped Image" height={nheight} width={nwidth}/>
       <form onSubmit={handleSubmit}>
        <input type='text' label='height' value={height} onChange={e=>setHeight(e.target.value)}/>
        <input type='text' label='width' value={width} onChange={e=>setWidth(e.target.value)}/>
        <button type="submit">Resize</button>
       </form>
       </>
      )
      }
    </div>
  );
}

export default ImageCropper;
