import React,{ useState, useEffect }from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
import url from '../../Utility/url'
import axios from 'axios';
import userImage from '../../img/imageProfile.jpg';
import './style.css';
const ModalDetail = ({ user }) => {


  const [listTeam1, setListTeam1] = useState([])

  useEffect(() => {
    axios.get(`${url}/team_all`)
      .then(res => {
        setListTeam1(res.data.message)
      })
      .catch(err => console.log(err))
  }, [])

  return(
  <div id="modalDetail" className="modal modal-fixed-footer">

  {/* <div className="navbar-fixed">
    <nav className="no-padding-left nav-noclor">
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo left"><img src={cartrustLogo} alt="cartrust logo" style={{ width: "150px", height: 'auto', marginLeft: '50px' }} /></a>
        <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right " >
          
        </ul>
      </div>
    </nav>
  </div> */}



  <div className="modal-content modal-content-override">
    <div className="row">
      <div className="header-title">
        <div className="col s12 m12 no-col-padding">
  <h4>Account : {user.username}</h4>
        </div>
      </div>
    </div>
    {/* process bar */}

    {/* body */}

    <form >
      <div className="cotent-field">
        <div className="row content-radonly">

          <div className="col s12 m12  head-section no-col-padding">
          </div>
          
          <div className="img-mid col m12" style={{marginBottom:"20px"}}>

          { user.picture
                    ? <img src={ user.picture } alt="img.profile" className="" style={ { width: "20em" } } />
                    : <img src={ userImage } alt="img.profile" className="" style={ { width: "20em" } } /> }

          </div>
       
          <div className="col s6 m6 l6 content-radonly">
            <label htmlFor="name">First name</label>
            <input
              type="text"
              name="firstname"
              value={user.firstname}
             
            />
          </div>

          <div className="col s6 m6 l6 content-radonly">
            <label htmlFor="name">Last name</label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
             
            />
          </div>

          <div className="col s6 m6 l6 content-radonly">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
             
            />
          </div>

          <div className="col s6 m6 l6 content-radonly">
            <label htmlFor="Phone">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.tel}
              readOnly
            />
          </div>



          <div className="col s6 m6 l6 content-radonly">
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              name="address"
              readOnly
              value={user.address}
             
            />
          </div>

          <div className="col s6 m6 l6 content-radonly">
                <label htmlFor="Address">Position</label>
                <input
                  type="text"
                  name="position"
                  value={user.position}
                  readOnly
                />
              </div>

          <div className="col s6 m6 l6 content-radonly">
            <label htmlFor="Phone">Team</label>
            <input
              className="browser-default"
              id="selectTeamModal"
              name="team"
              value={ user.team_name  || ""}
              readOnly
              
            />
             
          </div>

         

        </div>
      </div>


    </form>
  </div>
  <div className="modal-footer ">

   
    <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
  </div>
</div>
);
                  }


export default ModalDetail
