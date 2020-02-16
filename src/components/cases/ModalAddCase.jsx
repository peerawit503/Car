import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import url from '../../Utility/url'
import axios from 'axios';
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddCase = ({ customers }) => {

  var userId = 'UserID';
  const [newCase, setNewCase] = useState({
    user_id : userId,
    customer_id : "",
    document_id : "",
    old_bank : "",
    new_bank : "",
    status : "receive",
    note_status : "",
    team : "",
    contract_officer : "",
    finance_staff : "",
    case_type : "  ",
    case_receiver : "",
    case_source : " ",
    job_id : "",
    down_amount : "",
    approve_amount : "",
    close_amount : "",
    case_status : "",
    
    car_name : "",
    car_brand : "",
    car_model : "",
    car_sub_model : "",
    car_year : "",
    car_license : "",
    car_province : "",
    car_detail : "",
    
    old_finance_closing_fee : "0",
    old_finance_transfer_fee : "0",
    book_closing_fee : "0",
    vat7_fee : "0",
    transfer_fee : "0",
    duty_fee : "0",
    discount_fee : "0",
    car_shield_fee : "0",
    car_insurance_fee : "0",
    transfer_service_fee : "0",
    contract_fee : "0",
    outside_transfer_fee : "0",
    tax_renewal_fee : "0",
    act_renewal_fee : "0",
    f2_status : null
  })
  const [formState, setformState] = useState(1)

  const [bank, setBank] = useState({ b1: true, b2: false })
  const [difference, setDifference] = useState({ d1: true, d2: false })
  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
    setNewCase({ ...newCase, [e.target.name]: e.target.value })

  }
  useEffect(() => {

  })

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  
  const handleChangeB_1 = (e) => setBank({ b1: true, b2: false })
  const handleChangeB_2 = (e) => setBank({ b1: false, b2: true })


  const handleChangeD_1 = (e) => setDifference({ d1: true, d2: false })
  const handleChangeD_2 = (e) => setDifference({ d1: false, d2: true })


  const handleCustomerChange = (e) => {

    setNewCase({
      ...newCase, [e.target.name]: e.target.value,
      ["firstname"]: customers[e.target.value].firstname,
      ["lastname"]: customers[e.target.value].lastname,
      ["license_id"]: customers[e.target.value].license_id,
      ["tel"]: customers[e.target.value].tel,
      ["customer_id"]: customers[e.target.value].customer_id,
      
    });

  }

  const nextpage = () => {
    console.log(newCase);
    if (formState === 1) {
      setformState(2);
    } else if (formState === 2) {
      setformState(3);
    }

  }

  const close = () => {
    setformState(1);
    setNewCase({})
  }
  const backpage = () => {
    console.log(newCase);
    if (formState === 2) {
      setformState(1);
    } else if (formState === 3) {
      setformState(2);
    }
  }
  
  function payment() {
    var result = [];
    if (difference.d1) {
      result.push(
        <div className="col s6 m4 l4 content">
          <label >จ่ายเป็นเช็ค </label>
          <input
            type="number"
            min="0"
            step="any"
            value={newCase.cheque_receiver || ""}
            name="cheque_receiver"
            onChange={handleChange}
          />
        </div>
 
      );
      result.push(<div className="col s6 m4 l4 content">
      <label >จ่ายมัดจำ </label>
      <input
        type="number"
        min="0"
        step="any"
        value={newCase.deposit || ""}
        name="deposit"
        onChange={handleChange}
      />
    </div>

   );
      result.push( <div className="col s6 m4 l4 content">
      <label >ชื่อผู้รับเช็ค </label>
      <input
        type="text"
        value={newCase.cheque_receiver || ""}
        name="cheque_receiver"
        onChange={handleChange}
      />
    </div>

    );
      result.push(<div className="col s6 m4 l4 content">
      <label >ชื่อผู้รับเงินมัดจำ </label>
      <input
        type="text"
        min="0"
        step="any"
        
        value={newCase.deposit_receiver || ""}
        name="deposit_receiver"
        onChange={handleChange}
      />
    </div>);
      
    }
    return result;
  }

  function formRender() {
    var form = [];
    if (formState === 1) {
      form.push(<div className="cotent-field">
        <div className="row content">
          <div className="col s12 m12  head-section no-col-padding">
          </div>


          
            <input
              type="text"
              name="customer_id"
              hidden
              value={newCase.customer_id || ""}
              onChange={handleChange}
              className="validate"

            />
          


          <div className="col s6 m4 l4 content">
            <label >Customer</label>
            <select
              name="customer"
              className="browser-default"
              value={newCase.customer || "DEFAULT"}
              onChange={handleCustomerChange}
            >
              <option value="DEFAULT" disabled>Customer</option>
              {customers.map((c, i) => <option key={i} value={i}>{c.firstname}</option>)}
            </select>
          </div>


          <div className="col s6 m4 l4 content">
            <label >Case Status / สถานะเคส</label>
            <select
              name="case_status"
              className="browser-default"
              value={newCase.case_status || "DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกสถานะเคส </option>
              {caseStatus.map((c) => <option key={uuid.v4()} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="col s6 m4 l4 content">
            <label >JOB No.</label>
            <input
              type="text"
              name="job_id"
              value={newCase.job_id || ""}
              onChange={handleChange}
              className="validate"

            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Document ID</label>
            <input
              type="text"
              name="document_id"
              value={newCase.document_id || ""}
              onChange={handleChange}
              className="validate"

            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Receiver Date/ วันที่รับเคส</label>
            <input
              type="date"
              value={newCase.receive_date || ""}
              name='receive_date'
              onChange={handleChange}

            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Case Receiver/ ผู้ลงข้อมูล</label>
            <select
              name='case_receiver'
              value={newCase.case_receiver || 'DEFAULT'}
              onChange={handleChange}
              type="text"
              className="browser-default" >
              <option value="DEFAULT" disabled>เลือกผู้ลงข้อมูล </option>
              {caseSourceAll.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}
            </select>

          </div>

          <div className="col s6 m4 l4 content">
            <label >Case Type / ประเภทเคส</label>
            <select
              name='case_type'
              value={newCase.case_type || 'DEFAULT'}
              onChange={handleChange}
              className='browser-default'
            >
              <option value="DEFAULT" disabled>เลือกประเภทเคส </option>
              {caseTypeAll.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}
            </select>
          </div>

          <div className="col s12 m12  head-section no-col-padding">
            <h5>Case Information</h5>
          </div>

          <div className="col s6 m4 l4 content">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={newCase.firstname || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={newCase.lastname || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Phone Number</label>
            <input
              type="text"
              name="tel"
              value={newCase.tel || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>



          <div className="col s12 m12  head-section no-col-padding">
          </div>
        
          <div className="col s6 m4 l4 content">
            <label>Licence ID / เลขที่ใบอนุญาติ</label>
            <input
              type="text"
              name="license_id"
              value={newCase.license_id || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          

          <div className="col s6 m4 l4 content">
            <label>Licence Plate No. หมายเลขป้ายทะเบียน</label>
            <input
              type="text"
              name="car_license"
              value={newCase.car_license || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Province / ป้ายทะเบียนจังหวัด</label>
            <select
              name='car_province'
              value={newCase.car_province || "DEFAULT"}
              className='browser-default'
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกป้ายทะเบียนจังหวัด </option>
              {provinceAll.map((pv) => <option key={uuid.v4()} value={pv}>{pv}</option>)}
            </select>
          </div>
          

         

          <div className="col s6 m4 l4 content">
            <label>Bran / ยี่ห้อ</label>
            <input
              type="text"
              name="car_brand"
              value={newCase.car_brand || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Model / รุ่นรถ</label>
            <input
              type="text"
              name="car_model"
              value={newCase.car_model || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Sub-model / รุ่นย่อย</label>
            <input
              type="text"
              name="car_sub_model"
              value={newCase.car_sub_model || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>
         
          <div className="col s6 m4 l4 content">
            <label>Car Year / ปีรถ</label>
            <input
              type="text"
              name="car_year"
              value={newCase.car_year || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Current Finance ไฟแนนซ์เดิม</label>
            <select
              name="old_bank"
              value={newCase.old_bank || "DEFAULT"}
              className='browser-default'
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกไฟแนนซ์เดิม </option>
              {financeInstitution.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}

            </select>
          </div>

          <div className="col s6 m4 l4 content">
            <label>Finance Institution / สถาบันการเงิน</label>
            <select
              name="new_bank"
              value={newCase.new_bank || "DEFAULT"}
              className='browser-default'
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกสถาบันการเงิน </option>
              {financeInstitution.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}
            </select>
          </div>
          

          <div className="col s6 m4 l4 content">
            <label>Approved Amount / ยอดจัด </label>
            <input
              type="text"
              name="approve_amount"
              value={newCase.approve_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Close Amount / ยอดเงินเข้าบริษัท </label>
            <input
              type="text"
              name="close_amount"
              value={newCase.close_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Down Payment / ยอดดาวน์</label>
            <input
              type="text"
              name="down_amount"
              value={newCase.down_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>





        </div>
      </div>);
    } else if (formState === 2) {
      // form F2
      form.push(<div className="cotent-field">
        <div className="row content">



          <div className="row col s12 m12">
            <div className="row col s6 m6 ">
              <h5>Bank Form</h5>
              <span className=" col s12 m12">
                <label>
                  <input
                    type="checkbox"
                    name="form1"
                    checked={bank.b1}
                    onChange={handleChangeB_1}
                  /><span>Tanachart Bank form</span>
                </label>
              </span>
              <span className=" col s12 m12">
                <label>
                  <input
                    type="checkbox"
                    name="form2"
                    checked={bank.b2}
                    onChange={handleChangeB_2}
                  /><span>KK bank form</span>
                </label>
              </span>
            </div>

            <div className="row col s6 m6 ">
              <h5>ส่วนต่าง</h5>
              <span className=" col s12 m12">
                <label>
                  <input
                    type="checkbox"
                    name="difference_y"
                    checked={difference.d1}
                    onChange={handleChangeD_1}
                  /><span>รับส่วนต่าง</span>
                </label>
              </span>
              <span className=" col s12 m12">
                <label>
                  <input
                    type="checkbox"
                    name="difference_n"
                    checked={difference.d2}
                    onChange={handleChangeD_2}
                  /><span>ไม่รับส่วนต่าง</span>
                </label>
              </span>
            </div>

          </div>
          <div className="col s12 m12  head-section no-col-padding">
            <h5>ค่าใช้จ่าย cartrust</h5>
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าปิดไฟแนนซ์เก่า</label>
            <input

              type="number"
              min="0"
              step="any"
              name="old_finance_closing_fee"
              value={newCase.old_finance_closing_fee || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่่าโอนไฟแนนซ์เก่า</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.old_finance_transfer_fee || ""}
              name="old_finance_transfer_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าบริการปิดเล่ม</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.book_closing_fee || ""}
              name="book_closing_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ภาษีมูลค่าเพิ่ม 7%</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.vat7_fee || ""}
              name="vat7_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ส่วนลดพิเศษ</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.discount_fee || ""}
              name="discount_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >รวมค่าใช้จ่ายคาร์ทรัส</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.cartrust_total_cost || ""}
              name="cartrust_total_cost"
              onChange={handleChange}
            />
          </div>

          <div className="col s12 m12  head-section no-col-padding">
            <h5>ค่าใช้จ่าย ไฟแนนซ์ใหม่</h5>
          </div>

          <div className="col s6 m4 l4 content">
            <label >car shield</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.car_shield_fee || ""}
              name="car_shield_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าประกันภัยรถยนต์</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.car_insurance_fee || ""}
              name="car_insurance_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าบริการจัดชุดโอน</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.transfer_service_fee || ""}
              name="transfer_service_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าทำสัญญา</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.contract_fee || ""}
              name="contract_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าโอนนอก</label>
            <input
             
              type="number"
              min="0"
              step="any"
              value={newCase.outside_transfer_fee || ""}
              name="outside_transfer_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าต่อภาษี</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.tax_renewal_fee || ""}
              name="tax_renewal_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >ค่าต่่อพรบ</label>
            <input
              type="number"
              min="0"
              step="any"
              value={newCase.act_renewal_fee || ""}
              name="act_renewal_fee"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >รวมค่าใช้จ่ายไฟแนนซ์ใหม่ </label>
            <input
              type="number"
              min="0"
              step="any"
              disabled
              value={newCase.new_finance_total_cost || ""}
              name="new_finance_total_cost"
              onChange={handleChange}
            />
          </div>


          <div className="col s12 m12  head-section no-col-padding">
            <h5>Customer payment summary</h5>
          </div>

          <div className="col s6 m4 l4 content">
            <label >รวมค่าใช้จ่ายทั้งหมด </label>
            <input
              type="number"
              min="0"
              step="any"
              disabled
              value={newCase.total_cost || ""}
              name="total_cost"
              
            />
          </div>


          <div className="col s6 m4 l4 content">
            <label >ยอดเงินที่จะได้รับ </label>
            <input
              type="number"
              min="0"
              step="any"
             
              value={newCase.amount_received || ""}
              name="amount_received"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >จ่ายเป็นเงินสดให้ธนาคาร </label>
            <input
              type="number"
              min="0"
              step="any"
              
              value={newCase.old_finance_total_cost || ""}
              name="old_finance_total_cost"
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >โอนเงินเข้าธนาคาร </label>
            <input
              type="number"
              min="0"
              step="any"
             
              value={newCase.bank_transfer || ""}
              name="bank_transfer"
              onChange={handleChange}
            />
          </div>


          {payment()}

        </div>
      </div>);
    } else if (formState === 3) {
      form.push(<div className="cotent-field">
        <div className="row content">
          <div className="col s12 m12  head-section no-col-padding">
          </div>
          <div className="col s6 m4 l4 content">
            <label >Case Status / สถานะเคส</label>
            <select
              name="case_status"
              className="browser-default"
              value={newCase.case_status || "DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกสถานะเคส </option>
              {caseStatus.map((c) => <option key={uuid.v4()} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="col s6 m4 l4 content">
            <label >JOB No.</label>
            <input
              type="text"
              name="job_id"
              value={newCase.job_id || ""}
              onChange={handleChange}
              className="validate"

            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Receiver Date/ วันที่รับเคส</label>
            <input
              type="date"
              name='receive_date'
              value={newCase.receive_date || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Case Receiver/ ผู้ลงข้อมูล</label>
            <input
              name='case_receiver'
              value={newCase.case_receiver || ''}
              onChange={handleChange}
              type="text"
              className="validate" />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Case Type / ประเภทเคส</label>
            <select
              name='case_type'
              value={newCase.case_type || 'DEFAULT'}
              onChange={handleChange}
              className='browser-default'
            >
              <option value="DEFAULT" disabled>เลือกประเภทเคส </option>
              {caseTypeAll.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}
            </select>
          </div>


          <div className="col s12 m12  head-section no-col-padding">
            <h5>Case Information</h5>
          </div>

          <div className="col s6 m4 l4 content">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={newCase.firstname || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={newCase.lastname || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Phone Number</label>
            <input
              type="text"
              name="tel"
              value={newCase.tel || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s12 m12  head-section no-col-padding">
            <h5>Contract Information</h5>
          </div>


        
        
          <div className="col s6 m4 l4 content">
            <label>Licence ID / เลขที่ใบอนุญาติ</label>
            <input
              type="text"
              name="license_id"
              value={newCase.license_id || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>


          <div className="col s6 m4 l4 content">
            <label>Licence Plate No. หมายเลขป้ายทะเบียน</label>
            <input
              type="text"
              name="car_license"
              value={newCase.car_license || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Province / ป้ายทะเบียนจังหวัด</label>
            <select
              name='car_province'
              value={newCase.car_province || "DEFAULT"}
              className='browser-default'
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกป้ายทะเบียนจังหวัด </option>
              {provinceAll.map((pv) => <option key={uuid.v4()} value={pv}>{pv}</option>)}
            </select>
         
          </div>
         


          <div className="col s6 m4 l4 content">
            <label>Bran / ยี่ห้อ</label>
            <input
              type="text"
              name="car_brand"
              value={newCase.car_brand || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Model / รุ่นรถ</label>
            <input
              type="text"
              name="car_model"
              value={newCase.car_model || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Sub-model / รุ่นย่อย</label>
            <input
              type="text"
              name="car_sub_model"
              value={newCase.car_sub_model || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>
          
          <div className="col s6 m4 l4 content">
            <label>Car Year / ปีรถ</label>
            <input
              type="text"
              name="car_year"
              value={newCase.car_year || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>
          

          <div className="col s6 m4 l4 content">
            <label>Current Finance ไฟแนนซ์เดิม</label>
            <select
              name="old_bank"
              value={newCase.old_bank || "DEFAULT"}
              className='browser-default'
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกไฟแนนซ์เดิม </option>
              {financeInstitution.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}

            </select>
          </div>

          <div className="col s6 m4 l4 content">
            <label>Finance Institution / สถาบันการเงิน</label>
            <select
              name="new_bank"
              value={newCase.new_bank || "DEFAULT"}
              className='browser-default'
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>เลือกสถาบันการเงิน </option>
              {financeInstitution.map((ct) => <option key={uuid.v4()} value={ct}>{ct}</option>)}
            </select>
          </div>

          <div className="col s6 m4 l4 content">
            <label>Approved Amount / ยอดจัด </label>
            <input
              type="number"
              min="0"
              name="approve_amount"
              value={newCase.approve_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Close Amount / ยอดปิด </label>
            <input
              type="number"
              min="0"
              name="close_amount"
              value={newCase.close_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Down Payment / ยอดดาวน์</label>
            <input
              type="number"
              min="0"
              name="down_amount"
              value={newCase.down_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>


          <div className="col s6 m4 l4 content">
            <label>Old Bank </label>
            <input
              type="text"
              name="old_bank"
              value={newCase.old_bank || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>


          <div className="col s6 m4 l4 content">
            <label>new bank</label>
            <input
              type="text"
              name="new_bank"
              value={newCase.new_bank || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>


          <div className="col s6 m4 l4 content">
            <label>ภาระหนี้</label>
            <input
              type="text"
              name="debt"
              value={newCase.old_finance_total_cost || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>กู้ยืม</label>
            <input
              type="text"
              name="total_cost"
              value={newCase.total_cost || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>ชำระให้ผู้กู้ยืม</label>
            <input
              type="text"
              name="amount_received"
              value={newCase.amount_received || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>


        </div>
      </div>
      );
    }
    return form;
  }

  function disableNext() {
    var result = [];

    if (formState === 3) {
      result.push(<button className="waves-effect btn blue lighten right " onClick={() => saveNewCase()}>Save</button>);

    } else {
      result.push(<button className="waves-effect btn blue lighten right " onClick={() => nextpage()}> Next</button>);
    }
    return result ? result : null;
  }


  function saveNewCase (){
    console.log(JSON.stringify(newCase));

    axios.post(`${url}/add_case`, newCase)
      .then(res => {
        // M.toast({ html: `${res.data.message}` })
        console.log(res.data.message);
        
      })
      .catch(err => { console.log(err) })

  }
  function disableBack() {
    var result = [];

    if (formState === 1) {
      result.push(<button className="waves-effect btn blue lighten right " disabled onClick={() => backpage()}> Back</button>);

    } else {
      result.push(<button className="waves-effect btn blue lighten right " onClick={() => backpage()}> Back</button>);
    }
    return result ? result : null;
  }

  
  return (
    <div>
      <div id="modalAddCase" className="modal modal-fixed-footer">

        <div className="navbar-fixed">
          <nav className="no-padding-left nav-noclor">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo left"><img src={cartrustLogo} alt="cartrust logo" style={{ width: "150px", height: 'auto', marginLeft: '50px' }} /></a>
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
          </nav>
        </div>

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
                <h4>Add New Case</h4>
              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}

          {formRender()}
          {/* endbody */}

        </div>

        <div className="modal-footer">

          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >close</button>
          {/* <button className="waves-effect btn orange black-text right " onClick={ resetForm } style={ { marginRight: '10px' ,marginLeft: '10px' } }>reset</button> */}
          {disableNext()}
          {disableBack()}
        </div>
      </div>

    </div >
  )
}

export default ModalAddCase
