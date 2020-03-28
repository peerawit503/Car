import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from '../../Utility/url'
import M from 'materialize-css/dist/js/materialize.min.js'


const ModalAddVender = ( ) => {
  const [data , setData] = useState({
    name:"",
    tel:"",
    contact_name:"",
  })

  function setAllblank(){
    setData({
      name:"",
      tel:"",
      contact_name:"",
    })
  }

  const handleChange = e =>{
    setData({ ...data , [e.target.name] : e.target.value});
  }



  const saveLead = () =>{

    axios.post(`${url}/vendor` , data) 
    .then(res => {
      console.log(res)
      M.toast({ html: `${res.data.message}` })
      setAllblank()
      
    })
    .catch(err =>{
      M.toast({ html: `fail to add data` })
      console.log(err)
    } )
  }

  const close = () =>{
    setAllblank()
  }



  


  return (
    <div>
      <div id="modalAddVender" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>เพิ่ม Vender</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
                    <div className="col s6 m4 l4 content">
                        <label>ชื่อ</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>เบอร์โทรศัพท์ </label>
                        <input
                            type="text"
                            name="tel"
                            value={data.tel || ""}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>ชื่อผู้ติดต่อ</label>
                        <input
                            type="text"
                            name="contact_name"
                            value={data.contact_name || ""}
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

export default ModalAddVender
