import React, { useState } from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
const ModalCreate = ({ addCustomer }) => {

  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    line: "",
    license_id: "",
    birthday: "",
    home_no: "",
    moo: "",
    soy: "",
    road: "",
    district: "",
    district2: "",
    province: "",
    post_code: ""
  })

  const handleChangeCustomer = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value })

  return (
    <div id="modalCreate" className="modal modal-fixed-footer">


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
                value={customer.firstname}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="name">Last name</label>
              <input
                type="text"
                name="lastname"
                value={customer.lastname}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="Phone">Phone</label>
              <input
                type="tel"
                name="tel"
                value={customer.tel}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="line">Line</label>
              <input
                type="text"
                name="line"
                value={customer.line}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={customer.birthday}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="license_id">หมายเลขใบอนุญาติ</label>
              <input
                type="text"
                name="license_id"
                value={customer.license_id}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="home_no">บ้านเลขที่</label>
              <input
                type="text"
                name="home_no"
                value={customer.home_no}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="moo">หมู่</label>
              <input
                type="text"
                name="moo"
                value={customer.moo}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="soy">ซอย</label>
              <input
                type="text"
                name="soy"
                value={customer.soy}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="road">ถนน</label>
              <input
                type="text"
                name="road"
                value={customer.road}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="district">เขต</label>
              <input
                type="text"
                name="district"
                value={customer.district}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="district2">แขวง</label>
              <input
                type="text"
                name="district2"
                value={customer.district2}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="province">จังหวัด</label>
              <input
                type="text"
                name="province"
                value={customer.province}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="post_code">รหัสไปรษณีย์</label>
              <input
                type="text"
                name="post_code"
                value={customer.post_code}
                onChange={handleChangeCustomer}
              />
            </div>



          </div>
        </div>
      </div>
      <div className="modal-footer ">
        <a href="#!" className="modal-close waves-effect lighten-2 btn  left " onClick={() => addCustomer(customer)} >Create Customer</a>
        <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
      </div>
    </div>
  )
}

export default ModalCreate
