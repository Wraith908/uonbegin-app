import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import StaffSearchBrief from './subcomponents/StaffSearchBrief';
import StaffSearchResults from './subcomponents/StaffSearchResult';
import ImageUploadBlock from './editing-components/ImageUploadBlock';
import { Staff } from '../models/staff';
import { User } from '../models/user';

const StaffDirectory = (props: {user: User}) => {
  /*DB information*/
  const [staffList,setStaffList] = useState([]);
  /*the focus of the page*/
  const [chosenStaff, setChosenStaff] = useState(new Staff());
  /*State booleans*/
  const [isEditing, setIsEditing] = useState(false);
  const [newStaff, setNewStaff] = useState(false);
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
  const [cPictureURL, setCPictureURL] = useState('');
  const [eName, setEName] = useState('');
  const [eAbout, setEAbout] = useState('');
  const [eContactEmail, setEContactEmail] = useState('');
  const [eContactPhone, setEContactPhone] = useState('');
  const [eContactModbile, setEContactMobile] = useState('');
  const [eContactFax, setEContactFax] = useState('');
  const [eFocusArea, setEFocusArea] = useState('');
  const [eOfficeRoom, setEOfficeRoom] = useState('');
  const [eOfficeBuilding, setEOfficeBuilding] = useState('');
  const [eOfficeLocation, setEOfficeLocation] = useState('');
  const [ePictureURL, setEPictureURL] = useState('');
  /*searchbar*/
  const [search, setSearch] = useState('');

  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get('staff');
          setStaffList(data.data);
          setLastPage(data.meta.last_page);
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

  const submitCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('staff',{
        name: cName,
        about: cAbout,
        contactEmail: cContactEmail,
        contactPhone: cContactPhone,
        contactModbile: cContactModbile,
        contactFax: cContactFax,
        focusArea: cFocusArea,
        officeRoom: cOfficeRoom,
        officeBuilding: cOfficeBuilding,
        officeLocation: cOfficeLocation,
        image_url: cPictureURL
      });
      setChosenStaff(new Staff());
    } catch (error) {
      console.log(error);
    }
    if (chosenStaff.id === 0) {
      try {
        //All of the information
        const {data} = await axios.get('staff');
        setStaffList(data.data);
        setLastPage(data.meta.last_page);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`staff/${chosenStaff.id}`,{
        name: eName,
        about: eAbout,
        contactEmail: eContactEmail,
        contactPhone: eContactPhone,
        contactModbile: eContactModbile,
        contactFax: eContactFax,
        focusArea: eFocusArea,
        officeRoom: eOfficeRoom,
        officeBuilding: eOfficeBuilding,
        officeLocation: eOfficeLocation,
        image_url: ePictureURL
      });
      setChosenStaff(new Staff());
    } catch (error) {
      console.log(error);
    }
    if (chosenStaff.id === 0) {
      try {
        //All of the information
        const {data} = await axios.get('staff');
        setStaffList(data.data);
        setLastPage(data.meta.last_page);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const ActiveSection = () => {
    if (chosenStaff.id === 0 && !newStaff) {
      return(
        <div>
          {props.user.id !== 0 &&  <button onClick = {() => setNewStaff(!newStaff)}>Create New Staff</button>}
          <p>Please select a staff member</p>
        </div>
      );
    } else if (newStaff) {
      return(
        <div>
          <form onSubmit = {submitCreate}><button onClick = {() => setNewStaff(!newStaff)}>View</button>
          <label>Staff Name</label>
          <input type = "text" onChange = {e => setCName(e.target.value)} required />
          <label>About {chosenStaff.name}</label>
          <input type = "text" onChange = {e => setCAbout(e.target.value)} required />
          {/*Contact information section*/}
          <label>Contact Information</label>
          <label>Email</label>
          <input type = "text" onChange = {e => setEContactEmail(e.target.value)} required />
          <label>Phone</label>
          <input type = "text" onChange = {e => setEContactPhone(e.target.value)} required />
          <label>Mobile</label>
          <input type = "text" onChange = {e => setEContactMobile(e.target.value)} required />
          <label>Fax</label>
          <input type = "text" onChange = {e => setEContactFax(e.target.value)} required />
          <label>Focuse area and Office Location</label>
          <label>Focus Area</label>
          <input type = "text" onChange = {e => setEFocusArea(e.target.value)} required />
          <label>Office Room</label>
          <input type = "text" onChange = {e => setEOfficeRoom(e.target.value)} required />
          <label>Office Building</label>
          <input type = "text" onChange = {e => setEOfficeBuilding(e.target.value)} required />
          <label>Office Location</label>
          <input type = "text" onChange = {e => setEOfficeLocation(e.target.value)} required />
          <label>Image</label>
          <ImageUploadBlock pictureURL = {ePictureURL} setPictureURL = {setEPictureURL} />
          <button type = "submit">Submit</button>
          </form>
        </div>
      );
    }
    return(
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
        <img src = {chosenStaff.image_url} />
      </div>
    );
  }

  return(
    <div id="staffDirectory">
      <div>
        {/*This-is-gonna-be-the-search-bar*/

        /*This-is-gonna-be-the-results-list*/}
        <h1>Staff Directory</h1>
        <input type = "text" placeholder = "Enter a name here" onChange = {(e) => setSearch(e.target.value)} className = "searchbar"/>
        {staffList.map((staff: Staff) => {
          if (staff.name.includes(search)) {
            return(
              <StaffSearchBrief key = {staff.id} staff = {staff} setChosenStaff = {setChosenStaff}/>
            );
          }
        })}
        <button onClick = {prev}>Prev</button>
        <button onClick = {next}>Next</button>
      </div>
      <div>
        {isEditing?
          <div>
            <form onSubmit = {submitEdit}><button onClick = {() => setIsEditing(!isEditing)}>View</button>
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
            <ImageUploadBlock pictureURL = {ePictureURL} setPictureURL = {setEPictureURL} />
            <button type = "submit">Submit</button>
            </form>
          </div> :
          <ActiveSection />}
      </div>
    </div>
  );
}

export default StaffDirectory;
