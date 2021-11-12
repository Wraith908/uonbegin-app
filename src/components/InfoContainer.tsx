import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
/*component imports*/
import ImageUploadBlock from './editing-components/ImageUploadBlock';
/*models*/
import { Information } from '../models/information';
import { User } from '../models/user';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  /*DB information*/
  const [information, setInformation] = useState([]);
  /*State variables*/
  const [editInfo, setEditInfo] = useState(new Information());
  const [newInfo, setNewInfo] = useState(false);
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
          const {data} = await axios.get(`info/`);
          setInformation(data);
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

  const submitCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('info', {
          title: cTitle,
          body: cBody,
          section_id: props.section_id,
          image_url:  cPictureURL
      })
      setCTitle('');
      setCBody('');
      setCPictureURL('');
      setNewInfo(false);
    } catch (error) {
      console.log(error);
    }
    try {
      //All of the information
      const {data} = await axios.get('info');
      setInformation(data);
    } catch (error) {
      console.log(error);
    }
  }

  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setEID(editInfo.id);
    try {
      await axios.put(`info/${eId}`,{
        title: eTitle,
        body: eBody,
        section_id: props.section_id,
        image_url: ePictureURL
      });
      setEditInfo(new Information());
    } catch (error) {
      console.log(error);
    }
    try {
      //All of the information
      const {data} = await axios.get('info');
      setInformation(data);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div id="bannerSettings">
      <h1>{props.title}</h1>
      {newInfo?
        <button onClick = {swapNewInfo}>Close Form</button> :
        props.user.id !== 0 && <button onClick = {swapNewInfo}>Create New Form</button>
      }
      {newInfo && props.user.id !== 0 &&
        <div id = "infoCreationForm">
          <form onSubmit = {submitCreate}>
            <label>Head</label><br />
            <input type = "text" onChange = {e => setCTitle(e.target.value)}
            placeholder = "Header" required /><br />
            <label>Body</label><br />
            <textarea onChange = {e => setCBody(e.target.value)} required></textarea><br />
            <label>Image</label><br />
            {cPictureURL === ''?
              <p>No picture</p>:
              <div>
                <p>{cPictureURL}</p><button onClick = {() => setCPictureURL('')}>Remove picture</button>
              </div>
            }
            <ImageUploadBlock pictureURL = {cPictureURL} setPictureURL = {setCPictureURL}/>
            <button type = "submit">Submit</button>
          </form>
        </div>
       }
      {information.map((info: Information) => {
        if (info.section_id === props.section_id) {
          if (info.id === editInfo.id) {
            return(
              <div id = "infoCreationForm">
                <button onClick = {() => setEditInfo(new Information())}>Close Edit</button><br />
                <form onSubmit = {submitEdit}>
                  <label>Head</label><br />
                  <input type = "text" name = "title" placeholder = "Header"
                  onChange = {e => setETitle(e.target.value)} defaultValue = {info.title} required /><br />
                  <label>Body</label><br />
                  <textarea onChange = {e => setEBody(e.target.value)} defaultValue = {info.body} required></textarea><br />
                  {ePictureURL === ''?
                    <p>No picture</p>:
                    <div>
                      <p>{ePictureURL}</p><button onClick = {() => setEPictureURL('')}>Remove picture</button>
                    </div>
                  }
                  <ImageUploadBlock pictureURL = {ePictureURL} setPictureURL = {setEPictureURL} />
                  <button type = "submit">Submit</button>
                </form>
              </div>
            );
          }
          return(
            <div id="infoBlock">
              <h2>{info.title}</h2>
              {props.user.id !== 0 && <button onClick = {() => setEditInfo(info)}>Edit</button>}
              <p>{info.body}</p>
              {info.image_url !== undefined && info.image_url !== null && <img src = {info.image_url} />}
              {props.user.id !== 0 && <button onClick = {() => del(info.id)}>Delete</button>}
            </div>
          );
        }
      })}
    </div>
  );
}

export default InfoContainer;
