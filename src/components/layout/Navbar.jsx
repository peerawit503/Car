import React, { useEffect } from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
import imageProfile from '../../img/imageProfile.jpg'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import ActionUser from "../../actions/actionUser";
import Box from '@material-ui/core/Box';

import './style.css';
import { useState } from 'react';
const uu = localStorage.getItem('user')

const Navbar = (props) => {
  const[hover , setHover] = useState(false)
  useEffect(() => {
    
    M.Sidenav.init(document.querySelector('.sidenav'), {})
    console.log('dddd' ,props.user)
  }, [])

  const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    
  };

  const over =()=>{
    setHover(true)
  }
  const  unover =()=>{
    setHover(false)
  }
  function genMenu(){
    if(hover){
      return(<li className="Li" ><Link className="white-text" to="/cases"><i className="material-icons white-text">work</i>My Cases</Link></li>)
    }
  }
  if (!props.user.isLogin)
    return <Redirect to='/' />;
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
          <div className="sm-profile" >
            {/* <Box borderRadius="50%" {...defaultProps}> */}
            <img src={ props.user.picture ? props.user.picture : imageProfile } alt="profile" style={ { width: "200px", height: 'auto', margin: '40px', borderRadius:'50%', border:'solid 5px', background:'#ffffff' } } className="circle " />
            {/* </Box> */}
            <h6 className="center-align">Name : {props.user.firstName+' '+props.user.lastName}</h6>
            <p className="center-align">Team : {props.user.team}</p >
            <p className="center-align">Position : {props.user.position}</p >
          </div>
        </li>
        <li className="Li"><Link className="white-text" to="/dashboard"><i className="material-icons white-text">dashboard</i>Dashboard</Link></li>
        <li className="Li"><Link className="white-text" to="/users"><i className="material-icons white-text">assignment_ind</i>Account</Link></li>
        <li className="Li"><Link className="white-text" to="/customers"><i className="material-icons white-text">face</i>Customers</Link></li>
        
        <div  onMouseOver={ () => over() } onMouseOut={() =>unover()}>
        <li className="Li"><Link className="white-text"><i className="material-icons white-text">work</i>Case</Link></li>
        <li className={hover ?'Li':'hidden Li'} ><Link className="white-text subpadding" to="/cases"><i className="material-icons white-text">work</i>All Case</Link></li>
        <li className={hover && (props.user.team_id===1 || props.user.team_id==='admin') ?'Li':'hidden Li'}  ><Link className="white-text subpadding" to="/cases/CS"><i className="material-icons white-text">work</i>My Cases</Link></li>
        <li className={hover && (props.user.team_id===2 || props.user.team_id==='admin')?'Li':'hidden Li'}  ><Link className="white-text subpadding" to="/cases/TF"><i className="material-icons white-text">work</i>My Cases</Link></li>
        <li className={hover && (props.user.team_id===3 || props.user.team_id==='admin')?'Li':'hidden Li'}  ><Link className="white-text subpadding" to="/cases/FT"><i className="material-icons white-text">work</i>My Cases</Link></li>
        </div>
        
        <li className="Li"><Link className="white-text" to="/executives"><i className="material-icons white-text">supervisor_account</i>Executive</Link></li>
        <li className="Li"><Link className="white-text" to="/"><i className="material-icons white-text">exit_to_app</i>Logout</Link></li>
      </ul>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  storeUserInfo: (
    id,
    firstName,
    lastName,
    username,
    position,
    team_id,
    picture,
    token
  ) => {
    dispatch({
      type: ActionUser.STORE_USER_INFO,
      id: id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      position: position,
      team_id: team_id,
      picture: picture,
      token: token
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
