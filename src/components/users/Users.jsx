import React, { useEffect, useState } from 'react'
import Search from './Search'
import Navbar from './../layout/Navbar';
import ModalDetail from './ModalDetail';
import ModalEditUser from './ModalEditUser';
import ModalDelete from './ModalDelete';
import ModalCreate from './ModalCreate';
import TableHead from './TableHead';
import axios from "axios";
import url from '../../Utility/url';
import M from 'materialize-css/dist/js/materialize.min.js';
import MaterialTable from 'material-table'

/* modify */
import '../table.css';
import './style.css';
import userData from './data.json';
/* image */ 

import userImage from '../../img/imageProfile.jpg';
import viewicon from '../../img/eye.png';
import editicon from '../../img/edit.png';
import deleteicon from '../../img/bin.png';

import plusicon from '../../img/plus-white.png';
/* end modify */

const Users = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [edituser, setEdituserUser] = useState({})
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    M.Modal.init(document.querySelectorAll('.modal'), {})
    getAllUsers()
  }, [])

  const readUser = (u) =>{ 
    console.log(u)
    setUser(u)
  }

  const readUser2 = (u) =>{ 
    console.log(u)
    setEdituserUser(u)
  }
  
  


  const deleteUser = (id) => {

    axios.delete(`${url}/delete_user?user_id=${id}`)
      .then((res) => {
        console.log(res.data.message)

        M.toast({ html: `${res.data.message}` })
        getAllUsers()
      })
      .catch(err => { console.log(err) })
  }

  const addUser = (u) => {

    const body = {
      firstname: u.firstname,
      lastname: u.lastname,
      position: u.position,
      team: u.team,
      picture: u.file,
      email: u.email,
      tel: u.phone,
      address: u.address,
      username: u.username,
      password: u.password,
      // role_1: u.role_1,
      // role_2: u.role_2,
      // role_3: u.role_3,
      type: u.type,
      line:u.line,
      // attribute: u.attribute
      nickname:u.nickname
    }

    console.log(JSON.stringify(body));
    axios.post(`${url}/register`, body)
      .then(res => {

        M.toast({ html: `${res.data.message}` })
        getAllUsers()
      })
      .catch(err => console.error(err))

  }

  const editUser = (id, body) => {
    console.log(id);
    console.log(body);
     axios.put(`${url}/edit_user?user_id=${id}`, body)
      .then(res => {
        console.log(res.data.message);
        getAllUsers()
      })
      .catch(err => console.error(err))
  }

  const searchUser = (name) => {
    axios.get(`${url}/search_user?value=${name}&parameter=firstname`)
      .then(res => {
        if (res.data.message.length === 0) {
          M.toast({ html: 'No name this' })
          setUsers([])
        }
        else { setUsers(res.data.message) }
      })
      .catch(err => console.error(err))
  }

  const getAllUsers = () => {
    // setUsers(fackeAccount) user_limit?size=50&page=1
    setisLoading(true);
    axios.get(`${url}/user_all`)
      .then(res => {
        setUsers(res.data.message)
        // console.log(res.data.message)
        setisLoading(false);

      })
      .catch(err => { console.log(err) })
    // setUsers(userData.message);
  }

  let columnObject = useState([
    { title: 'ID'},
    { title: 'Picture', 
      render:rowdata => 
      <div>
      { rowdata.picture
      ? <img src={ rowdata.picture } alt="img.profile" className="userImage"   />
      : <img src={ userImage } alt="img.profile" className="userImage"  /> }
    </div>
    },
    { title: 'First Name', field: 'firstname', },
    { title: 'Last Name', field: 'lastname' },
    { title: 'Position', field: 'position' },
    { title: 'Authority', field: 'authority' },
    { title: 'Tel', field: 'tel' },
    { title: 'Email', field: 'email' },
    { title: '',
      render:rowData =>
      <div>
        <a href="#modalDetail" className="modal-trigger" onClick={ () => readUser(rowData) } ><img  src={viewicon} className="png-icon" alt="print" /></a>
        <a href="#modalEditUser" className="modal-trigger" onClick={ () => readUser2(rowData) } ><img  src={editicon} className="png-icon " alt="edit-icon"/></a>
        <a href="#modal3" className="modal-trigger" onClick={ () => readUser(rowData) }><img  src={deleteicon} className="png-icon " alt="sumary-icon"/></a>
      </div>
    },
  
  ])
  return (
    <>
      <Navbar />
      <main>
        <div className="nContainer">
           <div className="row">
            <div className="col s12 m6">
            <h3>Account : <span className="chip  orange">{ users.length }</span></h3>
            </div>
            <div className="new-button col m6">
              <div className="new-button-iner">
              <a className="btn modal-trigger tde" href="#modalCreate" ><img  src={plusicon} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>Add User</a>
              </div>
            
            </div>
          
           
          </div>
         <br/>
          <div className="row" class="input-table">
       
          <MaterialTable
          columns={columnObject[0]}
          isLoading={isLoading}
          data={users}
          title="Users"
          options={{
            filtering: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
          }}
        />
        </div>
        </div>          
        <ModalDetail user={ user } />

        <ModalEditUser edituser={ edituser } getAllUsers={getAllUsers}/>

        <ModalDelete user={ user } deleteUser={ deleteUser } />

        <ModalCreate addUser={ addUser } />

      </main>
    </>
  )
}

export default Users
