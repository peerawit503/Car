import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
import M from 'materialize-css/dist/js/materialize.min.js'


const ModalAddDealer = ({getDealer }) => {
  const [dealer , setDealer] = useState({
    name:"",
    tel:"",
    line:"",
  })

  function setAllblank(){
    setDealer({
      name:"",
      tel:"",
      line:"",
    })
  }

  const handleChange = e =>{
    setDealer({ ...dealer , [e.target.name] : e.targer.value});
  }



  const saveLead = () =>{

    axios.post(`${url}/dealer` , dealer) 
    .then(res => {
      console.log(res)
      M.toast({ html: `${res.data.message}` })
      setAllblank()
      getDealer()
    })
    .catch(err =>{
      M.toast({ html: `fail to add cartrust lead` })
      console.log(err)
    } )
  }

  const close = () =>{
    setAllblank()
  }

  

  


  return (
    <div>
      <div id="modalAddDealer" className="modal modal-fixed-footer">

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
                    <div className="col s6 m4 l4 content">
                        <label>Name / ชื่อ - สกุล</label>
                        <input
                            type="text"
                            name="name"
                            value={dealer.name || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>เบอร์โทรศัพท์ / Phone Number </label>
                        <input
                            type="text"
                            name="tel"
                            value={dealer.tel || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>ไลน์  / Line </label>
                        <input
                            type="text"
                            name="line"
                            value={dealer.line || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>
          
               
          </div>
        </div>





        <div className="modal-footer">
          <button className="modal-close waves-effect btn white black-text left" onClick={() => saveLead()}>Save</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalAddDealer
