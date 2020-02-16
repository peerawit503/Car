import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import url from '../../Utility/url'
import axios from 'axios';
import { Link } from 'react-router-dom';

/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'

const ModalEdit = ({ edituser }) => {

  const [user2, setUser2] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    team: "",
    position: "",
    address: "",
    picture: "",
    attribute:"",
    type:"",
    
  })
  const [listTeam1, setListTeam1] = useState([])
  const [rol1, setRol_1] = useState({  read: false, write: false, update: false, delete: false })
  const [rol2, setRol_2] = useState({ read: false, write: false, update: false, delete: false })
  const [rol3, setRol_3] = useState({ read: false, write: false, update: false, delete: false })


  useEffect(() => {
    axios.get(`${url}/team_all`)
      .then(res => {
        setListTeam1(res.data.message)
      })
      .catch(err => console.log(err))
  }, []
  
  )

  
  useEffect(() => {
    setUser2({
      firstname: edituser.firstname ? edituser.firstname : "",
      lastname: edituser.lastname ? edituser.lastname : "",
      email: edituser.email ? edituser.email : "",
      tel: edituser.tel ? edituser.tel : "",
      team: edituser.team_id ? edituser.team_id : "",
      position: edituser.position ? edituser.position : "SE",
      address: edituser.address ? edituser.address : "",
      picture: edituser.picture ? edituser.picture : "",
      attribute:edituser.attribute ? edituser.attribute:"",
      type:edituser.type?edituser.type:"",
    })
  }, [edituser])


  
  const onChange = (e) => setUser2({ ...user2, [e.target.name]: e.target.value });

  const onChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setUser2({ ...user2, file: reader.result });
  }

  
  const handleChangeRol_1 = (e) => setRol_1({ ...rol1, [e.target.name]: e.target.checked })
  const handleChangeRol_2 = (e) => setRol_2({ ...rol2, [e.target.name]: e.target.checked })
  const handleChangeRol_3 = (e) => setRol_3({ ...rol3, [e.target.name]: e.target.checked })

  const editUs = () => {
   
    var data2 = {...user2 , role_1 : rol1 ,role_2 : rol2 ,role_3 : rol3 , type:'SE' }
    console.log(data2)
     axios.put(`${url}/edit_user?user_id=${edituser.user_id}`, data2)
      .then(res => {
        console.log(res.data.message);
       
      })
      .catch(err => console.error(err))
  }


  return (
    <div id="modalEdit" className="modal modal-fixed-footer ">
      <div className="navbar-fixed">
        <nav className="no-padding-left nav-noclor">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo left"><img src={cartrustLogo} alt="cartrust logo" style={{ width: "150px", height: 'auto', marginLeft: '50px' }} /></a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
           
          </div>
        </nav>
      </div>



      <div className="modal-content modal-content-override">
        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h4>Edit : {edituser.user_id}</h4>
            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}

        <form  >
          <div className="cotent-field">
            <div className="row content">

              <div className="col s12 m12  head-section no-col-padding">
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  name="firstname"
                  value={user2.firstname}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  name="lastname"
                  value={user2.lastname}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user2.email}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Phone">Phone</label>
                <input
                  type="tel"
                  name="tel"
                  value={user2.tel}
                  onChange={onChange}
                />
              </div>




              <div className="col s6 m4 l4 content">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={user2.address}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Address">Position</label>
                <input
                  type="text"
                  name="position"
                  value={user2.position}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Address">Type</label>
                <input
                  type="text"
                  name="type"
                  value={user2.type}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Address">Attr</label>
                <input
                  type="text"
                  name="attribute"
                  value={user2.attribute}
                  onChange={onChange}
                />
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Phone">Team</label>
                <select
                  className="browser-default"
                  id="selectTeamModal"
                  name="team"
                  // value={ user.team }
                  defaultValue='DEFAULT'
                  onChange={onChange}
                >
                  <option value="DEFAULT" disabled>Choose your Team</option>
                  {listTeam1.map(t =>
                    (<option key={`${t.id}${t.team_id}`} value={t.id}>{t.team_name}</option>)
                  )}

                </select>
              </div>

              <div className="col s6 m4 l4 content">
                <label htmlFor="Picture">Picture</label>
                <input type="file" name="picture" onChange={onChangeFile} />
              </div>

              <div className="col s12 m12  head-section no-col-padding">
                <h5>กําหนดสิทธิ์ผู้ใช้</h5>
              </div>

              <div className="col s12 m12 l12 content">
                <div className="row">
                  <div className="col s12 m12 l12">
                    <h6>Role_1</h6>
                  </div>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name='read'
                        checked={rol1.read}
                        onChange={handleChangeRol_1}
                      /><span>ดูรายละเอียด</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="write"
                        checked={rol1.write}
                        onChange={handleChangeRol_1}
                      />
                      <span>สร้าง</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="update"
                        checked={rol1.update}
                        onChange={handleChangeRol_1}
                      /><span>แก้ไข</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="delete"
                        checked={rol1.delete}
                        onChange={handleChangeRol_1}
                      /><span>ลบ</span>
                    </label>
                  </span>
                </div>

                <div className="row">
                  <div className="col s12 m12 l12">
                    <h6>Role_2</h6>
                  </div>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name='read'
                        checked={rol2.read}
                        onChange={handleChangeRol_2}
                      /><span>ดูรายละเอียด</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="write"
                        checked={rol2.write}
                        onChange={handleChangeRol_2}
                      />
                      <span>สร้าง</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="update"
                        checked={rol2.update}
                        onChange={handleChangeRol_2}
                      /><span>แก้ไข</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="delete"
                        checked={rol2.delete}
                        onChange={handleChangeRol_2}
                      /><span>ลบ</span>
                    </label>
                  </span>
                </div>

                <div className="row">
                  <div className="col s12 m12 l12">
                    <h6>Role_3</h6>
                  </div>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name='read'
                        checked={rol3.read}
                        onChange={handleChangeRol_3}
                      /><span>ดูรายละเอียด</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="write"
                        checked={rol3.write}
                        onChange={handleChangeRol_3}
                      />
                      <span>สร้าง</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="update"
                        checked={rol3.update}
                        onChange={handleChangeRol_3}
                      /><span>แก้ไข</span>
                    </label>
                  </span>

                  <span className=" col s6 m3">
                    <label>
                      <input
                        type="checkbox"
                        name="delete"
                        checked={rol3.delete}
                        onChange={handleChangeRol_3}
                      /><span>ลบ</span>
                    </label>
                  </span>
                </div>
              </div>



            </div>
          </div>


        </form>
      </div>
      <div className="modal-footer ">

        <a href="#!" className="modal-close waves-effect btn left " onClick={editUs}>Edit</a>
        <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
      </div>
    </div>
  )
}

export default ModalEdit
