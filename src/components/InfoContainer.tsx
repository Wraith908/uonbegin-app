import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
/*component imports*/
import ImageUploadBlock from './editing-components/ImageUploadBlock';
import InfoCreationForm from './editing-components/InfoCreationForm';
/*models*/
import { Information } from '../models/information';
import { User } from '../models/user';
import { Picture } from '../models/picture';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  /*DB information*/
  const [information, setInformation] = useState([]);
  const [existingPictures, setExistingPictures] = useState([]);
  /*State variables*/
  const [editID, setEditID] = useState(0);
  const [newInfo, setNewInfo] = useState(false);
  const [optionSelected, setOptionSelected] = useState(0);
  /*Image Upload*/
  const [pictureID, setPictureID] = useState(0);
  /*Edit/Create variables*/
  const [eId, setEID] = useState(0);
  const [eTitle, setETitle] = useState('');
  const [eBody, setEBody] = useState('');
  const [ePictureID, setEPictureID] = useState(0);
  const [cTitle, setCTitle] = useState('');
  const [cBody, setCBody] = useState('');
  const [cPictureID, setCPictureID] = useState(0);

  useEffect(() => {
    (
      async () => {
        try {
          //All of the information
          const {data} = await axios.get('info');
          setInformation(data.data);

          //Now I need to get pictures
          const pictures = await axios.get('picture').then(response => response);
          setExistingPictures(pictures);
          console.log(pictures);
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

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete')) {
      axios.delete(`info/${id}`);

      setInformation(information.filter((info: Information) => info.id !== id));
    }
  }

  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`info/${eId}`,{
        title: eTitle,
        body: eBody,
        section_id: props.section_id,
        picture_id: ePictureID
      });

      setEditID(0);
    } catch (error) {
      console.log(error);
    }
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
          if (editID === info.id) {
            return(
              <div>
                <form onSubmit = {submitEdit}>
                  <label>Head</label><button onClick = {() => setEditID(0)}>Edit</button><br />
                  <input type = "text" name = "title" placeholder = "Header"
                  onChange = {e => setETitle(e.target.value)} defaultValue = {info.title} required /><br />
                  <label>Body</label><br />
                  <input type = "text" name = "body" placeholder = "Body of the information block"
                  onChange = {e => setEBody(e.target.value)} defaultValue = {info.body} required /><br />
                  <input type = "hidden" name = "id" value = {info.id} />
                  <label>Would you like to use an image?</label><br />
                  <select onChange = {e => setOptionSelected(parseInt(e.target.value))}>
                    <option value = "1">No</option>
                    <option value = "2">Yes, I'd like to upload one</option>
                    <option value = "3">Yes, there's one on the database</option>
                  </select>
                  {optionSelected === 1 &&
                    <p>No Picture Selected</p>
                  } {optionSelected === 2 &&
                    <ImageUploadBlock pictureID = {pictureID} setPictureID = {setPictureID} />
                  } {optionSelected === 3 &&
                    <select onChange = {e => setEPictureID(parseInt(e.target.value))}>
                    {existingPictures.map((picture: Picture) => {
                      return(
                        <option key = {picture.picture_id} value = {picture.picture_id}>{picture.picture_name}</option>
                      );
                    })}
                    </select>}
                  <button type = "submit">Submit</button>
                </form>
              </div>
            );
          } else {
            return (
              <div>
                <h2>{info.title}</h2>
                {props.user.id !== 0 && <button onClick = {() => setEditID(info.id)}>Edit</button>}
                {props.user.id !== 0 && <button onClick = {() => del(info.id)}>Delete</button>}
                <p>{info.body}</p>
                {info.picture !== undefined && info.picture !== null && <img src = {info.picture.pictureURL} />}
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default InfoContainer;
