import React, { useState, useEffect } from 'react'

const ModalEdit = ({ customer, editCustomer }) => {

  const [customer2, setCustomer2] = useState({
    firstname: '',
    lastname: '',
    tel: '',
    line: '',
    email: '',
    address: ''
  })

  useEffect(() => {

    setCustomer2({

      firstname: customer.firstname ? customer.firstname : "",
      lastname: customer.lastname ? customer.lastname : "",
      tel: customer.tel ? customer.tel : "",
      line: customer.line ? customer.line : "",
      email: customer.email ? customer.email : "",
      address: customer.address ? customer.address : ""
    })
  }, [customer])

  const handleChangeCustomer = (e) => {
    setCustomer2({ ...customer2, [e.target.name]: e.target.value })

  }

  const handlerEditCustomer = () => {
    editCustomer(customer.customer_id, customer2)
  }

  return (
    <div>
      <div id="modalEdit" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>EDITE CUSTOMER</h4>
          <hr className="line1" />
          <div className="row">
            <div className="input-field col s12 m6">
              <i className="material-icons prefix">account_circle</i>
              <input
                type="text"
                name="firstname"
                value={ customer2.firstname }
                onChange={ handleChangeCustomer }
              />
              <label htmlFor="name"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">L</i>
              <input
                type="text"
                name="lastname"
                value={ customer2.lastname }
                onChange={ handleChangeCustomer }
              />
              <label htmlFor="name"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">email</i>
              <input
                type="email"
                name="email"
                value={ customer2.email }
                onChange={ handleChangeCustomer }
              />
              <label htmlFor="Email"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">phone</i>
              <input
                type="tel"
                name="tel"
                value={ customer2.tel }
                onChange={ handleChangeCustomer }
              />
              <label htmlFor="Phone"></label>
            </div>

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">L</i>
              <input
                type="text"
                name="line"
                value={ customer2.line }
                onChange={ handleChangeCustomer }
              />
              <label htmlFor="line"></label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">home_work</i>
              <input
                type="text"
                name="address"
                value={ customer2.address }
                onChange={ handleChangeCustomer }
              />
              <label htmlFor="address"></label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect yellow btn black-text left" onClick={ handlerEditCustomer }>edit</a>
          <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit
