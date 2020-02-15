import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import cartrustLogo from '../../img/cartrustLogo.svg'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import url from '../../Utility/url'

const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    team: '',
    picture: '',
    position: '',
    type: 'SE',
    attribute: 'attribute_1',
    tel: '',
    email: '',
    address: '',
    role_1: [false, false, false, false],
    role_2: [false, false, false, false],
    role_3: [false, false, false, false],
  })
  const [listTeam, setListTeam] = useState([])
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'), {});

  })

  useEffect(() => {
    axios.get(`${url}/team_all`)
      .then(res => {
        setListTeam(res.data.message)
      })
      .catch(err => console.log(err))
  }, [])

  const onChange = (e) => setRegister({ ...register, [e.target.name]: e.target.value });

  const onChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setRegister({ ...register, picture: reader.result });
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //  check data
    if (register.password !== register.password2) { alert(`check password`) }
    else {
      axios.post(`${url}/register`, register)
        .then(res => {
          alert(res.data.message)
          setRegister({
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            team: '',
            picture: '',
            position: '',
            type: 'SE',
            attribute: 'attribute_1',
            tel: '',
            email: '',
            address: '',
            role_1: [false, false, false, false],
            role_2: [false, false, false, false],
            role_3: [false, false, false, false],
          })
          setRedirect(true)
        })
        .catch(err => console.log(`axios data`, err))

    }
  }

  if (redirect)
    return <Redirect to='/' />;



  return (
    <>
      <div className="row">
        <div className="nContainer">
          <form
            onSubmit={ onSubmit }
            className="col s12 m12 l6 offset-l3  login-box"
            style={ { marginTop: "5vh" } }>
            <div className="logo">
              <img src={ cartrustLogo } alt="cartrust logo" />
            </div>

            <h4 className="center-align" >register</h4> <br />
            <div className="row">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  type="text"
                  name="firstname"
                  value={ register.firstname }
                  onChange={ onChange }
                />
                <label htmlFor="name">First name</label>
              </div>

              <div className="input-field col s12 m6">
                <i className="material-icons prefix">L</i>
                <input
                  type="text"
                  name="lastname"
                  value={ register.lastname }
                  onChange={ onChange }
                />
                <label htmlFor="name">Last name</label>
              </div>

              <div className="input-field col s12 m6">
                <i className="material-icons prefix">email</i>
                <input
                  type="email"
                  name="email"
                  value={ register.email }
                  onChange={ onChange }
                />
                <label htmlFor="Email">Email</label>
              </div>

              <div className="input-field col s12 m6">
                <i className="material-icons prefix">phone</i>
                <input
                  type="tel"
                  name="tel"
                  value={ register.tel }
                  onChange={ onChange }
                />
                <label htmlFor="Phone">Phone</label>
              </div>

              <div className="input-field col s12 m6">
                <i className="material-icons prefix">T</i>
                <select
                  name="team"
                  defaultValue='DEFAULT'
                  onChange={ onChange }
                >
                  <option value="DEFAULT" disabled>Choose your Team</option>
                  { listTeam.map(t =>
                    (<option key={ `${t.id}${t.team_id}` } value={ t.id }>{ t.team_name }</option>)
                  ) }


                </select>
              </div>

              <div className="input-field col s12 m6">
                <i className="material-icons prefix">P</i>
                <input
                  type="text"
                  name="position"
                  value={ register.position }
                  onChange={ onChange }
                />
                <label htmlFor="Positon">Positon</label>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">A</i>
                <input
                  type="text"
                  name="address"
                  value={ register.address }
                  onChange={ onChange }
                />
                <label htmlFor="Address">Address</label>
              </div>

              <div className="input-field col s12 m6 ">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Upload img </span><input
                      type="file"
                      name="picture"
                      onChange={ onChangeFile } />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>

              <div className="input-field col s12 m8 offset-m2">
                <i className="material-icons prefix">perm_identity</i>
                <input
                  type="text"
                  name="username"
                  value={ register.username }
                  onChange={ onChange }
                />
                <label htmlFor="Username">Username</label>
              </div>

              <div className="input-field col s12 m8 offset-m2 ">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  type="password"
                  name="password"
                  value={ register.password }
                  onChange={ onChange }
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="input-field col s12 m8 offset-m2">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  type="password"
                  name="password2"
                  value={ register.password2 || '' }
                  onChange={ onChange }
                />
                <label htmlFor="confirem-password">Confirm Password</label>
              </div>
              <button className="btn col s10 offset-s1 blue" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
