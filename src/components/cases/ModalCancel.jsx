import React, { useState, useEffect } from 'react'
import photo from '../../img/photo.png';
import url from "../../Utility/url";
import axios from "axios";

const ModalCancel = ({ singleCase }) => {

  
const confirm =() =>{
  axios.put(`${url}/cancel?case_id=${singleCase.case_id}`)
  .then(res => {
    // M.toast({ html: `${res.data.message}` })
    console.log("######## cancel case result #########");
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
}


 

  return (
    <div>
      <div id="modalCancel" className="modal modal-fixed-footer">

        <div className="modal-content modal-content-override">
          <div className="row content">


            ยืนยันที่จะลบเคส {singleCase.case_id}
            
          </div>
        </div>
        {/* process bar */}

        {/* body */}







        <div className="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm()}>Confirm</button>
          <button className="modal-close waves-effect btn blue lighten left " >Cancel</button>
          
        </div>
      </div>
    </div>


  )
}

export default ModalCancel
