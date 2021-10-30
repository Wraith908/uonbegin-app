import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import BasicInfoBlock from './subcomponents/BasicInfoBlock';
import { Information } from '../models/information';

const InfoContainer = (props: {title: string, section_id: number}) => {
  const [information,setInformation] = useState([]);

  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get('info');

          setInformation(data.data);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[]);

  return(
    <div id={props.title}>
      <h1>{props.title}</h1>
      {information.map((info: Information) => {
        if (info.section == props.section_id) {
          return (
            <div key = {info.id}>
              <h2>{info.title}</h2>
              <p>{info.body}</p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default InfoContainer;
