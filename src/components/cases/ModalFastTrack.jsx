import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase }) => {


  function nextStep(state){
    var prevDate = '';
    if(state === 'receive'){ prevDate = 'contact_customer';}
    else if(state === 'contact_customer'){prevDate = 'account_closing'}
    else if(state === 'account_closing'){prevDate = 'transfer_doc_received'}
    else if(state === 'transfer_doc_received'){prevDate = 'transfer_doc_submitted'}
    else if(state === 'transfer_doc_submitted'){prevDate = 'book_received'}
    else if(state === 'book_received'){prevDate = 'submit_book_transfer'}
    else if(state === 'submit_book_transfer'){prevDate = 'car_check_up'}
    else if(state === 'car_check_up'){prevDate = 'book_transfer'}
    else if(state === 'book_transfer'){prevDate = 'book_copy_received'}
    else if(state === 'book_copy_received'){prevDate = 'deposit_doc_to_new_bank'}
    else if(state === 'deposit_doc_to_new_bank'){prevDate = 'submit_book_deposit_return'}
    else if(state === 'submit_book_deposit_return'){prevDate = 'book_received_back'}
    else if(state === 'book_received_back'){prevDate = 'cash_received'}
    else if(state === 'cash_received'){prevDate = 'book_deposit_received'}
    else if(state === 'book_deposit_received'){prevDate = 'submit_book_to_new_finance'}
    else if(state === 'submit_book_to_new_finance'){prevDate = 'submit_book_to_new_finance'}
    
    return prevDate;
  }


  const confirm = () => {
    var data = JSON.stringify({tracking: nextStep(singleCase.status) , user_id : 'mock' });
    console.log('###### data ########');
    console.log(data);
    axios.post(`${url}/fast_tracking?case_id=${singleCase.case_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('#####  RES  ######');
      console.log('Case', res.data.message);
    })
      .catch(err => console.log(err))
  }
  return (
    <div>
      <div id="modalFastTrack" className="modal modal-fixed-footer">

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
                <h4>Fast Track : {singleCase.job_id}</h4>
              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}



          <div className="cotent-field">
            <div className="row content">
            <button className="waves-effect btn blue lighten left " onClick={() => confirm()}>Confirm</button>
            <button className="modal-close waves-effect btn white black-text right">Cancle</button>
            </div>
          </div>
        </div>


      </div>

    </div >
  )
}

export default ModalFastTrack
