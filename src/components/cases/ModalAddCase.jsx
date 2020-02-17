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
    user_id: userId,
    customer_id: "",
    document_id: "",
    old_bank: "",
    new_bank: "",
    status: "receive",
    note_status: "",
    team: "",
    contract_officer: "",
    finance_staff: "",
    case_type: "  ",
    case_receiver: "",
    case_source: " ",
    job_id: "",
    down_amount: "",
    approve_amount: "",
    close_amount: "",
    case_status: "ติดต่อลูกค้าไม่ได้",

    car_name: "",
    car_brand: "",
    car_model: "",
    car_sub_model: "",
    car_year: "",
    car_license: "",
    car_province: "",
    car_detail: "",
    take_car_picture: "",
    car_license_book_picture: "",
    license_id_picture: "",

    old_finance_closing_fee: "",
    old_finance_transfer_fee: "",
    book_closing_fee: "",
    vat7_fee: "",
    transfer_fee: "",
    duty_fee: "",
    discount_fee: "",
    car_shield_fee: "",
    car_insurance_fee: "",
    transfer_service_fee: "",
    contract_fee: "",
    outside_transfer_fee: "",
    tax_renewal_fee: "",
    act_renewal_fee: "",
    f2_status: null,
    cheque : "",
    cheque_receiver : "",
    deposit_receiver : ""
  })

  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    line: "",
    license_id: "",
    birthday: "",
    home_no: "",
    moo: "",
    soy: "",
    road: "",
    district: "",
    district2: "",
    province: "",
    post_code: ""
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

  const handleChangeCustomer = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value })

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewCase({ ...newCase, file: reader.result });
  }

  const handleChangeB_1 = (e) => setBank({ b1: true, b2: false })
  const handleChangeB_2 = (e) => setBank({ b1: false, b2: true })


  const handleChangeD_1 = (e) => setDifference({ d1: true, d2: false })
  const handleChangeD_2 = (e) => setDifference({ d1: false, d2: true })


  // const handleCustomerChange = (e) => {

  //   setNewCase({
  //     ...newCase, [e.target.name]: e.target.value,
  //     ["firstname"]: customers[e.target.value].firstname,
  //     ["lastname"]: customers[e.target.value].lastname,
  //     ["license_id"]: customers[e.target.value].license_id,
  //     ["tel"]: customers[e.target.value].tel,
  //     ["customer_id"]: customers[e.target.value].customer_id,

  //   });

  // }

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

  function disableNext() {
    var result = [];

    if (formState === 3) {
      result.push(<button className="waves-effect btn blue lighten right " onClick={() => saveNewCase(newCase,customer)}>Save</button>);

    } else {
      result.push(<button className="waves-effect btn blue lighten right " onClick={() => nextpage()}> Next</button>);
    }
    return result ? result : null;
  }


  function saveNewCase() {
    // var data = setNewCase({...newCase,car_license:c})
    // console.log(JSON.stringify(newCase));
    console.log(JSON.stringify(customer));

    console.log('######## add customer #########');
    axios.post(`${url}/add_customer`, customer)
      .then(res => {
        // M.toast({ html: `${res.data.message}` })
        console.log('######## add customer result #########');
        console.log(res.data.customer_id);
        // setNewCase({...newCase , ["customer_id"]:res.data.customer_id})
        var data = ({...newCase,customer_id:res.data.customer_id })
        console.log(JSON.stringify(data))
        axios.post(`${url}/add_case`, data)
          .then(res => {
            // M.toast({ html: `${res.data.message}` })
            console.log('######## add case result #########');
            console.log(res);

            

          })
          .catch(err => { console.log(err) })

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
            value={newCase.cheque || ""}
            name="cheque"
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
      result.push(<div className="col s6 m4 l4 content">
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

          <input
            type="text"
            name="customer_id"
            hidden
            value={newCase.customer_id || ""}
            onChange={handleChange}
            className="validate"

          />

          <div className="col s12 m12  head-section no-col-padding">
            <h5>Customer Information</h5>
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="name">First name</label>
            <input
              type="text"
              name="firstname"
              value={customer.firstname}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="name">Last name</label>
            <input
              type="text"
              name="lastname"
              value={customer.lastname}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Phone">Phone</label>
            <input
              type="tel"
              name="tel"
              value={customer.tel}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="line">Line</label>
            <input
              type="text"
              name="line"
              value={customer.line}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={customer.birthday}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="license_id">เลขที่ใบอนุญาติ</label>
            <input
              type="text"
              name="license_id"
              value={customer.license_id}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="home_no">บ้านเลขที่</label>
            <input
              type="text"
              name="home_no"
              value={customer.home_no}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="moo">หมู่</label>
            <input
              type="text"
              name="moo"
              value={customer.moo}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="soy">ซอย</label>
            <input
              type="text"
              name="soy"
              value={customer.soy}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="road">ถนน</label>
            <input
              type="text"
              name="road"
              value={customer.road}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="district">เขต1</label>
            <input
              type="text"
              name="district"
              value={customer.district}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="district2">เขต2</label>
            <input
              type="text"
              name="district2"
              value={customer.district2}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="province">จังหวัด</label>
            <input
              type="text"
              name="province"
              value={customer.province}
              onChange={handleChangeCustomer}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="post_code">รหัสไปรษณี</label>
            <input
              type="text"
              name="post_code"
              value={customer.post_code}
              onChange={handleChangeCustomer}
            />
          </div>


          <div className="col s12 m12  head-section no-col-padding">
          </div>


          {/* <div className="col s6 m4 l4 content">
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
          </div> */}


          {/* <div className="col s6 m4 l4 content">
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
          </div> */}

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
              value={newCase.receive_date || Date()}
              name='receive_date'
              onChange={handleChange}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label >Case Source / รับเคสจาก</label>
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

          {/* <div className="col s6 m4 l4 content">
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
          </div> */}




          {/* <div className="col s6 m4 l4 content">
            <label>Licence ID / เลขที่ใบอนุญาติ</label>
            <input
              type="text"
              name="license_id"
              value={customer.license_id || ""}
              onChange={handleChangeCustomer}
              className="validate"
            />
          </div> */}



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
            <label>Car Name</label>
            <input
              type="text"
              name="car_name"
              value={newCase.car_name || ""}
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
              name="approve_amount"
              value={newCase.approve_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Close Amount / ยอดเงินเข้าบริษัท </label>
            <input
              type="number"
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
              name="down_amount"
              value={newCase.down_amount || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Picture">รูปรถ</label>
            <input type="file" name="take_car_picture" onChange={handleChangeFile} />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Picture">รูปเล่มทะเบียน</label>
            <input type="file" name="car_license_book_picture" onChange={handleChangeFile} />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Picture">รูปใบขับขี่</label>
            <input type="file" name="license_id_picture" onChange={handleChangeFile} />
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
              value={customer.firstname || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={customer.lastname || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label>Phone Number</label>
            <input
              type="text"
              name="tel"
              value={customer.tel || ""}
              onChange={handleChange}
              className="validate"
            />
          </div>

          <div className="col s12 m12  head-section no-col-padding">
            <h5>Contract Information</h5>
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
              readOnly
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




  return (
    <div>
      <div id="modalAddCase" className="modal modal-fixed-footer">

        {/* <div className="navbar-fixed">
          <nav className="no-padding-left nav-noclor">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo left"><img src={cartrustLogo} alt="cartrust logo" style={{ width: "150px", height: 'auto', marginLeft: '50px' }} /></a>
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
          </nav>
        </div> */}



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
