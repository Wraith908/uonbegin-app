import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import BasicInfoBlockController from './subcomponents/BasicInfoBlockController';
import InfoCreationForm from './editing-components/InfoCreationForm';
import { Information } from '../models/information';
import { User } from '../models/user';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  const [informationSet,setInformation] = useState([]);
  const [newInfo, setNewInfo] = useState(false);
  const [existingPictures, setExistingPictures] = useState([]);

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
    setNewInfo(!newInfo);
  }

  return(
    <div id={props.title}>
      <h1>{props.title}</h1>
      {newInfo?
        <button onClick = {swapNewInfo}>Close Form</button> :
        props.user.id !== 0 && <button onClick = {swapNewInfo}>Create New Form</button>
      }
      {newInfo && props.user.id !== 0 && <InfoCreationForm section_id = {props.section_id} pictureArray = {existingPictures}/>}
      {informationSet.map((info: Information) => {
        if (info.section_id === props.section_id) {
          return (
              <BasicInfoBlockController key = {info.id} id = {info.id} title = {info.title} body = {info.body}
              section_id = {info.section_id} picture = {info.picture} user = {props.user} pictureArray = {existingPictures}/>
          );
        }
      })}
    </div>
  );
}

export default InfoContainer;
