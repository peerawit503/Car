import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
import plus from '../../img/plus-white.png';
import ModalAddContractInfo from './ModalAddContractInfo'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase , confirm, translate} ) => {

  const [isConfirm , setisConfirm] = useState(true)

  function ValidateCase(props) {
    // if in case 3 transfer_doc_received and F2_status ===null
    if (props.singleCase.status === 'account_closing' && (props.singleCase.F2_status === 'None' || props.singleCase.F2_status === null)) {
      console.log(props.singleCase.F2_status);
      console.log(props.singleCase.contact_customer_date);
      setisConfirm(false)
         //return +F2 button
        return ( 
        <div>
          <a className="btn modal-trigger tde m6" href="#modalAddF2" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>F2</a>
          <a className="btn modal-trigger tde m6" href="#modalAddContractInfo" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>Contract Information</a> 
        </div>
       );
      
    }
    // in case 11 deposit_doc_to_new_bank
    if (props.singleCase.status === 'deposit_doc_to_new_bank'){
      console.log(props.singleCase.close_amount);
      setisConfirm(true)
      return (
        <div>
         <h5>ยอดปิด: {singleCase.close_amount}</h5>
        </div>
      )
    }
    // in case 15 book_deposit_received
    if (props.singleCase.status === 'book_deposit_received' ){
      console.log(props.singleCase.f2_old_finance_transfer_fee);
      setisConfirm(true)
      return (
        <div>
         <h5>เงินมัดจำ (ค่าโอนไฟแนนซ์เก่า): {singleCase.f2_old_finance_transfer_fee}</h5>
        </div>
      )
    }
    else{
      setisConfirm(true)
    }

    //nomal case return Confirm button
    return null
  }

  function Renderfooter(){
    if(isConfirm){
      return (
        <div class="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase)}>Confirm</button>
          <button className="modal-close waves-effect btn white black-text right">Cancle</button>
        </div>
      );
    }
    return (
      <div class="modal-footer">
        <button className="modal-close waves-effect btn white black-text right">Cancle</button>
      </div>
    )
  }


  return (
    <div>
      <div id="modalFastTrack" className="modal modal-fixed-footer">
          <div className="row">
            {/* <div className="header-title"> */}
              <div className="col s12 m12 no-col-padding">
                <h4 style={{textAlign:"center"}}>Case Status : {translate(singleCase.status)}</h4><br/>
                <h4 style={{textAlign:"center"}}>Job Id: {singleCase.case_id}</h4><br/>
              </div>
            {/* </div> */}
          {/* process bar */}

          {/* body */}
            <div className="row content">
            <h5 style={{textAlign:"center"}}>F2 Status : {singleCase.F2_status}</h5><br/>

            <ValidateCase singleCase={singleCase} />
            <Renderfooter />
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModalFastTrack
