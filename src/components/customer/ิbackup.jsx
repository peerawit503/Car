import React, { useState } from 'react'

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
      <div className="modal-content">
        <h4>CREATE CUSTOMER</h4>
        <hr className="line1" />
        <div className="row">
          <div className="input-field col s12 m6">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              name="firstname"
              value={ customer.firstname }
              onChange={ handleChangeCustomer }
            />
            <label htmlFor="name">First name</label>
          </div>

          <div className="input-field col s12 m6">
            <i className="material-icons prefix">L</i>
            <input
              type="text"
              name="lastname"
              value={ customer.lastname }
              onChange={ handleChangeCustomer }
            />
            <label htmlFor="name">Last name</label>
          </div>

          <div className="input-field col s12 m6">
            <i className="material-icons prefix">email</i>
            <input
              type="email"
              name="email"
              value={ customer.email }
              onChange={ handleChangeCustomer }
            />
            <label htmlFor="Email">Email</label>
          </div>

          <div className="input-field col s12 m6">
            <i className="material-icons prefix">phone</i>
            <input
              type="tel"
              name="tel"
              value={ customer.tel }
              onChange={ handleChangeCustomer }
            />
            <label htmlFor="Phone">Phone</label>
          </div>

          <div className="input-field col s12 m6">
            <i className="material-icons prefix">L</i>
            <input
              type="text"
              name="line"
              value={ customer.line }
              onChange={ handleChangeCustomer }
            />
            <label htmlFor="line">Line</label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">home_work</i>
            <input
              type="text"
              name="address"
              value={ customer.address }
              onChange={ handleChangeCustomer }
            />
            <label htmlFor="address">Address</label>
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
