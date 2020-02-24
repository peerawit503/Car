import React, { useState, useEffect } from "react";
import {
  financeInstitution,
  caseSourceAll,
  caseTypeAll,
  caseStatus,
  provinceAll
} from "../../Utility/dataCase";
import uuid from "uuid";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import ActionUser from "../../actions/actionUser";
import M from 'materialize-css/dist/js/materialize.min.js'
import url from "../../Utility/url";
import axios from "axios";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
/* img */
// import cartrustLogo from "../../img/cartrustLogo.svg";

const ModalAddCase = ({ saveNewCase,getAllCase }) => {
  
  const [operatorS, setOperatorS] = useState([])
  const [margin_account, setMargin_account] = useState([])
  const [cqc_team, setCqc_team] = useState([])
  const [hub, setHub] = useState([])
  const [cartrust_lead, setCartrust_lead] = useState([])
  const [newCase, setNewCase] = useState({
    
    customer_id: "",
    // document_id: "",
    old_bank: "",
    new_bank: "",
    status: "receive",
    note_status: "",
    team: "",
    contract_officer: "",
    finance_staff: "",
    case_type: "  ",
    case_receiver: "",
    case_source: "",
    // job_id: "",
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
    cartrust_lead_refer: "",
    cqc_team: "",
    cartrust_lead_refer: "",
    hub: "",
    margin_account_no:"",
    old_finance_closing_fee: "0",
    old_finance_transfer_fee: "0",
    book_closing_fee: "0",
    vat7_fee: "0",
    transfer_fee: "0",
    duty_fee: "0",
    discount_fee: "0",
    car_shield_fee: "0",
    car_insurance_fee: "0",
    transfer_service_fee: "0",
    contract_fee: "0",
    outside_transfer_fee: "0",
    tax_renewal_fee: "0",
    act_renewal_fee: "0",
    difference:"",

    old_finance_closing_fee_note: "0",
    old_finance_transfer_fee_note: "0",
    book_closing_fee_note: "0",
    vat7_fee_note: "0",
    transfer_fee_note: "0",
    duty_fee_note: "0",
    discount_fee_note: "0",
    car_shield_fee_note: "0",
    car_insurance_fee_note: "0",
    transfer_service_fee_note: "0",
    contract_fee_note: "0",
    outside_transfer_fee_note: "0",
    tax_renewal_fee_note: "0",
    act_renewal_fee_note: "0",
    car_check_con: "",
    doc_storage_con: "",


    margin_account: "",

    f2_status: null,
    cheque: "0",
    deposit: "0",
    cheque_receiver: "",
    deposit_receiver: "",

  });

  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    tel2: "",
    email: "",
    line: "",
    license_id:"",
    birthday: Date(),
    home_no: "",
    moo: "",
    soy: "",
    road: "",
    district: "",
    district2: "",
    province: "",
    post_code: "",
    hub: "",

  });

  const [formState, setformState] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [bank, setBank] = useState({ b1: true, b2: false });
  const [difference, setDifference] = useState({ d1: true, d2: false });
  const handleChangeF = e => {
    console.log(e.target.name, ":", e.target.value);
    setNewCase({ ...newCase, [e.target.name]: parseInt(e.target.value) });
  };

  const handleChange = e => {
    console.log(e.target.name, ":", e.target.value);
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getOperatorS()
    getMargin_account()
    getCqc_team()
    getHub()
    getCartrust_lead()
    console.log('###############################')
    // console.log('User',props)
    M.Modal.init(document.querySelectorAll('.modal'), {});
  }, []);


  const handleChangeCustomer = e =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const getOperatorS = () => {

    axios.get(`${url}/dropdown?table=finance_staff`)
      .then(res => {
        setOperatorS(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const getMargin_account = () => {

    axios.get(`${url}/dropdown?table=margin_account`)
      .then(res => {
        setMargin_account(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const getCqc_team = () => {

    axios.get(`${url}/dropdown?table=cqc_team`)
      .then(res => {
        setCqc_team(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const getHub = () => {

    axios.get(`${url}/dropdown?table=hub`)
      .then(res => {
        setHub(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const getCartrust_lead = () => {

    axios.get(`${url}/dropdown?table=cartrust_lead`)
      .then(res => {
        setCartrust_lead(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const handleChangeFile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewCase({ ...newCase, file: reader.result });
  };

  function operaterOption() {
    let result = []
    
    for (let oper of operatorS) {
     
      result.push(<option value={oper.fs_name}>
        {oper.fs_name}
      </option>)
    }
    return result;
  }

  function margin_accountOption() {
    let result = []

    for (let mar of margin_account) {

      result.push(<option value={mar.ma_name}>
        {mar.ma_name}
      </option>)
    }
    return result;
  }

  function cqc_teamOption() {
    let result = []

    for (let cqc of cqc_team) {

      result.push(<option value={cqc.cqc_name}>
        {cqc.cqc_name}
      </option>)
    }
    return result;
  }

  function hubOption() {
    let result = []

    for (let hu of hub) {

      result.push(<option value={hu.hub_name}>
        {hu.hub_name}
      </option>)
    }
    return result;
  }

  function cartrust_leadOption() {
    let result = []

    for (let cartrust_l of cartrust_lead) {

      result.push(<option value={cartrust_l.cl_name}>
        {cartrust_l.cl_name}
      </option>)
    }
    return result;
  }

  const handleChangeB_1 = e => setBank({ b1: true, b2: false });
  const handleChangeB_2 = e => setBank({ b1: false, b2: true });

  const handleChangeD_1 = e => setDifference({ d1: true, d2: false });
  const handleChangeD_2 = e => setDifference({ d1: false, d2: true });


 
  // const nextpage = () => {
  //   console.log(newCase);
  //   if (formState === 1) {
  //     setformState(2);
  //   } else if (formState === 2) {
  //     setformState(3);
  //   }
  // };

  const close = () => {
    setformState(1);
    setNewCase({});
  };
  const backpage = () => {
    console.log(newCase);
    if (formState === 2) {
      setformState(1);
    } else if (formState === 3) {
      setformState(2);
    }
  };

  const deletezero = e => {
    if (e.target.value == 0) {
      e.target.value = "";
    }
  };

  const addzero = e => {
    if (e.target.value === "") {
      e.target.value = "0";
    }
  };

  function caseInf() {
    setformState(1);
  }

  function F2() {
    setformState(2);
  }


  function contract() {
    setformState(3);
  }

  // function setData(){

  //   var data = {
  //     ...newCase,
  //     difference:difference.d1,
  //     case_receiver:props.user.firstName+' '+props.user.lastName,
  //     user_id:props.user.id,
  //   };
  //   return data;
  // }
  // function saveNewCase  ()  {

  //   let customerData = ({ ...customer })

  //   console.log("######## add customer #########");
  //   console.log(JSON.stringify(customerData))
  //   axios
  //     .post(`${url}/add_customer`, customerData)
  //     .then(res => {
  //       // M.toast({ html: `${res.data.message}` })
  //       console.log("######## add customer result #########");
  //       console.log(res.data.customer_id);
        
  //       var data = {
  //         ...newCase,
  //         customer_id: res.data.customer_id,
  //         difference:difference.d1,
  //         case_receiver:props.user.firstName+' '+props.user.lastName,
  //         user_id:props.user.id,
  //       };
  //       console.log(data);
        
  //       console.log(JSON.stringify(data));
  //       axios
  //         .post(`${url}/add_case`, data)
  //         .then(res => {
  //           console.log("######## add case result #########");
  //           console.log(res);
  //           M.toast({ html: `${res.data.message}` })
  //           getAllCase()
  //         })
  //         .catch(err => {
  //           M.toast({ html: 'fail to add case Case error' })
  //         });
  //     })
  //     .catch(err => {
  //       M.toast({ html: 'fail to add case Customer error' })
  //     });
  // }
  // function disableNext() {
  //   var result = [];

  //   if (formState === 3) {
  //     result.push(
  //       <button
  //         className="waves-effect btn blue lighten right "
  //         onClick={() => saveNewCase(newCase, customer)}
  //       >
  //         Save
  //       </button>
  //     );
  //   } else {
  //     result.push(
  //       <button
  //         className="waves-effect btn blue lighten right "
  //         onClick={() => nextpage()}
  //       >
  //         {" "}
  //         Next
  //       </button>
  //     );
  //   }
  //   return result ? result : null;
  // }

 

  // function disableBack() {
  //   var result = [];

  //   if (formState === 1) {
  //     result.push(
  //       <button
  //         className="waves-effect btn blue lighten right "
  //         disabled
  //         onClick={() => backpage()}
  //       >
  //         {" "}
  //         Back
  //       </button>
  //     );
  //   } else {
  //     result.push(
  //       <button
  //         className="waves-effect btn blue lighten right "
  //         onClick={() => backpage()}
  //       >
  //         {" "}
  //         Back
  //       </button>
  //     );
  //   }
  //   return result ? result : null;
  // }

  function payment() {
    var result = [];
    if (difference.d1) {
      result.push(
        <div className="col s6 m6 l6 content">
          <label>โอนเงินให้ </label>
          <input
            type="text"
            value={customer.firstname + " " + customer.lastname}
            name="cheque_receiver"
            disabled
          />
        </div>
      );
      result.push(
        <div className="col s6 m6 l6 content">
          <label>จำนวนเงินโอน (บาท) </label>
          <input
            type="number"
            min="0"
            step="any"
            value={newCase.cheque || ""}
            name="cheque"
            onChange={handleChangeF}
            onFocus={deletezero}
            onBlur={addzero}
          />
        </div>


      );
      result.push(
        <div className="col s6 m6 l6 content">
          <label>ชื่อผู้รับเงินมัดจำ </label>
          <input
            type="text"
            min="0"
            step="any"
            className="input-disable"
            disabled
            value={customer.firstname + " " + customer.lastname}
            name="deposit_receiver"

          />
        </div>
      );
      result.push(

        <div className="col s6 m6 l6 content">
          <label>จ่ายมัดจำ (บาท) </label>
          <input
            type="number"
            min="0"
            step="any"
            value={newCase.deposit || ""}
            name="deposit"
            onChange={handleChangeF}
            onFocus={deletezero}
            onBlur={addzero}
          />
        </div>


      );
    }
    return result;
  }

  function caseSource() {
    let result = [];
    if (newCase.case_source === 'Kiatnakin') {
      // result.push(
      // <div className="col s6 m4 l4 content">
      //   <label>Doc No. / เลขที่ใบคำขอ </label>
      //   <input
      //     type="text"
      //     value={newCase.document_id || ""}
      //     name="document_id"
      //     onChange={handleChange}
      //   />
      // </div>
      // );
      result.push(<div className="col s6 m4 l4 content">
        <label>CQC team</label>
        <select
          type="text"
          value={newCase.cqc_team}
          name="cqc_team"
          onChange={handleChange}
          className="browser-default"
        >
          {cqc_teamOption()}
        </select>
      </div>);
    } else if (newCase.case_source === 'Thanachart') {
      // result.push(<div className="col s6 m4 l4 content">
      //   <label>Doc No. / เลขที่ใบคำขอ</label>
      //   <input
      //     type="text"
      //     value={newCase.document_id || ""}
      //     name="document_id"
      //     onChange={handleChange}
      //   />
      // </div>);
      result.push(<div className="col s6 m4 l4 content">
        <label>เจ้าหน้าที่ทำสัญญา
/Contract officer</label>
        <input
          type="text"
          value={newCase.contract_officer || ""}
          name="contract_officer"
          onChange={handleChange}
        />
      </div>);
      result.push(<div className="col s6 m4 l4 content">
        <label>สาขา (ธนชาติ) / Hub</label>
        <select
          type="text"
          value={newCase.hub}
          name="hub"
          onChange={handleChange}
          className="browser-default"
        >
          <option value="" disabled>
            สาขา...
          </option>
          {hubOption()}
        </select>
      </div>);
    } else if (newCase.case_source === 'Cartrust') {
      result.push(<div className="col s6 m4 l4 content">
        <label>Cartust Lead Refer./รับเคสจาก</label>
        <select
          type="text"
          value={newCase.cartrust_lead_refer || ""}
          name="cartrust_lead_refer"
          onChange={handleChange}
          className="browser-default"
        >
          <option value="">
            รับเคสจาก
          </option>
          {cartrust_leadOption()}
          </select>
      </div>);
    }

    return (result);
  }

  return (
    <div>
      <div id="modalAddCase" className="modal modal-fixed-footer">
    

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
                <h4>Add New Case</h4>
              </div>
              {/* <div className="col s6 m6 no-col-padding">
              <button
                    className="waves-effect btn blue lighten right "
                    onClick={() => contract()}
                  >
                    Contract
                </button>

                  <button
                    className="waves-effect btn blue lighten right "
                    onClick={() => F2()}
                  >
                    F2
                </button>

                  <button
                    className="waves-effect btn blue lighten right "
                    onClick={() => caseInf()}
                  >
                    Case Information
                </button>
                </div> */}
            </div>


            <div>
          <Tabs >
            <TabList >
            <div class="tabslist">
              <Tab>Case Information</Tab>
              <Tab>F2</Tab>
              <Tab>Contract</Tab>
            </div>
            </TabList>
            <div dir="ltr">
            <TabPanel>
                  <div className="cotent-field">
                <div className="row content">

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
                    <label htmlFor="Phone">Phone1</label>
                    <input
                      type="tel"
                      name="tel"
                      value={customer.tel}
                      onChange={handleChangeCustomer}
                    />
                  </div>



                  <div className="col s6 m4 l4 content">
                    <label htmlFor="Phone">Phone2</label>
                    <input
                      type="tel"
                      name="tel2"
                      value={customer.tel2}
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
                    <label htmlFor="district">เขต</label>
                    <input
                      type="text"
                      name="district"
                      value={customer.district}
                      onChange={handleChangeCustomer}
                    />
                  </div>

                  <div className="col s6 m4 l4 content">
                    <label htmlFor="district2">แขวง</label>
                    <input
                      type="text"
                      name="district2"
                      value={customer.district2}
                      onChange={handleChangeCustomer}
                    />
                  </div>

                  <div className="col s6 m4 l4 content">
                    <label htmlFor="province">จังหวัด</label>
                    <select
                      type="text"
                      name="province"
                      value={customer.province || ""}
                      onChange={handleChangeCustomer}
                      className="browser-default"
                    >
                      <option value="" disabled>
                        จังหวัด...
                      </option>
                      {provinceAll.map(pv => (
                        <option key={uuid.v4()} value={pv}>
                          {pv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col s6 m4 l4 content">
                    <label htmlFor="post_code">รหัสไปรษณีย์</label>
                    <input
                      type="text"
                      name="post_code"
                      value={customer.post_code}
                      onChange={handleChangeCustomer}
                    />
                  </div>

                  <div className="col s12 m12  head-section no-col-padding">
                    <h5>Case Information</h5>
                  </div>

                  {/* <div className="col s6 m4 l4 content">
                    <label>JOB No.</label>
                    <input
                      type="text"
                      name="job_id"
                      value={newCase.job_id || ""}
                      onChange={handleChange}
                      className="validate"
                    />
                  </div> */}

                  <div className="col s6 m4 l4 content">
                    <label>Receiver Date/ วันที่รับเคส</label>
                    <input
                      type="date"
                      value={newCase.receive_date || Date()}
                      name="receive_date"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m4 l4 content">
                    <label>Case Type / ประเภทเคส</label>
                    <select
                      name="case_type"
                      value={newCase.case_type || "DEFAULT"}
                      onChange={handleChange}
                      className="browser-default"
                    >
                      <option value="DEFAULT" disabled>
                        เลือกประเภทเคส{" "}
                      </option>
                      {caseTypeAll.map(ct => (
                        <option key={uuid.v4()} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div className="col s6 m4 l4 content">
                    <label>Case Source / รับเคสจาก</label>
                    <select
                      name="case_source"
                      value={newCase.case_source || "DEFAULT"}
                      onChange={handleChange}
                      type="text"
                      className="browser-default"
                    >
                      <option value="DEFAULT" disabled>
                        รับเคสจาก{" "}
                      </option>
                      {caseSourceAll.map(ct => (
                        <option key={uuid.v4()} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>



                  {caseSource()}

                  <div className="col s12 m12  head-section no-col-padding">

                  </div>
                  
                  <div className="col s6 m4 l4 content">
                      <label>เลขที่ใบขับขี่</label>
                      <input
                        type="text"
                        name="license_id"
                        value={customer.license_id || ""}
                        onChange={handleChangeCustomer}
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
                      <label>Province / ป้ายทะเบียนจังหวัด</label>
                      <select
                        name="car_province"
                        value={newCase.car_province || "DEFAULT"}
                        className="browser-default"
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          เลือกป้ายทะเบียนจังหวัด{" "}
                        </option>
                        {provinceAll.map(pv => (
                          <option key={uuid.v4()} value={pv}>
                            {pv}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label>Brand / ยี่ห้อ</label>
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
                      <label>Car Name / ชื่อรถ</label>
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
                        className="browser-default"
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          เลือกไฟแนนซ์เดิม{" "}
                        </option>
                        {financeInstitution.map(ct => (
                          <option key={uuid.v4()} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label>Finance Institution / สถาบันการเงิน</label>
                      <select
                        name="new_bank"
                        value={newCase.new_bank || "DEFAULT"}
                        className="browser-default"
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          เลือกสถาบันการเงิน{" "}
                        </option>
                        {financeInstitution.map(ct => (
                          <option key={uuid.v4()} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>
              

                  
                    <div className="col s6 m4 l4 content">
                      <label>Approved Amount / ยอดจัด </label>
                      <input
                        type="number"
                        name="approve_amount"
                        value={newCase.approve_amount || ""}
                        onChange={handleChangeF}
                        className="validate"
                      />
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label>Close Amount / ยอดเงินเข้าบริษัท </label>
                      <input
                        type="number"
                        name="close_amount"
                        value={newCase.close_amount || ""}
                        onChange={handleChangeF}
                        className="validate"
                      />
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label>Down Payment / ยอดดาวน์</label>
                      <input
                        type="number"
                        name="down_amount"
                        value={newCase.down_amount || ""}
                        onChange={handleChangeF}
                        className="validate"
                      />
                    </div>
                

                
                    <div className="col s6 m4 l4 content">
                      <label htmlFor="Picture">รูปรถ</label>
                      <input
                        type="file"
                        name="take_car_picture"
                        onChange={handleChangeFile}
                      />
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label htmlFor="Picture">รูปเล่มทะเบียน</label>
                      <input
                        type="file"
                        name="car_license_book_picture"
                        onChange={handleChangeFile}
                      />
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label htmlFor="Picture">รูปใบขับขี่</label>
                      <input
                        type="file"
                        name="license_id_picture"
                        onChange={handleChangeFile}
                      />
                    </div>
                
                </div>
              </div>
                
            </TabPanel>
            <TabPanel>
                  <div className="cotent-field">
                <div className="row content">
          
                  <div className="row col m4 content">
                    <h5>Bank Form</h5>
                    <span className=" col s12 m12">
                      <label>
                        <input
                          type="checkbox"
                          name="form1"
                          checked={bank.b1}
                          onChange={handleChangeB_1}
                        />
                        <span>Tanachart Bank form</span>
                      </label>
                    </span>
                    <span className=" col s12 m12">
                      <label>
                        <input
                          type="checkbox"
                          name="form2"
                          checked={bank.b2}
                          onChange={handleChangeB_2}
                        />
                        <span>KK bank form</span>
                      </label>
                    </span>
                  </div>

                  <div className="row col m4 content">
                    <h5>ส่วนต่าง</h5>
                    <span className=" col s12 m12">
                      <label>
                        <input
                          type="checkbox"
                          name="difference_y"
                          checked={difference.d1}
                          onChange={handleChangeD_1}
                        />
                        <span>รับส่วนต่าง</span>
                      </label>
                    </span>
                    <span className=" col s12 m12">
                      <label>
                        <input
                          type="checkbox"
                          name="difference_n"
                          checked={difference.d2}
                          onChange={handleChangeD_2}
                        />
                        <span>ไม่รับส่วนต่าง</span>
                      </label>
                    </span>
                  </div>

                  <div className="col s4 m4 content top-F2">

                    <label>เงื่อนไขการตรวจรถ</label>

                    <select
                      name="car_check_con"
                      value={newCase.car_check_con || ""}
                      onChange={handleChange}
                      className="browser-default"
                    ><option value="" disabled>
                        เงื่อนไขการตรวจรถ...
                    </option>
                      <option value="นัดตรวจรถ(บ.)" >
                        นัดตรวจรถ(บ.)
                      </option>
                      <option value="นัดตรวจรถ" >
                        นัดตรวจรถ
                      </option>
                      <option value="ตรวจนอก/ขูดเลข/ถ่ายรูป" >
                        ตรวจนอก/ขูดเลข/ถ่ายรูป
                      </option>

                    </select>

                    <label>
                      เงื่อนไขการเก็บเอกสาร
                      </label>
                    <select
                      name="doc_storage_con"
                      value={newCase.doc_storage_con || ""}
                      onChange={handleChange}
                      className="browser-default"
                    >
                      <option value="" disabled>
                        เงื่อนไขการเก็บเอกสาร...
                    </option>
                      <option value="นัดตรวจรถ(บ.)" >
                        นัดรับเอกสาร
                      </option>
                      <option value="นัดตรวจรถ" >
                        ส่งเอกสาร
                      </option>

                    </select>



                    <label>เจ้าหน้าที่ Operator Cartrust </label>

                    <select
                      name="finance_staff"
                      value={newCase.finance_staff}
                      onChange={handleChange}
                      className="browser-default"
                    >
                      <option value="" disabled>
                        เจ้าหน้าที่...
                    </option>
                      {
                        operaterOption()
                      }


                    </select>



                    <label>
                      <span>จังหวัดที่อยู่อาศัย</span></label>
                    <select
                      name="province_f2"
                      value={newCase.province_f2 || ""}
                      onChange={handleChange}
                      className="browser-default"
                    >

                      <option value="" disabled>
                        จังหวัด{" "}
                      </option>
                      {provinceAll.map(pv => (
                        <option key={uuid.v4()} value={pv}>
                          {pv}
                        </option>
                      ))}
                    </select>

                    <label>
                      บัญชีรับเงินส่วนต่าง</label>

                    <select
                      name="margin_account"
                      value={newCase.margin_account || ""}
                      onChange={handleChange}
                      className="browser-default"
                    >
                      <option value="" disabled>
                        ธนาคาร...
                    </option>
                      {
                        margin_accountOption()
                      }


                    </select>

                    
                    <label>
                      <span>เลขที่บัญชี</span></label>
                    <input
                      name="margin_account_no"
                      value={newCase.margin_account_no || ""}
                      onChange={handleChange}
                    
                    ></input>





                  </div>






                  <div className="col s12 m12  head-section no-col-padding">
                    <h5>ค่าใช้จ่าย cartrust</h5>
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าปิดไฟแนนซ์เก่า (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="old_finance_closing_fee"
                      value={newCase.old_finance_closing_fee || ""}
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                      className="validate"
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.old_finance_closing_fee_note || ""}
                      name="old_finance_closing_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าโอนไฟแนนซ์เก่า (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="old_finance_transfer_fee"
                      value={newCase.old_finance_transfer_fee || ""}
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                      className="validate"
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.old_finance_transfer_fee_note || ""}
                      name="old_finance_transfer_fee_note"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col s6 m6 l6 content">
                    <label>ค่าบริการปิดเล่ม (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.book_closing_fee || ""}
                      name="book_closing_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.book_closing_fee_note || ""}
                      name="book_closing_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ภาษีมูลค่าเพิ่ม 7% (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.vat7_fee || ""}
                      name="vat7_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.vat7_fee_note || ""}
                      name="vat7_fee_note"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col s6 m6 l6 content">
                    <label>ค่าธรรมเนียมโอน (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.transfer_fee || ""}
                      name="transfer_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.transfer_fee_note || ""}
                      name="transfer_fee_note_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าอากร (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"

                      value={newCase.duty_fee || ""}
                      name="duty_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.duty_fee_note || ""}
                      name="duty_fee_note"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col s6 m6 l6 content">
                    <label>ส่วนลดพิเศษ (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.discount_fee || ""}
                      name="discount_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.discount_fee_note || ""}
                      name="discount_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>รวมค่าใช้จ่ายคาร์ทรัส (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      className="input-disable"
                      disabled
                      value={
                        parseInt(newCase.old_finance_closing_fee) +
                        parseInt(newCase.old_finance_transfer_fee) +
                        parseInt(newCase.book_closing_fee) +
                        parseInt(newCase.vat7_fee) +
                        parseInt(newCase.transfer_fee) +
                        parseInt(newCase.duty_fee) +
                        parseInt(newCase.discount_fee)}
                      name="cartrust_total_cost"
                    />
                  </div>



                  <div className="col s12 m12  head-section no-col-padding">
                    <h5>ค่าใช้จ่าย ไฟแนนซ์ใหม่</h5>
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าประกันคุ้มครองสินเชื่อ (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.car_shield_fee || ""}
                      name="car_shield_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.car_shield_fee_note || ""}
                      name="car_shield_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าประกันภัยรถยนต์ (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.car_insurance_fee || ""}
                      name="car_insurance_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.car_insurance_fee_note || ""}
                      name="car_insurance_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าบริการจัดชุดโอน (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.transfer_service_fee || ""}
                      name="transfer_service_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"

                      value={newCase.transfer_service_fee_note || ""}
                      name="transfer_service_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าทำสัญญา (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.contract_fee || ""}
                      name="contract_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.contract_fee_note || ""}
                      name="contract_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าโอนนอก (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.outside_transfer_fee || ""}
                      name="outside_transfer_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.outside_transfer_fee_note || ""}
                      name="outside_transfer_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าต่อภาษี (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.tax_renewal_fee || ""}
                      name="tax_renewal_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.tax_renewal_fee_note || ""}
                      name="tax_renewal_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>ค่าต่่อพรบ (บาท)</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={newCase.act_renewal_fee || ""}
                      name="act_renewal_fee"
                      onChange={handleChangeF}
                      onFocus={deletezero}
                      onBlur={addzero}
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>หมายเหตุ</label>
                    <input
                      type="text"
                      value={newCase.act_renewal_fee_note || ""}
                      name="act_renewal_fee_note"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col s12 m12 l12 content">
                    <div className="col s6 m6 l6 no-margin ">
                      <label>รวมค่าใช้จ่ายไฟแนนซ์ใหม่ (บาท)</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="input-disable"
                        disabled
                        value={
                          parseInt(newCase.car_shield_fee) +
                          parseInt(newCase.car_insurance_fee) +
                          parseInt(newCase.transfer_service_fee) +
                          parseInt(newCase.contract_fee) +
                          parseInt(newCase.outside_transfer_fee) +
                          parseInt(newCase.tax_renewal_fee) +
                          parseInt(newCase.act_renewal_fee)}
                        name="new_finance_total_cost"

                      />
                    </div>
                  </div>

                  <div className="col s6 m12 l12 content">
                    <div className="col s6 m6 l6 no-margin ">
                      <label>รวมค่าใช้จ่ายทั้งหมด (บาท) </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        disabled
                        value={parseInt(newCase.old_finance_closing_fee) +
                          parseInt(newCase.old_finance_transfer_fee) +
                          parseInt(newCase.book_closing_fee) +
                          parseInt(newCase.vat7_fee) +
                          parseInt(newCase.transfer_fee) +
                          parseInt(newCase.duty_fee) +
                          parseInt(newCase.discount_fee) +
                          parseInt(newCase.car_shield_fee) +
                          parseInt(newCase.car_insurance_fee) +
                          parseInt(newCase.transfer_service_fee) +
                          parseInt(newCase.contract_fee) +
                          parseInt(newCase.outside_transfer_fee) +
                          parseInt(newCase.tax_renewal_fee) +
                          parseInt(newCase.act_renewal_fee)}
                        name="total_cost"
                      />
                    </div>
                  </div>

                  <div className="col s6 m12 l12 content">
                    <div className="col s6 m6 l6 no-margin ">
                      <label>ยอดเงินที่จะได้รับ (บาท) </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        disabled
                        className="input-disable"
                        value={(parseInt(newCase.old_finance_closing_fee) +
                          parseInt(newCase.old_finance_transfer_fee) +
                          parseInt(newCase.book_closing_fee) +
                          parseInt(newCase.vat7_fee) +
                          parseInt(newCase.transfer_fee) +
                          parseInt(newCase.duty_fee) +
                          parseInt(newCase.discount_fee) +
                          parseInt(newCase.car_shield_fee) +
                          parseInt(newCase.car_insurance_fee) +
                          parseInt(newCase.transfer_service_fee) +
                          parseInt(newCase.contract_fee) +
                          parseInt(newCase.outside_transfer_fee) +
                          parseInt(newCase.tax_renewal_fee) +
                          parseInt(newCase.act_renewal_fee)) - newCase.approve_amount}
                        name="amount_received"

                      />
                    </div>
                  </div>

                  <div className="col s12 m12  head-section no-col-padding">
                    <h5>Customer payment summary</h5>
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>โอนเงินเข้าธนาคาร </label>
                    <input
                      type="text"
                      min="0"
                      step="any"
                      value={newCase.old_bank || ""}
                      name="old_bank"
                      disabled
                    />
                  </div>

                  <div className="col s6 m6 l6 content">
                    <label>จำนวนเงินสดที่จ่ายให้ธนาคาร(บาท) </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      disabled
                      className="input-disable"
                      value={
                        parseInt(newCase.old_finance_closing_fee) +
                        parseInt(newCase.old_finance_transfer_fee)
                      }
                      name="old_finance_total_cost"

                    />
                  </div>





                  {payment()}
                </div>
              </div>
              
            </TabPanel>
            <TabPanel>
              <div className="cotent-field">
                <div className="row content">
                    {/* <div className="col s6 m4 l4 content">
                      <label>JOB No.</label>
                      <input
                        type="text"
                        name="job_id"
                        value={newCase.job_id || ""}
                        onChange={handleChange}
                        className="validate"
                      />
                    </div> */}

                    <div className="col s6 m4 l4 content">
                      <label>Receiver Date/ วันที่รับเคส</label>
                      <input
                        type="date"
                        name="receive_date"
                        value={newCase.receive_date || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* <div className="col s6 m4 l4 content">
                      <label>Case Receiver/ ผู้ลงข้อมูล</label>
                      <input
                        name="case_receiver"
                        value={newCase.case_receiver || ""}
                        onChange={handleChange}
                        type="text"
                        className="validate"
                      />
                    </div> */}

                    <div className="col s6 m4 l4 content">
                      <label>Case Type / ประเภทเคส</label>
                      <select
                        name="case_type"
                        value={newCase.case_type || "DEFAULT"}
                        onChange={handleChange}
                        className="browser-default"
                      >
                        <option value="DEFAULT" disabled>
                          เลือกประเภทเคส{" "}
                        </option>
                        {caseTypeAll.map(ct => (
                          <option key={uuid.v4()} value={ct}>
                            {ct}
                          </option>
                        ))}
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
                      <label>Province / ป้ายทะเบียนจังหวัด</label>
                      <select
                        name="car_province"
                        value={newCase.car_province || "DEFAULT"}
                        className="browser-default"
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          เลือกป้ายทะเบียนจังหวัด{" "}
                        </option>
                        {provinceAll.map(pv => (
                          <option key={uuid.v4()} value={pv}>
                            {pv}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label>Brand / ยี่ห้อ</label>
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
                        className="browser-default"
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          เลือกไฟแนนซ์เดิม{" "}
                        </option>
                        {financeInstitution.map(ct => (
                          <option key={uuid.v4()} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                      <label>Finance Institution / สถาบันการเงิน</label>
                      <select
                        name="new_bank"
                        value={newCase.new_bank || "DEFAULT"}
                        className="browser-default"
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          เลือกสถาบันการเงิน{" "}
                        </option>
                        {financeInstitution.map(ct => (
                          <option key={uuid.v4()} value={ct}>
                            {ct}
                          </option>
                        ))}
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
                        disabled
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
            </TabPanel>
            </div>
          </Tabs>
        </div>



          </div>
          {/* process bar */}

          {/* body */}

          {/* {formRender()} */}
          {/* endbody */}
        </div>

        <div className="modal-footer">
          <button
            className="modal-close waves-effect btn white black-text right"
            onClick={() => close()}
          >
            close
          </button>
          {/* <button className="waves-effect btn orange black-text right " onClick={ resetForm } style={ { marginRight: '10px' ,marginLeft: '10px' } }>reset</button> */}


    

          <button
            className="modal-close waves-effect btn blue lighten right "
            onClick={() => saveNewCase(newCase,customer,difference)}
          >
            Save
        </button>
        </div>
      </div>


      



    </div>

  

    
  );
};


// const mapStateToProps = state => ({
//   user: state.user
// });

// const mapDispatchToProps = dispatch => ({
//   storeUserInfo: (
//     id,
//     firstName,
//     lastName,
//     username,
//     position,
//     team,
//     picture,
//     token
//   ) => {
//     dispatch({
//       type: ActionUser.STORE_USER_INFO,
//       id: id,
//       firstName: firstName,
//       lastName: lastName,
//       username: username,
//       position: position,
//       team: team,
//       picture: picture,
//       token: token
//     });
//   }
// });

export default ModalAddCase;
