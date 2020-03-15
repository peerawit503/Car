import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
import plus from '../../img/plus-white.png';
import ModalAddContractInfo from './ModalAddContractInfo'
import CurrencyFormat from 'react-currency-format';

/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase, confirm, translate, statusDate, caseStatusShift, confirm_sub }) => {
  const [checkCar, setcheckCar] = useState({ d1: true, d2: false });
  const [checkDeposit, setcheckDeposit] = useState({ d1: true, d2: false });
  const [renderDeposit, setrenderDeposit] = useState(false);
  function currentDateFormat(caseDate) {
    if (caseDate == null) {
      return 0;
    } else {
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

      return (caseDate.split(" ")[3] + '-' + month + '-' + caseDate.split(" ")[2]);

    }
  }

  const [isConfirm, setisConfirm] = useState(true)
  const [date, SetDate] = useState(currentDateFormat(Date()))



  const handleChange = e => {
    SetDate(e.target.value)
  }

  const close = () => {
    SetDate(currentDateFormat(Date()))
  }

  const handlecheckCar_1 = e => setcheckCar({ d1: true, d2: false });
  const handlecheckCar_2 = e => setcheckCar({ d1: false, d2: true });
  const handlecheckDeposit_1 = e => setcheckDeposit({ d1: true, d2: false });
  const handlecheckDeposit_2 = e => setcheckDeposit({ d1: false, d2: true }, singleCase.f2_deposit_12 = 0);

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

  const handleChangeF2T = e => {
    if (e.target.value == "") {
      e.target.name = " "
    } else {
      e.target.name = e.target.value
    }
  };



  function ValidateCase(props) {
    let result = []
    if ((props.singleCase.status === 'receive' ||
      props.singleCase.status === 'contact_customer' ||
      props.singleCase.status === 'account_closing' ||
      props.singleCase.status === 'transfer_doc_received' ||
      props.singleCase.status === 'transfer_doc_submitted') &&
      singleCase.transfer_doc_received_date === '') {
      result.push(
        <div className='row m12 s12'>
          <div className='col m6'>
            <div className='row col m12 no-margin'>
              <label>วันที่รับชุดโอน</label>
            </div>
            <div className='row m12'>
              <div className='col m6'>
                <input
                  type="date"
                  value={date || currentDateFormat(Date())}
                  name="receive_date"
                  onChange={handleChange}
                />
              </div>
              <div className='col m6'>
                <button className="waves-effect btn blue lighten left " onClick={() => confirm_sub(singleCase, date, checkCar)}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )
      if (props.singleCase.status === 'contact_customer' && (props.singleCase.F2_status === 'None' || props.singleCase.F2_status === null || props.singleCase.F2_status === '')) {
        setisConfirm(false)
        //return +F2 button
        result.push(
          <div>
            <div className="row center">
              <a className="btn modal-trigger tde m6" href="#modalAddF2" ><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="fireSpot" />F2</a>
            </div>
            <div className="row center">
              <a className="btn modal-trigger tde m6" href="#modalAddContractInfo" ><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="fireSpot" />Contract Information</a>
            </div>

          </div>

        );
      }else{
        setisConfirm(true)
      }
    }

    if (props.singleCase.status === 'transfer_doc_received') {
      setrenderDeposit(true)
      setisConfirm(true)
      return (
        <div className="row center m4">
          <span className=" col s12 m12">
            <label>
              <input
                type="checkbox"
                name="difference_y"
                checked={checkDeposit.d1}
                onChange={handlecheckDeposit_1}
              />
              <span>มีมัดจำ</span>
            </label>
          </span>
          <span className=" col s12 m12">
            <label>
              <input
                type="checkbox"
                name="difference_n"
                checked={checkDeposit.d2}
                onChange={handlecheckDeposit_2}
              />
              <span>ไม่มีมัดจำ</span>
            </label>
          </span>
        </div>
      )
    }
    // in case 7 submit_book_transfer
    if (props.singleCase.status === 'submit_book_transfer') {
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
    // if (props.singleCase.status === 'car_check_up') {
    //   setisConfirm(true)
    //   return (
    //     <div className='row m12 s12'>
    //       <div className='col m6'>
    //         <div className='row col m12 no-margin'>
    //           <label>รับสำเนาเล่ม</label>
    //         </div>
    //         <div className='row m12'>
    //           <div className='col m6'>
    //             <input
    //               type="date"
    //               value={date || currentDateFormat(Date())}
    //               name="receive_date"
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className='col m6'>
    //             <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase, date, checkCar)}>Confirm</button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='col m6'>
    //         <div className='row col m12 no-margin'>
    //           <label>ส่งเอกสารเบิกเงินธนาคารใหม่</label>
    //         </div>
    //         <div className='row m12'>
    //           <div className='col m6'>
    //             <input
    //               type="date"
    //               value={date || currentDateFormat(Date())}
    //               name="receive_date"
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className='col m6'>
    //             <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase, date, checkCar)}>Confirm</button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='row m12 s12'>
    //         <div className='col m6'>
    //           <div className='row col m12 no-margin'>
    //             <label>ทำเรื่องเบิกมัดจำคืน</label>
    //           </div>
    //           <div className='row m12'>
    //             <div className='col m6'>
    //               <input
    //                 type="date"
    //                 value={date || currentDateFormat(Date())}
    //                 name="receive_date"
    //                 onChange={handleChange}
    //               />
    //             </div>
    //             <div className='col m6'>
    //               <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase, date, checkCar)}>Confirm</button>
    //             </div>
    //           </div>
    //         </div>
    //         <div className='col m6'>
    //           <div className='row col m12 no-margin'>
    //             <label>รับเล่มคืน</label>
    //           </div>
    //           <div className='row m12'>
    //             <div className='col m6'>
    //               <input
    //                 type="date"
    //                 value={date || currentDateFormat(Date())}
    //                 name="receive_date"
    //                 onChange={handleChange}
    //               />
    //             </div>
    //             <div className='col m6'>
    //               <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase, date, checkCar)}>Confirm</button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }
    if (props.singleCase.status === 'book_received') {
      setisConfirm(true)
      return (
        <div className='row col m4 s4 '>
          <label>ส่งตรวจ</label>
          <input
            type="text"
            name="old_finance_closing_fee_note"
            value={singleCase.chack_car_at || ""}
            onChange={handleChangeF2T}
            className="validate"
          />
        </div>)
    }
    //in case 11 deposit_doc_to_new_bank
    if (props.singleCase.status === 'deposit_doc_to_new_bank') {
      setisConfirm(true)
      return (
        <div className='col row m4'>
          ยอดปิด (บาท)
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              singleCase.close_amount = value
            }}
            decimalScale="2"
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
    if (props.singleCase.status === 'book_deposit_received') {
      setisConfirm(true)
      return (
        <div className='row col m4'>
          เงินมัดจำ (บาท)
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              singleCase.f2_old_finance_transfer_fee = value
            }}
            decimalScale="2"
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
    if (props.singleCase.status === 'book_received_back') {
      setrenderDeposit(false)
      setisConfirm(true)
      return (
        <div className='row col m4'>
          เงินมัดจำ (บาท)
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              singleCase.f2_deposit_12 = value
            }}
            decimalScale="2"
            min="0"
            step="any"
            value={singleCase.f2_deposit_12 || "0"}
            name="deposit"
            disabled
          // onChange={handleChangeF2}
          />
          <br />
          เงินเข้าบริษัท (บาท)
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              singleCase.f2_old_finance_transfer_fee = value
            }}
            decimalScale="2"
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
    if (props.singleCase.status === 'cash_received') {
      setrenderDeposit(false)
      setisConfirm(true)
      return (
        <div className='row col m4'>
          เงินมัดจำ (บาท)
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              singleCase.f2_deposit_12 = value
            }}
            decimalScale="2"
            min="0"
            step="any"
            value={singleCase.f2_deposit_12 || "0"}
            name="deposit"
            disabled
          // onChange={handleChangeF2}
          />
        </div>
      )
    }
    else {
      setrenderDeposit(false)
      setisConfirm(true)
    }


    //nomal case return Confirm button
    return result;
  }

  function Renderfooter() {
    if (isConfirm) {
      return (
        <div class="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => confirm(singleCase, date, checkCar)}>Confirm</button>
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

  function RenderWorking() {
    let status = singleCase.status

    if(singleCase.status === 'car_check_up' && (singleCase.case_source === 'Dealer' || singleCase.case_source === 'Cartrust')){
      status = 'submit_book_deposit_return'
    }else if(singleCase.status === 'submit_book_deposit_return' && (singleCase.case_source === 'Dealer' || singleCase.case_source === 'Cartrust')){
      status = 'book_copy_received'
    }else if(singleCase.status === 'book_copy_received' && (singleCase.case_source === 'Dealer' || singleCase.case_source === 'Cartrust')){
      status = 'deposit_doc_to_new_bank'
    }else{
      status = caseStatusShift(singleCase.status)
    }
    return (
      <h4 style={{ textAlign: "center" }}>รอ{translate(status)} </h4>
    )
  }

  return (
    <div id="modalFastTrack" className="modal modal-fixed-footer">
      <div className="row 15" style={{ borderBottom: "1px solid", padding: "10px" }}>
        {/* <div className="header-title"> */}
        <div className="col s8 m8 ">
          <span >สถานะเคสปัจจุบัน : {translate(singleCase.status)}</span><br />
          <span >ตั้งแต่วันที่ {statusDate(singleCase)}</span>
        </div>
        <div className="col s4 m4 right ">
          <span className="right">Job Id : {singleCase.case_id}</span><br />
          <span className="right">F2 Status : {singleCase.F2_status}</span><br />
        </div>
      </div>
      {/* </div> */}
      {/* process bar */}

      {/* body */}
      <div className="row content">
        <RenderWorking />
        <div className="col s12 m12 content">
          <div className="col s4 m4 content"></div>
          <div className="col s4 m4 content">
            <label>วันที่ดำเนินการ</label>
            <input
              type="date"
              value={date || currentDateFormat(Date())}
              name="receive_date"
              onChange={handleChange}
            />
          </div>
        </div>
        <ValidateCase singleCase={singleCase} />
        <div className='col s4 m4 content' style={{ display: renderDeposit && checkDeposit.d1 ? 'block' : 'none' }} >
          <label>จ่ายมัดจำ (บาท) </label>
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              singleCase.f2_deposit_12 = value
            }}
            decimalScale="2"
            min="0"
            step="any"
            value={singleCase.f2_deposit_12 || "0"}
            name="deposit"
            disabled={checkDeposit.d2}
          // onChange={handleChangeF2}
          />
        </div>
      </div>
      <Renderfooter />
    </div>

  )
}

export default ModalFastTrack
