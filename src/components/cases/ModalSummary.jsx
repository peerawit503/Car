import React, { useState, useEffect } from 'react'
import ModalAddF2 from './ModalAddF2';
import ModalAddContract from './modalAddContract';
import ModalImage from './ModalImage';
import ModalCancel from './ModalCancel';
import ModalProcess from './ModalProcess'
import confirm from '../../img/confirm.png';
import plus from '../../img/plus-white.png';
import photo from '../../img/photo.png';

import CurrencyFormat from 'react-currency-format';

import Popup from 'reactjs-popup'

const ModalSummary = ({ singleCase , kpi , getAllCase , operatorS , getOperatorS , translate , saveProcess}) => {
  
  const [newCase, setNewCase] = useState({})
  const [currentProcess, setCurrentProcess] = useState({
    processTracker: "",
    processDate: "",
    process: "",
    processThai: ""
  })
  useEffect(() => {

  })

  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
  }

  function summaryCaseTime(reciveD, caseS) {

    if (caseS == null || caseS === '') {
      return "";
    } else {
      let lessThan = parseStringToDate(caseS)
      var moreThan = parseStringToDate(reciveD);
      return (Math.floor((lessThan - moreThan) / (24 * 3600 * 1000)));
    }
  }


  function statusTodate(cStatus) {
    return cStatus + '_date';
  }


  // function getnote(CaseStatus){
  //   console.log("inGETNOTE")
  //   let status_note = CaseStatus + "_note";
  //   return status_note;
  // }

  function parseStringToDate(sringDate) {
    var mountCaracterString = sringDate.split(" ")[2];
    var dayString = sringDate.split(" ")[1];
    var yearString = sringDate.split(" ")[3];
    var month;
    if (mountCaracterString === 'Jan') {
      month = 0;
    }
    else if (mountCaracterString === 'Feb') {
      month = 1;
    }
    else if (mountCaracterString === 'Mar') {
      month = 2;
    }
    else if (mountCaracterString === 'Apr') {
      month = 3;
    }
    else if (mountCaracterString === 'May') {
      month = 4;
    }
    else if (mountCaracterString === 'Jun') {
      month = 5;
    }
    else if (mountCaracterString === 'Jul') {
      month = 6;
    }
    else if (mountCaracterString === 'Aug') {
      month = 7;
    }
    else if (mountCaracterString === 'Sep') {
      month = 8;
    }
    else if (mountCaracterString === 'Oct') {
      month = 9;
    }
    else if (mountCaracterString === 'Nov') {
      month = 10;
    }
    else if (mountCaracterString === 'Dec') {
      month = 11;
    }
    // var month = parseInt(mountString) - 1;
    var day = parseInt(dayString);
    var year = parseInt(yearString);

    var newDate = new Date(year, month, day);


    return newDate;
  }

  function dateFormated(date) {
    if (date == null) {
      return null;
    } else {
      return (date.split(" ")[1] + ' ' + date.split(" ")[2] + ' ' + date.split(" ")[3])
    }

  }

  function caseStatusShiftback(state) {
    let nextstate = "";
    if (state === 'submit_book_to_new_finance') { nextstate = 'book_deposit_received' }
    else if (state === 'book_deposit_received') { nextstate = 'cash_received' }
    else if (state === 'cash_received') { nextstate = 'book_received_back' }
    else if (state === 'book_received_back') { nextstate = 'submit_book_deposit_return' }
    else if (state === 'submit_book_deposit_return') { nextstate = 'deposit_doc_to_new_bank' }
    else if (state === 'deposit_doc_to_new_bank') { nextstate = 'book_copy_received' }
    else if (state === 'book_copy_received') { nextstate = 'book_transfer' }
    else if (state === 'book_transfer') { nextstate = 'car_check_up' }
    else if (state === 'car_check_up') { nextstate = 'submit_book_transfer' }
    else if (state === 'submit_book_transfer') { nextstate = 'book_received' }
    else if (state === 'book_received') { nextstate = 'transfer_doc_submitted' }
    else if (state === 'transfer_doc_submitted') { nextstate = 'transfer_doc_received' }
    else if (state === 'transfer_doc_received') { nextstate = 'account_closing' }
    else if (state === 'account_closing') { nextstate = 'contact_customer' }
    else if (state === 'contact_customer') { nextstate = 'receive' }
    return nextstate;
  }

  function getbeforedate(status) {

    if (singleCase[statusTodate(status)] === null || singleCase[statusTodate(status)] === '') {
      status = caseStatusShiftback(status)
      return getbeforedate(status)
    } else {
      return singleCase[statusTodate(status)]
    }
  }

  function getbeforedateCurrent(status) {
    return singleCase[statusTodate(status)]
  }

  function getbeforestatusCurrent(status) {
    return status
  }

  function calculateProcessDate2(processBefore, processCurrent, status)
  {

      let result = [];
      if (processCurrent === null || processCurrent === ''){
        result.push(<div className="col s2 m4"> </div>);
      }else{
        var date1 = parseStringToDate(processBefore);
      var date2 = parseStringToDate(processCurrent);
      var returndate = Math.floor((date2 - date1) / (24 * 3600 * 1000));
      result.push(
        // <div className=" col s3 m1">
        dateTimeFormatted(processCurrent)
        // </div>
      )
      result.push(
        <div className="col s2 m2">
          ( {returndate} วัน )
      </div>
      )
      }
      return result;
  }
  function calculateProcessDate(processBefore, processCurrent, status) {
    
    let result = [];
    // if ((processCurrent === null || processCurrent === '') && processBefore !== '' && singleCase.status !== status && singleCase.status !== 'account_closing' && status !== 'transfer_doc_received' && status !== 'car_check_up'  && status !== 'book_received' && status !== 'cash_received') {
    //   let t = new Date(getbeforedateCurrent(status));
    //   if (status === 'submit_book_transfer' || status === 'deposit_doc_to_new_bank') {
    //     t.setDate(t.getDate() + 1)
    //   }
    //   processCurrent = t.getDay() + ", " + t.getDate() + " " + monthNotoWord(t.getMonth()) + " " + t.getFullYear();
    //   console.log("processCurrent:" + processCurrent);
    // }
    if ((processCurrent === null || processCurrent === '') && processBefore !== '' && singleCase.status !== status && status === 'transfer_doc_received') {
      result.push(<div className="col s2 m4"> </div>);
    }

    if ((processBefore === null || processBefore === '')) {
      processBefore = getbeforedate(status);
    }


    if (processCurrent == null || processCurrent === '') {

      result.push(<div className="col s2 m4"> </div>);
    } else if (processCurrent != null && (processBefore == null || processBefore === '')) {
      result.push(
        dateTimeFormatted(processCurrent)
      )
      result.push(
        <div className="col s2 m2">
        </div>
      )

    } else {
      var date1 = parseStringToDate(processBefore);
      var date2 = parseStringToDate(processCurrent);
      var returndate = Math.floor((date2 - date1) / (24 * 3600 * 1000));
      result.push(
        // <div className=" col s3 m1">
        dateTimeFormatted(processCurrent)
        // </div>
      )
      result.push(
        <div className="col s2 m2">
          ( {returndate} วัน )
      </div>
      )
    }
    return result
  }

  function monthNotoWord(no) {
    no = no + 1;
    if (no === 13) {
      no = 1;
    }
    if (no === 1) {
      return 'Jan'
    } else if (no === 2) {
      return 'Feb'
    } else if (no === 3) {
      return 'Mar'
    } else if (no === 4) {
      return 'Apr'
    } else if (no === 5) {
      return 'May'
    } else if (no === 6) {
      return 'Jun'
    } else if (no === 7) {
      return 'Jul'
    } else if (no === 8) {
      return 'Aug'
    } else if (no === 9) {
      return 'Sep'
    } else if (no === 10) {
      return 'Oct'
    } else if (no === 11) {
      return 'Nov'
    } else if (no === 12) {
      return 'Dec'
    }

  }


  // function calDate(processBefore,processCurrent){
  //   if (processCurrent == null || processCurrent ==='') {
  //     return 0;
  //   } else if (processCurrent != null && (processBefore == null || processBefore ==='')) {
  //     return 0;
  //   } else {
  //     var date1 = parseStringToDate(processBefore);
  //     var date2 = parseStringToDate(processCurrent);
  //     var returndate = Math.floor((date2 - date1) / (24 * 3600 * 1000));
  //   return returndate;
  // }
  // }




  // function calculateTotalDate(){
  //   let c1c2 = calDate(singleCase.receive_date,singleCase.contact_customer_date_date)
  //   let c2c3 = calDate(singleCase.contact_customer_date,singleCase.account_closing_date)
  //   let c3c4 = calDate(singleCase.account_closing_date,singleCase.transfer_doc_submitted_date)
  //   let c4c5 = calDate(singleCase.transfer_doc_submitted_date,singleCase.transfer_doc_received_date)
  //   let c5c6 = calDate(singleCase.transfer_doc_received_date,singleCase.book_received_date)
  //   let c6c7 = calDate(singleCase.book_received_date,singleCase.submit_book_transfer_date)
  //   let c7c8 = calDate(singleCase.submit_book_transfer_date,singleCase.car_check_up_date)
  //   let c8c9 = calDate(singleCase.car_check_up_date,singleCase.account_closing_date)
  //   let c9c10 = calDate(singleCase.contact_customer_date_date,singleCase.book_transfer_date)
  //   let c10c11 = calDate(singleCase.book_transfer_date,singleCase.book_copy_received_date)
  //   let c11c12 = calDate(singleCase.book_copy_received_date,singleCase.deposit_doc_to_new_bank_date)
  //   let c12c13 = calDate(singleCase.deposit_doc_to_new_bank_date,singleCase.submit_book_deposit_return_date)
  //   let c13c14 = calDate(singleCase.submit_book_deposit_return_date,singleCase.book_received_back_date)
  //   let c14c15 = calDate(singleCase.book_received_back_date,singleCase.cash_received_date)
  //   let c15c16 = calDate(singleCase.cash_received_date,singleCase.book_deposit_received_date)
  //   let c16c17 = calDate(singleCase.book_deposit_received_date,singleCase.submit_book_to_new_finance_date)
  //   return c1c2+c2c3+c3c4+c4c5+c5c6+c6c7+c7c8+c8c9+c9c10+c10c11+c11c12+c12c13+c12c13+c13c14+c14c15+c15c16+c16c17
  //   // }

  // }

  function deposit_doc_to_new_bank_and_book_receive_back(){
    if((singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer') && singleCase.f2_deposit_12 === 0){
      return(<div className="row" >
      <div className="col s3 m1">
        <div className={calculateColorFromDate(singleCase.book_transfer_date, singleCase.book_received_back_date, "book_received_back")}>
          {GenerateNote(singleCase.book_received_back_note, "book_received_back")}
        </div>
      </div>
      <div className="summaryIcon-div col s5 m4">
      <label 
        className={singleCase.book_received_back_date!==null & singleCase.book_received_back_date!==""?"modal-trigger":""} 
        href="#modalProcess" 
        onClick = {() => setCurrentProcess({
          processTracker :singleCase.book_received_back_nickname , 
          processDate:  singleCase.book_received_back_date ,  
          process:"book_received_back" , 
          processThai: "รับเล่มคืน"} )}>วันที่รับเล่มคืน{' '}:</label>

      </div>
      {calculateProcessDate(singleCase.book_transfer_date, singleCase.book_received_back_date, "cash_received")}
      <div className="col s2 m3">
        KPI : <span style={{ color: 'orange' }}>{kpi['book_received_back_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['book_received_back_red']}</span>
      </div>
    </div>)
    }else{
      return(<div className="row">
      <div className="col s3 m1">
        <div className={calculateColorFromDate(singleCase.book_copy_received_date, singleCase.deposit_doc_to_new_bank_date, "deposit_doc_to_new_bank")}>
          {GenerateNote(singleCase.deposit_doc_to_new_bank_note, "deposit_doc_to_new_bank")}
        </div>
      </div>
      <div className="summaryIcon-div col s5 m4">
      <label 
        className={singleCase.deposit_doc_to_new_bank_date!==null & singleCase.deposit_doc_to_new_bank_date!==""?"modal-trigger":""} 
        href="#modalProcess" 
        onClick = {() => setCurrentProcess({
          processTracker :singleCase.deposit_doc_to_new_bank_nickname , 
          processDate:  singleCase.deposit_doc_to_new_bank_date ,  
          process:"deposit_doc_to_new_bank" , 
        processThai: "ส่งเอกสารเบิกเงินธนาคารใหม่"} )}>วันที่ส่งเอกสารเบิกเงินธนาคารใหม่{' '}:</label>
     
      </div>
      {calculateProcessDate(singleCase.book_copy_received_date, singleCase.deposit_doc_to_new_bank_date, "book_copy_received")}
      <div className="col s2 m3">
        KPI : <span style={{ color: 'orange' }}>{kpi['deposit_doc_to_new_bank_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['deposit_doc_to_new_bank_red']}</span>
      </div>
    </div>)
    }
    
  }


  function cash_received_and_book_received_back_date(){
    if((singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer') && singleCase.f2_deposit_12 === 0){
      return(<div className="row">
      <div className="col s3 m1">
        <div className={calculateColorFromDate(singleCase.book_received_back_date, singleCase.deposit_doc_to_new_bank_date, "deposit_doc_to_new_bank")}>
          {GenerateNote(singleCase.deposit_doc_to_new_bank_note, "deposit_doc_to_new_bank")}
        </div>
      </div>
      <div className="summaryIcon-div col s5 m4">
      <label 
        className={singleCase.deposit_doc_to_new_bank_date!==null & singleCase.deposit_doc_to_new_bank_date!==""?"modal-trigger":""} 
        href="#modalProcess" 
        onClick = {() => setCurrentProcess({
          processTracker :singleCase.deposit_doc_to_new_bank_nickname , 
          processDate:  singleCase.deposit_doc_to_new_bank_date ,  
          process:"deposit_doc_to_new_bank" , 
        processThai: "ส่งเอกสารเบิกเงินธนาคารใหม่"} )}>วันที่ส่งเอกสารเบิกเงินธนาคารใหม่{' '}:</label>
     
      </div>
      {calculateProcessDate(singleCase.book_received_back_date, singleCase.deposit_doc_to_new_bank_date, "book_received_back")}
      <div className="col s2 m3">
        KPI : <span style={{ color: 'orange' }}>{kpi['deposit_doc_to_new_bank_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['deposit_doc_to_new_bank_red']}</span>
      </div>
    </div>)
    
    }else{
      return( <div className="row">
      <div className="col s3 m1">
        <div className={calculateColorFromDate(singleCase.deposit_doc_to_new_bank_date, singleCase.cash_received_date, "cash_received")}>
          {GenerateNote(singleCase.cash_received_note, "cash_received")}
        </div>
      </div>
      <div className="summaryIcon-div col s5 m4">
      <label 
        className={singleCase.cash_received_date!==null & singleCase.cash_received_date!==""?"modal-trigger":""} 
        href="#modalProcess" 
        onClick = {() => setCurrentProcess({
          processTracker :singleCase.cash_received_nickname , 
          processDate:  singleCase.cash_received_date ,  
          process:"cash_received" , 
          processThai: "เงินเข้าบัญชีคาร์ทรัส"} )}>วันที่เงินเข้าบัญชีคาร์ทรัส{' '}:</label>
     
      </div>
      {calculateProcessDate(singleCase.deposit_doc_to_new_bank_date, singleCase.cash_received_date, "deposit_doc_to_new_bank")}
      <div className="col s2 m3">
        KPI : <span style={{ color: 'orange' }}>{kpi['cash_received_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['cash_received_red']}</span>
      </div>
    </div>)
    }
  }

  function book_received_back_and_cash_received(){
    if((singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer') && singleCase.f2_deposit_12 === 0){
      return( <div className="row">
      <div className="col s3 m1">
        <div className={calculateColorFromDate(singleCase.deposit_doc_to_new_bank_date, singleCase.cash_received_date, "cash_received")}>
          {GenerateNote(singleCase.cash_received_note, "cash_received")}
        </div>
      </div>
      <div className="summaryIcon-div col s5 m4">
      <label 
        className={singleCase.cash_received_date!==null & singleCase.cash_received_date!==""?"modal-trigger":""} 
        href="#modalProcess" 
        onClick = {() => setCurrentProcess({
          processTracker :singleCase.cash_received_nickname , 
          processDate:  singleCase.cash_received_date ,  
          process:"cash_received" , 
          processThai: "เงินเข้าบัญชีคาร์ทรัส"} )}>วันที่เงินเข้าบัญชีคาร์ทรัส{' '}:</label>
     
      </div>
      {calculateProcessDate(singleCase.deposit_doc_to_new_bank_date, singleCase.cash_received_date, "deposit_doc_to_new_bank")}
      <div className="col s2 m3">
        KPI : <span style={{ color: 'orange' }}>{kpi['cash_received_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['cash_received_red']}</span>
      </div>
    </div>)
    
    }else{
      return(<div className="row" >
      <div className="col s3 m1">
        <div className={calculateColorFromDate(singleCase.cash_received_date, singleCase.book_received_back_date, "book_received_back")}>
          {GenerateNote(singleCase.book_received_back_note, "book_received_back")}
        </div>
      </div>
      <div className="summaryIcon-div col s5 m4">
      <label 
        className={singleCase.book_received_back_date!==null & singleCase.book_received_back_date!==""?"modal-trigger":""} 
        href="#modalProcess" 
        onClick = {() => setCurrentProcess({
          processTracker :singleCase.book_received_back_nickname , 
          processDate:  singleCase.book_received_back_date ,  
          process:"book_received_back" , 
          processThai: "รับเล่มคืน"} )}>วันที่รับเล่มคืน{' '}:</label>

      </div>
      {calculateProcessDate(singleCase.cash_received_date, singleCase.book_received_back_date, "cash_received")}
      <div className="col s2 m3">
        KPI : <span style={{ color: 'orange' }}>{kpi['book_received_back_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['book_received_back_red']}</span>
      </div>
    </div>
      )
    }
  }

  function dateTimeFormatted(sringDate) {
    let result = []

    if (sringDate == null || sringDate === '') {
      result.push(<div className="col s2 m2"> </div>);
    } else {
      var month = sringDate.split(" ")[2];
      var day = sringDate.split(" ")[1];
      var year = sringDate.split(" ")[3];
      result.push(
        <div className="col s2 m2">
          {day} {month} {year}
        </div>
      );
    }
    return result
  }



  function caseSource() {
    let result = [];
    if (singleCase.case_source === 'Kiatnakin') {

      result.push(<div className="col s6 m6  content-radonly">
        <label>CQC team</label>
        <input
          type="text"
          value={singleCase.cqc_team || ""}
          name="cqc_team"
          readOnly
          onChange={handleChange}

        >

        </input>
      </div>);
    } else if (singleCase.case_source === 'Thanachart') {

      result.push(<div className="col s6 m6  content-radonly">
        <label>Contract officer / เจ้าหน้าที่ทำสัญญา </label>
        <input
          type="text"
          value={singleCase.contract_officer || ""}
          readOnly
          name="contract_officer"
          onChange={handleChange}
        />
      </div>);
      result.push(<div className="col s6 m6  content-radonly">
        <label>Hub / สาขา (ธนชาติ) </label>
        <input
          type="text"
          value={singleCase.hub || ""}
          name="hub"
          readOnly
        >
        </input>
      </div>);

    } else if (singleCase.case_source === 'Cartrust') {
      result.push(<div className="col s6 m6  content-radonly">
        <label>Cartust Lead Refer / รับเคสจาก</label>
        <input
          type="text"
          value={singleCase.cartrust_lead_refer || ""}
          name="cartrust_lead_refer"
          readOnly
          onChange={handleChange}
        >
        </input>
      </div>);
    }


    return (result);
  }







  function calculateColorFromDate(processBefore, processCurrent, kpiName) {

    if (processCurrent == null || processCurrent === '') {
      return "summaryIcon-div gray";
    } 
    // else if (processCurrent != null && (processBefore == null || processBefore === '')) {
    //   return "summaryIcon-div green";
    // } 
    else {


      // if ((processCurrent === null || processCurrent === '') && processBefore !== '' && singleCase.status !== kpiName) {
      //   let t = new Date(getbeforedateCurrent(kpiName));
      //   processCurrent = t.getDay() + ", " + t.getDate() + " " + monthNotoWord(t.getMonth()) + " " + t.getFullYear();
      // }
      // if ((processBefore === null || processBefore === '')) {
      //   processBefore = getbeforedate(kpiName);
      // }

      
      var date1 = parseStringToDate(processBefore);
      var date2 = parseStringToDate(processCurrent);
      var Pkpi = Math.floor((date2 - date1) / (24 * 3600 * 1000));
      var red = kpiName + "_red";
      var orange = kpiName + "_orange";
      console.log(kpiName+"pkpi"+ Pkpi);
      
      if (Pkpi >= kpi[orange] + 1 && Pkpi < kpi[red] + 1) {
        return "summaryIcon-div yellow";
      } else if (Pkpi >= kpi[red] + 1) {
        return "summaryIcon-div red";
      } else {
        // console.log("kpi green");
        
        return "summaryIcon-div green";
      }
    }
  }

  function GenerateNote(notes, status) {
    // console.log("inGenerateNote"+ singleCase)
    if (notes) {
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            {notes}
          </div>
        </Popup>
      )
    } else if (status === 'car_check_up' && singleCase.car_check_up_yn === 'no') {
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            ไม่ตรวจสภาพรถ
          </div>
        </Popup>
      )
    } else if ((status === 'submit_book_deposit_return' || status === 'book_deposit_received' ) && singleCase.f2_deposit_12 === 0 && (singleCase.case_source === 'Kiatnakin' || singleCase.case_source === 'Thanachart')) {
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            ไม่มีมัดจำ
          </div>
        </Popup>
      )
    }
    else if ((status === 'submit_book_transfer' || status === 'car_check_up' || status === 'book_transfer' || status === 'book_received_back' || status === 'submit_book_deposit_return' || status ==='book_deposit_received') && singleCase.f2_deposit_12 !== 0 && (singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer')) {
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            มีมัดจำ
          </div>
        </Popup>
      )
    }

    else if (( status === 'submit_book_deposit_return' || status ==='book_deposit_received') && singleCase.f2_deposit_12 === 0 && (singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer')) {
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            ไม่มีมัดจำ
          </div>
        </Popup>
      )
    }

    else if ( status === 'transfer_doc_submitted'  && singleCase.f2_deposit_12 !== 0  && (singleCase.case_source === 'Kiatnakin' || singleCase.case_source === 'Thanachart')) {
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            ไม่มีมัดจำ
          </div>
        </Popup>
      )
    }else if (status === 'transfer_doc_received' && (singleCase.transfer_doc_received_date === '' || singleCase.transfer_doc_received_date === null) && (singleCase.case_source === 'Kiatnakin' ||singleCase.case_source === 'Thanachart') ){
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            ยังไม่ได้กรอกวันรับชุดโอน
          </div>
        </Popup>
      )
    }
    else if ((status === 'transfer_doc_received' || status === 'book_copy_received' || status === 'submit_book_to_new_finance') && (singleCase.transfer_doc_received_date === '' || singleCase.transfer_doc_received_date === null) && (singleCase.case_source === 'Cartrust' ||singleCase.case_source === 'Dealer') ){
      return (
        <Popup
          trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
          position="bottom center"
          closeOnDocumentClick
        >
          <div>
            ไม่มี Process นี้ใน case source {singleCase.case_source}
          </div>
        </Popup>
      )
    }

  
    return <img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />
  }

  function CheckCancel() {
    if (singleCase.process === 'cancel') {
      return (
        <h5 style={{ color: 'red' }}>Canceled</h5>
      )
    }
    return null
  }
  function ButtonCancel() {
    if (singleCase.process === 'cancel' || singleCase.status === 'submit_book_to_new_finance') {
      return null
    } else {
      return (
        <button href="#modalCancel" className="modal-trigger waves-effect btn red left">Cancel Case</button>
      )
    }
  }

  return (
    <div>
      <div id="modalSummary" className="modal modal-fixed-footer modal90height">

        <div className="modal-content modal-content-override">
          <div className="row ">
            <div className="header-title">
              <div className="row col s6 m6 ">
                <h4>Case : {singleCase.case_id}   ( {singleCase.name || ''} ) </h4>
                <CheckCancel />
              </div>


              <div className="col s2 m2 ">
                <a href="#modalImage" className="modal-trigger waves-effect white right"><img src={photo} alt="take_car_picture" className="userImage" style={{ width: '50px' }} /></a>
              </div>
              <div className="col m2 ">
                <h6> {singleCase.F2_status === 'done' ? 'F2 Complete' : 'F2 Incomplete'}</h6>
              </div>
              <div className="col m2 ">
                <div className="new-button-iner">

                  <a className="btn modal-trigger tde" href="#modalAddF2" style={{ margin: '1px' }}><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="firespot" />F2</a>
                  <a className="btn modal-trigger tde" href="#modalAddContract" style={{ margin: '1px', minWidth: '11em' }}><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="firespot" />Contract</a>
                </div>

              </div>

            </div>
          </div>
          {/* process bar */}

          {/* body */}



          <div className="cotent-field row" >
            <div className="row content-radonly col m6 ">
              <div className="col s12 m12  head-section no-col-padding ">
              </div>
              <div className="col s6 m6 l6 content-radonly">
                <label >Case Status / สถานะเคส</label>
                <input
                  name="caseStatus"
                  type="text"
                  value={translate(singleCase.status) || ""}
                  readOnly
                >

                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >JOB No.</label>
                <input
                  type="text"
                  name="jobNum"
                  value={singleCase.job_id || ""}


                  readOnly

                />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >Receive Date/ วันที่รับเคส</label>
                <input
                  type="text"
                  value={dateFormated(singleCase.date_create)}
                  name='dateAddCase'

                  readOnly

                />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >Case Type / ประเภทเคส</label>
                <input
                  name='caseType'
                  value={singleCase.case_type || ""}
                  readOnly
                  className='browser-default'
                >

                </input>
              </div>


              <div className="col s6 m6 l6 content-radonly">
                <label >Case Source / รับเคสจาก</label>
                <input
                  name='receiver'
                  value={singleCase.case_source || ""}

                  type="text"

                  readOnly />
              </div>
              <div className="col s6 m6  content-radonly">
                <label>Document No. / AOL</label>
                <input
                  type="text"
                  value={singleCase.document_id || ""}
                  name="hub"
                  readOnly
                >
                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Case Reciever / ผู้รับเคส </label>
                <input type="text"
                  value={singleCase.case_receiver}
                  name="approve_amount"
                  readOnly />
              </div>


              {caseSource()}

              <div className="col s12 m12  head-section no-col-padding">
                <h5>Case Information</h5>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>First Name - Last Name / ชื่อ - นามสกุล</label>
                <input type="text"
                  value={singleCase.name || ""}
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Licence Plate / หมายเลขป้ายทะเบียน</label>
                <input type="text"
                  value={singleCase.car_license || ""}
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >Province / ป้ายทะเบียนจังหวัด</label>
                <input
                  name='province'
                  value={singleCase.car_province || ""}
                  className='browser-default'
                  readOnly
                >

                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Brand / ยี่ห้อ</label>
                <input type="text"
                  value={singleCase.car_brand || ""}
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Model / รุ่นรถ</label>
                <input type="text"
                  value={singleCase.car_model || ""}
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Sub-model / รุ่นย่อย</label>
                <input type="text"
                  value={singleCase.car_sub_model || ""}
                  name="car_sub_model"
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Car Year / ปีรถ</label>
                <input type="text"
                  value={singleCase.car_year || ""}
                  name="car_year"
                  readOnly
                />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Current Finance / ไฟแนนซ์เดิม</label>
                <input
                  name="oldFinance"
                  value={singleCase.old_bank || ""}
                  className='browser-default'
                  readOnly
                >

                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Finance Institution / สถาบันการเงิน</label>
                <input
                  name="new_bank"
                  value={singleCase.new_bank}
                  className='browser-default'
                  onChange={handleChange}
                >

                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Approved Amount / ยอดจัด </label>
                <CurrencyFormat
                  thousandSeparator={true}
                  value={singleCase.approve_amount}
                  name="approve_amount"
                  suffix=" บาท"
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Close Amount / ยอดปิด </label>
                <CurrencyFormat
                  thousandSeparator={true}
                  value={singleCase.close_amount}
                  name="close_amount"
                  suffix=" บาท"
                  readOnly
                />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Down Payment / ยอดดาวน์</label>
                <CurrencyFormat
                  thousandSeparator={true}
                  value={singleCase.down_amount}
                  name="down_payment"
                  suffix=" บาท"
                  readOnly
                />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Deposit Return / เบิกมัดจำคืน</label>
                <CurrencyFormat
                  thousandSeparator={true}
                  value={singleCase.f2_deposit_12}
                  name="down_payment"
                  suffix=" บาท"
                  readOnly
                />
              </div>




            </div>
            {/* summaryCaseTime */}
            <div className="row content col m6 typetext16px">

              <div className="row">
                <div className="col s12 m12">
                  <h6> ระยะเวลาที่เคสอยู่ในระบบ {summaryCaseTime(singleCase.receive_date, singleCase[statusTodate(singleCase.status)])} วัน </h6>

                </div>
              </div>


              <div className="row">
                <div className="col s3 m1">
                  <div className={singleCase.receive_date != null ? "summaryIcon-div green" : "summaryIcon-div gray"}>
                    {GenerateNote(singleCase.receive_note, "receive")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  <label 
                   className={singleCase.receive_date!==null & singleCase.receive_date!==""?"modal-trigger":""}
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.case_receiver , 
                    processDate:  singleCase.receive_date ,  
                    process:"receive" , 
                    processThai: "รับเคส"} )}>วันที่รับเคส{' '}:</label>
                </div>
                {dateTimeFormatted(singleCase.receive_date)}

              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.receive_date, singleCase.contact_customer_date, "contact_customer")}>
                    {GenerateNote(singleCase.contact_customer_note, "contact_customer")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                   className={singleCase.contact_customer_date!==null & singleCase.contact_customer_date!==""?"modal-trigger":""}
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.contact_customer_nickname , 
                    processDate:  singleCase.contact_customer_date ,  
                    process:"contact_customer" , 
                    processThai: "ติดต่อลูกค้า"} )}>วันที่ติดต่อลูกค้า{' '}:</label>
              
                </div>
                {calculateProcessDate(singleCase.receive_date, singleCase.contact_customer_date, "receive")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['contact_customer_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['contact_customer_red']}</span>
                </div>
                {/* <div className="col s2 m1">
                  asd
                </div> */}
              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.contact_customer_date, singleCase.account_closing_date, "account_closing")}>
                    {GenerateNote(singleCase.account_closing_note, "account_closing")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.account_closing_date!==null & singleCase.account_closing_date!==""?"modal-trigger":""}
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.account_closing_nickname , 
                    processDate:  singleCase.account_closing_date ,  
                    process:"account_closing" , 
                    processThai: "ปิดเล่ม"} )}>วันที่ปิดเล่ม{' '}:</label>
              
                </div>
                {calculateProcessDate(singleCase.contact_customer_date, singleCase.account_closing_date, "contact_customer")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['account_closing_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['account_closing_red']}</span>
                </div>
              </div>

              <div className="row" >
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.contact_customer_date, singleCase.transfer_doc_received_date, "transfer_doc_received")}>
                    {GenerateNote(singleCase.transfer_doc_received_note, "transfer_doc_received")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.transfer_doc_received_date!==null & singleCase.transfer_doc_received_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.transfer_doc_received_nickname , 
                    processDate:  singleCase.transfer_doc_received_date ,  
                    process:"transfer_doc_received" , 
                    processThai: "รับชุดโอน"} )}>วันที่รับชุดโอน{' '}:</label>
                
                </div>
                {calculateProcessDate(singleCase.contact_customer_date, singleCase.transfer_doc_received_date, "transfer_doc_received")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['transfer_doc_received_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['transfer_doc_received_red']}</span>
                </div>
              </div>


              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.account_closing_date, singleCase.transfer_doc_submitted_date, "transfer_doc_submitted")}>
                    {GenerateNote(singleCase.transfer_doc_submitted_note, "transfer_doc_submitted")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.transfer_doc_submitted_date!==null & singleCase.transfer_doc_submitted_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.transfer_doc_submitted_nickname , 
                    processDate:  singleCase.transfer_doc_submitted_date ,  
                    process:"transfer_doc_submitted" , 
                    processThai: "ยื่นชุดโอน"} )}>วันที่ยื่นชุดโอน{' '}:</label>
              
                </div>
                {calculateProcessDate(singleCase.account_closing_date, singleCase.transfer_doc_submitted_date, "transfer_doc_received")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['transfer_doc_submitted_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['transfer_doc_submitted_red']}</span>
                </div>
              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(((singleCase.case_source === 'Kiatnakin' || singleCase.case_source === 'Thanachart' ) && singleCase.f2_deposit_12 !== 0 )?singleCase.account_closing_date:singleCase.transfer_doc_submitted_date, singleCase.book_received_date, "book_received")}>
                    {GenerateNote(singleCase.book_received_note, "book_received")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.book_received_date!==null & singleCase.book_received_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.book_received_nickname , 
                    processDate:  singleCase.book_received_date ,  
                    process:"book_received" , 
                    processThai: "ได้รับเล่ม"} )}>วันที่ได้รับเล่ม{' '}:</label>
            
                </div>
                {calculateProcessDate(((singleCase.case_source === 'Kiatnakin' || singleCase.case_source === 'Thanachart' ) && singleCase.f2_deposit_12 !== 0 )?singleCase.account_closing_date:singleCase.transfer_doc_submitted_date, singleCase.book_received_date, "transfer_doc_submitted")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['book_received_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['book_received_red']}</span>
                </div>


              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.book_received_date, singleCase.submit_book_transfer_date, "submit_book_transfer")}>
                    {GenerateNote(singleCase.submit_book_transfer_note, "submit_book_transfer")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.submit_book_transfer_date!==null & singleCase.submit_book_transfer_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.submit_book_transfer_nickname , 
                    processDate:  singleCase.submit_book_transfer_date ,  
                    process:"submit_book_transfer" , 
                    processThai: "ส่งงานโอนทะเบียน"} )}>วันที่ส่งงานโอนทะเบียน{' '}:</label>
               
                </div>
                {calculateProcessDate(singleCase.book_received_date, singleCase.submit_book_transfer_date, "book_received")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['submit_book_transfer_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['submit_book_transfer_red']}</span>
                </div>
              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.submit_book_transfer_date, (singleCase.car_check_up_yn==='no')?'':singleCase.car_check_up_date, "car_check_up")}>
                    {GenerateNote(singleCase.car_check_up, "car_check_up")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={(singleCase.car_check_up_date!==null & singleCase.car_check_up_date!=="" && singleCase.car_check_up_yn==='yes')?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.car_check_up_nickname , 
                    processDate:  singleCase.car_check_up_date ,  
                    process:"car_check_up" , 
                    processThai: "ตรวจสภาพรถ"} )}>วันที่ตรวจสภาพรถ{' '}:</label>
                
                </div>
                {calculateProcessDate(singleCase.submit_book_transfer_date, (singleCase.car_check_up_yn==='no')?'':singleCase.car_check_up_date, "car_check_up")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['car_check_up_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['car_check_up_red']}</span>
                </div>
              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate((singleCase.car_check_up_yn==='yes')?singleCase.car_check_up_date:singleCase.submit_book_transfer_date, singleCase.book_transfer_date, "book_transfer")}>
                    {GenerateNote(singleCase.book_transfer_note, "book_transfer")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.book_transfer_date!==null & singleCase.book_transfer_date!==""?"modal-trigger":""}
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.book_transfer_nickname , 
                    processDate:  singleCase.book_transfer_date ,  
                    process:"book_transfer" , 
                    processThai: "โอนเล่มทะเบียน"} )}>วันที่โอนเล่มทะเบียน{' '}:</label>
               
                </div>
                {calculateProcessDate((singleCase.car_check_up_yn==='yes')?singleCase.car_check_up_date:singleCase.submit_book_transfer_date, singleCase.book_transfer_date, "car_check_up")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['book_transfer_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['book_transfer_red']}</span>
                </div>
              </div>

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.book_transfer_date, singleCase.book_copy_received_date, "book_copy_received")}>
                    {GenerateNote(singleCase.book_copy_received_note, "book_copy_received")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.book_copy_received_date!==null & singleCase.book_copy_received_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.book_copy_received_nickname , 
                    processDate:  singleCase.book_copy_received_date ,  
                    process:"book_copy_received" , 
                    processThai: "รับสำเนาเล่ม"} )}>วันที่รับสำเนาเล่ม{' '}:</label>
             
                </div>
                {calculateProcessDate(singleCase.book_transfer_date, singleCase.book_copy_received_date, "book_transfer")}
                <div className="col s2 m2">
                  KPI : <span style={{ color: 'orange' }}>{kpi['book_copy_received_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['book_copy_received_red']}</span>
                </div>
              </div>

                   
              {deposit_doc_to_new_bank_and_book_receive_back()}
              {cash_received_and_book_received_back_date()}
              {book_received_back_and_cash_received()}


              


              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.book_received_back_date, singleCase.submit_book_to_new_finance_date, "submit_book_to_new_finance")}>
                    {GenerateNote(singleCase.submit_book_to_new_finance_note, "submit_book_to_new_finance")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.submit_book_to_new_finance_date!==null & singleCase.submit_book_to_new_finance_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.submit_book_to_new_finance_nickname , 
                    processDate:  singleCase.submit_book_to_new_finance_date ,  
                    process:"submit_book_to_new_finance" , 
                    processThai: "ส่งเล่มให้ไฟแนนซ์ใหม่"} )}>วันที่ส่งเล่มให้ไฟแนนซ์ใหม่{' '}:</label>
               
                </div>
                {calculateProcessDate(singleCase.book_received_back_date, singleCase.submit_book_to_new_finance_date, "book_received_back")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['submit_book_to_new_finance_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['submit_book_to_new_finance_red']}</span>
                </div>
              </div>

              
              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(((singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer') && singleCase.f2_deposit_12 !== 0 )?singleCase.cash_received_date:singleCase.submit_book_to_new_finance_date, singleCase.submit_book_deposit_return_date, "submit_book_deposit_return")}>
                    {GenerateNote(singleCase.submit_book_deposit_return_note, "submit_book_deposit_return")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.submit_book_deposit_return_date!==null & singleCase.submit_book_deposit_return_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.submit_book_deposit_return_nickname , 
                    processDate:  singleCase.submit_book_deposit_return_date ,  
                    process:"submit_book_deposit_return" , 
                    processThai: "ทำเรื่องเบิกมัดจำคืน"} )}>วันที่ทำเรื่องเบิกมัดจำคืน{' '}:</label>
             
                </div>
                {calculateProcessDate(((singleCase.case_source === 'Cartrust' || singleCase.case_source === 'Dealer') && singleCase.f2_deposit_12 !== 0 )?singleCase.cash_received_date:singleCase.submit_book_to_new_finance_date, singleCase.submit_book_deposit_return_date, "submit_book_to_new_finance")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['submit_book_deposit_return_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['submit_book_deposit_return_red']}</span>
                </div>
              </div>

             

              

              <div className="row">
                <div className="col s3 m1">
                  <div className={calculateColorFromDate(singleCase.submit_book_deposit_return_date, singleCase.book_deposit_received_date, "book_deposit_received")}>
                    {GenerateNote(singleCase.book_deposit_received_note, "book_deposit_received")}
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                <label 
                  className={singleCase.book_deposit_received_date!==null & singleCase.book_deposit_received_date!==""?"modal-trigger":""} 
                  href="#modalProcess" 
                  onClick = {() => setCurrentProcess({
                    processTracker :singleCase.book_deposit_received_nickname , 
                    processDate:  singleCase.book_deposit_received_date ,  
                    process:"book_deposit_received" , 
                    processThai: "เงินมัดจำคืนเข้าบัญชี"} )}>วันที่เงินมัดจำคืนเข้าบัญชี{' '}:</label>
               
                </div>
                {calculateProcessDate(singleCase.submit_book_deposit_return_date, singleCase.book_deposit_received_date, "submit_book_deposit_return")}
                <div className="col s2 m3">
                  KPI : <span style={{ color: 'orange' }}>{kpi['book_deposit_received_orange']} </span>/ <span style={{ color: 'red' }}>{kpi['book_deposit_received_red']}</span>
                </div>
              </div>

              


            </div>
          </div>
          {/* endbody */}

        </div>

        <div className="modal-footer">
          {/* <button className="waves-effect btn blue lighten left ">Save</button> */}

          <button className="modal-close waves-effect btn white black-text right">close</button>
          <ButtonCancel />

        </div>
      </div>
      <ModalAddF2 singleCase={singleCase} getAllCase={getAllCase} operatorS={operatorS} getOperatorS={getOperatorS} />
      <ModalCancel singleCase={singleCase} />
      <ModalAddContract singleCase={singleCase} />
      <ModalImage singleCase={singleCase} />
      <ModalProcess  currentProcess = {currentProcess} saveProcess={saveProcess} singleCase={singleCase}/>
    </div >


  )
}

export default ModalSummary
