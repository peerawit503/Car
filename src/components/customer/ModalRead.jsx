import React from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
const ModalRead = ({ customer }) => {
  return (
    <div id="modalRead" className="modal modal-fixed-footer">
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
  <h4>Customer : {customer.customer_id}</h4>
            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content-radonly">
            <div className="col s12 m12  head-section no-col-padding">
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="name">First name</label>
              <input
                type="text"
                name="firstname"
                value={customer.firstname}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="name">Last name</label>
              <input
                type="text"
                name="lastname"
                value={customer.lastname}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="Phone">Phone</label>
              <input
                type="tel"
                name="tel"
                value={customer.tel}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="line">Line</label>
              <input
                type="text"
                name="line"
                value={customer.line}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={customer.birthday}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="license_id">หมายเลขใบอนุญาติ</label>
              <input
                type="text"
                name="license_id"
                value={customer.license_id}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="home_no">บ้านเลขที่</label>
              <input
                type="text"
                name="home_no"
                value={customer.home_no}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="moo">หมู่</label>
              <input
                type="text"
                name="moo"
                value={customer.moo}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="soy">ซอย</label>
              <input
                type="text"
                name="soy"
                value={customer.soy}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="road">ถนน</label>
              <input
                type="text"
                name="road"
                value={customer.road}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="district">เขต1</label>
              <input
                type="text"
                name="district"
                value={customer.district}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="district2">เขต2</label>
              <input
                type="text"
                name="district2"
                value={customer.district2}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="province">จังหวัด</label>
              <input
                type="text"
                name="province"
                value={customer.province}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="post_code">รหัสไปรษณี</label>
              <input
                type="text"
                name="post_code"
                value={customer.post_code}
                
              />
            </div>



          </div>
        </div>
      </div>
      <div className="modal-footer ">
        
        <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
      </div>
    </div>
   
 
)
  }


export default ModalRead
