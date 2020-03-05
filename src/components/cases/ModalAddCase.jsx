import React, { useState, useEffect } from "react";
import ModalAddCarLead from './ModalAddCarLead'
import ModalAddOfficer from './ModalAddOfficer'
import ModalAddDealer from './ModalAddDealer'
// import ModalAddFStaff from './ModalAddFStaff'
import ModalAddMargin from './ModalAddMargin'
import {
  financeInstitution,
  caseSourceAll,
  caseTypeAll,
  caseStatus,
  provinceAll
} from "../../Utility/dataCase";
import uuid from "uuid";
import M from 'materialize-css/dist/js/materialize.min.js'
import url from "../../Utility/url";
import axios from "axios";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { REHYDRATE } from "redux-persist";

import CurrencyFormat from 'react-currency-format';


const ModalAddCase = ({ saveNewCase, getAllCase, operatorS, getOperatorS }) => {

  // const [operatorS, setOperatorS] = useState([])
  const [validateLineTF, setValidateLineTF] = useState(true)
  const [margin_account, setMargin_account] = useState([])
  const [cqc_team, setCqc_team] = useState([])
  const [hub, setHub] = useState([])
  const [cartrust_lead, setCartrust_lead] = useState([])
  const [carBrand, setCarBrand] = useState({})
  const [carModel, setCarModel] = useState({})
  const [carYear, setCarYear] = useState({})
  const [carSubModel, setSubModel] = useState({})
  const [officer, setOfficer] = useState({})
  const [dealer, setDealer] = useState({})
  const [formState, setformState] = useState(1);
  const [difference, setDifference] = useState({ d1: true, d2: false });

  const [newCase, setNewCase] = useState({

    customer_id: "",

    old_bank: "",
    new_bank: "",
    status: "receive",
    note_status: "",
    team: "",
    contract_officer: "",
    finance_staff: "",
    case_type: "",
    case_receiver: "",
    case_source: "",

    down_amount: "0",
    approve_amount: "0",
    close_amount: "0",
    case_status: "ติดต่อลูกค้าไม่ได้",
    receive_date: currentDateFormat(Date()),
    province: "",
    car_name: " ",
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
    cartrust_lead_refer_line: "",
    cartrust_lead_refer_tel: "",
    cqc_team: "",
    hub: "",
    margin_account_no: "",
    old_finance_closing_fee: "0",
    old_finance_transfer_fee: "0",
    book_closing_fee: "0",
    vat7_fee: "0",
    transfer_fee: "0",
    duty_fee: "0",
    cartrust_other_fee: "0",
    car_shield_fee: "0",
    car_insurance_fee: "0",
    transfer_service_fee: "0",
    contract_fee: "0",
    outside_transfer_fee: "0",
    newfinance_other_fee: "0",
    difference: true,

    old_finance_closing_fee_note: "",
    old_finance_transfer_fee_note: "",
    book_closing_fee_note: "",
    vat7_fee_note: "",
    transfer_fee_note: "",
    duty_fee_note: "",
    cartrust_other_fee_note: "",
    car_shield_fee_note: "",
    car_insurance_fee_note: "",
    transfer_service_fee_note: "",
    contract_fee_note: "",
    outside_transfer_fee_note: "",
    newfinance_other_fee_note: "",
    car_check_con: "",
    doc_storage_con: "",
    dealer: "",
    dealer_line: "",
    contract_officer_line: "",
    dealer_phone: "",
    contract_officer_phone: "",
    document_id: "",

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
    license_id: "",
    birthday: "",

    address: "",
    province: "",
    post_code: "",
    customer_id: ""

  });




  const handleChangeF = e => {

    setNewCase({ ...newCase, [e.target.name]: parseFloat(e.target.value ? e.target.value : 0) });
  };


  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleChangeCurrency = e => {

    setNewCase({ ...newCase, [e.target.name]: e.target.value ? e.target.value : 0 });
  };

  const handleChangeCurrencyxxx = e => {

    setNewCase({ ...newCase, [e.target.name]: formatCurrency(e.target.value, "") ? formatCurrency(e.target.value, "") : 0.00 });
  };

  const handleOnBlurCurrencyxxx = e => {

    setNewCase({ ...newCase, [e.target.name]: formatCurrency(e.target.value, "blur") ? formatCurrency(e.target.value, "blur") : 0.00 });
  };


  function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input;

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    // var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");

      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);

      // add commas to left side of number
      left_side = formatNumber(left_side);

      // validate right side
      right_side = formatNumber(right_side);

      // On blur make sure 2 numbers after decimal
      if (blur === "blur") {
        right_side += "00";
      }

      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);

      // join number by .
      input_val = left_side + "." + right_side;

    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      input_val = input_val;

      // final formatting
      if (blur === "blur") {
        input_val += ".00";
      }
    }

    // send updated string to input
    // input.val(input_val);
    return input_val;
    // put caret back in the right position
    // var updated_len = input_val.length;
    // caret_pos = updated_len - original_len + caret_pos;
    // input[0].setSelectionRange(caret_pos, caret_pos);
  }




  useEffect(() => {
    // getOperatorS()
    getMargin_account()
    getCqc_team()
    getHub()
    getOfficer()
    getCartrust_lead()
    getCar_brand()
    getDealer()

    M.Modal.init(document.querySelectorAll('.modal'), {});
  }, []);


  const handleChange = e => {

    setNewCase({ ...newCase, [e.target.name]: e.target.value });
  };

  const handleChangeDropDown = e => {
    let name = e.target.name
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index]
    let line_text = name + '_line'
    let tel_text = name + '_tel'
    let line = optionElement.getAttribute(line_text);
    let tel = optionElement.getAttribute(tel_text);
    setNewCase({ ...newCase, [name]: e.target.value, [line_text]: line ? line : "", [tel_text]: tel ? tel : "" })

  };

  const handleChangeDropDown2 = e => {
  
    setNewCase({ ...newCase, [e.target.name]: e.target.value })

  };

  const handleChangeCaseSource = e => {

    if (e.target.value === 'Kiatnakin' || e.target.value === 'Thanachart') {
      setNewCase({ ...newCase, [e.target.name]: e.target.value, new_bank: e.target.value });
    } else {
      setNewCase({ ...newCase, [e.target.name]: e.target.value, new_bank: "" });
    }



  };



  const handleChangeTel = e => {
    const re = /^[0-9]+$/;
    if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
      if (customer.customer_id === "") {
        setCustomer({ ...customer, [e.target.name]: e.target.value, customer_id: "" });
      } else {
        setCustomer({ ...customer, [e.target.name]: e.target.value, customer_id: "", firstname: "", lastname: "", license_id: "", tel: "", tel2: "", email: "", line: "", post_code: "", province: "", birthday: "" });
      }

    } else {

    }
  };

  function CheckRedTel(tel) {
    const re = /^[0-9]+$/;
    if (tel !== "") {
      if (tel.length < 10 && (re.test(tel))) {
        return true

      } else {
        return false
      }
    }
    return false
  }


  const handleChangeEmail = e => {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if ((e.target.value === '' || re.test(e.target.value))) {
      setCustomer({ ...customer, [e.target.name]: e.target.value, customer_id: "" });
    } else {
      //set state to disable save button
    }
  };

  function CheckRedEmail(email) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if ((email === '' || re.test(email))) {
      return false
    } else {
      return true
    }

  }

  const handleChangeCarBrand = e => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
    getCarModel(e.target.value)
  }
  const handleChangeCarModel = e => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
    getCarYear(newCase.car_brand, e.target.value)
  }
  const handleChangeCarYear = e => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
    getCarSubModel(newCase.car_brand, newCase.car_model, e.target.value)
  }

  const disableSelect = (case_source) => {
    if (case_source === 'Kiatnakin' || case_source === 'Thanachart') {
      return true
    } else {
      return false
    }
  }

  const handleChangeCustomer = e => {
    if (customer.customer_id === "") {
      setCustomer({ ...customer, [e.target.name]: e.target.value, customer_id: "" });
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value, customer_id: "", firstname: "", lastname: "", license_id: "", tel: "", tel2: "", email: "", line: "", post_code: "", province: "", birthday: "" });
    }
  }


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const validateOnclinck = () => {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    // let case_source = newCase.case_source;



    console.log('*********************', newCase)
    if (customer.firstname === "") {
      alert('Firstname if empty')
      return false;
    } 
    else if (customer.lastname === "") {
      alert('Lastname if empty')
      return false;
    } 
    // else if (customer.tel === "") {
    //   alert('Phone if empty')
    //   return false;
    // } else if (customer.line === "") {
    //   alert('Line if empty')
    //   return false;
    // } else if (customer.license_id === "") {
    //   alert('License Id if empty')
    //   return false;
    // } else if (customer.birthday === "") {
    //   alert('Birthday is empty')
    //   return false;
    // } 
    else if (newCase.receive_date === "") {
      alert('Receive Date is empty')
      return false;
    } else if (newCase.case_type === "") {
      alert('Case Source is empty')
      return false;
    } else if (newCase.case_source === "") {
      alert('Case Source is empty')
      return false;
    } else if (newCase.case_source === "Kiatnakin" && newCase.cqc_team === "") {
      alert('Cqc team is empty')
      return false;
    }
    else if (newCase.case_source === "Thanachart" && newCase.hub === "") {
      alert('Thanachart hub is empty')
      return false;
    }
    else if (newCase.case_source === "Thanachart" && newCase.contract_officer === "") {
      alert('Thanachart contract officer is empty')
      return false;
    }
    else if (newCase.case_source === "Cartrust" && newCase.cartrust_lead_refer === "") {
      alert('Cartrust lead refer contract officer is empty')
      return false;
    }
    else if (newCase.old_bank === "") {
      alert('Current Finance is empty')
      return false;
    }
    else if (newCase.new_bank === "") {
      alert('Finance Institution is empty')
      return false;
    } else if ( customer.email !== '' && !(re.test(customer.email))) {
      alert('Email is valid')
    }

    else {
      return true;
    }

  }

  // const getOperatorS = () => {

  //   axios.get(`${url}/dropdown?table=finance_staff`)
  //     .then(res => {
  //       setOperatorS(res.data.message);
  //     })
  //     .catch(err => console.log(err))
  // }

  const getOfficer = () => {

    axios.get(`${url}/dropdown?table=contract_officer`)
      .then(res => {
        setOfficer(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const getDealer = () => {

    axios.get(`${url}/dropdown?table=dealer`)
      .then(res => {
        setDealer(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const doNotThing = () => {

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

  const getCar_brand = () => {
    var config = {

    };
    axios.get(`${url}/brand`)
      .then(res => {
        console.log(res.data)
        setCarBrand(res.data.data);
      })
      .catch(err => console.log(err))
  }

  const getCarModel = (car_brand_s) => {

    let data = {
      brand: car_brand_s
    }
    console.log(JSON.stringify(data))
    axios.post(`/model`, JSON.stringify(data), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log('success get car mdel', res.data)
        setCarModel(res.data.results);
      })
      .catch(err => console.log(err))
  }

  const getCarYear = (car_brand, car_model) => {
    let data = {
      brand: car_brand,
      model: car_model
    }
    axios.post(`${url}/year`, JSON.stringify(data), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {

        setCarYear(res.data.results);
      })
      .catch(err => console.log(err))
  }

  const getCarSubModel = (car_brand, car_model, car_year) => {
    let data = {
      brand: car_brand,
      model: car_model,
      year: car_year,

    }
    axios.post(`${url}/sub_model`, JSON.stringify(data), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {

        setSubModel(res.data.results);
      })
      .catch(err => console.log(err))
  }

  const handleChangeFileLID = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewCase({ ...newCase, license_id_picture: reader.result });
  };

  const handleChangeFileTC = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewCase({ ...newCase, take_car_picture: reader.result });
  };

  const handleChangeFileCLB = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewCase({ ...newCase, car_license_book_picture: reader.result });
  };



  function operaterOption() {
    let result = []

    for (let oper of operatorS) {

      result.push(<option value={oper.fs_name}  >
        {oper.fs_name}
      </option>)
    }
    return result;
  }

  function officerOption() {
    let result = []

    for (let off of officer) {

      result.push(<option value={off.co_name} contract_officer_line={off.line} contract_officer_tel={off.tel}>
        {off.co_name}
      </option>)
    }
    return result;
  }

  function dealerOption() {
    let result = []

    for (let deal of dealer) {

      result.push(<option value={deal.d_name} dealer_line={deal.line} dealer_tel={deal.tel}>
        {deal.d_name}
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

      result.push(<option value={cartrust_l.cl_name} cartrust_lead_refer_line={cartrust_l.line} cartrust_lead_refer_tel={cartrust_l.tel} >
        {cartrust_l.cl_name}
      </option>)
    }
    return result;
  }

  function carBrandOption() {
    let result = []

    for (let i in carBrand) {

      result.push(<option value={carBrand[i]}>
        {carBrand[i]}
      </option>)
    }
    return result;
  }

  function carModelOption() {
    let result = []

    for (let i in carModel) {

      result.push(<option value={carModel[i]}>
        {carModel[i]}
      </option>)
    }
    return result;
  }

  function carYearOption() {
    let result = []

    for (let i in carYear) {

      result.push(<option value={carYear[i]}>
        {carYear[i]}
      </option>)
    }
    return result;
  }

  function carSubModelOption() {
    let result = []

    for (let i in carSubModel) {

      result.push(<option value={carSubModel[i]}>
        {carSubModel[i]}
      </option>)
    }
    return result;
  }



  const handleChangeD_1 = e => setDifference({ d1: true, d2: false });
  const handleChangeD_2 = e => setDifference({ d1: false, d2: true });

  const setblankCase = () => {
    setNewCase({
      customer_id: "",

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

      down_amount: "0",
      approve_amount: "0",
      close_amount: "0",
      case_status: "ติดต่อลูกค้าไม่ได้",
      receive_date: currentDateFormat(Date()),

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
      cartrust_lead_refer_line: "",
      cartrust_lead_refer_tel: "",
      cqc_team: "",
      hub: "",
      margin_account_no: "",
      old_finance_closing_fee: "0",
      old_finance_transfer_fee: "0",
      book_closing_fee: "0",
      vat7_fee: "0",
      transfer_fee: "0",
      duty_fee: "0",
      cartrust_other_fee: "0",
      car_shield_fee: "0",
      car_insurance_fee: "0",
      transfer_service_fee: "0",
      contract_fee: "0",
      outside_transfer_fee: "0",
      newfinance_other_fee: "0",
      difference: true,
      dealer: "",
      dealer_line: "",
      contract_officer_line: "",
      dealer_phone: "",
      contract_officer_phone: "",
      old_finance_closing_fee_note: "",
      old_finance_transfer_fee_note: "",
      book_closing_fee_note: "",
      vat7_fee_note: "",
      transfer_fee_note: "",
      duty_fee_note: "",
      cartrust_other_fee_note: "",
      car_shield_fee_note: "",
      car_insurance_fee_note: "",
      transfer_service_fee_note: "",
      contract_fee_note: "",
      outside_transfer_fee_note: "",
      newfinance_other_fee_note: "",
      car_check_con: "",
      doc_storage_con: "",


      margin_account: "",

      f2_status: null,
      cheque: "0",
      deposit: "0",
      cheque_receiver: "",
      deposit_receiver: "",
      province: ""
    });
  }

  const setAllblank = () => {
    setblankCustomer();
    setblankCase();

  }
  const setblankCustomer = () => {
    setCustomer({
      firstname: "",
      lastname: "",
      tel: "",
      tel2: "",
      email: "",
      line: "",
      license_id: "",
      birthday: "",
      address: "",

      province: "",
      post_code: "",
      customer_id: ""
    })

  }


  const close = () => {
    setblankCase();
    setblankCustomer();

  };
  const backpage = () => {
    console.log(newCase);
    if (formState === 2) {
      setformState(1);
    } else if (formState === 3) {
      setformState(2);
    }
  };
  const validateLine = (e) => {
    let name = e.target.name;
    let val = e.target.value
    if (val != "" && val != null) {
      axios.get(`${url}/check?table=customer&key=${e.target.name}&value=${e.target.value}`)
        .then(res => {
          if (!res.data.message) {
            // alert(name + ' : ' + val + ' is already in database' );

            var r = window.confirm('มี ' + name + ' : ' + val + ' อยู่ในระบบแล้ว \n จะเอาข้อมูลที่มีอยู่มาใช้หรือไม่');
            if (r == true) {
              setCustomer({
                ...customer,
                firstname: res.data.data.firstname,
                lastname: res.data.data.lastname,
                tel: res.data.data.tel,
                tel2: res.data.data.tel2,
                email: res.data.data.email,
                line: res.data.data.line,
                license_id: res.data.data.license_id,
                birthday: dateFormat(res.data.data.birthday),
                address: res.data.data.address,
                province: res.data.data.province,
                post_code: res.data.data.post_code,
                customer_id: res.data.data.customer_id
              })
            } else {
              setCustomer({
                ...customer,
                [name]: ""
              })
            }

            console.log(res.data.data.birthday)
          }
        })
        .catch(err => console.log(err))
    }

  }

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

  function dateFormat(caseDate) {
    if (caseDate == null) {
      return 0;
    } else {
      var mountCaracterString = caseDate.split(" ")[2];
      var dayString = caseDate.split(" ")[1];
      var yearString = caseDate.split(" ")[3];
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

      return (caseDate.split(" ")[3] + '-' + month + '-' + caseDate.split(" ")[1]);

    }
  }

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
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setNewCase({
                ...newCase,
                cheque: value
              })
            }}
            decimalScale="2"
            min="0"
            step="any"
            value={newCase.cheque || ""}
            name="cheque"
            // onChange={handleChangeF}
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
          <CurrencyFormat
            thousandSeparator={true}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setNewCase({
                ...newCase,
                deposit: value
              })
            }}
            decimalScale="2"
            min="0"
            step="any"
            value={newCase.deposit || ""}
            name="deposit"
            // onChange={handleChangeF}
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

      result.push(<div className="col s6 m4 l4 content">
        <label>CQC team</label>
        <select
          type="text"
          value={newCase.cqc_team}
          name="cqc_team"
          onChange={handleChange}
          className="browser-default"
        >
          <option value="" disabled>
            เลือกทีม...
          </option>
          {cqc_teamOption()}
        </select>
      </div>);

      result.push(<div className="col s6 m4 l4 content">
        <label htmlFor="name">Document No. / เลข AOL</label>
        <input
          type="text"
          name="document_id"
          value={newCase.document_id}
          onChange={handleChange}
        />
      </div>);



    } else if (newCase.case_source === 'Thanachart') {

      result.push(
        <div className="row crop">
          <div className="col s6 m4 l4 content">
            <label>เจ้าหน้าที่ทำสัญญา / Contract officer</label>
            <select
              type="text"
              value={newCase.contract_officer || ""}
              name="contract_officer"
              onChange={handleChangeDropDown}
              className="browser-default"
            >
              <option value="" contract_officer_line="" contract_officer_tel="" disabled>

                เจ้าหน้าที่


          </option>
              {officerOption()}

            </select>
            <button className="modal-trigger" href="#modalAddOfficer">Add</button>
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="name">Phone / เบอร์โทรศัพท์</label>
            <input
              type="text"
              name="contract_officer_tel"
              value={newCase.contract_officer_tel}
              readOnly
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="name">Line</label>
            <input
              type="text"
              name="contract_officer_line"
              value={newCase.contract_officer_line}
              readOnly
            />
          </div>


        </div>);


      result.push(<div className="col s6 m4 l4 content">
        <label htmlFor="name">Document No. / เลข AOL</label>
        <input
          type="text"
          name="document_id"
          value={newCase.document_id}
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
        <label >Cartust Lead Refer./รับเคสจาก</label>
        <select
          type="text"
          value={newCase.cartrust_lead_refer || ""}
          name="cartrust_lead_refer"
          onChange={handleChangeDropDown}
          className="browser-default"
        >
          <option value="" cartrust_lead_refer_line="" cartrust_lead_refer_tel="" disabled>

            รับเคสจาก


          </option>
          {cartrust_leadOption()}

        </select>
        <button className="modal-trigger" href="#modalAddCarLead">Cartust Lead Refer</button>
      </div>);

      result.push(<div className="col s6 m4 l4 content">
        <label htmlFor="name">Phone / เบอร์โทรศัพท์</label>
        <input
          type="text"
          name="cartrust_lead_refer_tel"
          value={newCase.cartrust_lead_refer_tel}
          readOnly
        />
      </div>);

      result.push(<div className="col s6 m4 l4 content">
        <label htmlFor="name">Line</label>
        <input
          type="text"
          name="cartrust_lead_refer_line"
          value={newCase.cartrust_lead_refer_line}
          readOnly
        />
      </div>);
    } else if (newCase.case_source === 'Dealer') {

      result.push(<div className="col s6 m4 l4 content" style={{marginBottom:'5px'}}>
        <label >Dealer</label>
        <select
          type="text"
          value={newCase.dealer || ""}
          name="dealer"
          onChange={handleChangeDropDown}
          className="browser-default"
        >
          <option value="" dealer_line="" dealer_tel="" disabled>
            รับเคสจาก
        </option>
          {dealerOption()}

        </select>
        <button className="modal-trigger" href="#modalAddDealer">Add</button>
      </div>);

      result.push(<div className="col s6 m4 l4 content">
        <label htmlFor="name">Phone / เบอร์โทรศัพท์</label>
        <input
          type="text"
          name="dealer_phone"
          value={newCase.dealer_tel}
          onChange={handleChangeCustomer}
        />
      </div>);
      result.push(<div className="col s6 m4 l4 content">
        <label htmlFor="name">Line / ไลน์</label>
        <input
          type="text"
          name="dealer_line"
          value={newCase.dealer_line}
          onChange={handleChangeCustomer}
        />
      </div>);

      result.push(<div className="row content">
            <div className="col row s6 m4">
            <label htmlFor="name">Document No. / เลข AOL</label>
            <input
              type="text"
              name="document_id"
              value={newCase.document_id}
              onChange={handleChange}
            />
            </div></div>);



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
                        <div className="row crop">
                          <div className="col s6 m4 l4 content">
                            <label htmlFor="name">Firstname / ชื่อ</label>
                            <input
                              type="text"
                              name="firstname"
                              value={customer.firstname}
                              onChange={handleChangeCustomer}
                            />
                          </div>

                          <div className="col s6 m4 l4 content">
                            <label htmlFor="name">Lastname / นามสกุล</label>
                            <input
                              type="text"
                              name="lastname"
                              value={customer.lastname}
                              onChange={handleChangeCustomer}
                            />
                          </div>

                          <div className={CheckRedEmail(customer.email) ? "col s6 m4 l4 contentred" : "col s6 m4 l4 content"}>
                            <label htmlFor="Email">Email / อีเมล์</label>
                            <input
                              type="email"
                              name="email"
                              value={customer.email}
                              onChange={handleChangeCustomer}
                            />
                          </div>
                        </div>

                        <div className="row crop">
                          <div className={CheckRedTel(customer.tel) ? "col s6 m4 l4 contentred" : "col s6 m4 l4 content"}>
                            <label htmlFor="Phone">Phone1 / เบอร์โทรศัพท์</label>
                            <input
                              type="tel"
                              name="tel"
                              value={customer.tel}
                              onChange={handleChangeTel}
                            />
                          </div>



                          <div className={CheckRedTel(customer.tel2) ? "col s6 m4 l4 contentred" : "col s6 m4 l4 content"}>
                            <label htmlFor="Phone">Phone2 / เบอร์โทรศัพท์ </label>
                            <input
                              type="tel"
                              name="tel2"
                              value={customer.tel2}
                              onChange={handleChangeTel}

                            />
                          </div>

                          <div className="col s6 m4 l4 content">
                            <label htmlFor="line">Line / ไลน์</label>
                            <input
                              type="text"
                              name="line"
                              value={customer.line}
                              onChange={handleChangeCustomer}
                              onBlur={validateLine}
                            />
                          </div>
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label htmlFor="birthday">Birthday / วันเกิด</label>
                          <input
                            type="date"
                            name="birthday"
                            value={customer.birthday}
                            onChange={handleChangeCustomer}
                          />
                        </div>


                        <div className="col s6 m8 l8 content">
                          <label htmlFor="home_no">Address / ที่อยู่</label>
                          <input
                            type="text"
                            name="address"
                            value={customer.address}
                            onChange={handleChangeCustomer}
                          />
                        </div>



                        <div className="col s6 m4 l4 content">
                          <label htmlFor="province">Province / จังหวัด</label>
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
                          <label htmlFor="post_code">Postcode / รหัสไปรษณีย์</label>
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
                  <div className="row crop">
                        {/* <div className="col s6 m4 l4 content">
                          <label>Case Receiver / ผู้รับเคส</label>
                          <select
                            name="case_receiver"
                            value={newCase.case_receiver}
                            onChange={handleChangeDropDown2}
                            className="browser-default"
                          >
                            <option value="" disabled>
                              เจ้าหน้าที่...
                            </option>
                            {
                              operaterOption()
                            }
                          </select>
                        </div> */}
                        <div className="col s6 m4 l4 content">
                          <label>Receive Date / วันที่รับเคส</label>
                          <input
                            type="date"
                            value={newCase.receive_date || currentDateFormat(Date())}
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
                            onChange={handleChangeCaseSource}
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
                        </div>




                        {caseSource()}

                        <div className="col s12 m12  head-section no-col-padding">

                        </div>
                        <div className="row crop">
                          <div className="col s6 m4 l4 content">
                            <label> ID / เลขที่บัตรประชาชน</label>
                            <input
                              type="text"
                              name="license_id"
                              value={customer.license_id || ""}
                              onChange={handleChangeCustomer}
                              onBlur={validateLine}
                              className="validate"
                            />
                          </div>


                          <div className="col s6 m4 l4 content">
                            <label>Licence Plate No. / หมายเลขป้ายทะเบียน</label>
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
                        </div>
                        <div className="row crop">
                          <div className="col s6 m4 l4 content">
                            <label>Brand / ยี่ห้อ</label>
                            <select
                              name="car_brand"
                              value={newCase.car_brand || ""}
                              onChange={handleChangeCarBrand}
                              className="browser-default"
                            >

                              <option value="" disabled>
                                ตัวเลือก...
                        </option>
                              {carBrandOption()}
                            </select>
                          </div>




                          <div className="col s6 m4 l4 content">
                            <label>Model / รุ่นรถ</label>
                            <select

                              name="car_model"
                              value={newCase.car_model || ""}
                              onChange={handleChangeCarModel}
                              className="browser-default"
                            >

                              <option value="" disabled>
                                ตัวเลือก...
                        </option>
                              {carModelOption()}
                            </select>

                          </div>

                          <div className="col s6 m4 l4 content">
                            <label>Car Year / ปีรถ</label>
                            <select

                              name="car_year"
                              value={newCase.car_year || ""}
                              onChange={handleChangeCarYear}
                              className="browser-default"
                            >

                              <option value="" disabled>
                                ตัวเลือก...
                        </option>
                              {carYearOption()}
                            </select>
                          </div>
                        </div>

                        <div className="row crop">
                          <div className="col s6 m4 l4 content">
                            <label>Sub-model / รุ่นย่อย </label>
                            <select

                              name="car_sub_model"
                              value={newCase.car_sub_model || ""}
                              onChange={handleChange}
                              className="browser-default"
                            >

                              <option value="" disabled>
                                ตัวเลือก...
                        </option>
                              {carSubModelOption()}
                            </select>
                          </div>

                          <div className="col s6 m4 l4 content">
                            <label>Current Finance / ไฟแนนซ์เดิม</label>
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
                              value={(newCase.case_source === 'Thanachart' || newCase.case_source === 'Kiatnakin') ? newCase.case_source : newCase.new_bank || "DEFAULT"}
                              className="browser-default"
                              onChange={handleChange}
                              disabled={disableSelect(newCase.case_source)}
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
                        </div>

                        <br />



                        <div className="row crop">
                          <div className="col s6 m4 l4 content">
                            <label htmlFor="Picture">Car Image / รูปรถ</label>
                            <input
                              type="file"
                              name="take_car_picture"
                              onChange={handleChangeFileTC}
                            />
                          </div>

                          <div className="col s6 m4 l4 content">
                            <label htmlFor="Picture">Car License Book / รูปเล่มทะเบียนรถ</label>
                            <input
                              type="file"
                              name="car_license_book_picture"
                              onChange={handleChangeFileCLB}
                            />
                          </div>

                          <div className="col s6 m4 l4 content">
                            <label htmlFor="Picture">License ID / รูปใบขับขี่</label>
                            <input
                              type="file"
                              name="license_id_picture"
                              onChange={handleChangeFileLID}
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                  </TabPanel>
                  <TabPanel>
                    <div className="cotent-field">
                      <div className="row content">



                        <div className="col m12 content">
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







                        <div className="col s6 m6">
                          <div className="col s12 m12  head-section no-col-padding">
                            <h5>ค่าใช้จ่าย cartrust</h5>
                          </div>




                          <div className="col s6 m6 l6 content">
                            <label>Approved Amount / ยอดจัด </label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  approve_amount: value
                                })
                              }}
                              decimalScale="2"
                              // 
                              name="approve_amount"
                              value={newCase.approve_amount || ""}
                              // onChange={handleChangeCurrency}
                              onFocus={deletezero}
                              onBlur={addzero}
                              className="validate"
                            />
                          </div>




                          <div className="col s6 m6 l6 content">
                            <label>Close Amount / ยอดปิด </label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  close_amount: value
                                })
                              }}
                              decimalScale="2"
                              name="close_amount"
                              value={newCase.close_amount || ""}
                              // onChange={handleChangeF}
                              onFocus={deletezero}
                              onBlur={addzero}
                              className="validate"
                            />
                          </div>


                          <div className="row col l12 no-col-padding-both no-col-margin">
                            <div className="col s6 m6 l6 content">
                              <label>Down Amount / ยอดดาวน์ </label>
                              <CurrencyFormat
                                thousandSeparator={true}
                                onValueChange={(values) => {
                                  const { formattedValue, value } = values;
                                  setNewCase({
                                    ...newCase,
                                    down_amount: value
                                  })
                                }}
                                decimalScale="2"
                                name="down_amount"
                                value={newCase.down_amount || ""}
                                // onChange={handleChangeCurrency}
                                onFocus={deletezero}
                                onBlur={addzero}
                                className="validate"
                              />
                            </div>

                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>ค่าปิดไฟแนนซ์เก่า (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  old_finance_closing_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              name="old_finance_closing_fee"
                              value={newCase.close_amount || ""}
                              // onChange={handleChangeF}
                              disabled
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
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  old_finance_transfer_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              name="old_finance_transfer_fee"
                              value={newCase.old_finance_transfer_fee || ""}
                              // onChange={handleChangeF}
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
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  book_closing_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.book_closing_fee || ""}
                              name="book_closing_fee"
                              // onChange={handleChangeF}
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
                            <label>ค่าโอน (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  transfer_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.transfer_fee || ""}
                              name="transfer_fee"
                              // onChange={handleChangeF}
                              onFocus={deletezero}
                              onBlur={addzero}
                            />
                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>หมายเหตุ</label>
                            <input
                              type="text"
                              value={newCase.transfer_fee_note || ""}
                              name="transfer_fee_note"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>ภาษีมูลค่าเพิ่ม 7% (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  vat7_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={(parseFloat(newCase.book_closing_fee) + parseFloat(newCase.transfer_fee)) * 0.07 || "0"}
                              name="vat7_fee"
                              disabled
                              //onChange={handleChangeF}
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
                            <label>ค่าอากร (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  duty_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"

                              value={newCase.duty_fee || ""}
                              name="duty_fee"
                              // onChange={handleChangeF}
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
                            <label>ค่าใช้จ่ายอื่น ๆ</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  cartrust_other_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.cartrust_other_fee || ""}
                              name="cartrust_other_fee"
                              // onChange={handleChangeF}
                              onFocus={deletezero}
                              onBlur={addzero}
                            />
                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>หมายเหตุ</label>
                            <input
                              type="text"
                              value={newCase.cartrust_other_fee_note || ""}
                              name="cartrust_other_fee_note"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>รวมค่าใช้จ่ายคาร์ทรัส (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  cartrust_total_cost: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              className="input-disable"
                              disabled
                              value={
                                parseFloat(newCase.old_finance_transfer_fee) +
                                parseFloat(newCase.close_amount) +
                                parseFloat(newCase.book_closing_fee) +
                                ((parseFloat(newCase.book_closing_fee) + parseFloat(newCase.transfer_fee)) * 0.07) +
                                parseFloat(newCase.transfer_fee) +
                                parseFloat(newCase.duty_fee) +
                                parseFloat(newCase.cartrust_other_fee)}
                              name="cartrust_total_cost"
                            />
                          </div>



                          <div className="col s12 m12  head-section no-col-padding">
                            <h5>ค่าใช้จ่าย ไฟแนนซ์ใหม่</h5>
                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>ค่าประกันสินเชื่อ (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  car_shield_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.car_shield_fee || ""}
                              name="car_shield_fee"
                              // onChange={handleChangeF}
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
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  car_insurance_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.car_insurance_fee || ""}
                              name="car_insurance_fee"
                              // onChange={handleChangeF}
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
                            <label>ค่าบริการชุดโอน (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  transfer_service_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.transfer_service_fee || ""}
                              name="transfer_service_fee"
                              // onChange={handleChangeF}
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
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  contract_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.contract_fee || ""}
                              name="contract_fee"
                              // onChange={handleChangeF}
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
                            <label>ค่าโอน (บาท)</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  outside_transfer_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.outside_transfer_fee || ""}
                              name="outside_transfer_fee"
                              // onChange={handleChangeF}
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
                            <label>ค่าใช้จ่ายอื่นๆ</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  newfinance_other_fee: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              value={newCase.newfinance_other_fee || ""}
                              name="newfinance_other_fee"
                              // onChange={handleChangeF}
                              onFocus={deletezero}
                              onBlur={addzero}
                            />
                          </div>

                          <div className="col s6 m6 l6 content">
                            <label>หมายเหตุ</label>
                            <input
                              type="text"
                              value={newCase.newfinance_other_fee_note || ""}
                              name="newfinance_other_fee_note"
                              onChange={handleChange}
                            />
                          </div>


                          <div className="col s12 m12 l12 content">
                            <div className="col s6 m6 l6 no-margin ">
                              <label>รวมค่าใช้จ่ายไฟแนนซ์ใหม่ (บาท)</label>
                              <CurrencyFormat
                                thousandSeparator={true}
                                onValueChange={(values) => {
                                  const { formattedValue, value } = values;
                                  setNewCase({
                                    ...newCase,
                                    new_finance_total_cost: value
                                  })
                                }}
                                decimalScale="2"
                                min="0"
                                step="any"
                                className="input-disable"
                                disabled
                                value={(
                                  parseFloat(newCase.car_shield_fee) +
                                  parseFloat(newCase.car_insurance_fee) +
                                  parseFloat(newCase.transfer_service_fee) +
                                  parseFloat(newCase.contract_fee) +
                                  parseFloat(newCase.outside_transfer_fee)
                                )}
                                name="new_finance_total_cost"

                              />
                            </div>
                          </div>

                          <div className="col s6 m12 l12 content">
                            <div className="col s6 m6 l6 no-margin ">
                              <label>รวมค่าใช้จ่ายทั้งหมด (บาท) </label>
                              <CurrencyFormat
                                thousandSeparator={true}
                                onValueChange={(values) => {
                                  const { formattedValue, value } = values;
                                  setNewCase({
                                    ...newCase,
                                    total_cost: value
                                  })
                                }}
                                decimalScale="2"
                                min="0"
                                step="any"
                                disabled
                                value={parseFloat(newCase.old_finance_transfer_fee) +
                                  parseFloat(newCase.close_amount) +
                                  parseFloat(newCase.book_closing_fee) +
                                  ((parseFloat(newCase.book_closing_fee) + parseFloat(newCase.transfer_fee)) * 0.07) +
                                  parseFloat(newCase.transfer_fee) +
                                  parseFloat(newCase.duty_fee) +
                                  parseFloat(newCase.cartrust_other_fee) +
                                  parseFloat(newCase.car_shield_fee) +
                                  parseFloat(newCase.car_insurance_fee) +
                                  parseFloat(newCase.transfer_service_fee) +
                                  parseFloat(newCase.contract_fee) +
                                  parseFloat(newCase.outside_transfer_fee) +
                                  parseFloat(newCase.newfinance_other_fee)
                                }
                                name="total_cost"
                              />
                            </div>
                          </div>

                          <div className="col s6 m12 l12 content">
                            <div className="col s6 m6 l6 no-margin ">
                              <label>ยอดเงินที่จะได้รับ (บาท) </label>
                              <CurrencyFormat
                                thousandSeparator={true}
                                onValueChange={(values) => {
                                  const { formattedValue, value } = values;
                                  setNewCase({
                                    ...newCase,
                                    amount_received: value
                                  })
                                }}
                                decimalScale="2"
                                min="0"
                                step="any"
                                disabled
                                className="input-disable"
                                value={(parseFloat(newCase.old_finance_transfer_fee) +
                                  parseFloat(newCase.close_amount) +
                                  parseFloat(newCase.book_closing_fee) +
                                  ((parseFloat(newCase.book_closing_fee) + parseFloat(newCase.transfer_fee)) * 0.07) +
                                  parseFloat(newCase.transfer_fee) +
                                  parseFloat(newCase.duty_fee) +
                                  parseFloat(newCase.cartrust_other_fee) +
                                  parseFloat(newCase.car_shield_fee) +
                                  parseFloat(newCase.car_insurance_fee) +
                                  parseFloat(newCase.transfer_service_fee) +
                                  parseFloat(newCase.contract_fee) +
                                  parseFloat(newCase.outside_transfer_fee) +
                                  parseFloat(newCase.newfinance_other_fee)
                                ) - newCase.approve_amount}
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
                            <CurrencyFormat
                              thousandSeparator={true}
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                setNewCase({
                                  ...newCase,
                                  old_finance_total_cost: value
                                })
                              }}
                              decimalScale="2"
                              min="0"
                              step="any"
                              disabled
                              className="input-disable"
                              value={
                                parseFloat(newCase.close_amount) +
                                parseFloat(newCase.old_finance_transfer_fee)
                              }
                              name="old_finance_total_cost"

                            />
                          </div>





                          {payment()}
                        </div>



                        <div className="col s6 m6  head-section no-col-padding">
                          <h5>เงื่อนไข cartrust</h5>
                        </div>
                        <div className="col row s6 m6">
                          <div className="col s12 m12 content">
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

                            <br />
                            <label>
                              <span>จังหวัดที่อยู่อาศัย</span></label>
                            <select
                              name="province"
                              value={newCase.province || ""}
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
                            <button className="modal-trigger" href="#modalAddMargin">Add</button>
                            <br />
                            <label>
                              <span>เลขที่บัญชี</span></label>
                            <input
                              name="margin_account_no"
                              value={newCase.margin_account_no || ""}
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>




                      </div>
                    </div>

                  </TabPanel>
                  <TabPanel>
                    <div className="cotent-field">
                      <div className="row content">


                        <div className="col s6 m4 l4 content">
                          <label>Receive Date/ วันที่รับเคส</label>
                          <input
                            type="date"
                            name="receive_date"
                            value={newCase.receive_date || currentDateFormat(Date())}
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
                            onChange={handleChangeTel}
                            className="validate"
                          />
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label htmlFor="Phone">Phone2</label>
                          <input
                            type="tel"
                            name="tel2"
                            value={customer.tel2}
                            onChange={handleChangeTel}

                          />
                        </div>

                        <div className="col s12 m12  head-section no-col-padding">
                          <h5>Contract Information</h5>
                        </div>
                        <div className="row crop">
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
                            <select
                              name="car_brand"
                              value={newCase.car_brand || ""}
                              onChange={handleChange}
                              className="browser-default"
                            >
                              <option value="">
                                ตัวเลือก...
                        </option>
                              {carBrandOption()}
                            </select>
                          </div>
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>Model / รุ่นรถ</label>
                          <select
                            name="car_model"
                            value={newCase.car_model || ""}
                            onChange={handleChange}
                            className="browser-default"
                          >
                            <option value="">
                              ตัวเลือก...
                        </option>
                            {carModelOption()}
                          </select>
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>Car Year / ปีรถ </label>
                          <select
                            name="car_year"
                            value={newCase.car_model || ""}
                            onChange={handleChange}
                            className="browser-default"
                          >
                            <option value="">
                              ตัวเลือก...
                        </option>
                            {carYearOption()}
                          </select>
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>Car Sub Model / รุ่นย่อย</label>
                          <select
                            name="car_sub_model"
                            value={newCase.car_sub_model || ""}
                            onChange={handleChange}
                            className="browser-default"
                          >
                            <option value="">
                              ตัวเลือก...
                        </option>
                            {carSubModelOption()}
                          </select>
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
                            value={(newCase.case_source === 'Thanachart' || newCase.case_source === 'Kiatnakin') ? newCase.case_source : newCase.new_bank || "DEFAULT"}
                            className="browser-default"
                            onChange={handleChange}
                            disabled={disableSelect(newCase.case_source)}
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
                          <CurrencyFormat
                            thousandSeparator={true}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              setNewCase({
                                ...newCase,
                                approve_amount: value
                              })
                            }}
                            decimalScale="2"
                            // 
                            name="approve_amount"
                            value={newCase.approve_amount || ""}
                            // onChange={handleChangeCurrency}
                            onFocus={deletezero}
                            onBlur={addzero}
                            className="validate"
                          />
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>Close Amount / ยอดปิด </label>
                          <CurrencyFormat
                            thousandSeparator={true}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              setNewCase({
                                ...newCase,
                                close_amount: value
                              })
                            }}
                            decimalScale="2"
                            name="close_amount"
                            value={newCase.close_amount || ""}
                            // onChange={handleChangeF}
                            onFocus={deletezero}
                            onBlur={addzero}
                            className="validate"
                          />
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>Down Payment / ยอดดาวน์</label>
                          <CurrencyFormat
                            thousandSeparator={true}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              setNewCase({
                                ...newCase,
                                down_amount: value
                              })
                            }}
                            decimalScale="2"
                            name="down_amount"
                            value={newCase.down_amount || ""}
                            // onChange={handleChangeCurrency}
                            onFocus={deletezero}
                            onBlur={addzero}
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
                          <CurrencyFormat
                            thousandSeparator={true}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              setNewCase({
                                ...newCase,
                                old_finance_total_cost: value
                              })
                            }}
                            decimalScale="2"
                            min="0"
                            step="any"
                            disabled
                            className="input-disable"
                            value={
                              parseFloat(newCase.close_amount) +
                              parseFloat(newCase.old_finance_transfer_fee)
                            }
                            name="old_finance_total_cost"

                          />
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>กู้ยืม</label>
                          <CurrencyFormat
                            thousandSeparator={true}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              setNewCase({
                                ...newCase,
                                total_cost: value
                              })
                            }}
                            decimalScale="2"
                            min="0"
                            step="any"
                            disabled
                            value={parseFloat(newCase.old_finance_transfer_fee) +
                              parseFloat(newCase.close_amount) +
                              parseFloat(newCase.book_closing_fee) +
                              ((parseFloat(newCase.book_closing_fee) + parseFloat(newCase.transfer_fee)) * 0.07) +
                              parseFloat(newCase.transfer_fee) +
                              parseFloat(newCase.duty_fee) +
                              parseFloat(newCase.cartrust_other_fee) +
                              parseFloat(newCase.car_shield_fee) +
                              parseFloat(newCase.car_insurance_fee) +
                              parseFloat(newCase.transfer_service_fee) +
                              parseFloat(newCase.contract_fee) +
                              parseFloat(newCase.outside_transfer_fee) +
                              parseFloat(newCase.newfinance_other_fee)
                            }
                            name="total_cost"
                          />
                        </div>

                        <div className="col s6 m4 l4 content">
                          <label>ชำระให้ผู้กู้ยืม</label>
                          <CurrencyFormat
                            thousandSeparator={true}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              setNewCase({
                                ...newCase,
                                amount_received: value
                              })
                            }}
                            decimalScale="2"
                            min="0"
                            step="any"
                            disabled
                            className="input-disable"
                            value={(parseFloat(newCase.old_finance_transfer_fee) +
                              parseFloat(newCase.close_amount) +
                              parseFloat(newCase.book_closing_fee) +
                              ((parseFloat(newCase.book_closing_fee) + parseFloat(newCase.transfer_fee)) * 0.07) +
                              parseFloat(newCase.transfer_fee) +
                              parseFloat(newCase.duty_fee) +
                              parseFloat(newCase.cartrust_other_fee) +
                              parseFloat(newCase.car_shield_fee) +
                              parseFloat(newCase.car_insurance_fee) +
                              parseFloat(newCase.transfer_service_fee) +
                              parseFloat(newCase.contract_fee) +
                              parseFloat(newCase.outside_transfer_fee) +
                              parseFloat(newCase.newfinance_other_fee)
                            ) - newCase.approve_amount}
                            name="amount_received"
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
            onClick={() => { validateOnclinck() ? saveNewCase(newCase, customer, difference, setAllblank) : doNotThing() }}


          >
            Save
        </button>
        </div>
      </div>





      <ModalAddCarLead getCartrust_lead={getCartrust_lead} />
      <ModalAddOfficer getOfficer={getOfficer} />
      <ModalAddDealer getDealer={getDealer} />
      {/* <ModalAddFStaff getOperatorS={getOperatorS} /> */}
      <ModalAddMargin getMargin_account={getMargin_account} />
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
