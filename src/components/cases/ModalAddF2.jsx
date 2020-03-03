import React, { useState, useEffect } from "react";
import { bold, itailic, light, normal } from './font/Sarabun';
import { bold as bold2, normal as normal2, thin } from './font/helvethaica';
import logo from './images/logo';
import Pdfmake from 'pdfmake/build/pdfmake';
import ModalAddFStaff from './ModalAddFStaff'
import ModalAddMargin from './ModalAddMargin'
import {

  provinceAll
} from "../../Utility/dataCase";
import uuid from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
/* img */
import cartrustLogo from "../../img/cartrustLogo.png";
import url from "../../Utility/url";
import moment from "moment";

import CurrencyFormat from 'react-currency-format';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf"
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf"
  }
};

const ModalAddF2 = ({ singleCase, getAllCase , operatorS , getOperatorS}) => {
  // const [operatorS, setOperatorS] = useState([])
  const [margin_account, setMargin_account] = useState([])



  const [newF2, setNewF2] = useState({
    approve_amount: singleCase.approve_amount ? singleCase.approve_amount : "",
    old_finance_closing_fee: singleCase.f2_old_finance_closing_fee ? singleCase.f2_old_finance_closing_fee : "",
    old_finance_transfer_fee: singleCase.f2_old_finance_transfer_fee ? singleCase.f2_old_finance_transfer_fee : "",
    book_closing_fee: singleCase.f2_book_closing_fee != 0 ? singleCase.f2_book_closing_fee : "",
    vat7_fee: singleCase.f2_vat7_fee ? singleCase.f2_vat7_fee : "",
    transfer_fee: singleCase.f2_transfer_fee ? singleCase.f2_transfer_fee : "",
    duty_fee: singleCase.f2_duty_fee ? singleCase.f2_duty_fee : "",
    cartrust_other_fee: singleCase.f2_cartrust_other_fee ? singleCase.f2_cartrust_other_fee : "",
    car_shield_fee: singleCase.f2_car_shield_fee ? singleCase.f2_car_shield_fee : "",
    car_insurance_fee: singleCase.f2_car_insurance_fee ? singleCase.f2_car_insurance_fee : "",
    transfer_service_fee: singleCase.f2_transfer_service_fee ? singleCase.f2_transfer_service_fee : "",
    contract_fee: singleCase.f2_contract_fee ? singleCase.f2_contract_fee : "",
    outside_transfer_fee: singleCase.f2_outside_transfer_fee ? singleCase.f2_outside_transfer_fee : "",
    newfinance_other_fee: singleCase.f2_newfinance_other_fee ? singleCase.f2_newfinance_other_fee : "",
    car_check_con: singleCase.f2_car_check_con ? singleCase.f2_car_check_con : "",
    doc_storage_con: singleCase.f2_doc_storage_con ? singleCase.f2_doc_storage_con : "",
    margin_account: singleCase.f2_margin_account ? singleCase.f2_margin_account : "",
    margin_account_no: singleCase.f2_margin_account_no ? singleCase.f2_margin_account_no : "",

    old_finance_closing_fee_note: singleCase.f2_old_finance_closing_fee_note ? singleCase.f2_old_finance_closing_fee_note : "",
    old_finance_transfer_fee_note: singleCase.f2_old_finance_transfer_fee_note ? singleCase.f2_old_finance_transfer_fee_note : "",
    book_closing_fee_note: singleCase.f2_book_closing_fee_note ? singleCase.f2_book_closing_fee_note : "",
    vat7_fee_note: singleCase.f2_vat7_fee_note ? singleCase.f2_vat7_fee_note : "",
    transfer_fee_note: singleCase.f2_transfer_fee_note ? singleCase.f2_transfer_fee_note : "",
    duty_fee_note: singleCase.f2_duty_fee_note ? singleCase.f2_duty_fee_note : "",
    cartrust_other_fee_note: singleCase.f2_cartrust_other_fee_note ? singleCase.f2_cartrust_other_fee_note : "",
    car_shield_fee_note: singleCase.f2_car_shield_fee_note ? singleCase.f2_car_shield_fee_note : "",
    car_insurance_fee_note: singleCase.f2_car_insurance_fee_note ? singleCase.f2_car_insurance_fee_note : "",
    transfer_service_fee_note: singleCase.f2_transfer_service_fee_note ? singleCase.f2_transfer_service_fee_note : "",
    contract_fee_note: singleCase.f2_contract_fee_note ? singleCase.f2_contract_fee_note : "",
    outside_transfer_fee_note: singleCase.f2_outside_transfer_fee_note ? singleCase.f2_outside_transfer_fee_note : "",
    newfinance_other_fee_note: singleCase.f2_newfinance_other_fee_note ? singleCase.f2_newfinance_other_fee_note : "",
    f2_status: "done",
    cheque: singleCase.f2_cheque ? singleCase.f2_cheque : "",
    cheque_receiver: singleCase.name ? singleCase.name : "",
    deposit_receiver: singleCase.name ? singleCase.f2_name : "",
    deposit: singleCase.f2_deposit ? singleCase.f2_deposit : "",
    finance_staff: singleCase.finance_staff,
    finance_staff_line : singleCase.finance_staff_line?singleCase.finance_staff_line:"",
    finance_staff_tel:singleCase.finance_staff_tel?singleCase.finance_staff_tel:"",
    province: singleCase.f2_province,
    approve_amount:singleCase.approve_amount ? singleCase.approve_amount : "",
    close_amount: singleCase.close_amount ? singleCase.close_amount :"",
    down_amount: singleCase.down_amount ? singleCase.down_amount : "",

  });
  const [formState, setformState] = useState(1);
  const [newCase, setNewCase] = useState({});
  const [bank, setBank] = useState({ b1: true, b2: false });
  const [difference, setDifference] = useState({ d1: true, d2: false });
  const [cartrustWork, setCartrustWork] = useState({
    conditionCheckCar: "",
    conditionKeepDocument: "",
    cartrustOfficer: "",
    province: "",
    differentMoneyAccount: ""
  });

  const ifDiff = () => {
    if (singleCase.difference) {
      setDifference({ d1: true, d2: false })
    } else {
      setDifference({ d1: false, d2: true })
    }
  }
  var summary = 0;
  useEffect(() => {
    getMargin_account()
   // getOperatorS()
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleChange = e => {
    setNewF2({ ...newF2, [e.target.name]: e.target.value });
  };

  // const getOperatorS = () => {

  //   axios.get(`${url}/dropdown?table=finance_staff`)
  //     .then(res => {
  //       setOperatorS(res.data.message);
  //     })
  //     .catch(err => console.log(err))
  // }

  const getMargin_account = () => {

    axios.get(`${url}/dropdown?table=margin_account`)
      .then(res => {
        setMargin_account(res.data.message);
      })
      .catch(err => console.log(err))
  }
  const handleChangeDropDown = e => {
    let name = e.target.name
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index]
    let line_text = name + '_line'
    let tel_text = name + '_tel'
    let line = optionElement.getAttribute(line_text);
    let tel = optionElement.getAttribute(tel_text);
    setNewF2({ ...newCase, [name]: e.target.value, [line_text]: line ? line : "", [tel_text]: tel ? tel : "" })

  };

  function operaterOption() {
    let result = []

    for (let oper of operatorS) {

      result.push(<option value={oper.fs_name} finance_staff_line={oper.line} finance_staff_tel={oper.tel}  >
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

  const addzero = e => {
    if (e.target.value === "") {
      e.target.value = "0";
    }
  };


  const handleChangeF2T = e => {
    if (e.target.value == "") {
      setNewF2({
        ...newF2,
        [e.target.name]: " "
      });
    } else {
      setNewF2({
        ...newF2,
        [e.target.name]: e.target.value
      });
    }


  };

  const handleChangeF2 = e => {
    if (e.target.value == "") {
      setNewF2({
        ...newF2,
        [e.target.name]: "0"
      });
    } else {
      setNewF2({
        ...newF2,
        [e.target.name]: parseFloat(e.target.value)
      });
    }

  };

  const handleChangeCurrency = e => {
    //  const {formattedValue, value} = values
    if (e.target.value == "") {
      setNewF2({
        ...newF2,
        [e.target.name]: "0"
      });
    } else {
      
      
      setNewF2({
        ...newF2,
        [e.target.name]: parseFloat(e.target.value)
      });
    }
  };



  const handleChangeCartrustWork = e => {
    setCartrustWork({ ...cartrustWork, [e.target.name]: e.target.value });
  };

  const deletezero = e => {
    if (e.target.value === 0) {
      e.target.value = "";
    }
  };

  const handleChangeB_1 = e => setBank({ b1: true, b2: false });
  const handleChangeB_2 = e => setBank({ b1: false, b2: true });

  const handleChangeD_1 = e => setDifference({ d1: true, d2: false });
  const handleChangeD_2 = e => setDifference({ d1: false, d2: true });

  function saveF2() {
    printPDF(
      newF2.approve_amount ? newF2.approve_amount : singleCase.approve_amount,
      newF2.down_amount ? newF2.down_amount : singleCase.down_amount,
      newF2.close_amount ? newF2.close_amount : singleCase.close_amount,
      newF2.old_finance_transfer_fee ? newF2.old_finance_transfer_fee : singleCase.f2_old_finance_transfer_fee,
      newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee,
      
      newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee,
      newF2.duty_fee ? newF2.duty_fee : singleCase.f2_duty_fee,
      newF2.cartrust_other_fee ? newF2.cartrust_other_fee : singleCase.f2_cartrust_other_fee,
      newF2.car_shield_fee ? newF2.car_shield_fee : singleCase.f2_car_shield_fee,
      newF2.car_insurance_fee ? newF2.car_insurance_fee : singleCase.f2_car_insurance_fee,
      newF2.transfer_service_fee ? newF2.transfer_service_fee : singleCase.f2_transfer_service_fee,
      newF2.contract_fee ? newF2.contract_fee : singleCase.f2_contract_fee,
      newF2.outside_transfer_fee ? newF2.outside_transfer_fee : singleCase.f2_outside_transfer_fee,
      newF2.newfinance_other_fee ? newF2.newfinance_other_fee : singleCase.f2_newfinance_other_fee,
      
      newF2.car_check_con ? newF2.car_check_con : singleCase.f2_car_check_con,
      newF2.doc_storage_con ? newF2.doc_storage_con : singleCase.f2_doc_storage_con,
      newF2.margin_account ? newF2.margin_account : singleCase.f2_margin_account,
      newF2.margin_account_no ? newF2.margin_account_no : singleCase.f2_margin_account_no,
      newF2.old_finance_closing_fee_note ? newF2.old_finance_closing_fee_note : singleCase.f2_old_finance_closing_fee_note,
      newF2.old_finance_transfer_fee_note ? newF2.old_finance_transfer_fee_note : singleCase.f2_old_finance_transfer_fee_note,
      newF2.book_closing_fee_note ? newF2.book_closing_fee_note : singleCase.f2_book_closing_fee_note,
      newF2.vat7_fee_note ? newF2.vat7_fee_note : singleCase.f2_vat7_fee_note,
      newF2.transfer_fee_note ? newF2.transfer_fee_note : singleCase.f2_transfer_fee_note,
      newF2.duty_fee_note ? newF2.duty_fee_note : singleCase.f2_duty_fee_note,
      newF2.cartrust_other_fee_note ? newF2.cartrust_other_fee_note : singleCase.f2_cartrust_other_fee_note,
      newF2.car_shield_fee_note ? newF2.car_shield_fee_note : singleCase.f2_car_shield_fee_note,
      newF2.car_insurance_fee_note ? newF2.car_insurance_fee_note : singleCase.f2_car_insurance_fee_note,
      newF2.transfer_service_fee_note ? newF2.transfer_service_fee_note : singleCase.f2_transfer_service_fee_note,
      newF2.contract_fee_note ? newF2.contract_fee_note : singleCase.f2_contract_fee_note,
      newF2.outside_transfer_fee_note ? newF2.outside_transfer_fee_note : singleCase.f2_outside_transfer_fee_note,
      newF2.newfinance_other_fee_note ? newF2.newfinance_other_fee_note : singleCase.f2_newfinance_other_fee_note,

      newF2.cheque ? newF2.cheque : singleCase.f2_cheque,
      singleCase.name,
      singleCase.name,
      newF2.deposit ? newF2.deposit : singleCase.f2_deposit,
      singleCase.name,
      singleCase.cus_tel,
      singleCase.case_type,
      singleCase.case_id,
      singleCase.job_id,
      singleCase.new_bank,
      singleCase.old_bank,
      
      singleCase.car_brand,
      singleCase.car_model,
      singleCase.car_license,
      singleCase.car_province,
      singleCase.car_year,
      newF2.finance_staff ? newF2.finance_staff : singleCase.finance_staff,
      newF2.finance_staff_line ? newF2.finance_staff_line : singleCase.finance_staff_line,
      newF2.finance_staff_tel ? newF2.finance_staff_tel : singleCase.finance_staff_tel,
      newF2.province ? newF2.province : singleCase.f2_province,
    );

    let newData = {
      approve_amount: parseFloat(singleCase.approve_amount),
      old_finance_closing_fee: parseFloat(newF2.close_amount ? newF2.close_amount : singleCase.close_amount),
      old_finance_transfer_fee: parseFloat(newF2.old_finance_transfer_fee ? newF2.old_finance_transfer_fee : singleCase.f2_old_finance_transfer_fee),
      book_closing_fee: parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee),
      vat7_fee: ((parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) + parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee)) * 0.07)?((parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) + parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee)) * 0.07):singleCase.f2_vat7_fee,
      transfer_fee: parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee),
      duty_fee: parseFloat(newF2.duty_fee ? newF2.duty_fee : singleCase.f2_duty_fee),
      cartrust_other_fee: parseFloat(newF2.cartrust_other_fee ? newF2.cartrust_other_fee : singleCase.f2_cartrust_other_fee),
      car_shield_fee: parseFloat(newF2.car_shield_fee ? newF2.car_shield_fee : singleCase.f2_car_shield_fee),
      car_insurance_fee: parseFloat(newF2.car_insurance_fee ? newF2.car_insurance_fee : singleCase.f2_car_insurance_fee),
      transfer_service_fee: parseFloat(newF2.transfer_service_fee ? newF2.transfer_service_fee : singleCase.f2_transfer_service_fee),
      contract_fee: parseFloat(newF2.contract_fee ? newF2.contract_fee : singleCase.f2_contract_fee),
      outside_transfer_fee: parseFloat(newF2.outside_transfer_fee ? newF2.outside_transfer_fee : singleCase.f2_outside_transfer_fee),
      newfinance_other_fee: parseFloat(newF2.newfinance_other_fee ? newF2.newfinance_other_fee : singleCase.f2_newfinance_other_fee),
      

      approve_amount_note: newF2.approve_amount_note ? newF2.approve_amount_note : singleCase.f2_approve_amount_note,
      car_check_con: newF2.car_check_con ? newF2.car_check_con : singleCase.f2_car_check_con,
      doc_storage_con: newF2.doc_storage_con ? newF2.doc_storage_con : singleCase.f2_doc_storage_con,
      margin_account: newF2.margin_account ? newF2.margin_account : singleCase.f2_margin_account,
      margin_account_no: newF2.margin_account_no ? newF2.margin_account_no : singleCase.f2_margin_account_no,
      old_finance_closing_fee_note: newF2.old_finance_closing_fee_note ? newF2.old_finance_closing_fee_note : singleCase.f2_old_finance_closing_fee_note,
      old_finance_transfer_fee_note: newF2.old_finance_transfer_fee_note ? newF2.old_finance_transfer_fee_note : singleCase.f2_old_finance_transfer_fee_note,
      book_closing_fee_note: newF2.book_closing_fee_note ? newF2.book_closing_fee_note : singleCase.f2_book_closing_fee_note,
      vat7_fee_note: newF2.vat7_fee_note ? newF2.vat7_fee_note : singleCase.f2_vat7_fee_note,
      transfer_fee_note: newF2.transfer_fee_note ? newF2.transfer_fee_note : singleCase.f2_transfer_fee_note,
      duty_fee_note: newF2.duty_fee_note ? newF2.duty_fee_note : singleCase.f2_duty_fee_note,
      cartrust_other_fee_note: newF2.cartrust_other_fee_note ? newF2.cartrust_other_fee_note : singleCase.f2_cartrust_other_fee_note,
      car_shield_fee_note: newF2.car_shield_fee_note ? newF2.car_shield_fee_note : singleCase.f2_car_shield_fee_note,
      car_insurance_fee_note: newF2.car_insurance_fee_note ? newF2.car_insurance_fee_note : singleCase.f2_car_insurance_fee_note,
      transfer_service_fee_note: newF2.transfer_service_fee_note ? newF2.transfer_service_fee_note : singleCase.f2_transfer_service_fee_note,
      contract_fee_note: newF2.contract_fee_note ? newF2.contract_fee_note : singleCase.f2_contract_fee_note,
      outside_transfer_fee_note: newF2.outside_transfer_fee_note ? newF2.outside_transfer_fee_note : singleCase.f2_outside_transfer_fee_note,
      newfinance_other_fee_note: newF2.newfinance_other_fee_note ? newF2.newfinance_other_fee_note : singleCase.f2_newfinance_other_fee_note,
     
      f2_status: "done",
      cheque: newF2.f2_cheque?newF2.cheque:singleCase.f2_cheque,
      cheque_receiver: singleCase.name,
      deposit_receiver: singleCase.name,
      deposit: newF2.f2_deposit?newF2.deposite:singleCase.f2_deposit,
      finance_staff:newF2.finance_staff?newF2.finance_staff:singleCase.finance_staff,
      finance_staff_line:newF2.finance_staff_line ? newF2.finance_staff_line : singleCase.finance_staff_line,
      finance_staff_tel:newF2.finance_staff_tel ? newF2.finance_staff_tel : singleCase.finance_staff_tel,
    
      difference:difference.d1,
      province:newF2.province?newF2.province:singleCase.f2_province,
      close_amount:newF2.close_amount?newF2.close_amount:singleCase.close_amount,
      down_amount:newF2.down_amount?newF2.down_amount:singleCase.down_amount,
    }

    var data = JSON.stringify(newData);
    console.log('data', data)
    axios
      .post(`${url}/F2?case_id=${singleCase.case_id}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("#####  RES  ######");
        console.log("Case", res.data.message);
        
      })
      .catch(err => console.log(err));

    console.log(newF2);
  }

  const printPDF = (
    approve_amount,
    down_amount,
    old_finance_closing_fee,
    old_finance_transfer_fee,
    book_closing_fee,
    
    transfer_fee,
    duty_fee,
    cartrust_other_fee,
    car_shield_fee,
    car_insurance_fee,
    transfer_service_fee,
    contract_fee,
    outside_transfer_fee,
    newfinance_other_fee,
    car_check_con,
    doc_storage_con,
    margin_account,
    margin_account_no,
    old_finance_closing_fee_note,
    old_finance_transfer_fee_note,
    book_closing_fee_note,
    vat7_fee_note,
    transfer_fee_note,
    duty_fee_note,
    cartrust_other_fee_note,
    car_shield_fee_note,
    car_insurance_fee_note,
    transfer_service_fee_note,
    contract_fee_note,
    outside_transfer_fee_note,
    newfinance_other_fee_note,
    cheque,
    cheque_receiver,
    deposit_receiver,
    deposit,
    customer_name,
    customer_tel,
    case_type,
    case_id,
    job_id,
    new_bank,
    old_bank,
  
    car_brand,
    car_model,
    car_license,
    car_province,
    car_year,
    finance_staff,
    finance_staff_line,
    finance_staff_tel,
    province


  ) => {

    const vat7_fee = (
      ((parseFloat(book_closing_fee) + parseFloat(transfer_fee))*0.07)
   )
    const amount_received = ((parseFloat(old_finance_closing_fee) +
      parseFloat(old_finance_transfer_fee) +
     parseFloat(book_closing_fee) +
      vat7_fee +
      parseFloat(transfer_fee) +
      parseFloat(duty_fee) +
      parseFloat(cartrust_other_fee) +
      parseFloat(car_shield_fee) +
      parseFloat(car_insurance_fee) +
      parseFloat(transfer_service_fee) +
      parseFloat(contract_fee) +
      parseFloat(outside_transfer_fee) +
      parseFloat(newfinance_other_fee)) - approve_amount);

    const cartrust_total_cost = (parseFloat(old_finance_closing_fee) +
      parseFloat(old_finance_transfer_fee) +
      parseFloat(book_closing_fee) +
      vat7_fee +
      parseFloat(transfer_fee) +
      parseFloat(duty_fee) +
      parseFloat(cartrust_other_fee))

    const new_finance_total_cost = (parseFloat(car_shield_fee) +
      parseFloat(car_insurance_fee) +
      parseFloat(transfer_service_fee) +
      parseFloat(contract_fee) +
      parseFloat(outside_transfer_fee) +
      parseFloat(newfinance_other_fee) 
      )

    const old_finance_total_cost = (parseFloat(old_finance_closing_fee) +
      parseFloat(old_finance_transfer_fee))
    const total_cost = (parseFloat(old_finance_closing_fee) +
      parseFloat(old_finance_transfer_fee) +
      parseFloat(book_closing_fee) +
      vat7_fee +
      parseFloat(transfer_fee) +
      parseFloat(duty_fee) +
      parseFloat(cartrust_other_fee) +
      parseFloat(car_shield_fee) +
      parseFloat(car_insurance_fee) +
      parseFloat(transfer_service_fee) +
      parseFloat(contract_fee) +
      parseFloat(outside_transfer_fee) +
      parseFloat(newfinance_other_fee) 
      )
     

      

      const appendString = (string) =>{
        let i;
        if(string==' ' || string ==null || string==''){
          string = '_'
        }
        for(i=string.length;i<100;i++){
          string = string + '\xa0';
        }
        return string;
      }

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      const templeteOne = {
        content: [
          {
            columns: [
              {
                image: 'logo.jpg',
                width: 210,
                height: 100,
              },
              {
                stack: [
                  {
                    text: 'ใบเสนอยอดจัดและดอกเบี้ยรถยนต์มือสอง',
                    style: 'header',
                  },
                  {
                    text: 'บริษัท คาร์ทรัส จำกัด',
                    style: 'subheader',
                  },
                  {
                    text: '88 ถนนประเสรฐมนูกิจแขวงนวมินทร์',
                    fontSize: 10,
                    style: 'address',
                  },
                  {
                    text: 'เขตบึงกุ่ม กรุงเทพฯ 10210',
                    fontSize: 10,
                    style: 'address',
                  },
                  {
                    text: 'Email : cartrust@gmail.com',
                    bold: true,
                    fontSize: 7,
                    style: 'telphone',
                  },
                  {
                    text: 'Tel. 02-276-5765-6 Hotline: 097-146-0239',
                    bold: true,
                    fontSize: 7,
                    style: 'telphone',
                  },
                  {
                    text: 'Facebook : CarTrust รีไฟแนนซ์รถยนต์',
                    bold: true,
                    fontSize: 7,
                    style: 'telphone',
                  },
                ],
                alignment: 'right',
              },
            ],
          },
          {
            columns: [
              {
                stack: [
                  {
                    text: 'ข้อมูลลูกค้า',
                    itailic: true,
                    fontSize: 13,
                    marginBottom: 7,
                  },
                  {
                    text: 'คุณ ' + customer_name + ' ,',
                    fontSize: 9,
                    marginLeft: 10,
                    itailic: true,
                    marginBottom: 7,
                  },
                  {
                    text:
                      car_brand +
                      car_model +
                      ' ปี ' +
                      car_year +
                      ' ทะเบียน ' +
                      car_license +
                      ' ' +
                      car_province,
                    fontSize: 10,
                    marginLeft: 10,
                    marginBottom: 7,
                  },
                ],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'วันที่จัดทํา / Date :',
                        bold: true,
                        width: 200,
                        marginBottom: 7,
                      },
                      {
                        width: 'auto',
                        text: new Date().toLocaleDateString(),
                        marginLeft: 5,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Case Type: ',
                        bold: true,
                        width: 200,
  
                        marginBottom: 7,
                      },
                      {
                       
                        text: case_type.trim(),
                        
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Case ID :',
                        bold: true,
                        width: 200,
  
                        marginBottom: 7,
                      },
                      {
                        width: 'auto',
                        text: case_id,
                        marginLeft: 5,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        width: 200,
  
                        text: 'Job Number :',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        width: 'auto',
                        text: job_id,
                        marginLeft: 5,
                      },
                    ],
                  },
                ],
                alignment: 'right',
                fontSize: 10,
              },
            ],
            font: 'Halvethaica',
          },
          {
            columns: [
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'สถาบันการเงิน',
                        bold: true,
                        width: 60,
                        marginBottom: 7,
                      },
                      {
                        text: new_bank,
                        bold: true,
                        width: 80,
                        marginBottom: 7,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'ยอดจัด',
                        bold: true,
                        width: 60,
                        marginBottom: 7,
                      },
                      {
                        text: numberWithCommas(parseFloat(approve_amount)),
                        bold: true,
                        width: 80,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'ดาวน์',
                        bold: true,
                        width: 60,
                      },
                      {
                        text: numberWithCommas(parseFloat(down_amount)),
                        bold: true,
                      },
                    ],
                  },
                ],
                width: 60,
                fontSize: 11,
              },
              {
                table: {
                  body: [
                    [
                      {
                        text: 'การผ่อนชำระ',
                        alignment: 'center',
                        margin: 3,
                        border: [0, 0, 1, 1],
                      },
                      {
                        text: '24 เดือน',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [0, 0, 1, 1],
                      },
                      {
                        text: '36 เดือน',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [0, 0, 1, 1],
                      },
                      {
                        text: '48 เดือน',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [0, 0, 1, 1],
                      },
                      {
                        text: '60 เดือน',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [0, 0, 1, 1],
                      },
                      {
                        text: '72 เดือน',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [0, 0, 0, 1],
                      },
                    ],
                    [
                      {
                        text: 'ผ่อนชำระ / ต่อเดือน',
                        alignment: 'center',
                        margin: 3,
                        border: [0, 1, 1, 1],
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 1],
                      },
                    ],
                    [
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [0, 1, 1, 1],
                        text: 'อัตราดอกเบี้ย',
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 1],
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 1],
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 1],
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 1],
                      },
                      {
                        text: '',
                        width: 100,
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 1],
                      },
                    ],
                    [
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [0, 1, 1, 0],
                        text: 'ยอดจัด',
                      },
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 1, 0],
                        text: '',
                      },
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 1, 0],
                        text: '',
                      },
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 1, 0],
                        text: '',
                      },
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 1, 0],
                        text: '',
                      },
                      {
                        alignment: 'center',
                        margin: 3,
                        border: [1, 1, 0, 0],
                        text: '',
                      },
                    ],
                  ],
                },
                fontSize: 9,
                marginLeft: 65,
                marginRight: 20,
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'เงื่อนไขการตรวจรถ',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: car_check_con,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'จนท. Cartrust',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: finance_staff,
                      },
                    ],
                  },

                  {
                    columns: [
                      {
                        text: 'Line :',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: finance_staff_line,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Tel :',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: finance_staff_tel,
                      },
                    ],
                  },

                  {
                    columns: [
                      {
                        text: 'จังหวัดที่อยู่อาศัย',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: province,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'บัญชีรับเงินส่วนต่าง',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: margin_account,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'เลขที่บัญชี',
                        bold: true,
                        marginBottom: 7,
                      },
                      {
                        text: margin_account_no,
                      },
                    ],
                  },
                ],
                width: 'auto',
                fontSize: 9,
              },
            ],
            font: 'Halvethaica',
            fontSize: 7,
            marginTop: 10,
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
            margin: 5,
          },
          {
            columns: [
              {
                marginTop: 15,
                fontSize: 12,
                
                stack: [
                  {
                    text: 'ค่าใช้จ่าย CarTrust',
                    bold: true,
                    fontSize: 15,
                    marginBottom: 12,
                    
                  },
                  {
                    marginLeft: 23,
                    
                    columns: [
                      {
                        text: '1. ยอดปิดไฟแนนซ์เก่า',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(old_finance_closing_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                      
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '2. ค่าโอนไฟแนนซ์เก่า',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(old_finance_transfer_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '3. ค่าบริการปิดเล่ม',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(old_finance_closing_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '4. ค่าบริการโอน',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(transfer_fee).toFixed(2)),
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '5. ภาษีมูลค่าเพิ่ม 7 %',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(vat7_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '6. ค่าอากร',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(duty_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '7. ค่าใช้จ่ายอื่น ๆ ',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(transfer_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    bold: true,
                    marginLeft: 23,
                    columns: [
                      {
                        text: 'รวมค่าใช้จ่าย',
                        width: 150,
                        marginBottom: 12,
                        marginLeft: 12,
                      },
                      {
                        text: numberWithCommas(parseFloat(cartrust_total_cost).toFixed(2)) ,
                        alignment: 'right',
                        
                        
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                        
                      },
                    ],
                  },
                  {
                    text: 'ค่าใช้จ่ายไฟแนนซ์ใหม่',
                    bold: true,
                    fontSize: 15,
                    marginBottom: 12,
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '7. ค่าประกันสินเชื่อ',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(car_shield_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '8. ค่าประกันภัยรถยนต์',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(car_insurance_fee).toFixed(2)),
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '9. ค่าบริการชุดโอน',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(transfer_service_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '10. ค่าทำสัญญา',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(contract_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '11. ค่าโอน',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(outside_transfer_fee).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    marginLeft: 23,
                    columns: [
                      {
                        text: '12. ค่าใช้จ่ายอื่นๆ',
                        width: 150,
                        marginBottom: 10,
                      },
                      {
                        text: numberWithCommas(parseFloat(newfinance_other_fee).toFixed(2)),
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  
                  {
                    bold: true,
                    marginLeft: 23,
                    columns: [
                      {
                        text: 'รวมค่าใช้จ่ายไฟแนนซ์ใหม',
                        width: 150,
                        marginBottom: 10,
                        marginLeft: 12,
                      },
                      {
                        text: numberWithCommas(parseFloat(new_finance_total_cost).toFixed(2)),
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    bold: true,
                    marginLeft: 23,
                    columns: [
                      {
                        text: 'รวมค่าใช้จ่ายทั้งสิ้น',
                        width: 150,
                        marginBottom: 10,
                        marginLeft: 12,
                      },
                      {
                        text: numberWithCommas(parseFloat(total_cost).toFixed(2)),
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                  {
                    bold: true,
                    marginLeft: 23,
                    columns: [
                      {
                        text: 'ยอดเงินที่ได้รับ',
                        width: 150,
                        marginBottom: 10,
                        marginLeft: 12,
                      },
                      {
                        text: numberWithCommas(parseFloat(amount_received).toFixed(2)) ,
                        alignment: 'right',
                      },
                      {
                        text: 'บาท',
                        marginLeft: 2,
                      },
                    ],
                  },
                ],
              },
              {
                marginTop: 15,
                fontSize: 12,
                stack: [
                  {
                    text: 'หมายเหตุ',
                    bold: true,
                    marginBottom:5,
                  },
                  {
                    text: old_finance_closing_fee_note?old_finance_closing_fee_note:"0",
                    color: old_finance_closing_fee_note?'black':'white',
                   
                    marginTop: 8,
                   
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    
                    text: old_finance_transfer_fee_note?old_finance_transfer_fee_note:"0",
                    color: old_finance_transfer_fee_note?'black':'white',
                    marginTop: 8,
                   
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: book_closing_fee_note?book_closing_fee_note:"0",
                    color: book_closing_fee_note?'black':'white',
                    marginTop: 8,
                 
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: vat7_fee_note?vat7_fee_note:"0",
                    color: vat7_fee_note?'black':'white',
                    marginTop: 8,
                    
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: transfer_fee_note?transfer_fee_note:"0",
                    color: transfer_fee_note?'black':'white',
                    marginTop: 8,
                    
                    
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: duty_fee_note?duty_fee_note:"0",
                    color: duty_fee_note?'black':'white',
                    marginTop: 8,
                    
                   
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: cartrust_other_fee_note?cartrust_other_fee_note:"0",
                    color: cartrust_other_fee_note?'black':'white',
                    marginTop: 8,
                   
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: car_shield_fee_note?car_shield_fee_note:"0",
                    color: car_shield_fee_note?'black':'white',
                    marginTop: 37,
                   
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: car_insurance_fee_note?car_insurance_fee_note:"0",
                    color: car_insurance_fee_note?'black':'white',
                    marginTop: 8,
                    
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: transfer_service_fee_note?transfer_service_fee_note:"0",
                    color: transfer_service_fee_note?'black':'white',
                    marginTop: 8,
                    
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: contract_fee_note?contract_fee_note:"0",
                    color: contract_fee_note?'black':'white',
                    marginTop: 8,
                    
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: outside_transfer_fee_note?outside_transfer_fee_note:"0",
                    color: outside_transfer_fee_note?'black':'white',
                    marginTop: 8,
                  
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  {
                    text: newfinance_other_fee_note?newfinance_other_fee_note:"0",
                    color: newfinance_other_fee_note?'black':'white',
                    marginTop: 8,
                  
                  },
                  { canvas: [{ type: 'line', x1: 0, y1: 2, x2: 200, y2: 2, lineWidth: 1 }]},
                  
                ],
              },
            ],
            font: 'Halvethaica',
            fontSize: 8,
            padding: 20,
            marginTop: 5,
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
            margin: 5,
          },
          {
            marginTop: 15,
            marginLeft: 25,
            columns: [
              {
                text: 'การจ่ายเงิน :',
                width: 50,
                bold: true,
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'จ่ายเป็นเงินสดให้ธนาคาร ',
                        marginBottom: 7,
                      },
                      {
                        text: old_bank,
                        
                      },
                      {
                        text: numberWithCommas(parseFloat(old_finance_total_cost).toFixed(2)),
                        alignment:'right'
                      },
                      {
                        text:'บาท' ,
                        marginLeft:2,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'ทำเช็คจ่ายในนาม ',
                        marginBottom: 7,
                      },
                      {
                        text: cheque_receiver,
                        
                      },
                      {
                        text: numberWithCommas(parseFloat(cheque).toFixed(2)) ,
                        alignment:'right'
                      },
                      {
                        text:'บาท' ,
                        marginLeft:2,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'มัดจำจ่ายให้ ' ,
                        marginBottom: 7,
                      },
                      {
                        text: deposit_receiver,
                        
                      },
                      {
                        text: numberWithCommas(parseFloat(deposit).toFixed(2)),
                        alignment:'right'
                      },
                      {
                        text:'บาท' ,
                        marginLeft:2,
                      },
                    ],
                  },
                ],
              },
            ],
            font: 'Halvethaica',
            fontSize: 12,
            marginBottom: 7,
          },
          {
            text: [
              { text: 'หมายเหตุ', fontSize: 12, color: 'red', bold: true },
              {
                text:
                  '  เงื่อนไขการมัดจำเช็ค ลูกค้าต้องนำรถยนต์เข้าตรวจสภาพภายใน 3 วัน เมื่อเจ้าหน้าที่หรือบริษัทฯ ร้องขอ มิเช่นนั้น ทางบริษัทฯ ขอหักเงินมัดจำเป็นจำนวน 50% ของยอดเงินที่',
                color: 'red',
                marginBottom: 5,
              },
            ],
            font: 'Halvethaica',
            fontSize: 10,
          },
          {
            text:
              'มัดจำไว้ และหากลูกค้าไม่ดำเนินการให้ ตามที่บริษัทร้องขอภายใน 5 วัน บริษัทขอสงวนสิทธิ์ในการคืนเงินมัดจำทั้งหมด',
            color: 'red',
            font: 'Halvethaica',
            marginLeft: 90,
            marginTop: 7,
            fontSize: 10,
          },
          {
            marginTop: 15,
            table: {
              width: '100%',
              body: [
                [
                  {
                    stack: [
                      {
                        text: 'ข้าพเจ้า  ..............................................',
                        margin: [15, 15, 100, 15],
                      },
                      {
                        text:
                          'ได้อ่านรายละเอียดเกี่ยวกับค่าใช้จ่ายต่างๆข้างต้นเรียบร้อยแล้ว',
                        margin: 15,
                      },
                      {
                        text: 'และยอมรับเงื่อนไขของค่าใช้จ่ายทั้งหมด',
                        margin: 15,
                      },
                    ],
                  },
                  [
                    {
                      stack: [
                        {
                          margin: 15,
                          text: '',
                        },
                        {
                          margin: 15,
                          text: '',
                        },
                        {
                          margin: 15,
                          columns: [
                            { text: 'ลงชื่อ : ', marginRight: 100 },
                            { text: 'วันที่ :' },
                          ],
                        },
                      ],
                    },
                  ],
                ],
              ],
            },
            font: 'Halvethaica',
            marginBottom: 25,
          },
          {
            text:
              'เงื่อนไข: ยอดจัด,ดอกเบี้ยและค่าใช้จ่ายอาจมีการเปลี่ยนแปลง หากไม่ตรงตามเกณฑ์มาตราฐานการตามที่มาตราฐานแจ้งไว้ โดยที่ทางบริษัทฯ ไม่ต้องแจ้งให้ทราบล่วงหน้า',
            font: 'Halvethaica',
            fontSize: 10,
            marginBottom: 15,
            alignment: 'center',
          },
          {
            text:
              'สอบถามรายละอียดเพิ่มเติมได้ที่ โทร. 02-276-5765 ทุกวันจันทร์ - ศุกร์ เวลา 9:00 - 18:00 น.',
            font: 'Halvethaica',
            bold: true,
            fontSize: 10,
            alignment: 'center',
          },
        ],
        styles: {
          header: {
            fontSize: 25,
            bold: true,
            color: '#335599',
            marginBottom: 15,
            font: 'Halvethaica',
          },
          subheader: {
            fontSize: 20,
            bold: true,
            font: 'Halvethaica',
            marginBottom: 10,
          },
          address: {
            fontSize: 15,
            font: 'Halvethaica',
            marginBottom: 6,
            itailic: true,
          },
          telphone: {
            fontSize: 15,
            marginBottom: 6,
            font: 'Halvethaica',
          },
          defaultStyle: {
            font: 'Halvethaica',
            fontSize: 16,
          },
        },
      };
    Pdfmake.vfs['Sarabun.ttf'] = normal;
    Pdfmake.vfs['Sarabun-bold.ttf'] = bold;
    Pdfmake.vfs['Sarabun-itailic.ttf'] = itailic;
    Pdfmake.vfs['Sarabun-light.ttf'] = light;
    Pdfmake.vfs['halvethaica.ttf'] = normal2;
    Pdfmake.vfs['halvethaica-bold.tff'] = bold2;
    Pdfmake.vfs['halvethaica-thin.tff'] = thin;
    Pdfmake.vfs['logo.jpg'] = logo;
    Pdfmake.fonts = {
      ...Pdfmake.fonts,
      Sarabun: {
        normal: 'Sarabun.ttf',
        bold: 'Sarabun-bold.ttf',
        italics: 'Sarabun-light.ttf',
      },
      Halvethaica: {
        normal: 'halvethaica.ttf',
        bold: 'halvethaica-bold.tff',
        italics: 'halvethaica-thin.tff',
      },
    };

    return Pdfmake.createPdf(templeteOne).download('f2');
  };

  function payment() {
    var result = [];
    if (difference.d1) {
      result.push(
        <div className="col s6 m6 l6 content">
          <label>โอนเงินให้ </label>
          <input
            type="text"
            value={newF2.cheque_receiver || singleCase.name}
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
            const {formattedValue, value} = values;
            setNewF2({
            ...newF2,
            cheque : value
            })}}
            decimalScale= "2"
            min="0"
            step="any"
            value={newF2.cheque || singleCase.f2_cheque}
            name="cheque"
            // onChange={handleChangeF2}
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
            value={newF2.deposit_receiver || singleCase.name}
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
            const {formattedValue, value} = values;
            setNewF2({
            ...newF2,
            deposit : value
            })}}
            decimalScale= "2"
            min="0"
            step="any"
            value={newF2.deposit || singleCase.f2_deposit}
            name="deposit"
            // onChange={handleChangeF2}
            onFocus={deletezero}
            onBlur={addzero}
          />
        </div>


      );
    }
    return result;
  }

  const close = () => {
    setformState(1);
    setNewF2({
      approve_amount: "",
      old_finance_closing_fee: "",
      old_finance_transfer_fee: "",
      book_closing_fee: "",
      vat7_fee: "",
      transfer_fee: "",
      duty_fee: "",
      cartrust_other_fee: "",
      car_shield_fee: "",
      car_insurance_fee: "",
      transfer_service_fee: "",
      contract_fee: "",
      outside_transfer_fee: "",
      tax_renewal_fee: "",
      act_renewal_fee: "",
      car_check_con: "",
      doc_storage_con: "",
      margin_account: "",
      margin_account_no: "",


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
      tax_renewal_fee_note: "",
      act_renewal_fee_note: "",
      f2_status: "done",
      cheque: singleCase.f2_cheque ? singleCase.f2_cheque : "",
      cheque_receiver: singleCase.name ? singleCase.name : "",
      deposit_receiver: singleCase.name ? singleCase.f2_name : "",
      deposit: singleCase.f2_deposit ? singleCase.f2_deposit : ""
    });
  };

  return (
    <div>
      <div id="modalAddF2" className="modal modal-fixed-footer">

        {/* <div className="navbar-fixed">
          <nav className="no-padding-left nav-noclor">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo left">
                {console.log(newF2)}
                <img
                  src={cartrustLogo}
                  alt="cartrust logo"
                  style={{ width: "150px", height: "auto", marginLeft: "50px" }}
                />
              </a>
              <a
                href="#!"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </a>
            </div>
          </nav>
        </div> */}

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
                <h4>F2 Information: {singleCase.job_id}</h4>
              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}

          <div className="cotent-field">
            <div className="row content">
              <div className="row col s12 m12">
                {/* <div className="row col s4 m4 ">
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
                </div> */}

                <div className="row col s4 m4 ">
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
              </div>


              <div className="col row s6 m6">
                <div className="col s12 m12  head-section no-col-padding">
                  <h5>ค่าใช้จ่าย cartrust</h5>
                </div>

                <div className="col s6 m6 l6 content">
                  <label>Approved Amount / ยอดจัด </label>
                  <CurrencyFormat
                  thousandSeparator={true}
                  onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                      ...newF2,
                      approve_amount: value
                    })}}
            decimalScale= "2"
                    name="approve_amount"
                    value={newF2.approve_amount || singleCase.approve_amount || "0"}
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
                    name="close_amount"
                    value={newF2.close_amount || singleCase.close_amount || "0"}
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                    className="validate"
                    onValueChange={(values) => {
                      const {formattedValue, value} = values;
                      setNewF2({
                      ...newF2,
                      close_amount : value
                      })}}
            decimalScale= "2"
                  />
                </div>
                
                <div className="row col l12 no-col-padding-both no-col-margin">
                <div className="col s6 m6 l6 content">
                  <label>Down / ดาวน์ </label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    down_amount : value
                    })}}
                    decimalScale= "2"
                    name="down_amount"
                    value={newF2.down_amount || singleCase.down_amount || "0"}
                    // onChange={handleChangeF2}
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
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    old_finance_closing_fee : value
                    })}}
                    decimalScale= "2"
                    step="any"
                    name="old_finance_closing_fee"
                    onFocus={deletezero}
                    value={
                      newF2.close_amount  || singleCase.close_amount || "0"
                    }
                    disabled
                    
                    className="validate"
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    name="old_finance_closing_fee_note"
                    value={
                      newF2.old_finance_closing_fee_note || singleCase.f2_old_finance_closing_fee_note


                    }
                    onChange={handleChangeF2T}
                    className="validate"
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าโอนไฟแนนซ์เก่า</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    old_finance_transfer_fee : value
                    })}}
                    decimalScale= "2"
                    // min="0"
                    // step="any"
                    onFocus={deletezero}
                    value={newF2.old_finance_transfer_fee || singleCase.f2_old_finance_transfer_fee}
                    name="old_finance_transfer_fee"
                    // onChange={handleChangeCurrency}

                  />
                </div>


                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.old_finance_transfer_fee_note || singleCase.f2_old_finance_transfer_fee_note}
                    name="old_finance_transfer_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>



                <div className="col s6 m6 l6 content">
                  <label>ค่าบริการปิดเล่ม</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    book_closing_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    onFocus={deletezero}
                    value={newF2.book_closing_fee || singleCase.f2_book_closing_fee}
                    name="book_closing_fee"
                    // onChange={handleChangeF2}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    onFocus={deletezero}
                    value={newF2.book_closing_fee_note || singleCase.f2_book_closing_fee_note}
                    name="book_closing_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าโอน (บาท)</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    transfer_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    onFocus={deletezero}
                    value={newF2.transfer_fee || singleCase.f2_transfer_fee}
                    name="transfer_fee"
                    // onChange={handleChangeF2}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    onFocus={deletezero}
                    value={newF2.transfer_fee_note || singleCase.f2_transfer_fee_note}
                    name="transfer_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>




                <div className="col s6 m6 l6 content">
                  <label>ภาษีมูลค่าเพิ่ม 7%</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    vat7_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    onFocus={deletezero}
                    value={
                      (parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) + 
                      parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee)) * 0.07
                    }
                    name="vat7_fee"
                    disabled
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.vat7_fee_note || singleCase.f2_vat7_fee_note || ""}
                    name="vat7_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                

                <div className="col s6 m6 l6 content">
                  <label>ค่าอากร</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    duty_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    onFocus={deletezero}
                    value={newF2.duty_fee || singleCase.f2_duty_fee || "0"}
                    name="duty_fee"
                    // onChange={handleChangeF2}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    onFocus={deletezero}
                    value={newF2.duty_fee_note || singleCase.f2_duty_fee_note || ""}
                    name="duty_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าใช้จ่ายอื่น ๆ</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    cartrust_other_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    onFocus={deletezero}
                    value={newF2.cartrust_other_fee || singleCase.f2_cartrust_other_fee || "0"}
                    name="cartrust_other_fee"
                    // onChange={handleChangeF2}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.cartrust_other_fee_note || singleCase.f2_cartrust_other_fee_note || ""}
                    name="cartrust_other_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>รวมค่าใช้จ่ายคาร์ทรัส</label>
                  <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    cartrust_total_cost : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    disabled
                    value={
                      (parseFloat(newF2.close_amount ? newF2.close_amount : singleCase.close_amount) +
                      parseFloat(newF2.old_finance_transfer_fee ? newF2.old_finance_transfer_fee : singleCase.f2_old_finance_transfer_fee) +
                      parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) +
                        ((parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) + 
                        parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee)) * 0.07) +
                        parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee) +
                        parseFloat(newF2.duty_fee ? newF2.duty_fee : singleCase.f2_duty_fee) +
                        parseFloat(newF2.cartrust_other_fee ? newF2.cartrust_other_fee : singleCase.f2_cartrust_other_fee))

                    }
                    name="cartrust_total_cost"
                  />
                </div>

                <div className="col s12 m12  head-section no-col-padding">
                  <h5>ค่าใช้จ่าย ไฟแนนซ์ใหม่</h5>
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าประกันคุ้มครองสินเชื่อ (บาท)</label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    car_shield_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    value={newF2.car_shield_fee || singleCase.f2_car_shield_fee || "0"}
                    name="car_shield_fee"
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.car_shield_fee_note || singleCase.f2_car_shield_fee_note}
                    name="car_shield_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าประกันภัยรถยนต์ (บาท)</label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    car_insurance_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    value={newF2.car_insurance_fee || singleCase.f2_car_insurance_fee || "0"}
                    name="car_insurance_fee"
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.car_insurance_fee_note || singleCase.f2_car_insurance_fee_note }
                    name="car_insurance_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าบริการจัดชุดโอน (บาท)</label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    transfer_service_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    value={newF2.transfer_service_fee || singleCase.f2_transfer_service_fee || "0"}
                    name="transfer_service_fee"
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"

                    value={newF2.transfer_service_fee_note || singleCase.f2_transfer_service_fee_note}
                    name="transfer_service_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าทำสัญญา (บาท)</label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    contract_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    value={newF2.contract_fee || singleCase.f2_contract_fee || "0"}
                    name="contract_fee"
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.contract_fee_note || singleCase.f2_contract_fee_note}
                    name="contract_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>ค่าโอนนอก (บาท)</label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    outside_transfer_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    value={newF2.outside_transfer_fee || singleCase.f2_outside_transfer_fee}
                    name="outside_transfer_fee"
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.outside_transfer_fee_note || singleCase.f2_outside_transfer_fee_note}
                    name="outside_transfer_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                
                <div className="col s6 m6 l6 content">
                  <label>ค่าใช้จ่ายอื่นๆ (บาท)</label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    newfinance_other_fee : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    value={newF2.newfinance_other_fee || singleCase.f2_newfinance_other_fee || "0"}
                    name="newfinance_other_fee"
                    // onChange={handleChangeF2}
                    onFocus={deletezero}
                    onBlur={addzero}
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    value={newF2.newfinance_other_fee_note || singleCase.f2_newfinance_other_fee_note}
                    name="newfinance_other_fee_note"
                    onChange={handleChangeF2T}
                  />
                </div>

                <div className="col s12 m12 l12 content">
                  <div className="col s6 m6 l6 no-margin ">
                    <label>รวมค่าใช้จ่ายไฟแนนซ์ใหม่ (บาท)</label>
                    <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    new_finance_total_cost : value
                    })}}
                    decimalScale= "2"
                      min="0"
                      step="any"
                      className="input-disable"
                      disabled
                      value={
                        parseFloat(newF2.car_shield_fee ? newF2.car_shield_fee : singleCase.f2_car_shield_fee) +
                        parseFloat(newF2.car_insurance_fee ? newF2.car_insurance_fee : singleCase.f2_car_insurance_fee) +
                        parseFloat(newF2.transfer_service_fee ? newF2.transfer_service_fee : singleCase.f2_transfer_service_fee) +
                        parseFloat(newF2.contract_fee ? newF2.contract_fee : singleCase.f2_contract_fee) +
                        parseFloat(newF2.outside_transfer_fee ? newF2.outside_transfer_fee : singleCase.f2_outside_transfer_fee) +
                        parseFloat(newF2.newfinance_other_fee ? newF2.newfinance_other_fee : singleCase.f2_newfinance_other_fee) 
                      }
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
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    total_cost: value
                    })}}
                    decimalScale= "2"
                      min="0"
                      step="any"
                      disabled
                      value={parseFloat(
                        parseFloat(newF2.close_amount ? newF2.close_amount : singleCase.close_amount) +
                        parseFloat(newF2.old_finance_transfer_fee ? newF2.old_finance_transfer_fee : singleCase.f2_old_finance_transfer_fee) +
                        parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) +
                       ((parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) + 
                        parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee)) * 0.07) +
                        parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee) +
                        parseFloat(newF2.duty_fee ? newF2.duty_fee : singleCase.f2_duty_fee) +
                        parseFloat(newF2.cartrust_other_fee ? newF2.cartrust_other_fee : singleCase.f2_cartrust_other_fee) +
                        parseFloat(newF2.car_shield_fee ? newF2.car_shield_fee : singleCase.f2_car_shield_fee) +
                        parseFloat(newF2.car_insurance_fee ? newF2.car_insurance_fee : singleCase.f2_car_insurance_fee) +
                        parseFloat(newF2.transfer_service_fee ? newF2.transfer_service_fee : singleCase.f2_transfer_service_fee) +
                        parseFloat(newF2.contract_fee ? newF2.contract_fee : singleCase.f2_contract_fee) +
                        parseFloat(newF2.outside_transfer_fee ? newF2.outside_transfer_fee : singleCase.f2_outside_transfer_fee) +
                        parseFloat(newF2.newfinance_other_fee ? newF2.newfinance_other_fee : singleCase.f2_newfinance_other_fee)
                        )}
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
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    amount_received : value
                    })}}
                    decimalScale= "2"
                      min="0"
                      step="any"
                      disabled
                      className="input-disable"
                      value={parseFloat(
                        (parseFloat(newF2.close_amount ? newF2.close_amount : singleCase.close_amount) +
                        parseFloat(newF2.old_finance_transfer_fee ? newF2.old_finance_transfer_fee : singleCase.f2_old_finance_transfer_fee) +
                        parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) +
                       ((parseFloat(newF2.book_closing_fee ? newF2.book_closing_fee : singleCase.f2_book_closing_fee) + 
                        parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee)) * 0.07) +
                        parseFloat(newF2.transfer_fee ? newF2.transfer_fee : singleCase.f2_transfer_fee) +
                        parseFloat(newF2.duty_fee ? newF2.duty_fee : singleCase.f2_duty_fee) +
                        parseFloat(newF2.cartrust_other_fee ? newF2.cartrust_other_fee : singleCase.f2_cartrust_other_fee) +
                        parseFloat(newF2.car_shield_fee ? newF2.car_shield_fee : singleCase.f2_car_shield_fee) +
                        parseFloat(newF2.car_insurance_fee ? newF2.car_insurance_fee : singleCase.f2_car_insurance_fee) +
                        parseFloat(newF2.transfer_service_fee ? newF2.transfer_service_fee : singleCase.f2_transfer_service_fee) +
                        parseFloat(newF2.contract_fee ? newF2.contract_fee : singleCase.f2_contract_fee) +
                        parseFloat(newF2.outside_transfer_fee ? newF2.outside_transfer_fee : singleCase.f2_outside_transfer_fee) +
                        parseFloat(newF2.newfinance_other_fee ? newF2.newfinance_other_fee : singleCase.f2_newfinance_other_fee)) - (newF2.approve_amount ? newF2.approve_amount : singleCase.approve_amount)
                        )}
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
                    value={singleCase.new_bank || ""}
                    name="old_bank"
                    disabled
                  />
                </div>

                <div className="col s6 m6 l6 content">
                  <label>จำนวนเงินสดที่จ่ายให้ธนาคาร(บาท) </label>
                <CurrencyFormat
                    thousandSeparator={true}
                    onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setNewF2({
                    ...newF2,
                    old_finance_total_cost : value
                    })}}
                    decimalScale= "2"
                    min="0"
                    step="any"
                    disabled
                    className="input-disable"
                    value={
                      parseFloat(newF2.old_finance_closing_fee ? newF2.old_finance_closing_fee : singleCase.f2_old_finance_closing_fee) +
                      parseFloat(newF2.old_finance_transfer_fee ? newF2.old_finance_transfer_fee : singleCase.f2_old_finance_transfer_fee)
                    }
                    name="old_finance_total_cost"

                  />
                </div>

                {payment()}
              </div>
              <div className="row col s6 m6 ">
                <div className="col s12 m12  head-section no-col-padding">
                  <h5>เงื่อนไข cartrust</h5>
                </div>
                <div className="row col s12 m12 ">
                  <label>เงื่อนไขการตรวจรถ</label>

                  <select
                    name="car_check_con"
                    value={newF2.car_check_con || singleCase.f2_car_check_con}
                    onChange={handleChange}
                    className="browser-default"
                  >
                    <option value="" disabled>
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
                    value={newF2.doc_storage_con || singleCase.f2_doc_storage_con}
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
                    value={newF2.finance_staff || singleCase.finance_staff}
                    onChange={handleChangeDropDown}
                    className="browser-default"
                  >
                    <option value="" disabled>
                      เจ้าหน้าที่...
                    </option>
                    {
                      operaterOption()
                    }
                  </select>
                  <button className="modal-trigger" href="#modalAddFStaff">Add</button>


                    <br/>
                  <label>
                    <span>จังหวัดที่อยู่อาศัย</span></label>
                  <select
                    name="province"
                    value={newF2.province || singleCase.f2_province}
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
                    value={newF2.margin_account || singleCase.f2_margin_account}
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
                    value={newF2.margin_account_no || singleCase.f2_margin_account_no}
                    onChange={handleChange}

                  ></input>


                </div>
              </div>
            </div>
          </div>
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
            className="waves-effect btn red lighten right "
            onClick={() => saveF2()}
          >
            PDF
          </button>
        </div>
      </div>
      <ModalAddFStaff getOperatorS={getOperatorS} />
    </div>
  );
};

export default ModalAddF2;
