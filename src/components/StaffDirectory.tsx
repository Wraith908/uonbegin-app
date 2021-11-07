import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StaffSearchBrief from './subcomponents/StaffSearchBrief';
import StaffSearchResults from './subcomponents/StaffSearchResult';
import ImageUploadBlock from './editing-components/ImageUploadBlock';
import { Picture } from '../models/picture';
import { Staff } from '../models/staff';
import { User } from '../models/user';

const StaffDirectory = (props: {user: User}) => {
  /*DB information*/
  const [staffList,setStaffList] = useState([]);
  const [existingPictures, setExistingPictures] = useState([]);
  /*the focus of the page*/
  const [chosenStaff, setChosenStaff] = useState(new Staff());
  /*State booleans*/
  const [isEditing, setIsEditing] = useState(false);
  const [chosenScreenActive, setChosenScreenActive] = useState(false);
  const [optionSelected, setOptionSelected] = useState(0);
  /*Pagination methods*/
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  /*Edit/Create variables*/
  const [cName, setCName] = useState('');
  const [cAbout, setCAbout] = useState('');
  const [cContactEmail, setCContactEmail] = useState('');
  const [cContactPhone, setCContactPhone] = useState('');
  const [cContactModbile, setCContactMobile] = useState('');
  const [cContactFax, setCContactFax] = useState('');
  const [cFocusArea, setCFocusArea] = useState('');
  const [cOfficeRoom, setCOfficeRoom] = useState('');
  const [cOfficeBuilding, setCOfficeBuilding] = useState('');
  const [cOfficeLocation, setCOfficeLocation] = useState('');
  const [cPictureID, setCPictureID] = useState('');
  const [eName, setEName] = useState('');
  const [eAbout, setEAbout] = useState('');
  const [eContactEmail, setEContactEmail] = useState('');
  const [eContactPhone, setEContactPhone] = useState('');
  const [eContactModbile, setEContactMobile] = useState('');
  const [eContactFax, setEContactFax] = useState('');
  const [eFocusArea, setEFocusArea] = useState('');
  const [eOfficeRoom, setEOfficeRoom] = useState('');
  const [ecOfficeBuilding, setEOfficeBuilding] = useState('');
  const [eOfficeLocation, setEOfficeLocation] = useState('');
  const [ePictureID, setEPictureID] = useState(0);
  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get('staff');
          setStaffList(data.data);
          setLastPage(data.meta.last_page);

          const pictures = await axios.get('picture').then(response => response);
          setExistingPictures(pictures);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[page]);

  const next = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  }

  const prev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  return(
    <div id="staffDirectory">
      <div>
        {/*This-is-gonna-be-the-search-bar*/

        /*This-is-gonna-be-the-results-list*/}
        <h1>Staff Directory</h1>
        {staffList.map((staff: Staff) => {
          return(
            <StaffSearchBrief key = {staff.id} staff = {staff} setChosenStaff = {setChosenStaff}/>
          );
        })}
        <button onClick = {prev}>Prev</button>
        <button onClick = {next}>Next</button>
      </div>
      <div>
        {isEditing?
          <div>
            <form><button onClick = {() => setIsEditing(!isEditing)}>View</button>
            <label>Staff Name</label>
            <input type = "text" onChange = {e => setEName(e.target.value)} defaultValue = {chosenStaff.name} required />
            <label>About {chosenStaff.name}</label>
            <input type = "text" onChange = {e => setEAbout(e.target.value)} defaultValue = {chosenStaff.about} required />
            {/*Contact information section*/}
            <label>Contact Information</label>
            <label>Email</label>
            <input type = "text" onChange = {e => setEContactEmail(e.target.value)} defaultValue = {chosenStaff.contact_email} required />
            <label>Phone</label>
            <input type = "text" onChange = {e => setEContactPhone(e.target.value)} defaultValue = {chosenStaff.contact_phone} required />
            <label>Mobile</label>
            <input type = "text" onChange = {e => setEContactMobile(e.target.value)} defaultValue = {chosenStaff.contact_mobile} required />
            <label>Fax</label>
            <input type = "text" onChange = {e => setEContactFax(e.target.value)} defaultValue = {chosenStaff.contact_fax} required />
            <label>Focuse area and Office Location</label>
            <label>Focus Area</label>
            <input type = "text" onChange = {e => setEFocusArea(e.target.value)} defaultValue = {chosenStaff.focus_area} required />
            <label>Office Room</label>
            <input type = "text" onChange = {e => setEOfficeRoom(e.target.value)} defaultValue = {chosenStaff.office_room} required />
            <label>Office Building</label>
            <input type = "text" onChange = {e => setEOfficeBuilding(e.target.value)} defaultValue = {chosenStaff.office_building} required />
            <label>Office Location</label>
            <input type = "text" onChange = {e => setEOfficeLocation(e.target.value)} defaultValue = {chosenStaff.office_location} required />
            <label>Image</label>
            <select onChange = {e => setOptionSelected(parseInt(e.target.value))}>
              <option value = "1">No</option>
              <option value = "2">Yes, I'd like to upload one</option>
              <option value = "3">Yes, there's one on the database</option>
            </select>
            {optionSelected === 1 &&
              <p>No Picture Selected</p>
            } {optionSelected === 2 &&
              <ImageUploadBlock pictureID = {ePictureID} setPictureID = {setEPictureID} />
            } {optionSelected === 3 &&
              <select onChange = {e => setEPictureID(parseInt(e.target.value))}>
              {existingPictures.map((picture: Picture) => {
                return(
                  <option key = {picture.picture_id} value = {picture.picture_id}>{picture.picture_name}</option>
                );
              })}
              </select>}
            </form>
          </div> :
           <div>{props.user.id !==0 && <button onClick = {() => setIsEditing(!isEditing)}>Edit</button>}
             <h3>{chosenStaff.name}</h3>
             <p>{chosenStaff.about}</p>
             <p>Contact Information:
             <ul>
               <li>Contact Email {chosenStaff.contact_email}</li>
               <li>Contact Phone {chosenStaff.contact_phone}</li>
               <li>Contact Mobile {chosenStaff.contact_mobile}</li>
               <li>Contact Fax {chosenStaff.contact_fax}</li>
             </ul>
             </p>
             <p>Focus Area and office:
             <ul>
               <li>Focus Area {chosenStaff.focus_area}</li>
               <li>Office Room {chosenStaff.office_room}</li>
               <li>Office Building {chosenStaff.office_building}</li>
               <li>Office Location {chosenStaff.office_location}</li>
             </ul>
             </p>
             <img src = {chosenStaff.picture.pictureURL} />
          </div>}
      </div>
    </div>
  );
}

export default StaffDirectory;
