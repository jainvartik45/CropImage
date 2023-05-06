import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper() {
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

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
      {croppedImage && <img src={croppedImage} alt="Cropped Image" />}
    </div>
  );
}

export default ImageCropper;
