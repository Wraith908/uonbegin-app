import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import InfoCreationForm from './editing-components/InfoCreationForm';
import { Information } from '../models/information';
import { User } from '../models/user';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  const [information, setInformation] = useState([]);
  const [newInfo, setNewInfo] = useState(false);
  const [existingPictures, setExistingPictures] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          //All of the information
          const {data} = await axios.get('info');
          setInformation(data.data);
        } catch (error) {
          console.log(error);
        }
        try {
          //All of the information
          const {data} = await axios.get('picture');
          setExistingPictures(data);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[]);

  const swapNewInfo = () => {
    //This is used to determine which state the creation form should be in
    setNewInfo(!newInfo);
  }

  const swapIsEditing = () => {

  }

  return(
    <div id={props.title}>
      <h1>{props.title}</h1>
      {newInfo?
        <button onClick = {swapNewInfo}>Close Form</button> :
        props.user.id !== 0 && <button onClick = {swapNewInfo}>Create New Form</button>
      }
      {newInfo && props.user.id !== 0 && <InfoCreationForm section_id = {props.section_id} pictureArray = {existingPictures}/>}
      {information.map((info: Information) => {
        if (info.section_id === props.section_id) {
          return (
            <div>
              <h2>{info.title}</h2><button onClick = {del(info.id)}>Delete</button>
              <p>{info.body}</p>
              {info.picture !== undefined && info.picture !== null && <img src = {info.picture.pictureURL} />}
            </div>
          );
        }
      })}
    </div>
  );
}

export default InfoContainer;
