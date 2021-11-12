import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
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
  const [cContactMobile, setCContactMobile] = useState('');
  const [cContactFax, setCContactFax] = useState('');
  const [cFocusArea, setCFocusArea] = useState('');
  const [cOfficeRoom, setCOfficeRoom] = useState('');
  const [cOfficeBuilding, setCOfficeBuilding] = useState('');
  const [cOfficeLocation, setCOfficeLocation] = useState('');
  const [eName, setEName] = useState('');
  const [eAbout, setEAbout] = useState('');
  const [eContactEmail, setEContactEmail] = useState('');
  const [eContactPhone, setEContactPhone] = useState('');
  const [eContactMobile, setEContactMobile] = useState('');
  const [eContactFax, setEContactFax] = useState('');
  const [eFocusArea, setEFocusArea] = useState('');
  const [eOfficeRoom, setEOfficeRoom] = useState('');
  const [eOfficeBuilding, setEOfficeBuilding] = useState('');
  const [eOfficeLocation, setEOfficeLocation] = useState('');
  /*searchbar*/
  const [search, setSearch] = useState('');

  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get(`staff`);
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
        contact_mobile: cContactMobile,
        contact_fax: cContactFax,
        focus_area: cFocusArea,
        office_room: cOfficeRoom,
        office_building: cOfficeBuilding,
        office_location: cOfficeLocation
      });
      setCName('');
      setCAbout('');
      setCContactEmail('');
      setCContactPhone('');
      setCContactMobile('');
      setCContactFax('');
      setCFocusArea('');
      setCOfficeRoom('');
      setCOfficeBuilding('');
      setCOfficeLocation('');
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
        contact_mobile: eContactMobile,
        contact_fax: eContactFax,
        focus_area: eFocusArea,
        office_room: eOfficeRoom,
        office_building: eOfficeBuilding,
        office_location: eOfficeLocation
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

  const CreateFormButton = () => {
    if (newStaff) {return(<button onClick = {() => setNewStaff(false)}>Close Form</button>);}
    return(<button onClick = {() => setNewStaff(true)}>Create</button>);
  }

  const setEdit = (staff: Staff) => {
    setEName(staff.name);
    setEAbout(staff.about);
    setEContactEmail(staff.contact_email);
    setEContactPhone(staff.contact_phone);
    setEContactMobile(staff.contact_mobile);
    setEContactFax(staff.contact_fax);
    setEFocusArea(staff.focus_area);
    setEOfficeRoom(staff.office_room);
    setEOfficeBuilding(staff.office_building);
    setEOfficeLocation(staff.office_location);
    setChosenStaff(staff);

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
            <label>About section</label><br />
            <textarea onChange = {e => setCAbout(e.target.value)} required></textarea><br />
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
            <input type = "text" onChange = {e => setCOfficeBuilding(e.target.value)} required /><br />
            <label>Office Location</label><br />
            <input type = "text" onChange = {e => setCOfficeLocation(e.target.value)} required /><br />
            <button type = "submit">Submit</button>
            </form>
          </div>
        }
        {/*Search results section*/}
        {staffList.map((staff: Staff) => {
          if (staff.id === chosenStaff.id) {
            if (isEditing) {
              return(
                <div>
                  <button onClick = {() => setIsEditing(!isEditing)}>View</button><br />
                  <form onSubmit = {submitEdit}><br />
                  <label>Staff Name</label><br />
                  <input type = "text" onChange = {e => setEName(e.target.value)} defaultValue = {staff.name} required /><br />
                  <label>About {eName}</label><br />
                  <textarea onChange = {e => setEAbout(e.target.value)} defaultValue = {staff.about} required></textarea><br />
                  {/*Contact information section*/}
                  <label>Contact Information</label><br />
                  <label>Email</label><br />
                  <input type = "text" onChange = {e => setEContactEmail(e.target.value)} defaultValue = {staff.contact_email} required /><br />
                  <label>Phone</label><br />
                  <input type = "text" onChange = {e => setEContactPhone(e.target.value)} defaultValue = {staff.contact_phone} required /><br />
                  <label>Mobile</label><br />
                  <input type = "text" onChange = {e => setEContactMobile(e.target.value)} defaultValue = {staff.contact_mobile} required /><br />
                  <label>Fax</label><br />
                  <input type = "text" onChange = {e => setEContactFax(e.target.value)} defaultValue = {staff.contact_fax} required /><br />
                  <label>Focuse area and Office Location</label><br />
                  <label>Focus Area</label><br />
                  <input type = "text" onChange = {e => setEFocusArea(e.target.value)} defaultValue = {staff.focus_area} required /><br />
                  <label>Office Room</label><br />
                  <input type = "text" onChange = {e => setEOfficeRoom(e.target.value)} defaultValue = {staff.office_room} required /><br />
                  <label>Office Building</label><br />
                  <input type = "text" onChange = {e => setEOfficeBuilding(e.target.value)} defaultValue = {staff.office_building} required /><br />
                  <label>Office Location</label><br />
                  <input type = "text" onChange = {e => setEOfficeLocation(e.target.value)} defaultValue = {staff.office_location} required /><br />
                  <button type = "submit">Submit</button><br />
                  </form>
                  <button onClick = {() => del(chosenStaff.id)}>Delete</button>
                </div>
              );
            }
            return(
              <div id="staffDirectoryTile">
                <h3>{staff.name}</h3>{props.user.id !==0 && <button onClick = {() => setIsEditing(!isEditing)}>Edit</button>}
                <hr />
                <p>{chosenStaff.about}</p>
                <label>Contact Information:</label><br />
                <ul>
                  <li>Contact Email: {staff.contact_email}</li>
                  <li>Contact Phone: {staff.contact_phone}</li>
                  <li>Contact Mobile: {staff.contact_mobile}</li>
                  <li>Contact Fax: {staff.contact_fax}</li>
                </ul>
                <label>Focus Area and Office:</label><br />
                <ul>
                  <li>Focus Area: {staff.focus_area}</li>
                  <li>Office Room: {staff.office_room}</li>
                  <li>Office Building: {staff.office_building}</li>
                  <li>Office Location: {staff.office_location}</li>
                </ul>
                {props.user.id !==0 && <button onClick = {() => del(chosenStaff.id)}>Delete</button>}<br />
              </div>
            );
          } else {
            return(
              <a onClick = {() => setEdit(staff)}>
                <div>
                  <h3>{staff.name}</h3><br />
                  <p>Contact email: {staff.contact_email}</p><br />
                  <p>Office Room: {staff.office_room}</p>
                </div>
              </a>
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
