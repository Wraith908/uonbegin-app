import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

const ImageUploadBlock = (props: {pictureID: number, setPictureID?: (pictureID: number | ((prevVar: number) => number)) => void}) => {
  const [imageName, setImageName] = useState('');
  const [altText, setAltText] = useState('');
  const [image, setImage] = useState(new File([],''));

  const upload = async () => {
    const formData = new FormData();
    if (image !== null || imageName !== null || altText !== null) {
      formData.append('image', image);
      formData.append('picture_name', imageName);
      formData.append('alt_text', altText);
      try {
        const {data} = await axios.post('upload', formData);
        if (props.setPictureID !== undefined) {
          props.setPictureID(data.picture_id);
          alert('Image Uploaded Successfully');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return(
    <div>
      <p>Image must be uploaded before other changes are submitted</p>
      <label>Image Name</label>
      <input type = "text" onChange = {e => setImageName(e.target.value)} required />
      <label>Alternative Text for image</label>
      <input type = "text" onChange = {e => setAltText(e.target.value)} required />
      <button onClick = {upload}>Upload Image</button>
    </div>
  );
}; export default ImageUploadBlock;
