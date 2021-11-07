import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

const ImageUploadBlock = (props: {pictureID: number, setPictureID?: (pictureID: number | ((prevVar: number) => number)) => void}) => {
  const [imageName, setImageName] = useState('');
  const [altText, setAltText] = useState('');

  const upload = async (files: FileList | null) => {
    const formData = new FormData();
    if (files === null) return;
    if (imageName === null || altText === null) {
      alert('Please provide a name and brief description for the image');
    } else {
      formData.append('image', files[0]);
      formData.append('pic_name', imageName);
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
      <input type = "file" onChange = {e => upload(e.target.files)} />
    </div>
  );
}; export default ImageUploadBlock;
