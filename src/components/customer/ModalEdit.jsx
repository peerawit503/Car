import React, { useState, useEffect } from 'react'
import cartrustLogo from '../../img/cartrustLogo.svg'
const ModalEdit = ({ customer, editCustomer }) => {

  const [customer2, setCustomer2] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    tel2: "",
    email: "",
    line: "",
    license_id: "",
    birthday: "",
    // home_no: "",
    // moo: "",
    // soy: "",
    // road: "",
    // district: "",
    // district2: "",
    customer:"",
    province: "",
    post_code: ""
  })

  function dateFormat(caseDate) {
    if(caseDate == null){
      return 0;
    }else{
      var mountCaracterString = caseDate.split(" ")[2];
      var dayString = caseDate.split(" ")[1];
      var yearString = caseDate.split(" ")[3];
      var month;
      if (mountCaracterString === 'Jan') {
        month = "01";
      }
      else if (mountCaracterString === 'Feb') {
        month = "02";
      }
      else if (mountCaracterString === 'Mar') {
        month = "03";
      }
      else if (mountCaracterString === 'Apr') {
        month = "04";
      }
      else if (mountCaracterString === 'May') {
        month = "05";
      }
      else if (mountCaracterString === 'Jun') {
        month = "06";
      }
      else if (mountCaracterString === 'Jul') {
        month = "07";
      }
      else if (mountCaracterString === 'Aug') {
        month = "08";
      }
      else if (mountCaracterString === 'Sep') {
        month = "09";
      }
      else if (mountCaracterString === 'Oct') {
        month = "10";
      }
      else if (mountCaracterString === 'Nov') {
        month = "11";
      }
      else if (mountCaracterString === 'Dec') {
        month = "12";
      }

      return (caseDate.split(" ")[3]+'-'+month+'-'+caseDate.split(" ")[1]);
     
      }
    }
  
  useEffect(() => {
    console.log(customer)
    setCustomer2({

      firstname: customer.firstname ? customer.firstname : "",
      lastname: customer.lastname ? customer.lastname : "",
      tel: customer.tel ? customer.tel : "",
      tel2: customer.tel2 ? customer.tel2 : "",
      line: customer.line ? customer.line : "",
      email: customer.email ? customer.email : "",
      license_id: customer.license_id ? customer.license_id : "",
      birthday: customer.birthday ? dateFormat(customer.birthday) : "",
      address:customer.address ? customer.address : "",
      province: customer.province ? customer.province : "",
      post_code: customer.post_code ? customer.post_code : ""
    })
  }, [customer])

  const handleChangeCustomer = (e) => {
    setCustomer2({ ...customer2, [e.target.name]: e.target.value })

  }

  const handlerEditCustomer = () => {
    editCustomer(customer.customer_id, customer2)
  }

  return (
    
      <div id="modalEdit" className="modal modal-fixed-footer">
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
          <div className="row content">
            <div className="col s12 m12  head-section no-col-padding">
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="name">First name</label>
              <input
                type="text"
                name="firstname"
                value={customer2.firstname}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="name">Last name</label>
              <input
                type="text"
                name="lastname"
                value={customer2.lastname}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                value={customer2.email}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="Phone">Phone</label>
              <input
                type="tel"
                name="tel"
                value={customer2.tel}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="Phone">Phone2</label>
              <input
                type="tel"
                name="tel2"
                value={customer2.tel2}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="line">Line</label>
              <input
                type="text"
                name="line"
                value={customer2.line}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={customer2.birthday}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m8 l8 content">
              <label htmlFor="home_no">ที่อยู่</label>
              <input
                type="text"
                name="address"
                value={customer2.address}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col s6 m4 l4 content">
              <label htmlFor="license_id">หมายเลขใบอนุญาติ</label>
              <input
                type="text"
                name="license_id"
                value={customer2.license_id}
                onChange={handleChangeCustomer}
              />
            </div>

           

            

            <div className="col s6 m4 l4 content">
              <label htmlFor="province">จังหวัด</label>
              <input
                type="text"
                name="province"
                value={customer2.province}
                onChange={handleChangeCustomer}
              />
            </div>

            <div className="col s6 m4 l4 content">
              <label htmlFor="post_code">รหัสไปรษณีย์</label>
              <input
                type="text"
                name="post_code"
                value={customer2.post_code}
                onChange={handleChangeCustomer}
              />
            </div>



          </div>
        </div>
      </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect yellow btn black-text left" onClick={ handlerEditCustomer }>edit</a>
          <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
        </div>
      </div>
    
  )
}

export default ModalEdit
