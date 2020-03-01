import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
import plus from '../../img/plus-white.png';
import ModalAddContractInfo from './ModalAddContractInfo'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase , confirm, translate} ) => {


  function currentDateFormat(caseDate) {
    if(caseDate == null){
      return 0;
    }else{
      var mountCaracterString = caseDate.split(" ")[1];
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

      return (caseDate.split(" ")[3]+'-'+month+'-'+caseDate.split(" ")[2]);
     
      }
    }

  const [isConfirm , setisConfirm] = useState(true)
  const [date , SetDate] = useState(currentDateFormat(Date()))



    const handleChange = e=>{
        SetDate(e.target.value)
    }

    const close = () => {
      SetDate(currentDateFormat(Date()))
    }
  function ValidateCase(props) {
    // if in case 3 transfer_doc_received and F2_status ===null
    if (props.singleCase.status === 'account_closing' && (props.singleCase.F2_status === 'None' || props.singleCase.F2_status === null)) {
      console.log(props.singleCase.F2_status);
      console.log(props.singleCase.contact_customer_date);
      setisConfirm(false)
         //return +F2 button
        return ( 
          <div>
            <div className="row center">
              <a className="btn modal-trigger tde m6" href="#modalAddF2" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>F2</a>
            </div>
            <div className="row">
                <a className="btn modal-trigger tde m6" href="#modalAddContractInfo" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>Contract Information</a> 
            </div>
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
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase,date)}>Confirm</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()}>Cancle</button>
        </div>
      );
    }
    return (
      <div class="modal-footer">
        <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >Cancle</button>
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
            <div className="col s4 m4 l4 content"></div>

            <div className="col s4 m4 l4 content">
                    <label>Receive Date/ วันที่รับเคส</label>
                    <input
                      type="date"
                      value={date || currentDateFormat(Date())}
                      name="receive_date"
                      onChange={handleChange}
                    />
                    <ValidateCase singleCase={singleCase} />
                  </div>
            <div className="col s4 m4 l4 content">
            </div>
                
            <Renderfooter />
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModalFastTrack
