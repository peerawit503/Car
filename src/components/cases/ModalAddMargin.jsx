import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
import M from 'materialize-css/dist/js/materialize.min.js'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddMargin = ({getMargin_account}) => {
  const [margin , setMargin] = useState({
    name:"",

  })

  function setAllblank(){
    setMargin({
      name:"",
  
    })
  }

  const handleChange = e =>{
    setMargin({ ...margin , [e.target.name] : e.target.value});
  }



  const save = () =>{

    console.log(JSON.stringify(margin))
    axios.post(`${url}/margin_account` , margin )
    .then(res => {
      M.toast({ html: `${res.data.message}` })
      getMargin_account()
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
      <div id="modalAddMargin" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>เพิ่ม บัญชีรับเงินส่วนต่าง</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
                    <div className="col s6 m6 l6 content">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={margin.name || ""}
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

export default ModalAddMargin
