import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import confirm from '../../img/confirm.png';
import url from '../../Utility/url';
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'
import { isNull } from 'pdfmake/build/pdfmake';
import plus from '../../img/plus-white.png';
import ModalAddF2 from './ModalAddF2';
import ModalAddContractInfo from './ModalAddContractInfo';

const ModalSummary = ({ singleCase , kpi}) => {
  const [newCase, setNewCase] = useState({})

  useEffect(() => {
    
  })

  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
  }

  function parseStringToDate(sringDate) {
    var mountCaracterString = sringDate.split(" ")[2];
    var dayString = sringDate.split(" ")[1];
    var yearString = sringDate.split(" ")[3];
    var month;
    if (mountCaracterString == 'Jan') {
      month = 0;
    }
    else if (mountCaracterString == 'Feb') {
      month = 1;
    }
    else if (mountCaracterString == 'Mar') {
      month = 2;
    }
    else if (mountCaracterString == 'Apr') {
      month = 3;
    }
    else if (mountCaracterString == 'May') {
      month = 4;
    }
    else if (mountCaracterString == 'Jun') {
      month = 5;
    }
    else if (mountCaracterString == 'Jul') {
      month = 6;
    }
    else if (mountCaracterString == 'Aug') {
      month = 7;
    }
    else if (mountCaracterString == 'Sep') {
      month = 8;
    }
    else if (mountCaracterString == 'Oct') {
      month = 9;
    }
    else if (mountCaracterString == 'Nov') {
      month = 10;
    }
    else if (mountCaracterString == 'Dec') {
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

    if (processCurrent == null) {
      
      return null;
    } else if (processCurrent != null && processBefore == null) {
      return dateTimeFormatted(processCurrent);
    } else {
      var date1 = parseStringToDate(processBefore);
      var date2 = parseStringToDate(processCurrent);

      return (dateTimeFormatted(processCurrent) + "(" + Math.floor((date2 - date1) / (24 * 3600 * 1000)) + " วัน )");
    }

  }

  function dateTimeFormatted(sringDate) {
    if (sringDate == null) {
      return null;
    } else {
      var month = sringDate.split(" ")[2];
      var day = sringDate.split(" ")[1];
      var year = sringDate.split(" ")[3];
      return (day + month + year);
    }

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


  return (
    <div>
      <div id="modalSummary" className="modal modal-fixed-footer">

        <div className="navbar-fixed">
          <nav className="no-padding-left nav-noclor">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo left"><img src={cartrustLogo} alt="cartrust logo" style={{ width: "150px", height: 'auto', marginLeft: '50px' }} /></a>
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
          </nav>
        </div>

        <div className="modal-content modal-content-override">
          <div className="row ">
            <div className="header-title">
              <div className="col s8 m8 no-col-padding">
                <h4>Case : {singleCase.case_id}</h4>
              </div>
              <div className="col m2 no-col-padding">
              <h6> {singleCase.F2_status == null?'F2 Complete':'F2 Incomplete'}</h6>
              </div>
              <div className="col m2 ">
              <div className="new-button-iner">

              <a className="btn modal-trigger tde" href="#modalAddF2" ><img  src={plus} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>F2</a>
              </div>
            
            </div>

            </div>
          </div>
          {/* process bar */}

          {/* body */}



          <div className="cotent-field row" >
            <div className="row content-radonly col m8 ">
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
                  
                  className="validate"
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
                <label >Case Source / รับเคสจาก</label>
                <input
                  name='receiver'
                  value={singleCase.case_source || ''}
                  
                  type="text"
                  className="validate"
                  readOnly />
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
                  value={singleCase.car_brand}
                  readOnly />
              </div>

              <div className="col s6 m6 l6 content-radonly">
                <label>Model / รุ่นรถ</label>
                <input type="text"
                  value={singleCase.car_brand}
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
            {/* summaryIcon-div col s3 m3 */}
            <div className="row content col m4">
              <div className="row">
                <div className="col s3 m3">
                  <div className={singleCase.receive_date != null ? "summaryIcon-div green" : "summaryIcon-div gray"}>
                    <img src={confirm} className="summaryIcon" alt="fireSpot" />
                  </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  รับเคส{' '}:{'    '}
                  {dateTimeFormatted(singleCase.receive_date) || ''}
                </div>

              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.receive_date, singleCase.contact_customer_date,"contact_customer")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ติดต่อลูกค้า{' '}:{'    '}
                  {calculateProcessDate(singleCase.receive_date, singleCase.contact_customer_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.contact_customer_date, singleCase.account_closing_date,"account_closing")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ปิดเล่ม{' '}:{'    '}
                  {calculateProcessDate(singleCase.contact_customer_date, singleCase.account_closing_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.account_closing_date, singleCase.transfer_doc_received_date,"transfer_doc_received")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  รับชุดโอน{' '}:{'    '}
                  {calculateProcessDate(singleCase.account_closing_date, singleCase.transfer_doc_received_date) || ''}
                </div>
              </div>


              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.transfer_doc_received_date, singleCase.transfer_doc_submitted_date , "transfer_doc_submitted")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ยื่นชุดโอน{' '}:{'    '}
                  {calculateProcessDate(singleCase.transfer_doc_received_date, singleCase.transfer_doc_submitted_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.transfer_doc_submitted_date, singleCase.book_received_date,"book_received")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ได้รับเล่ม{' '}:{'    '}
                  {calculateProcessDate(singleCase.transfer_doc_submitted_date, singleCase.book_received_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.book_received_date, singleCase.submit_book_transfer_date,"submit_book_transfer")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ส่งงานโอนทะเบียน{' '}:{'    '}
                  {calculateProcessDate(singleCase.book_received_date, singleCase.submit_book_transfer_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.submit_book_transfer_date, singleCase.car_check_up_date,"car_check_up")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ตรวจสภาพรถ{' '}:{'    '}
                  {calculateProcessDate(singleCase.submit_book_transfer_date, singleCase.car_check_up_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.car_check_up_date, singleCase.book_transfer_date,"book_transfer")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  โอนเล่มทะเบียน{' '}:{'    '}
                  {calculateProcessDate(singleCase.car_check_up_date, singleCase.book_transfer_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.book_transfer_date, singleCase.book_copy_received_date,"book_copy_received")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  รับสำเนาเล่ม{' '}:{'    '}
                  {calculateProcessDate(singleCase.book_transfer_date, singleCase.book_copy_received_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.book_copy_received_date, singleCase.deposit_doc_to_new_bank_date,"deposit_doc_to_new_bank")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ส่งเอกสารเบิกเงินธนาคารใหม่{' '}:{'    '}
                  {calculateProcessDate(singleCase.book_copy_received_date, singleCase.deposit_doc_to_new_bank_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.deposit_doc_to_new_bank_date, singleCase.submit_book_deposit_return_date,"submit_book_deposit_return")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ทำเรื่องเบิกมัดจำคืน{' '}:{'    '}
                  {calculateProcessDate(singleCase.deposit_doc_to_new_bank_date, singleCase.submit_book_deposit_return_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.submit_book_deposit_return_date, singleCase.book_received_back_date,"book_received_back")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  รับเล่มคืน{' '}:{'    '}
                  {calculateProcessDate(singleCase.submit_book_deposit_return_date, singleCase.book_received_back_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.book_received_back_date, singleCase.cash_received_date,"cash_received")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  เงินเข้าบัญชีคาร์ทรัส{' '}:{'    '}
                  {calculateProcessDate(singleCase.book_received_back_date, singleCase.cash_received_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.cash_received_date, singleCase.book_deposit_received_date,"book_deposit_received")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  เงินมัดจำคืนเข้าบัญชี{' '}:{'    '}
                  {calculateProcessDate(singleCase.cash_received_date, singleCase.book_deposit_received_date) || ''}
                </div>
              </div>

              <div className="row">
              <div className="col s3 m3">
                <div className={calculateColorFromDate(singleCase.book_deposit_received_date, singleCase.submit_book_to_new_finance_date,"submit_book_to_new_finance")}>
                  <img src={confirm} className="summaryIcon" alt="fireSpot" />
                </div>
                </div>
                <div className="summaryIcon-div col s9 m9">
                  ส่งเล่มให้ไฟแนนซ์ใหม่{' '}:{'    '}
                  {calculateProcessDate(singleCase.book_deposit_received_date, singleCase.submit_book_to_new_finance_date) || ''}
                </div>
              </div>


            </div>
          </div>
          {/* endbody */}

        </div>

        <div className="modal-footer">
          {/* <button className="waves-effect btn blue lighten left ">Save</button> */}
          <button className="modal-close waves-effect btn white black-text right">close</button>
        </div>
      </div>
      <ModalAddF2 singleCase={singleCase} />
      <ModalAddContractInfo singleCase={singleCase} />
    </div >

   
  )
}

export default ModalSummary
