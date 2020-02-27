import React, { useState, useEffect } from 'react'
import ModalAddF2 from './ModalAddF2';
import ModalAddContract from './modalAddContract';
import ModalImage from './ModalImage';
import ModalCancel from './ModalCancel';

import confirm from '../../img/confirm.png';
import plus from '../../img/plus-white.png';
import photo from '../../img/photo.png';

import Popup from 'reactjs-popup'

const ModalSummary = ({ singleCase , kpi , getAllCase}) => {
  
  const [newCase, setNewCase] = useState({})

  useEffect(() => {
    
  })

  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
  }
  
  function summaryCaseTime(reciveD ,caseS){
  
    if(caseS == null){

      return "";
    }else{
      let lessThan = parseStringToDate(caseS)
      var moreThan = parseStringToDate(reciveD);

      return (Math.floor((lessThan - moreThan) / (24 * 3600 * 1000)));
    }
   
  }


  function statusTodate(cStatus){
    return cStatus+'_date';
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

  function dateFormated(date){
    if(date == null){
      return null;
    }else{
      return(date.split(" ")[1] + ' ' + date.split(" ")[2] + ' ' + date.split(" ")[3])
    }
    
  }
  function calculateProcessDate(processBefore, processCurrent) {
    let result = [];
    if (processCurrent == null) {
      
      result.push ( <div className="col s2 m4"> </div>);
    } else if (processCurrent != null && processBefore == null) {
      result.push (
          dateTimeFormatted(processCurrent)
        )
    } else {
      var date1 = parseStringToDate(processBefore);
      var date2 = parseStringToDate(processCurrent);

      result.push(
        // <div className=" col s3 m1">
          dateTimeFormatted(processCurrent)
        // </div>
        )
      result.push(
      <div className="col s2 m2">
        ( {Math.floor((date2 - date1) / (24 * 3600 * 1000))} วัน )
      </div>
      )
    }
    return result
  }

  function dateTimeFormatted(sringDate) {
    let result = []
    
    if (sringDate == null || sringDate === '') {
      result.push (<div className="col s2 m2"> </div>);
    } else {
      var month = sringDate.split(" ")[2];
      var day = sringDate.split(" ")[1];
      var year = sringDate.split(" ")[3];
      result.push (
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
     
      result.push(<div className="col s6 m4 l4 content-radonly">
        <label>CQC team</label>
        <input
          type="text"
          value={singleCase.cqc_team || "DEFAULT"}
          name="cqc_team"
          readOnly
          onChange={handleChange}
          
        >
      
        </input>
      </div>);
    } else if (singleCase.case_source === 'Thanachart') {
  
      result.push(<div className="col s6 m4 l4 content-radonly">
        <label>เจ้าหน้าที่ทำสัญญา
/Contract officer</label>
        <input
          type="text"
          value={singleCase.contract_officer }
          readOnly
          name="contract_officer"
          onChange={handleChange}
        />
      </div>);
      result.push(<div className="col s6 m4 l4 content-radonly">
        <label>สาขา (ธนชาติ) / Hub</label>
        <input
           type="text"
          value={singleCase.hub}
          name="hub"
          readOnly
          
          
        >
      
        </input>
      </div>);
    } else if (singleCase.case_source === 'Cartrust') {
      result.push(<div className="col s6 m4 l4 content-radonly">
        <label>Cartust Lead Refer./รับเคสจาก</label>
        <input
          type="text"
          value={singleCase.cartrust_lead_refer}
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

    if (processCurrent == null) {
      return "summaryIcon-div gray";
    } else if (processCurrent != null && processBefore == null) {
      return "summaryIcon-div green";
    } else {
      var date1 = parseStringToDate(processBefore);
      var date2 = parseStringToDate(processCurrent);
      var Pkpi = Math.floor((date2 - date1) / (24 * 3600 * 1000));
      var red = kpiName + "_red";
      var orange = kpiName + "_orange";
      if (Pkpi >= kpi[orange] && Pkpi < kpi[red]) {
        return "summaryIcon-div yellow";
      } else if (Pkpi >= kpi[red]) {
        return "summaryIcon-div red";
      } else {
        return "summaryIcon-div green";
      }
    }
  }

  function GenerateNote(props){
    // console.log("inGenerateNote"+ singleCase)
    if (props.notes){
      return (
        <Popup
        trigger={<img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />}
        position="bottom center"
        closeOnDocumentClick
        >
          <div>
            {props.notes}
          </div>
          </Popup> 

      )
    }
    return <img src={confirm} className="summaryIcon" alt={singleCase.submit_book_to_new_finance_note} />
  }

  function CheckCancel(){
    if (singleCase.process === 'cancel'){
      return (
            <h5 style={{color:'red'}}>Canceled</h5>
      )
    }
    return null
  }

  return (
    <div>
      <div id="modalSummary" className="modal modal-fixed-footer modal90height">



        <div className="modal-content modal-content-override">
          <div className="row ">
            <div className="header-title">
              <div className="row col s6 m6 ">
                <h4>Case : {singleCase.case_id}   ( {singleCase.name|| ''} ) </h4> 
                 <CheckCancel/>
              </div>

             
              <div className="col s2 m2 ">
              <a href="#modalImage" className="modal-trigger waves-effect white right"><img src={photo} alt="take_car_picture" className="userImage" style={{width:'50px'}}/></a>
              </div>
              <div className="col m2 ">
              <h6> {singleCase.F2_status == null?'F2 Complete':'F2 Incomplete'}</h6>
              </div>
              <div className="col m2 ">
              <div className="new-button-iner">

              <a className="btn modal-trigger tde" href="#modalAddF2" style={{margin:'1px'}}><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="firespot"/>F2</a>
              <a className="btn modal-trigger tde" href="#modalAddContract" style={{margin:'1px', minWidth:'11em'}}><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="firespot"/>Contract</a>
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
                <label >{singleCase.case_status}Case Status / สถานะเคส</label>
                <input
                  name="caseStatus"
                   type="text"
                  value={singleCase.case_status || "DEFAULT"}
                  readOnly
                >
                  
                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >JOB No.</label>
                <input
                  type="text"
                  name="jobNum"
                  value={singleCase.job_id}
                  
                  
                  readOnly

                />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >Receiver Date/ วันที่รับเคส</label>
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
                  value={singleCase.case_type || 'DEFAULT'}
                  readOnly
                  className='browser-default'
                >
                
                </input>
              </div>


              <div className="col s6 m6 l6 content-radonly">
                <label >Case Source / รับเคสจาก</label>
                <input
                  name='receiver'
                  value={singleCase.case_source || ''}
                  
                  type="text"
                  
                  readOnly />
              </div>

              
              {caseSource()}

              <div className="col s12 m12  head-section no-col-padding">
                <h5>Case Information</h5>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>First Name - Last Name</label>
                <input type="text"
                  value={singleCase.name || ''} 
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Licence Plate No. หมายเลขป้ายทะเบียน</label>
                <input type="text"
                  value={singleCase.car_license}
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label >Province / ป้ายทะเบียนจังหวัด</label>
                <input
                  name='province'
                  value={singleCase.car_province || "DEFAULT"}
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
                <label>Current Finance ไฟแนนซ์เดิม</label>
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
                  value={singleCase.new_bank || ""}
                  className='browser-default'
                  onChange={handleChange}
                >
                 
                </input>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Approved Amount / ยอดจัด </label>
                <input type="text"
                value={singleCase.approve_amount || ""}
                name="approve_amount"
                readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Close Amount / ยอดปิด </label>
                <input type="text" 
                value ={singleCase.close_amount || ""}
                name="close_amount" readOnly/>
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Down Payment / ยอดดาวน์</label>
                <input type="text" 
                value ={singleCase.down_amount || ""} 
                name="down_payment" readOnly/>
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
                    <GenerateNote singleCase={singleCase.receive_note} />
                  </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  1.รับเคส{' '}:
                </div>
                  {dateTimeFormatted(singleCase.receive_date)}
                 
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.receive_date, singleCase.contact_customer_date,"contact_customer")}>
                 <GenerateNote notes={singleCase.contact_customer_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  2.ติดต่อลูกค้า{' '}:
                </div>
                {calculateProcessDate(singleCase.receive_date, singleCase.contact_customer_date)}
                <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['contact_customer_orange']} </span>/ <span style={{color:'red'}}>{kpi['contact_customer_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.contact_customer_date, singleCase.account_closing_date,"account_closing")}>
                  <GenerateNote notes={singleCase.account_closing_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  3.ปิดเล่ม{' '}:
                </div>
                {calculateProcessDate(singleCase.contact_customer_date, singleCase.account_closing_date)}
                <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['account_closing_orange']} </span>/ <span style={{color:'red'}}>{kpi['account_closing_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.account_closing_date, singleCase.transfer_doc_received_date,"transfer_doc_received")}>
                  <GenerateNote notes={singleCase.transfer_doc_received_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  4.รับชุดโอน{' '}:
                </div>
                {calculateProcessDate(singleCase.account_closing_date, singleCase.transfer_doc_received_date)}
                <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['transfer_doc_received_orange']} </span>/ <span style={{color:'red'}}>{kpi['transfer_doc_received_red']}</span>
                </div>
              </div>


              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.transfer_doc_received_date, singleCase.transfer_doc_submitted_date , "transfer_doc_submitted")}>
                  <GenerateNote notes={singleCase.transfer_doc_submitted_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  5.ยื่นชุดโอน{' '}:
                </div>
                  {calculateProcessDate(singleCase.transfer_doc_received_date, singleCase.transfer_doc_submitted_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['transfer_doc_submitted_orange']} </span>/ <span style={{color:'red'}}>{kpi['transfer_doc_submitted_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.transfer_doc_submitted_date, singleCase.book_received_date,"book_received")}>
                  <GenerateNote notes={singleCase.book_received_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  6.ได้รับเล่ม{' '}:
                </div>
                  {calculateProcessDate(singleCase.transfer_doc_submitted_date, singleCase.book_received_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['book_received_orange']} </span>/ <span style={{color:'red'}}>{kpi['book_received_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.book_received_date, singleCase.submit_book_transfer_date,"submit_book_transfer")}>
                  <GenerateNote notes={singleCase.submit_book_transfer_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  7.ส่งงานโอนทะเบียน{' '}:
                </div>
                  {calculateProcessDate(singleCase.book_received_date, singleCase.submit_book_transfer_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['submit_book_transfer_orange']} </span>/ <span style={{color:'red'}}>{kpi['submit_book_transfer_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.submit_book_transfer_date, singleCase.car_check_up_date,"car_check_up")}>
                  <GenerateNote notes={singleCase.car_check_up_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  8.ตรวจสภาพรถ{' '}:
                </div>
                  {calculateProcessDate(singleCase.submit_book_transfer_date, singleCase.car_check_up_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['car_check_up_orange']} </span>/ <span style={{color:'red'}}>{kpi['car_check_up_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.car_check_up_date, singleCase.book_transfer_date,"book_transfer")}>
                  <GenerateNote notes={singleCase.book_transfer_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  9.โอนเล่มทะเบียน{' '}:
                </div>
                  {calculateProcessDate(singleCase.car_check_up_date, singleCase.book_transfer_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['book_transfer_orange']} </span>/ <span style={{color:'red'}}>{kpi['book_transfer_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.book_transfer_date, singleCase.book_copy_received_date,"book_copy_received")}>
                  <GenerateNote notes={singleCase.book_copy_received_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  10.รับสำเนาเล่ม{' '}:
                </div>
                  {calculateProcessDate(singleCase.book_transfer_date, singleCase.book_copy_received_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['book_copy_received_orange']} </span>/ <span style={{color:'red'}}>{kpi['book_copy_received_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.book_copy_received_date, singleCase.deposit_doc_to_new_bank_date,"deposit_doc_to_new_bank")}>
                  <GenerateNote notes={singleCase.deposit_doc_to_new_bank_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  11.ส่งเอกสารเบิกเงินธนาคารใหม่{' '}:
                </div>
                  {calculateProcessDate(singleCase.book_copy_received_date, singleCase.deposit_doc_to_new_bank_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['deposit_doc_to_new_bank_orange']} </span>/ <span style={{color:'red'}}>{kpi['deposit_doc_to_new_bank_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.deposit_doc_to_new_bank_date, singleCase.submit_book_deposit_return_date,"submit_book_deposit_return")}>
                  <GenerateNote notes={singleCase.submit_book_deposit_return_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  12.ทำเรื่องเบิกมัดจำคืน{' '}:
                </div>
                  {calculateProcessDate(singleCase.deposit_doc_to_new_bank_date, singleCase.submit_book_deposit_return_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['submit_book_deposit_return_orange']} </span>/ <span style={{color:'red'}}>{kpi['submit_book_deposit_return_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.submit_book_deposit_return_date, singleCase.book_received_back_date,"book_received_back")}>
                  <GenerateNote notes={singleCase.book_received_back_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  13.รับเล่มคืน{' '}:
                </div>
                  {calculateProcessDate(singleCase.submit_book_deposit_return_date, singleCase.book_received_back_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['book_received_back_orange']} </span>/ <span style={{color:'red'}}>{kpi['book_received_back_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.book_received_back_date, singleCase.cash_received_date,"cash_received")}>
                  <GenerateNote notes={singleCase.cash_received_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  14.เงินเข้าบัญชีคาร์ทรัส{' '}:
                </div>
                  {calculateProcessDate(singleCase.book_received_back_date, singleCase.cash_received_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['cash_received_orange']} </span>/ <span style={{color:'red'}}>{kpi['cash_received_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.cash_received_date, singleCase.book_deposit_received_date,"book_deposit_received")}>
                  <GenerateNote notes={singleCase.book_deposit_received_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  15.เงินมัดจำคืนเข้าบัญชี{' '}:
                </div>
                  {calculateProcessDate(singleCase.cash_received_date, singleCase.book_deposit_received_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['book_deposit_received_orange']} </span>/ <span style={{color:'red'}}>{kpi['book_deposit_received_red']}</span>
                </div>
              </div>

              <div className="row">
              <div className="col s3 m1">
                <div className={calculateColorFromDate(singleCase.book_deposit_received_date, singleCase.submit_book_to_new_finance_date,"submit_book_to_new_finance")}>
                  <GenerateNote notes={singleCase.submit_book_to_new_finance_note} />
                </div>
                </div>
                <div className="summaryIcon-div col s5 m4">
                  16.ส่งเล่มให้ไฟแนนซ์ใหม่{' '}:
                </div>
                  {calculateProcessDate(singleCase.book_deposit_received_date, singleCase.submit_book_to_new_finance_date)}
                  <div className="col s2 m2">
                    KPI : <span style={{color:'orange'}}>{kpi['submit_book_to_new_finance_orange']} </span>/ <span style={{color:'red'}}>{kpi['submit_book_to_new_finance_red']}</span>
                </div>
              </div>


            </div>
          </div>
          {/* endbody */}

        </div>

        <div className="modal-footer">
          {/* <button className="waves-effect btn blue lighten left ">Save</button> */}
          
          <button className="modal-close waves-effect btn white black-text right">close</button>
          <button href="#modalCancel" className="modal-trigger waves-effect btn red left">Cancel Case</button>
          
        </div>
      </div>
      <ModalAddF2 singleCase={singleCase} getAllCase={getAllCase} />
      <ModalCancel singleCase={singleCase} />
      <ModalAddContract singleCase={singleCase} />
      <ModalImage singleCase={singleCase}/>
    </div >

   
  )
}

export default ModalSummary
