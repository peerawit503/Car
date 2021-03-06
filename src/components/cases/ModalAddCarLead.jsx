import React, { useState, useEffect } from 'react'


import axios from 'axios';
import url from '../../Utility/url'

import M from 'materialize-css/dist/js/materialize.min.js'

const ModalAddCarLead = ({getCartrust_lead}) => {
  const [carLead , setcarLead] = useState({
    cl_id4 : "",
    name : "",
    tel:"",
    line:""
  })

  function setAllblank(){
    setcarLead({
      cl_id4 : "",
      name : "",
      tel:"",
      line:""
    })
  }

  const handleChange = (e) =>{
    setcarLead({ ...carLead , [e.target.name] : e.target.value});
  }



  const saveLead = () =>{


    axios.post(`${url}/cartrust_lead` , carLead)
    .then(res => {
      console.log(res)
      M.toast({ html: `${res.data.message}` })
      setAllblank()
      getCartrust_lead()
    })
    .catch(err =>{
      M.toast({ html: `fail to add cartrust lead` })
      console.log(err)
    } )
    
  }

  const close = () =>{
    console.log(carLead)
    setcarLead({})
    console.log(carLead)
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
                            name="cl_id4"
                            value={carLead.cl_id4 || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Name / ชื่อ-สกุล</label>
                        <input
                            type="text"
                            name="name"
                            value={carLead.name || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Phone / เบอร์โทรศัพท์</label>
                        <input
                            type="text"
                            name="tel"
                            value={carLead.tel || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Line / ไลน์</label>
                        <input
                            type="text"
                            name="line"
                            value={carLead.line || ""}
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
