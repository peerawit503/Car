import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddCarLead = ({ }) => {
  const [carLead , setcarLead] = useState({
    lead_no : "",
    name : "",
  })

  function setAllblank(){
    setcarLead({
      lead_no : "",
      name : ""
    })
  }

  const handleChange = e =>{
    setcarLead({ ...carLead , [e.tatget.name] : e.tartger.value});
  }



  const saveLead = () =>{


    // axios.get(`${url}/case_all`)
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => console.log(err))
    setAllblank()
  }

  const close = () =>{
    setAllblank()
  }

  


  return (
    <div>
      <div id="modalAddCarLead" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>Cartust Lead Refer</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
                    <div className="col s6 m4 l4 content">
                        <label>Lead No / หมายเลข</label>
                        <input
                            type="text"
                            name="tel"
                            value={carLead.lead_no || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Name / ชื่อ-สกุล</label>
                        <input
                            type="text"
                            name="tel"
                            value={carLead.name || ""}
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

export default ModalAddCarLead
