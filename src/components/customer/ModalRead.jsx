import React from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
const ModalRead = ({ customer ,dateFormat}) => {
  return (
    <div id="modalRead" className="modal modal-fixed-footer">
    

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
                type="text"
                name="birthday"
                value={dateFormat(customer.birthday)}
                
              />
            </div>

            <div className="col s8 m8 l8 content-radonly">
              <label htmlFor="address">ที่อยู่</label>
              <input
                type="text"
                name="address"
                value={customer.address}
                
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
              <label htmlFor="province">จังหวัด</label>
              <input
                type="text"
                name="province"
                value={customer.province}
                
              />
            </div>

            <div className="col s6 m4 l4 content-radonly">
              <label htmlFor="post_code">รหัสไปรษณีย์</label>
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
