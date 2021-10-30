import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    <div id="FAQsAndTestimonials">
      <h1>FAQs And Testimonials</h1>
      {information.map((info: Information) => {
        if (info.section == 4) {
          return (
            <div>
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
