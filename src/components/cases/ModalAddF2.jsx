import React, { useState, useEffect } from "react";
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

const ModalAddF2 = ({ singleCase }) => {
  const [operatorS, setOperatorS] = useState([])
  const [margin_account, setMargin_account] = useState([])



  const [newF2, setNewF2] = useState({
    approve_amount: "0",
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

    approve_amount_note: "",
    old_finance_closing_fee_note: "",
    old_finance_transfer_fee_note: "",
    book_closing_fee_note: "",
    vat7_fee_note: "",
    transfer_fee_note: "",
    duty_fee_note: "",
    discount_fee_note: "",
    car_shield_fee_note: "",
    car_insurance_fee_note: "",
    transfer_service_fee_note: "",
    contract_fee_note: "",
    outside_transfer_fee_note: "",
    tax_renewal_fee_note: "",
    act_renewal_fee_note: "",


    f2_status: "done",
    cheque: "0",
    cheque_receiver: "0",
    deposit_receiver: "0",
    deposit: "0"
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

  var summary = 0;
  useEffect(() => {
    getMargin_account()
    getOperatorS()
  }, []);
  function setCartrustCost() {
    var summary =
      parseInt(newF2.old_finance_closing_fee) +
      parseInt(newF2.old_finance_transfer_fee) +
      parseInt(newF2.book_closing_fee + newF2.vat7_fee) +
      parseInt(newF2.transfer_fee) +
      parseInt(newF2.duty_fee) +
      parseInt(newF2.discount_fee);
    console.log(summary);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleChange = e => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
  };

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


  function operaterOption() {
    let result = []
    // console.log('9999999999999' , operatorS)
    for (let oper of operatorS) {
      console.log(oper.fs_name)
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

  const addzero = e => {
    if (e.target.value === "") {
      e.target.value = "0";
    }
  };


  const handleChangeF2T = e => {

    setNewF2({
      ...newF2,
      [e.target.name]: e.target.value
    });

  };

  const handleChangeF2 = e => {
    console.log(e.target.name, ":", e.target.value);
    setNewF2({
      ...newF2,
      [e.target.name]: parseInt(e.target.value)
    });
    // cartrust_total_cost
    // setNewF2({ ...newF2, ["cartrust_total_cost"]: cartrust_total_cost })
  };

  const handleChangeCartrustWork = e => {
    setCartrustWork({ ...cartrustWork, [e.target.name]: e.target.value });
  };

  const deletezero = e => {
    if (e.target.value == 0) {
      e.target.value = "";
    }
  };

  const handleChangeB_1 = e => setBank({ b1: true, b2: false });
  const handleChangeB_2 = e => setBank({ b1: false, b2: true });

  const handleChangeD_1 = e => setDifference({ d1: true, d2: false });
  const handleChangeD_2 = e => setDifference({ d1: false, d2: true });

  function saveF2() {
    newF2.approve_amount = numberWithCommas(newF2.approve_amount);
    newF2.old_finance_closing_fee = numberWithCommas(
      newF2.old_finance_closing_fee
    );
    newF2.old_finance_transfer_fee = numberWithCommas(
      newF2.old_finance_transfer_fee
    );
    newF2.book_closing_fee = numberWithCommas(newF2.book_closing_fee);
    newF2.vat7_fee = numberWithCommas(newF2.vat7_fee);
    newF2.transfer_fee = numberWithCommas(newF2.transfer_fee);
    newF2.duty_fee = numberWithCommas(newF2.duty_fee);
    newF2.discount_fee = numberWithCommas(newF2.discount_fee);
    newF2.car_shield_fee = numberWithCommas(newF2.car_shield_fee);
    newF2.car_insurance_fee = numberWithCommas(newF2.car_insurance_fee);
    newF2.transfer_service_fee = numberWithCommas(newF2.transfer_service_fee);
    newF2.contract_fee = numberWithCommas(newF2.contract_fee);
    newF2.outside_transfer_fee = numberWithCommas(newF2.outside_transfer_fee);
    newF2.tax_renewal_fee = numberWithCommas(newF2.tax_renewal_fee);
    newF2.act_renewal_fee = numberWithCommas(newF2.act_renewal_fee);
    newF2.cheque = numberWithCommas(newF2.cheque);
    newF2.deposit = numberWithCommas(newF2.deposit);
    newF2.cheque_receiver = newF2.cheque_receiver;
    newF2.act_renewal_fee = newF2.act_renewal_fee;
    var data = JSON.stringify(newF2);
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
        printPDF();
      })
      .catch(err => console.log(err));

    console.log(newF2);
  }

  const printPDF = () => {
    var docDefinition = {
      content: [
        {
          columns: [
            { width: 150, height: 60, image: cartrustLogo },
            { text: `ใบเสนอยอดจัดและดอกเบี้ยรถยนต์มือสอง`, style: `header` },
            {
              fontSize: 12,
              text: `F2
            วันที่จัดทำ ${moment().format("l")}
            รหัสลูกค้า: ${singleCase.customer_id}
            JOB Number: ${singleCase.job_id}
            รีไฟแนนซ์  ซื้อขายกันเอง  จำนำ  กล้อง`
            }
          ]
        },
        { text: `เรื่อง ขอเสนอการจัดไฟแนนซ์` },
        {
          columns: [
            { width: 100, text: `ผู้เช่าซื้อ  ${singleCase.name}` },
            { text: `โทร` },
            { text: `ผู้ขาย` },
            { text: `โทร` }
          ]
        },
        {
          columns: [
            { text: `รุ่น  ${singleCase.car_brand}` },
            { text: `ทะเบียน ${singleCase.car_license}` },
            { text: `ปี  ` },
            { text: `จังหวัด ${singleCase.province} ` },
            { text: `เครื่อง   cc` }
          ]
        },
        {
          columns: [
            [
              {
                columns: [
                  `ราคาซื้อขาย`,
                  "-",
                  `บาท`,
                  `สถาบันการเงิน`,
                  bank.b1 ? "TB" : "KK"
                ]
              },
              {
                columns: [
                  `ยอดจัดที่ได้ `,
                  singleCase.approve_amount,
                  `บาท`,
                  ``,
                  ``
                ]
              },
              {
                columns: [`มัดจำเล่ม(กรณีมัดจำเล่มจากไฟแนนซ์เดิมได้) `, `บาท`]
              },
              {
                columns: [
                  {
                    width: 50,
                    text: `ดาวน์ `
                  },
                  {
                    width: 60,
                    text: `\n ผ่่อนชำระ/เดือน \n อัตราดอกเบี้ย \n ยอดจัด`
                  },
                  {
                    table: {
                      heights: [10, 10, 10, 10],
                      body: [
                        ["24เดือน", "36เดือน", "48เดือน", "60เดือน", "72เดือน"],
                        [``, ``, ``, ``, ``],
                        [``, ``, ``, ``, ``],
                        [``, ``, ``, ``, ``]
                      ]
                    }
                  }
                ]
              }
            ],
            {
              width: 150,
              columns: [
                [
                  `เงื่อนไขการตวจรถ`,
                  `เงื่อนไขการเก็บเอกสาร`,
                  `จนท. Oper Cartrust`,
                  `จังหวัดที่อยู่อาศัย`,
                  `บัญชีรับเงินส่วนต่าง`
                ],
                [
                  cartrustWork.conditionCheckCar,
                  cartrustWork.conditionKeepDocument,
                  cartrustWork.cartrustOfficer,
                  cartrustWork.province,
                  cartrustWork.differentMoneyAccount
                ]
              ]
            }
          ]
        },
        `\n`,
        { columns: [`ค่าใช้จ่ายcartrust`, `หมายเหตุ`] },
        {
          columns: [
            { width: 100, text: `1.ค่าปิดไฟแนนซ์เก่า` },
            { width: 100, text: `${newF2.old_finance_closing_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `2.ค่าโอนไฟแนนซ์เก่า` },
            { width: 100, text: `${newF2.old_finance_transfer_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `3.ค่าบริการปิดเล่ม` },
            { width: 100, text: `${newF2.book_closing_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `4.ภาษีมูลค่าเพิ่ม 7%` },
            { width: 100, text: `${newF2.vat7_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `5.ค่าธรรมเนียมโอน` },
            { width: 100, text: `${newF2.transfer_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `6.ค่าอากร` },
            { width: 100, text: `${newF2.duty_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `ส่วนลดพิเศษ` },
            { width: 100, text: `${newF2.discount_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `รวมค่าใช้จ่าย` },
            {
              width: 100,
              text:
                parseInt(newF2.old_finance_closing_fee) +
                parseInt(newF2.old_finance_transfer_fee) +
                parseInt(newF2.book_closing_fee) +
                parseInt(newF2.vat7_fee) +
                parseInt(newF2.transfer_fee) +
                parseInt(newF2.duty_fee) +
                parseInt(newF2.discount_fee)
            },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        `\n`,
        { columns: [`ค่าใช้จ่าย ไฟแนนซ์ใหม่`, `หมายเหตุ`] },

        {
          columns: [
            { width: 100, text: `1.Car Shield` },
            { width: 100, text: `${newF2.car_shield_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `2.ค่าประกันภัยรถยนต์` },
            { width: 100, text: `${newF2.car_insurance_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `3.ค่าริการจัดชุดโอน` },
            { width: 100, text: `${newF2.transfer_service_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `4.ค่าทำสัญญา` },
            { width: 100, text: `${newF2.contract_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `5.ค่าโอนนอก` },
            { width: 100, text: `${newF2.outside_transfer_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `6.ค่าต่อภาษี` },
            { width: 100, text: `${newF2.tax_renewal_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `7.ค่าต่อพรบ.` },
            { width: 100, text: `${newF2.act_renewal_fee}` },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `รวมค่าใช้จ่าย` },
            {
              width: 100,
              text:
                parseInt(newF2.car_shield_fee) +
                parseInt(newF2.car_insurance_fee) +
                parseInt(newF2.transfer_service_fee) +
                parseInt(newF2.contract_fee) +
                parseInt(newF2.outside_transfer_fee) +
                parseInt(newF2.tax_renewal_fee) +
                parseInt(newF2.act_renewal_fee)
            },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        { text: `\n` },
        {
          columns: [
            { width: 100, text: `รวมค่าใช้จ่ายทั้งหมด` },
            {
              width: 100,
              text:
                parseInt(newF2.old_finance_closing_fee) +
                parseInt(newF2.old_finance_transfer_fee) +
                parseInt(newF2.book_closing_fee) +
                parseInt(newF2.vat7_fee) +
                parseInt(newF2.transfer_fee) +
                parseInt(newF2.duty_fee) +
                parseInt(newF2.discount_fee) +
                parseInt(newF2.car_shield_fee) +
                parseInt(newF2.car_insurance_fee) +
                parseInt(newF2.transfer_service_fee) +
                parseInt(newF2.contract_fee) +
                parseInt(newF2.outside_transfer_fee) +
                parseInt(newF2.tax_renewal_fee) +
                parseInt(newF2.act_renewal_fee)
            },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        {
          columns: [
            { width: 100, text: `ยอดเงินที่จะได้รับ` },
            {
              width: 100,
              text:
                parseInt(newF2.old_finance_closing_fee) +
                parseInt(newF2.old_finance_transfer_fee) +
                parseInt(newF2.book_closing_fee) +
                parseInt(newF2.vat7_fee) +
                parseInt(newF2.transfer_fee) +
                parseInt(newF2.duty_fee) +
                parseInt(newF2.discount_fee) +
                parseInt(newF2.car_shield_fee) +
                parseInt(newF2.car_insurance_fee) +
                parseInt(newF2.transfer_service_fee) +
                parseInt(newF2.contract_fee) +
                parseInt(newF2.outside_transfer_fee) +
                parseInt(newF2.tax_renewal_fee) +
                parseInt(newF2.act_renewal_fee) -
                parseInt(newF2.approve_amount)
            },
            { width: 25, text: `บาท` },
            ``
          ]
        },
        { text: bank.b1 ? "" : `\n` },
        {
          columns: [
            { width: 100, text: `1]	จ่ายเป็นเงินสดให้` },
            singleCase.old_bank,
            "",
            "=",
            parseInt(newF2.old_finance_closing_fee) +
            parseInt(newF2.old_finance_transfer_fee),
            { alignment: "left", text: `บาท` }
          ]
        },
        {
          columns: [
            { width: 100, text: `2]	ทำเช็คจ่ายให้` },
            singleCase.name,
            "",
            "",
            "",
            ""
          ]
        },
        {
          columns: [{ width: 100, text: `3]	มัดจำจ่ายให้ ` }, "", "", "", "", ""]
        },
        { text: bank.b1 ? "" : `\n` },
        {
          text: bank.b1
            ? "** หมายเหตุ\n1. เงินก้อนสุดท้ายที่จะได้รับเป็นแค่ยอดเงินประมาณการ และจะมีการเปลี่ยนแปลงตามค่าใช้จ่ายที่เกิดขึ้นจริง เช่น ค่าประกันภัยรถยนต์ ค่าอากรขนส่ง เป็นต้น ดังนั้นเงินก้อนสุดท้ายในข้อ 3] ไม่สามารถอ้างอิงยอดเงินที่ลูกค้าจะได้รับ ในวันที่ได้รับการโอนเงินก้อนสุดท้ายจากธนาคารได้\n2. ในกรณีนัดตรวจรถเพื่อโอนเข้าธนาคาร ลูกค้าต้องนำรถยนต์เข้าตรวจสภาพภายใน 3 วัน เมื่อเจ้าหน้าที่หรือบริษัทฯ ร้องขอ มิเช่นนั้น ทางบริษัทฯ \nขอหักเงินคงเหลือก้อนสุดท้าย 50% ของยอดคงเหลือ และหากลูกค้าไม่ดำเนินการให้ตามที่บริษัทร้องขอภายใน 5 วัน บริษัทฯ ขอสงวนสิทธิ์ในการคืนเงินก้อนสุดท้ายทั้งหมด"
            : `หมายเหตุ : เงื่อนไขการมัดจำเช็ค ลูกค้าต้องนำรถยนต์เข้าตรวจสภาพภายใน 3 วัน เมื่อเจ้าหน้าที่หรือบริษัทฯ ร้องขอ มิเช่นนั้น ทางบริษัทฯ ขอหักเงินมัดจำเป็นจำนวน 50% ของยอดเงินที่มัดจำไว้ และหากลูกค้าไม่ดำเนินการให้ตามที่บริษัทร้องขอภายใน 5 วัน บริษัทฯ ขอสงวนสิทธิ์ในการคืนเงินมัดจำทั้งหมด`
        },
        { fontSize: 16, text: `ปั๊ม A/C PAYEE ONLY ด้วย` },
        {
          alignment: "center",
          text: `เงื่อนไขยอดจัด,ดอกเบี้ยและค่าใช้จ่ายอาจมีการเปลี่ยนแปลง หากไม่ตรงตามตามเกณฑ์มาตรฐานที่แจ้งไว้ โดยทางบริษัทไม่ต้องแจ้งให้ท่านทราบล่วงหน้า`
        },
        {
          alignment: "center",
          text: `สอบถามรายละเอียดเพิ่มเติมได้ที่ 02-276-5765 ได้ทุกวันจันทร์-ศุกร์ เวลา 09.00-18.00 น.`
        },
        `\n`,
        {
          text: `ข้าพเจ้า.................................................... ได้อ่านรายละเอียดเกี่ยวกับค่าใช้จ่ายต่างๆข้างต้นเรียบร้อยแล้ว และยอมรับในเงื่อนไขของค่าใช้จ่ายทั้งหมด	`
        },
        `\n`,
        {
          alignment: "right",
          text: `ลงชื่อ.................................................................................วันที่............................................`
        }
      ], // end content
      styles: {
        header: { fontSize: 18 },
        acPayeeOnly: { fontSize: 30 },
        rexText: {},
        blueText: {},
        boldText: {}
      },
      pageMargins: [40, 30, 40, 30],

      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 11,
        columnGap: 20
      }
    };
    pdfMake.createPdf(docDefinition).download(`f2`);
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
          <input
            type="number"
            min="0"
            step="any"
            value={newF2.cheque || ""}
            name="cheque"
            onChange={handleChangeF2}
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
          <input
            type="number"
            min="0"
            step="any"
            value={newF2.deposit || ""}
            name="deposit"
            onChange={handleChangeF2}
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
    setNewCase({
      approve_amount: "0",
      old_finance_closing_fee: "0",
      old_finafer_fnce_transee: "0",
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
      act_renewal_fee: "0"
    });
  };

  return (
    <div>
      <div id="modalAddF2" className="modal modal-fixed-footer">
        {console.log(newF2)}
        <div className="navbar-fixed">
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
        </div>
        {console.log("------------------------------------------------")}
        {console.log("singleCase: ", singleCase)}
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
                <div className="row col s4 m4 ">
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

                <div className="row col s4 m4 ">
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
                </div>
              </div>
              <div className="col s12 m12  head-section no-col-padding">
                <h5>ค่าใช้จ่าย cartrust</h5>
              </div>

              <div className="col s6 m6 l6 content">
                <label>ยอดปิดไฟแนนซ์เก่า (บาท)</label>
                <input
                  type="number"
                  step="any"
                  name="old_finance_closing_fee"
                  onFocus={deletezero}
                  value={
                    newF2.old_finance_closing_fee ||

                    ""
                  }
                  onChange={handleChangeF2}
                  className="validate"
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  name="old_finance_closing_fee_note"
                  value={
                    newF2.old_finance_closing_fee_note ||

                    ""
                  }
                  onChange={handleChangeF2T}
                  className="validate"
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าโอนไฟแนนซ์เก่า</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  onFocus={deletezero}
                  value={newF2.old_finance_transfer_fee || ""}
                  name="old_finance_transfer_fee"
                  onChange={handleChangeF2}
                />
              </div>


              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.old_finance_transfer_fee_note || ""}
                  name="old_finance_transfer_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>



              <div className="col s6 m6 l6 content">
                <label>ค่าบริการปิดเล่ม</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  onFocus={deletezero}
                  value={newF2.book_closing_fee || ""}
                  name="book_closing_fee"
                  onChange={handleChangeF2}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  onFocus={deletezero}
                  value={newF2.book_closing_fee_note || ""}
                  name="book_closing_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>




              <div className="col s6 m6 l6 content">
                <label>ภาษีมูลค่าเพิ่ม 7%</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  onFocus={deletezero}
                  value={newF2.vat7_fee || ""}
                  name="vat7_fee"
                  onChange={handleChangeF2}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.vat7_fee_note || ""}
                  name="vat7_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>



              <div className="col s6 m6 l6 content">
                <label>ส่วนลดพิเศษ</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  onFocus={deletezero}
                  value={newF2.discount_fee || ""}
                  name="discount_fee"
                  onChange={handleChangeF2}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.discount_fee_note || ""}
                  name="discount_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>รวมค่าใช้จ่ายคาร์ทรัส</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  disabled
                  value={
                    parseInt(newF2.old_finance_closing_fee) +
                    parseInt(newF2.old_finance_transfer_fee) +
                    parseInt(newF2.book_closing_fee) +
                    parseInt(newF2.vat7_fee) +
                    parseInt(newF2.transfer_fee) +
                    parseInt(newF2.duty_fee) +
                    parseInt(newF2.discount_fee)
                  }
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
                  value={newF2.car_shield_fee || ""}
                  name="car_shield_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.car_shield_fee_note || ""}
                  name="car_shield_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าประกันภัยรถยนต์ (บาท)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newF2.car_insurance_fee || ""}
                  name="car_insurance_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.car_insurance_fee_note || ""}
                  name="car_insurance_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าบริการจัดชุดโอน (บาท)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newF2.transfer_service_fee || ""}
                  name="transfer_service_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"

                  value={newF2.transfer_service_fee_note || ""}
                  name="transfer_service_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าทำสัญญา (บาท)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newF2.contract_fee || ""}
                  name="contract_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.contract_fee_note || ""}
                  name="contract_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าโอนนอก (บาท)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newF2.outside_transfer_fee || ""}
                  name="outside_transfer_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.outside_transfer_fee_note || ""}
                  name="outside_transfer_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าต่อภาษี (บาท)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newF2.tax_renewal_fee || ""}
                  name="tax_renewal_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.tax_renewal_fee_note || ""}
                  name="tax_renewal_fee_note"
                  onChange={handleChangeF2T}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>ค่าต่่อพรบ (บาท)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newF2.act_renewal_fee || ""}
                  name="act_renewal_fee"
                  onChange={handleChangeF2}
                  onFocus={deletezero}
                  onBlur={addzero}
                />
              </div>

              <div className="col s6 m6 l6 content">
                <label>หมายเหตุ</label>
                <input
                  type="text"
                  value={newF2.act_renewal_fee_note || ""}
                  name="act_renewal_fee_note"
                  onChange={handleChangeF2T}
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
                      parseInt(newF2.car_shield_fee) +
                      parseInt(newF2.car_insurance_fee) +
                      parseInt(newF2.transfer_service_fee) +
                      parseInt(newF2.contract_fee) +
                      parseInt(newF2.outside_transfer_fee) +
                      parseInt(newF2.tax_renewal_fee) +
                      parseInt(newF2.act_renewal_fee)}
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
                    value={parseInt(newF2.old_finance_closing_fee) +
                      parseInt(newF2.old_finance_transfer_fee) +
                      parseInt(newF2.book_closing_fee) +
                      parseInt(newF2.vat7_fee) +
                      parseInt(newF2.transfer_fee) +
                      parseInt(newF2.duty_fee) +
                      parseInt(newF2.discount_fee) +
                      parseInt(newF2.car_shield_fee) +
                      parseInt(newF2.car_insurance_fee) +
                      parseInt(newF2.transfer_service_fee) +
                      parseInt(newF2.contract_fee) +
                      parseInt(newF2.outside_transfer_fee) +
                      parseInt(newF2.tax_renewal_fee) +
                      parseInt(newF2.act_renewal_fee)}
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
                    value={(parseInt(newF2.old_finance_closing_fee) +
                      parseInt(newF2.old_finance_transfer_fee) +
                      parseInt(newF2.book_closing_fee) +
                      parseInt(newF2.vat7_fee) +
                      parseInt(newF2.transfer_fee) +
                      parseInt(newF2.duty_fee) +
                      parseInt(newF2.discount_fee) +
                      parseInt(newF2.car_shield_fee) +
                      parseInt(newF2.car_insurance_fee) +
                      parseInt(newF2.transfer_service_fee) +
                      parseInt(newF2.contract_fee) +
                      parseInt(newF2.outside_transfer_fee) +
                      parseInt(newF2.tax_renewal_fee) +
                      parseInt(newF2.act_renewal_fee)) - newF2.approve_amount}
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
                  value={singleCase.old_bank || ""}
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
                    parseInt(newF2.old_finance_closing_fee) +
                    parseInt(newF2.old_finance_transfer_fee)
                  }
                  name="old_finance_total_cost"

                />
              </div>

              {payment()}
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
    </div>
  );
};

export default ModalAddF2;
