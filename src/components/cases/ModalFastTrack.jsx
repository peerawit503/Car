import React, { useState, useEffect } from 'react'

import axios from 'axios';
import url from '../../Utility/url'
import plus from '../../img/plus-white.png';
import ModalAddContractInfo from './ModalAddContractInfo'
import CurrencyFormat from 'react-currency-format';

/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalFastTrack = ({ singleCase, confirm, translate, statusDate, caseStatusShift, confirm_sub, setSingleCase }) => {

  const [checkCar, setcheckCar] = useState({ d1: true, d2: false });
  const [checkDeposit, setcheckDeposit] = useState({ d1: true, d2: false });
  const [renderDeposit, setrenderDeposit] = useState(false);
  const [rendertransfer_check, setrendertransfer_check] = useState(false);
  const [submit_book, setsubmit_book] = useState();
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

  // const deletezero = e => {
  //   if (e.target.value === 0) {
  //     e.target.value = "";
  //   }
  // };

  // const addzero = e => {
  //   if (e.target.value === "") {
  //     e.target.value = "0";
  //   }
  // };


  const handleChangeF2T = e => {
    //  const {formattedValue, value} = values
    if (e.target.value === "") {

      singleCase.submit_book_transfer_check = "";
      setsubmit_book("")
    } else {
      singleCase.submit_book_transfer_check = e.target.value;
      setsubmit_book(e.target.value)
    }
    // console.log("handlechange"+singleCase.submit_book_transfer_check);
  }

  const handleChangeCurrency = e => {
    //  const {formattedValue, value} = values
    if (e.target.value === "") {
      setSingleCase({
        ...singleCase,
        [e.target.name]: ""
      });
    } else {
      setSingleCase({
        ...singleCase,
        [e.target.name]: e.target.value
      });
    }
  };



  function ValidateCase_new() {
    setrenderDeposit(false)
    setrendertransfer_check(false)
    setisConfirm(true)
    let result = []
    //วันที่รับชุดโอน 2-6
    if ((singleCase.status === 'contact_customer' ||
      singleCase.status === 'account_closing' ||
      singleCase.status === 'transfer_doc_submitted' ||
      singleCase.status === 'book_received') &&
      (singleCase.case_source === 'Thanachart' ||
        singleCase.case_source === 'Kiatnakin') &&
      singleCase.transfer_doc_received_date === '') {
      //ถ้าอยู่ p6 แต่ยังไม่ได้กรอก ให้ปิดปุ่ม comfirm
      if (singleCase.status === 'book_received') {
        setisConfirm(false)
      }
      result.push(
        <div className='row col m6'>
          <div className='col m12'>
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
    }
    //รอปิดเล่ม และ ยังไม่ได้ทำ f2
    if (singleCase.status === 'contact_customer' && (singleCase.F2_status === 'None' || singleCase.F2_status === null || singleCase.F2_status === '')) {
      setisConfirm(false)
      result.push(
        <div>
          <div className="row col m6">
            <a className="btn modal-trigger tde m6" href="#modalAddF2" ><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="fireSpot" />F2</a>
            <a className="btn modal-trigger tde m6" href="#modalAddContractInfo" ><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="fireSpot" />Contract Information</a>
          </div>
        </div>
      );
    }
    //รอปิดเล่ม กรอก มัดจำ
    if (singleCase.status === 'contact_customer') {
      setrenderDeposit(true)
      result.push(
        <div className="row m4">
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
    //รอส่งงานโอนทะเบียน
    if (singleCase.status === 'book_received') {
      setrendertransfer_check(true)
    }

    // in case 7 submit_book_transfer
    if (singleCase.status === 'submit_book_transfer') {
      result.push(
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
    return result;
  }


  function ValidateCase(props) {
    setrenderDeposit(false)
    let result = []




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
    return (
      <h4 style={{ textAlign: "center" }}>รอ{translate(caseStatusShift(singleCase.status))} </h4>
    )
  }
  // function ReturnWorking() {
  //   let status = ""
  //   //in case DEALER & Cartrust
  //   if (singleCase.case_source === 'Dealer' || singleCase.case_source === 'Cartrust') {
  //     if (singleCase.f2_deposit_12 > 0) {//in case มีมีดจำ
  //       if (singleCase.status === 'book_received') { status = 'deposit_doc_to_new_bank' } //6 -> 11
  //       else if (singleCase.status === 'deposit_doc_to_new_bank') { status = 'cash_received' } // 11 -> 14
  //       else if (singleCase.status === 'cash_received') { status = 'submit_book_deposit_return' }//14 -> 12 
  //       else if (singleCase.status === 'submit_book_deposit_return') { status = 'book_deposit_received' } // 12-> 15
  //     }
  //     else if (singleCase.f2_deposit_12 == 0) { //in case ไม่มีมัดจำ
  //       if (singleCase.status === 'book_transfer') { status = 'book_received_back' } //9 ->13
  //       else if (singleCase.status === 'book_received_back') { status = 'deposit_doc_to_new_bank' } //13-> 11
  //       else if (singleCase.status === 'deposit_doc_to_new_bank') { status = 'cash_received' } // 11->14
  //     }
  //   }

  //   else if (singleCase.status === 'account_closing' && singleCase.f2_deposit_12 > 0 && (singleCase.case_source === 'Thanachart' || singleCase.case_source === 'Kiatnakin')) {
  //     status = 'book_received' //3->6
  //   }

  //   else {
  //     status = caseStatusShift(singleCase.status)
  //   }
  //   return status
  // }

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
            <label>วันที่{translate(caseStatusShift(singleCase.status))} </label>
            <input
              type="date"
              value={date || currentDateFormat(Date())}
              name="receive_date"
              onChange={handleChange}
            />
          </div>
        </div>
        <ValidateCase_new />
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
        <div className='col s4 m4 content' style={{ display: rendertransfer_check ? 'block' : 'none' }} >
          <label>ส่งตรวจ</label>
          <input
            type="text"
            name="submit_book_transfer_check"
            value={submit_book || singleCase.submit_book_transfer_check || ""}
            onChange={handleChangeF2T}
            className="validate"
          />
        </div>
      </div>
      <Renderfooter />
    </div>

  )
}

export default ModalFastTrack
