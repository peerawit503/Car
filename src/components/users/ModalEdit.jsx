import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'

const ModalEdit = ({ user, editUser }) => {

  const [user2, setUser2] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    team: "",
    position: "",
    address: "",
    file: '',

  })

  const [rol1, setRol_1] = useState({ read: false, write: false, update: false, delete: false })
  const [rol2, setRol_2] = useState({ read: false, write: false, update: false, delete: false })
  const [rol3, setRol_3] = useState({ read: false, write: false, update: false, delete: false })

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'), {});
    setUser2({ ...user, rol_1: Object.values(rol1), rol_2: Object.values(rol1), rol_3: Object.values(rol1) })
  }, [user])

  useEffect(() => {
    setUser2({
      firstname: user.firstname ? user.firstname : "",
      lastname: user.lastname ? user.lastname : "",
      email: user.email ? user.email : "",
      tel: user.tel ? user.tel : "",
      team: user.team_id ? user.team_id : "",
      position: user.position ? user.position : "",
      address: user.address ? user.address : "",
      file: user.picture ? user.picture : "",
    })
  }, [user])

  const onChange = (e) => setUser2({ ...user2, [e.target.name]: e.target.value });

  const onChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setUser2({ ...user2, file: reader.result });
  }

  const onSubmit = (e) => e.preventDefault()
  const handleChangeRol_1 = (e) => setRol_1({ ...rol1, [e.target.name]: e.target.checked })
  const handleChangeRol_2 = (e) => setRol_2({ ...rol2, [e.target.name]: e.target.checked })
  const handleChangeRol_3 = (e) => setRol_3({ ...rol3, [e.target.name]: e.target.checked })

  const saveUer = () => {

    editUser(user.user_id)
  }


  return (
    <div id="modal2" className="modal modal-fixed-footer ">
      <div className="modal-content">
        <h4>EDEIT USER</h4>

        <form onSubmit={ onSubmit } className="col s8 offset-m2 ">
          <div className="row">
            <div className="input-field col s12 m6">
              <i className="material-icons prefix">account_circle</i>
              <input
                type="text"
                name="firstname"
                value={ user2.firstname }
                onChange={ onChange }
              />
              <label htmlFor="name"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">L</i>
              <input
                type="text"
                name="lastname"
                value={ user2.lastname }
                onChange={ onChange }
              />
              <label htmlFor="name"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">email</i>
              <input
                type="email"
                name="email"
                value={ user2.email }
                onChange={ onChange }
              />
              <label htmlFor="Email"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">phone</i>
              <input
                type="tel"
                name="tel"
                value={ user2.tel }
                onChange={ onChange }
              />
              <label htmlFor="Phone"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">people</i>
              <select
                name="team"
                // value={ user2.team }
                defaultValue='DEFAULT'
                onChange={ onChange }
              >
                <option value="DEFAULT" disabled>Choose your Team</option>
                <option value="1">Team 1</option>
                <option value="2">Team 2</option>
                <option value="3">Team 3</option>
                <option value="4">Team 4</option>
                <option value="5">Team 5</option>
              </select>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">brightness_7</i>
              <input
                type="text"
                name="position"
                value={ user2.position }
                onChange={ onChange }
              />
              <label htmlFor="Positon"></label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">home</i>
              <input
                type="text"
                name="address"
                value={ user2.address }
                onChange={ onChange }
              />
              <label htmlFor="Address"></label>
            </div>

            <div className="input-field col s12 m6">
              <img src={ user.picture } alt="logo user" style={ { width: "100px", margin: "auto" } } />
            </div>

            <div className="input-field col s12 m6">
              <div className="file-field input-field">
                <div className="btn">
                  <span>Select img </span><input
                    type="file"
                    name="file"

                    onChange={ onChangeFile } />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>



            <div className="input-field col s12 ">
              <h5>กําหนดสิทธิ์ผู้ใช้</h5>
              <hr />

              <h6>rol_1</h6>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name='read'
                    onChange={ handleChangeRol_1 }
                  /><span>ดูรายละเอียด</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="write"
                    onChange={ handleChangeRol_1 }
                  />
                  <span>สร้าง</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="update"
                    onChange={ handleChangeRol_1 }
                  /><span>แก้ไข</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="delete"
                    onChange={ handleChangeRol_1 }
                  /><span>ลบ</span>
                </label>
              </span>


              <h6>rol_2</h6>
              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name='read'
                    onChange={ handleChangeRol_2 }
                  /><span>ดูรายละเอียด</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="write"
                    onChange={ handleChangeRol_2 }
                  />
                  <span>สร้าง</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="update"
                    onChange={ handleChangeRol_2 }
                  /><span>แก้ไข</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="delete"
                    onChange={ handleChangeRol_2 }
                  /><span>ลบ</span>
                </label>
              </span>

              <h6>rol_3</h6>
              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name='read'
                    onChange={ handleChangeRol_3 }
                  /><span>ดูรายละเอียด</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="write"
                    onChange={ handleChangeRol_3 }
                  />
                  <span>สร้าง</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="update"
                    onChange={ handleChangeRol_3 }
                  /><span>แก้ไข</span>
                </label>
              </span>

              <span className=" col s6 m3">
                <label>
                  <input
                    type="checkbox"
                    name="delete"
                    onChange={ handleChangeRol_3 }
                  /><span>ลบ</span>
                </label>
              </span>
            </div>



          </div>
        </form>
      </div>
      <div className="modal-footer ">
        <a href="#!" className="modal-close waves-effect yellow lighten-2 btn black-text left " onClick={ saveUer }>edite user</a>
        <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
      </div>
    </div>
  )
}

export default ModalEdit
