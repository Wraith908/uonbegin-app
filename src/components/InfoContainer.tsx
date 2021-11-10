import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
/*component imports*/
import ImageUploadBlock from './editing-components/ImageUploadBlock';
import InfoCreationForm from './editing-components/InfoCreationForm';
/*models*/
import { Information } from '../models/information';
import { User } from '../models/user';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  /*DB information*/
  const [information, setInformation] = useState([]);
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
  const [ePictureURL, setEPictureURL] = useState('');
  const [cTitle, setCTitle] = useState('');
  const [cBody, setCBody] = useState('');
  const [cPictureURL, setCPictureURL] = useState('');

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
        image_url: ePictureURL
      });
      setEditID(0);
    } catch (error) {
      console.log(error);
    }
    if (editID === 0) {
      try {
        //All of the information
        const {data} = await axios.get('info');
        setInformation(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return(
    <div id={props.title}>
      <h1>{props.title}</h1>
      {newInfo?
        <button onClick = {swapNewInfo}>Close Form</button> :
        props.user.id !== 0 && <button onClick = {swapNewInfo}>Create New Form</button>
      }
      {newInfo && props.user.id !== 0 && <InfoCreationForm newInfo = {newInfo} setNewInfo = {setNewInfo} section_id = {props.section_id}/>}
      {information.map((info: Information) => {
        if (info.section_id === props.section_id) {
          if (editID === info.id) {
            setEPictureURL(info.image_url);
            return(
              <div>
                <form onSubmit = {submitEdit} key = {info.id}>
                  <label>Head</label><button onClick = {() => setEditID(0)}>Edit</button><br />
                  <input type = "text" name = "title" placeholder = "Header"
                  onChange = {e => setETitle(e.target.value)} defaultValue = {info.title} required /><br />
                  <label>Body</label><br />
                  <input type = "text" name = "body" placeholder = "Body of the information block"
                  onChange = {e => setEBody(e.target.value)} defaultValue = {info.body} required /><br />
                  <input type = "hidden" name = "id" value = {info.id} />
                  <label>Would you like to use an image?</label><br />
                  <ImageUploadBlock pictureURL = {ePictureURL} setPictureURL = {setEPictureURL} />
                  <button type = "submit">Submit</button>
                </form>
              </div>
            );
          } else {
            return (
              <div id="infoBlock">
                <h2>{info.title}</h2>
                {props.user.id !== 0 && <button onClick = {() => setEditID(info.id)}>Edit</button>}
                {props.user.id !== 0 && <button onClick = {() => del(info.id)}>Delete</button>}
                <p>{info.body}</p>
                {info.image_url !== undefined && info.image_url !== null && <img src = {info.image_url} />}
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default InfoContainer;
