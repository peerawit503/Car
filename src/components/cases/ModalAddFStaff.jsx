import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
import M from 'materialize-css/dist/js/materialize.min.js'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddFStaff = ({getOperatorS}) => {
  const [staff , setStaff] = useState({
    name:"",
    tel:"",
    line:"",
  })

  function setAllblank(){
    setStaff({
      name:"",
      tel:"",
      line:"",
    })
  }

  const handleChange = e =>{
    setStaff({ ...staff , [e.target.name] : e.target.value});
  }



  const save = () =>{

    console.log(JSON.stringify(staff))
    axios.post(`${url}/finance_staff` , staff )
    .then(res => {
      M.toast({ html: `${res.data.message}` })
      getOperatorS()
      setAllblank()
      
    })
    .catch(err => { 
    M.toast({ html: `Error` }) 
    console.log(err)})
  }

  const close = () =>{
    setAllblank()
  }

  

  


  return (
    <div>
      <div id="modalAddFStaff" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>เพิ่ม เจ้าหน้าที่ Operator Cartrust</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
                    <div className="col s6 m6 l4 content">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={staff.name || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m6 l4 content">
                        <label>เบอร์โทรศัพท์ / Phone Number </label>
                        <input
                            type="text"
                            name="tel"
                            value={staff.tel || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m6 l4 content">
                        <label>ไลน์  / Line </label>
                        <input
                            type="text"
                            name="line"
                            value={staff.line || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>
          
               
          </div>
        </div>





        <div className="modal-footer">
          <button className="modal-close waves-effect btn white black-text left" onClick={() => save()}>Save</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalAddFStaff
