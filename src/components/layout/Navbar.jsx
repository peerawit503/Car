import React, { useEffect } from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
import imageProfile from '../../img/imageProfile.jpg'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link } from 'react-router-dom';
import './style.css';
const uu = localStorage.getItem('user')
console.log(uu)

const Navbar = () => {
  useEffect(() => {
    M.Sidenav.init(document.querySelector('.sidenav'), {})

  }, [])
  return (
    <>
      <div className="navbar-fixed">
        <nav className="no-padding-left nav-noclor">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo left"><img src={ cartrustLogo } alt="cartrust logo" style={ { width: "150px", height: 'auto', marginLeft: '50px' } } /></a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right " >
              <li ><Link to="/"><i className="material-icons" >exit_to_app</i></Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav sidenavbar sidenav-fixed theme-color-bg sidenav-close no-scrollbar" id="mobile-demo">
        <li className="white-text">
          <div className="sm-profile">
            <img src={ imageProfile } alt="profile" style={ { width: "200px", height: 'auto', margin: '40px' } } className="circle " />
            <h6 className="center-align">Name : Mohexc</h6>
            <p className="center-align">Team : IT</p >
            <p className="center-align">Position : Frontend Developer</p >
          </div>
        </li>
        <li className="Li"><Link className="white-text" to="/dashboard"><i className="material-icons white-text">dashboard</i>Dashboard</Link></li>
        <li className="Li"><Link className="white-text" to="/users"><i className="material-icons white-text">assignment_ind</i>Account</Link></li>
        <li className="Li"><Link className="white-text" to="/customers"><i className="material-icons white-text">face</i>Cutomers</Link></li>

        <li className="Li"><Link className="white-text" to="/cases"><i className="material-icons white-text">work</i>Cases</Link></li>
        <li className="Li"><Link className="white-text" to="/executives"><i className="material-icons white-text">supervisor_account</i>Executive</Link></li>
        <li className="Li"><Link className="white-text" to="/"><i className="material-icons white-text">exit_to_app</i>Logout</Link></li>
      </ul>
    </>
  )
}

export default Navbar
