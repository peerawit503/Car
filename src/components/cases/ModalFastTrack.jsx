import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
import plus from '../../img/plus-white.png';
import ModalAddContractInfo from './ModalAddContractInfo'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase , confirm, translate} ) => {


  // function nextStep(state){
  //   var prevDate = '';
  //   if(state === 'receive'){ prevDate = 'contact_customer';}
  //   else if(state === 'contact_customer'){prevDate = 'account_closing'}
  //   else if(state === 'account_closing'){prevDate = 'transfer_doc_received'}
  //   else if(state === 'transfer_doc_received'){prevDate = 'transfer_doc_submitted'}
  //   else if(state === 'transfer_doc_submitted'){prevDate = 'book_received'}
  //   else if(state === 'book_received'){prevDate = 'submit_book_transfer'}
  //   else if(state === 'submit_book_transfer'){prevDate = 'car_check_up'}
  //   else if(state === 'car_check_up'){prevDate = 'book_transfer'}
  //   else if(state === 'book_transfer'){prevDate = 'book_copy_received'}
  //   else if(state === 'book_copy_received'){prevDate = 'deposit_doc_to_new_bank'}
  //   else if(state === 'deposit_doc_to_new_bank'){prevDate = 'submit_book_deposit_return'}
  //   else if(state === 'submit_book_deposit_return'){prevDate = 'book_received_back'}
  //   else if(state === 'book_received_back'){prevDate = 'cash_received'}
  //   else if(state === 'cash_received'){
  //     //for skip 14 to 16 if no deposit received
  //     if (singleCase.f2_old_finance_transfer_fee === null || singleCase.f2_old_finance_transfer_fee  <= 0){
  //       prevDate = 'submit_book_to_new_finance'
  //     } else {
  //       prevDate = 'book_deposit_received'
  //     }
  //   }
  //   else if(state === 'book_deposit_received'){prevDate = 'submit_book_to_new_finance'}
  //   else if(state === 'submit_book_to_new_finance'){prevDate = 'submit_book_to_new_finance'}
    
  //   return prevDate;
  // }

  function ValidateCase(props) {
    // if in case 3 transfer_doc_received and F2_status ===null
    if (props.singleCase.status === 'account_closing' && props.singleCase.F2_status === null) {
      console.log(props.singleCase.F2_status);
      console.log(props.singleCase.contact_customer_date);
     
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

      return (
        <div>
         <h5>ยอดปิด: {singleCase.close_amount}</h5>
        </div>
      )
    }
    // in case 15 book_deposit_received
    if (props.singleCase.status === 'book_deposit_received' ){
      console.log(props.singleCase.f2_old_finance_transfer_fee);
      return (
        <div>
         <h5>เงินมัดจำ (ค่าโอนไฟแนนซ์เก่า): {singleCase.f2_old_finance_transfer_fee}</h5>
        </div>
      )
    }

    //nomal case return Confirm button
    return null
  }

  // function translate(state){
  //   var trans = '';
  //   if(state === 'receive'){ trans = '1.วันที่รับเคส';}
  //   else if(state === 'contact_customer'){trans = '2.วันที่ติดต่อลูกค้า'}
  //   else if(state === 'account_closing'){trans = '3.วันที่ปิดเล่ม'}
  //   else if(state === 'transfer_doc_received'){trans = '4.วันรับชุดโอน'}
  //   else if(state === 'transfer_doc_submitted'){trans = '5.วันยื่นชุดโอน'}
  //   else if(state === 'book_received'){trans = '6.วันที่ได้รับเล่ม'}
  //   else if(state === 'submit_book_transfer'){trans = '7.วันที่ส่งงานโอนทะเบียน'}
  //   else if(state === 'car_check_up'){trans = '8.วันตรวจสภาพรถ'}
  //   else if(state === 'book_transfer'){trans = '9.โอนเล่มทะเบียน'}
  //   else if(state === 'book_copy_received'){trans = '10.รับสำเนาเล่ม'}
  //   else if(state === 'deposit_doc_to_new_bank'){trans = '11.ส่งเอกสารเบิกเงินธนาคารใหม่'}
  //   else if(state === 'submit_book_deposit_return'){trans = '12.ทำเรื่องเบิกมัดจำคืน'}
  //   else if(state === 'book_received_back'){trans = '13.รับเล่มคืน'}
  //   else if(state === 'cash_received'){trans = '14.เงินเข้าบัญชีคาร์ทรัส'}
  //   else if(state === 'book_deposit_received'){trans = '15.เงินมัดจำคืนเข้าบัญชี'}
  //   else if(state === 'submit_book_to_new_finance'){trans = '16.ส่งเล่มให้ไฟแนนซ์ใหม่'}
    
  //   return trans;
  // }


  
  // const confirm = () => {
  //   var data = JSON.stringify({tracking: nextStep(singleCase.status) , user_id : 'mock' });
  //   console.log('###### data ########');
  //   console.log(data);
  //   axios.post(`${url}/fast_tracking?case_id=${singleCase.case_id}`, data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }).then(res => {
  //     console.log('#####  RES  ######');
  //     console.log('Case', res.data.message);
  //   })
  //     .catch(err => console.log(err))
  // }

  return (
    <div>
      <div id="modalFastTrack" className="modal modal-fixed-footer">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
                <h4 style={{textAlign:"center"}}>Case Status : {translate(singleCase.status)}</h4><br/>
                <h4 style={{textAlign:"center"}}>Job Id: {singleCase.case_id}</h4><br/>
              </div>
            </div>
          {/* process bar */}

          {/* body */}
            <div className="row content">
            <ValidateCase singleCase={singleCase} />
              <div class="modal-footer">
                <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase)}>Confirm</button>
                <button className="modal-close waves-effect btn white black-text right">Cancle</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModalFastTrack
