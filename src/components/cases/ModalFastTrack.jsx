import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
import plus from '../../img/plus-white.png';
import ModalAddContractInfo from './ModalAddContractInfo'
import CurrencyFormat from 'react-currency-format';

/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase , confirm, translate, fastToP4, fastToP5} ) => {
  const [checkCar, setcheckCar] = useState({ d1: true, d2: false });
  const [checkp11, setcheckp11] = useState(false)
  const [renderDeposit, setrenderDeposit] = useState(false);
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

    const handlecheckCar_1 = e => setcheckCar({ d1: true, d2: false });
    const handlecheckCar_2 = e => setcheckCar({ d1: false, d2: true });

    const deletezero = e => {
      if (e.target.value === 0) {
        e.target.value = "";
      }
    };

    const addzero = e => {
      if (e.target.value === "") {
        e.target.value = "0";
      }
    };
  function ValidateCase(props) {
   
    // in case 7 submit_book_transfer
    if (props.singleCase.status === 'submit_book_transfer'){
      setisConfirm(true)
      return (
        <div>
     
        <span className=" col s12 m12">
                    <label>
                      <input
                        type="checkbox"
                        name="difference_y"
                        checked={checkCar.d1}
                        onChange={handlecheckCar_1}
                      />
                      <span>ตรวจสภาพรถ</span>
                    </label>
                  </span>
                  <span className=" col s12 m12">
                    <label>
                      <input
                        type="checkbox"
                        name="difference_n"
                        checked={checkCar.d2}
                        onChange={handlecheckCar_2}
                      />
                      <span>ไม่ตรวจสภาพรถ</span>
                    </label>
                  </span>
        </div>
      )
    }
    //in case 11 deposit_doc_to_new_bank
    if (props.singleCase.status === 'deposit_doc_to_new_bank'){
      setrenderDeposit(true)
      setisConfirm(true)
      return (
        <div>
        ยอดปิด (บาท) 
         <CurrencyFormat
                      thousandSeparator={true}
                      onValueChange={(values) => {
                      const {value} = values;
                      singleCase.close_amount = value}}
                      decimalScale= "2"
                      min="0"
                      step="any"
                      value={singleCase.close_amount || "0"}
                      name="close_amount"
                      disabled
                      // onChange={handleChangeF2}
                    />
         
        </div>
      )
    }
    // in case 15 book_deposit_received
    if (props.singleCase.status === 'book_deposit_received' ){
      setisConfirm(true)
      return (
        <div>
         เงินมัดจำ (บาท)
         <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
            const {value} = values;
            singleCase.f2_old_finance_transfer_fee = value}}
            decimalScale= "2"
            min="0"
            step="any"
            value={singleCase.f2_old_finance_transfer_fee || "0"}
            name="f2_old_finance_transfer_fee"
            disabled
            // onChange={handleChangeF2}
          />
        </div>
      )
    }
    // if in case 13
    if (props.singleCase.status === 'book_received_back' ){
      setrenderDeposit(false)
      setisConfirm(true)
      return (
        <div>
         เงินมัดจำ (บาท)
         <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
            const {value} = values;
            singleCase.f2_deposit = value}}
            decimalScale= "2"
            min="0"
            step="any"
            value={singleCase.f2_deposit || "0"}
            name="deposit"
            disabled
            // onChange={handleChangeF2}
          />
          <br/>
           เงินเข้าบริษัท (บาท)
         <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
            const {value} = values;
            singleCase.f2_old_finance_transfer_fee = value}}
            decimalScale= "2"
            min="0"
            step="any"
            value={singleCase.f2_old_finance_transfer_fee || "0"}
            name="f2_old_finance_transfer_fee"
            disabled
            // onChange={handleChangeF2}
          />
        </div>
      )
    }
    if (props.singleCase.status === 'cash_received' ){
      setrenderDeposit(false)
      setisConfirm(true)
      return (
        <div>
         เงินมัดจำ (บาท)
         <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
            const {value} = values;
            singleCase.f2_deposit = value}}
            decimalScale= "2"
            min="0"
            step="any"
            value={singleCase.f2_deposit || "0"}
            name="deposit"
            disabled
            // onChange={handleChangeF2}
          />
        </div>
      )
    }
    else{
      setrenderDeposit(false)
      setisConfirm(true)
    }

    let result =[]
    // if in case 3 transfer_doc_received and F2_status ===null
    if (props.singleCase.status === 'account_closing') {
      result.push(
        <div className="row">
          <button className="waves-effect btn blue lighten left " onClick={() => fastToP4(date)}>fastToP4</button>
          <button className="waves-effect btn blue lighten left " onClick={() => fastToP5(date)}>fastToP5</button>
        </div>
      )
      if(props.singleCase.F2_status === 'None' || props.singleCase.F2_status === null || props.singleCase.F2_status === ''){
      console.log(props.singleCase.F2_status);
      console.log(props.singleCase.contact_customer_date);
      setisConfirm(false)
         //return +F2 button
        result.push ( 
          <div>
            <div className="row center">
              <a className="btn modal-trigger tde m6" href="#modalAddF2" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>F2</a>
            </div>
            <div className="row">
                <a className="btn modal-trigger tde m6" href="#modalAddContractInfo" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>Contract Information</a> 
            </div>
          </div>
       );
        }else{
          setisConfirm(true)
        }
    }

    //nomal case return Confirm button
    return result;
  }

  

  function Renderfooter(){
    if(isConfirm){
      return (
        
        <div class="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase,date,checkCar)}>Confirm</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()}>Cancel</button>
          </div>
      );
    }
    return (
      <div class="modal-footer">
        <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >Cancel</button>
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
                    <div style={{display: renderDeposit ? 'block' : 'none'}}>
                      <label>จ่ายมัดจำ (บาท) </label>
                      <CurrencyFormat
                      thousandSeparator={true}
                      onValueChange={(values) => {
                      const {value} = values;
                      singleCase.f2_deposit = value}}
                      decimalScale= "2"
                      min="0"
                      step="any"
                      value={singleCase.f2_deposit || "0"}
                      name="deposit"
                      // onChange={handleChangeF2}
                    />
                    </div>
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
