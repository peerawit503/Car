import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import cartrustLogo from '../../img/cartrustLogo.svg'
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js'
import { Redirect } from 'react-router-dom'
import url from "../../Utility/url"

const Login = (props) => {

  const [acc, setAcc] = useState({ username: "", password: "" })
  const [redirect, setRedriect] = useState(false)
  const [err, setErr] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // if (acc.password === "" || acc.password === "") { M.toast({ html: 'กรุณาตรวจสอบ Username หรือ Password ' }) }
    if (acc.password === "" || acc.password === "") {
      setErr(true)
      setTimeout(() => {
        setErr(false)
      }, 3000)
    }
    else {
      axios.post(`${url}/login`, acc)
        .then(res => {
          console.log(res.data)
          M.toast({ html: 'Login เรียบร้อย' })
          setRedriect(true)
          // set localstate
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user", res.data.user)


        })
        .catch(err => { console.log(err) })
      setAcc({ username: "", password: "" })
    }

  }

  const onChange = (e) => setAcc({ ...acc, [e.target.name]: e.target.value });

  if (redirect)
    return <Redirect to='/dashboard' />;

  return (
    <div className="nContainer " style={ { marginTop: "5vh" } }>
      <div className="row">

        <div className="col s12 m6 offset-m3 ">
          <div className="login-box">
            <div className="logo">
              <img src={ cartrustLogo } alt="cartrust logo" />
            </div>
            <h3 className="center-align  blue-text text-darken-4">Login</h3><br />

            { err && <div style={ { height: "50px", padding: '7px', borderRadius: '10px' } } className=" pink lighten-4 center-align " >
              <h6 >กรุณาตรวจสอบ Username หรือ Password</h6>
            </div> }
            <form onSubmit={ onSubmit }  >
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  type="text"
                  className="validate"
                  name="username"
                  value={ acc.username }
                  onChange={ onChange } />
                <label htmlFor="username" style={{zIndex:-1}}>Username</label>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  type="password"
                  className="validate"
                  name="password"
                  value={ acc.password }
                  onChange={ onChange } />
                <label htmlFor="password" style={{zIndex:-1}}>Password</label>
              </div>
              {/* <p>
                <label><input
                  type="checkbox"
                  name="remember"
                  value={ acc.remember }
                  onChange={ onChange }
                /><span>Remember</span></label>
              </p> */}

              <button className="wave-effect btn blue col s12" style={ { marginBottom: "30px" } } type="submit">Login</button>
            </form>

            <button className="wave-effect btn grey lighten-3 black-text" ><Link to="/register">Register</Link></button>
            {/* <button className="wave-effect btn  grey darken-4 right" ><Link to="/dashboard">dashboard</Link></button> */ }
            {/* <button className="wave-effect btn  grey darken-4 right" >Forget password</button> */ }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login
