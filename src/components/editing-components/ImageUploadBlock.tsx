import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

const ImageUploadBlock = (props: {pictureURL: string, setPictureURL?: (pictureURL: string | ((prevVar: string) => string)) => void}) => {
  const [imageName, setImageName] = useState('');
  const [altText, setAltText] = useState('');

  const upload = async (files: FileList | null) => {
    const formData = new FormData();
    if (files === null) return;
      formData.append('image', files[0]);
    try {
      const {data} = await axios.post('upload', formData);
      if (props.setPictureURL !== undefined) {
        props.setPictureURL(data.url);
        alert('Image Uploaded Successfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div>
      <input type = "file" onChange = {e => upload(e.target.files)} />
    </div>
  );
}; export default ImageUploadBlock;
