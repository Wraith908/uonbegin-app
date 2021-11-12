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
          const {data} = await axios.get(`staff?page=${page}`);
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
        contact_email: cContactEmail,
        contact_phone: cContactPhone,
        contact_mobile: cContactModbile,
        contact_fax: cContactFax,
        focus_area: cFocusArea,
        office_room: cOfficeRoom,
        office_building: cOfficeBuilding,
        office_location: cOfficeLocation,
        image_url: cPictureURL
      });
      setNewStaff(false);
    } catch (error) {
      console.log(error);
    }
    try {
      //All of the information
      const {data} = await axios.get('staff');
      setStaffList(data.data);
      setLastPage(data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`staff/${chosenStaff.id}`,{
        name: eName,
        about: eAbout,
        contact_email: eContactEmail,
        contact_phone: eContactPhone,
        contact_mobile: eContactModbile,
        contact_fax: eContactFax,
        focus_area: eFocusArea,
        office_room: eOfficeRoom,
        office_building: eOfficeBuilding,
        office_location: eOfficeLocation,
        image_url: ePictureURL
      });
      setIsEditing(false);

    } catch (error) {
      console.log(error);
    }
    try {
      //All of the information
      const {data} = await axios.get('staff');
      setStaffList(data.data);
      setLastPage(data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete')) {
      axios.delete(`staff/${id}`);

      setStaffList(staffList.filter((staff: Staff) => staff.id !== id));
    }
  }

  const commenceSearch = async () => {
    try {
      const {data} = await axios.get(`staff/search?page=${page}&search=${search}`);
      setStaffList(data.data);
      setLastPage(data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  const ActiveSection = () => {
    if (isEditing) {
      return(
        <div>
          <form onSubmit = {submitEdit}><button onClick = {() => setIsEditing(!isEditing)}>View</button><br />
          <label>Staff Name</label><br />
          <input type = "text" onChange = {e => setEName(e.target.value)} defaultValue = {chosenStaff.name} required /><br />
          <label>About {chosenStaff.name}</label><br />
          <textarea onChange = {e => setEAbout(e.target.value)} required>{chosenStaff.about}</textarea><br />
          {/*Contact information section*/}
          <label>Contact Information</label><br />
          <label>Email</label><br />
          <input type = "text" onChange = {e => setEContactEmail(e.target.value)} defaultValue = {chosenStaff.contact_email} required /><br />
          <label>Phone</label><br />
          <input type = "text" onChange = {e => setEContactPhone(e.target.value)} defaultValue = {chosenStaff.contact_phone} required /><br />
          <label>Mobile</label><br />
          <input type = "text" onChange = {e => setEContactMobile(e.target.value)} defaultValue = {chosenStaff.contact_mobile} required /><br />
          <label>Fax</label><br />
          <input type = "text" onChange = {e => setEContactFax(e.target.value)} defaultValue = {chosenStaff.contact_fax} required /><br />
          <label>Focuse area and Office Location</label><br />
          <label>Focus Area</label><br />
          <input type = "text" onChange = {e => setEFocusArea(e.target.value)} defaultValue = {chosenStaff.focus_area} required /><br />
          <label>Office Room</label><br />
          <input type = "text" onChange = {e => setEOfficeRoom(e.target.value)} defaultValue = {chosenStaff.office_room} required /><br />
          <label>Office Building</label><br />
          <input type = "text" onChange = {e => setEOfficeBuilding(e.target.value)} defaultValue = {chosenStaff.office_building} required /><br />
          <label>Office Location</label><br />
          <input type = "text" onChange = {e => setEOfficeLocation(e.target.value)} defaultValue = {chosenStaff.office_location} required /><br />
          <button onClick = {() => del(chosenStaff.id)}>Delete</button><br />
          <label>Image</label><br />
          <ImageUploadBlock pictureURL = {ePictureURL} setPictureURL = {setEPictureURL} /><br />
          <button type = "submit">Submit</button>
          </form>
        </div>
      );
    }
    return(
      <div id="staffDirectoryTile">
        <h3>{chosenStaff.name}</h3>{props.user.id !==0 && <button onClick = {() => setIsEditing(!isEditing)}>Edit</button>}
        <hr />
        <p>{chosenStaff.about}</p>
        <p>Contact Information:
        <ul>
          <li>Contact Email: {chosenStaff.contact_email}</li>
          <li>Contact Phone: {chosenStaff.contact_phone}</li>
          <li>Contact Mobile: {chosenStaff.contact_mobile}</li>
          <li>Contact Fax: {chosenStaff.contact_fax}</li>
        </ul>
        </p>
        <p>Focus Area and Office:
        <ul>
          <li>Focus Area: {chosenStaff.focus_area}</li>
          <li>Office Room: {chosenStaff.office_room}</li>
          <li>Office Building: {chosenStaff.office_building}</li>
          <li>Office Location: {chosenStaff.office_location}</li>
        </ul>
        </p>{props.user.id !==0 && <button onClick = {() => del(chosenStaff.id)}>Delete</button>}<br />
        <img src = {chosenStaff.image_url} />
      </div>
    );
  }

  const CreateFormButton = () => {
    if (newStaff) {return(<button onClick = {() => setNewStaff(false)}>Close Form</button>);}
    return(<button onClick = {() => setNewStaff(true)}>Create</button>);
  }

  return(
    <div id="staffDirectory">
      <div>
        {/*Title section*/}
        <h1>Staff Directory</h1><br />
        <input type = "text" placeholder = "Enter a name here to narrow your search..." onChange = {(e) => setSearch(e.target.value)} className = "searchbar"/><br />
        <button onClick = {commenceSearch}>Search</button>
      </div>
      <div>
        {/*adding new sections to the database*/}
        {props.user.id !== 0 && <CreateFormButton />}
        {newStaff &&
          <div id="staffCreate">
            <form onSubmit = {submitCreate}><br />
            <label>Staff Name</label><br />
            <input type = "text" onChange = {e => setCName(e.target.value)} required /><br />
            <label>About {cName}</label><br />
            <textarea onChange = {e => setEAbout(e.target.value)} required></textarea><br />
            {/*Contact information section*/}
            <label>Contact Information</label><br />
            <label>Email</label><br />
            <input type = "text" onChange = {e => setCContactEmail(e.target.value)} required /><br />
            <label>Phone</label><br />
            <input type = "text" onChange = {e => setCContactPhone(e.target.value)} required /><br />
            <label>Mobile</label><br />
            <input type = "text" onChange = {e => setCContactMobile(e.target.value)} required /><br />
            <label>Fax</label><br />
            <input type = "text" onChange = {e => setCContactFax(e.target.value)} required /><br />
            <label>Focuse area and Office Location</label><br />
            <label>Focus Area</label><br />
            <input type = "text" onChange = {e => setCFocusArea(e.target.value)} required /><br />
            <label>Office Room</label><br />
            <input type = "text" onChange = {e => setCOfficeRoom(e.target.value)} required /><br />
            <label>Office Building</label><br />
            {cOfficeBuilding}
            <input type = "text" onChange = {e => setCOfficeBuilding(e.target.value)} required /><br />
            <label>Office Location</label><br />
            <input type = "text" onChange = {e => setCOfficeLocation(e.target.value)} required /><br />
            <label>Image</label><br />
            <p>{cPictureURL}</p><br/>
            <ImageUploadBlock pictureURL = {cPictureURL} setPictureURL = {setCPictureURL} /><br />
            <button type = "submit">Submit</button>
            </form>
          </div>
        }
        {/*Search results section*/}
        {staffList.map((staff: Staff) => {
          if (staff.id === chosenStaff.id) {
            return(<ActiveSection />);
          } else {
            return(
              <StaffSearchBrief key = {staff.id} staff = {staff} setChosenStaff = {setChosenStaff}/>
            );
          }
        })}<br />
        <button onClick = {prev}>Prev</button>
        <button onClick = {next}>Next</button>
      </div>
    </div>
  );
}

export default StaffDirectory;
