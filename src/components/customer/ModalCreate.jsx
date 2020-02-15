import React, { useState } from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
const ModalCreate = ({ addCustomer }) => {

  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    line: "",
    email: "",
    address: ""
  })

  const handleChangeCustomer = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value })

  return (
    <div id="modalCreate" className="modal modal-fixed-footer">

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
              <h4>Add New Case</h4>
            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
          <div className="col s12 m12  head-section no-col-padding">
            </div>

          <div className="col s6 m4 l4 content">
          <label htmlFor="name">First name</label>
          <input
              type="text"
              name="firstname"
              value={ customer.firstname }
              onChange={ handleChangeCustomer }
            />
            </div>

            <div className="col s6 m4 l4 content">
            <label htmlFor="name">Last name</label>
            <input
              type="text"
              name="lastname"
              value={ customer.lastname }
              onChange={ handleChangeCustomer }
            />
            </div>

            <div className="col s6 m4 l4 content">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              value={ customer.email }
              onChange={ handleChangeCustomer }
            />
            </div>

            <div className="col s6 m4 l4 content">
            <label htmlFor="Phone">Phone</label>
            <input
              type="tel"
              name="tel"
              value={ customer.tel }
              onChange={ handleChangeCustomer }
            />
            </div>

            <div className="col s6 m4 l4 content">
            <label htmlFor="line">Line</label>
            <input
              type="text"
              name="line"
              value={ customer.line }
              onChange={ handleChangeCustomer }
            />
            </div>

            <div className="col s6 m4 l4 content">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={ customer.address }
              onChange={ handleChangeCustomer }
            />
            </div>


          </div>
          </div>
      </div>
      <div className="modal-footer ">
        <a href="#!" className="modal-close waves-effect lighten-2 btn  left " onClick={ () => addCustomer(customer) } >Create Customer</a>
        <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
      </div>
    </div>
  )
}

export default ModalCreate
