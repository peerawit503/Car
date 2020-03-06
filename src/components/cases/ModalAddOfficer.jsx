import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
import M from 'materialize-css/dist/js/materialize.min.js'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddOfficer = ({getOfficer , case_source_for_add , getOfficerKK }) => {
  const [officer , setOfficer] = useState({
    name:"",
    tel:"",
    line:"",
    type:""
  })

  function setAllblank(){
    setOfficer({
      name:"",
      tel:"",
      line:"",
      type:""
    })
  }

  const handleChange = e =>{
    setOfficer({ ...officer , [e.target.name] : e.target.value});
  }



  const save = () =>{

    console.log(case_source_for_add)
    // setOfficer({...officer , type:case_source_for_add})
    let data  = {
      ...officer,
      type:case_source_for_add
    }
    console.log(JSON.stringify(data))
    axios.post(`${url}/contract_officer` , data )
    .then(res => {
      M.toast({ html: `${res.data.message}` })
      getOfficer()
      getOfficerKK();
      
    })
    .catch(err => { 
      M.toast({ html: `Error` }) 
    console.log(err)})
    setAllblank()
  }

  const close = () =>{
    setAllblank()
  }

  

  


  return (
    <div>
      <div id="modalAddOfficer" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>เพิ่ม เจ้าหน้าที่ทำสัญญา / Contract officer</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
                    <div className="col s6 m6 l4 content">
                        <label>Name / ชื่อ - สกุล</label>
                        <input
                            type="text"
                            name="name"
                            value={officer.name || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m6 l4 content">
                        <label>เบอร์โทรศัพท์ / Phone Number </label>
                        <input
                            type="text"
                            name="tel"
                            value={officer.tel || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m6 l4 content">
                        <label>ไลน์  / Line </label>
                        <input
                            type="text"
                            name="line"
                            value={officer.line || ""}
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

export default ModalAddOfficer
