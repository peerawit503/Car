import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
/* img */
import cartrustLogo from '../../img/cartrustLogo.png'
import url from '../../Utility/url'
import moment from 'moment'


pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}


const ModalContractInfo = ({ singleCase }) => {



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
    f2_status: "done"
  })
  const [formState, setformState] = useState(1)
  const [newCase, setNewCase] = useState({})
  const [bank, setBank] = useState({ b1: true, b2: false })
  const [difference, setDifference] = useState({ d1: true, d2: false })

  var summary = 0;
  useEffect(() => {

  })
  function setCartrustCost(){
    var summary = parseInt(newF2.old_finance_closing_fee) + parseInt(newF2.old_finance_transfer_fee) + parseInt(newF2.book_closing_fee +newF2.vat7_fee) + parseInt(newF2.transfer_fee) + parseInt(newF2.duty_fee) + parseInt(newF2.discount_fee);
    console.log(summary)
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }





  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
    setNewCase({ ...newCase, [e.target.name]: e.target.value })

  }

  const handleChangeF2 = (e) => {
    setNewF2({ ...newF2, [e.target.name]: e.target.value ,cartrust_total_cost: parseInt(newF2.old_finance_closing_fee) + parseInt(newF2.old_finance_transfer_fee) + parseInt(newF2.book_closing_fee +newF2.vat7_fee) + parseInt(newF2.transfer_fee) + parseInt(newF2.duty_fee) + parseInt(newF2.discount_fee)})
    setNewF2({ ...newF2, [e.target.name]: e.target.value ,cartrust_total_cost: parseInt(newF2.old_finance_closing_fee) + parseInt(newF2.old_finance_transfer_fee) + parseInt(newF2.book_closing_fee +newF2.vat7_fee) + parseInt(newF2.transfer_fee) + parseInt(newF2.duty_fee) + parseInt(newF2.discount_fee)} )
   
    
    // cartrust_total_cost
    // setNewF2({ ...newF2, ["cartrust_total_cost"]: cartrust_total_cost })
  }

  const deletezero = (e) => {
    if (e.target.value == 0) {
      e.target.value = "";
    }

  }

  const handleChangeB_1 = (e) => setBank({ b1: true, b2: false })
  const handleChangeB_2 = (e) => setBank({ b1: false, b2: true })


  const handleChangeD_1 = (e) => setDifference({ d1: true, d2: false })
  const handleChangeD_2 = (e) => setDifference({ d1: false, d2: true })


  function saveF2() {
    newF2.approve_amount = numberWithCommas(newF2.approve_amount)
    newF2.old_finance_closing_fee = numberWithCommas(newF2.old_finance_closing_fee)
    newF2.old_finafer_fnce_transee = numberWithCommas(newF2.old_finafer_fnce_transee)
    newF2.book_closing_fee = numberWithCommas(newF2.book_closing_fee)
    newF2.vat7_fee = numberWithCommas(newF2.vat7_fee)
    newF2.transfer_fee = numberWithCommas(newF2.transfer_fee)
    newF2.duty_fee = numberWithCommas(newF2.duty_fee)
    newF2.discount_fee = numberWithCommas(newF2.discount_fee)
    newF2.car_shield_fee = numberWithCommas(newF2.car_shield_fee)
    newF2.car_insurance_fee = numberWithCommas(newF2.car_insurance_fee)
    newF2.transfer_service_fee = numberWithCommas(newF2.transfer_service_fee)
    newF2.contract_fee = numberWithCommas(newF2.contract_fee)
    newF2.outside_transfer_fee = numberWithCommas(newF2.outside_transfer_fee)
    newF2.tax_renewal_fee = numberWithCommas(newF2.tax_renewal_fee)
    newF2.act_renewal_fee = numberWithCommas(newF2.act_renewal_fee)
    var data = JSON.stringify(newF2);
    axios.post(`${url}/F2?case_id=${singleCase.case_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('#####  RES  ######');
      console.log('Case', res.data.message);
    })
      .catch(err => console.log(err))

    console.log(newF2);
  }

  const printPDF = () => {
    var docDefinition = {
      content: [
        {
          columns: [{ width: 150, height: 60, image: cartrustLogo }, { text: `ใบเสนอยอดจัดและดอกเบี้ยรถยนต์มือสอง`, style: `header` },
          {
            fontSize: 12,
            text: `F2
            วันที่จัดทำ ${moment().format('l')}
            รหัสลูกค้า: 
            JOB Number: ${singleCase.job_id}
            รีไฟแนนซ์  ซื้อขายกันเอง  จำนำ  กล้อง`
          },
          ],
        },
        { text: `เรื่อง ขอเสนอการจัดไฟแนนซ์` },
        { columns: [{ width: 100, text: `ผู้เช่าซื้อ  ${singleCase.name}` }, { text: `โทร` }, { text: `ผู้ขาย` }, { text: `โทร` }] },
        { columns: [{ text: `รุ่น  ${singleCase.car_brand}` }, { text: `ทะเบียน ${singleCase.car_license}` }, { text: `ปี  ` }, { text: `จังหวัด ${singleCase.province} ` }, { text: `เครื่อง   cc` }] },
        {
          columns: [[
            { columns: [`ราคาซื้อขาย`, `jhjhkjhkjh`, `บาท`, `สถาบันการเงิน`, `jhkjhk`] },
            { columns: [`ยอดจัดที่ได้ `, `hjhkjhjkhkjh`, `บาท`, `เลขคุม`, `jhkh`] },
            { columns: [`มัดจำเล่ม(กรณีมัดจำเล่มจากไฟแนนซ์เดิมได้) `, `hjhkjhkjบาท`] },
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
                      ['24เดือน', '36เดือน', '48เดือน', '60เดือน', '72เดือน'],
                      [``, ``, ``, ``, ``],
                      [``, ``, ``, ``, ``],
                      [``, ``, ``, ``, ``]

                    ]
                  }
                }
              ]
            }
          ], {
            width: 150,
            columns: [[
              `เงื่อนไขการตวจรถ`,
              `เงื่อนไขการเก็บเอกสาร`,
              `จนท. Oper Cartrust`,
              `จังหวัดที่อยู่อาศัย`,
              `บัญชีรับเงินส่วนต่าง`,
            ], [
              `zcvzvxzxcv`,
              `zvczvxzxvc`,
              `zxcvzvxzcvx`,
              `zxcvzxvcxzvc`,
              `zxcvxzcvxzvczxcv`,
            ]],

          }]
        },
        `\n`,
        { columns: [`ค่าใช้จ่ายcartrust`, `หมายเหตุ`] },
        { columns: [{ width: 100, text: `1.ค่าปิดไฟแนนซ์เก่า` }, { width: 100, text: `${newF2.old_finance_closing_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `2.ค่าโอนไฟแนนซ์เก่า` }, { width: 100, text: `${newF2.old_finance_transfer_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `3.ค่าบริการปิดเล่ม` }, { width: 100, text: `${newF2.book_closing_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `4.ภาษีมูลค่าเพิ่ม 7%` }, { width: 100, text: `${newF2.vat7_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `5.ค่าธรรมเนียมโอน` }, { width: 100, text: `${newF2.transfer_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `6.ค่าอากร` }, { width: 100, text: `${newF2.duty_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `ส่วนลดพิเศษ` }, { width: 100, text: `${newF2.discount_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `รวมค่าใช้จ่าย` }, { width: 100, text: `${newF2.cartrust_total_cost}` }, { width: 25, text: `บาท` }, ``] },
        `\n`,
        { columns: [`ค่าใช้จ่าย ไฟแนนซ์ใหม่`, `หมายเหตุ`] },

        { columns: [{ width: 100, text: `1.Car Shield` }, { width: 100, text: `${newF2.car_shield_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `2.ค่าประกันภัยรถยนต์` }, { width: 100, text: `${newF2.car_insurance_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `3.ค่าริการจัดชุดโอน` }, { width: 100, text: `${newF2.transfer_service_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `4.ค่าทำสัญญา` }, { width: 100, text: `${newF2.contract_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `5.ค่าโอนนอก` }, { width: 100, text: `${newF2.outside_transfer_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `6.ค่าต่อภาษี` }, { width: 100, text: `${newF2.tax_renewal_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `7.ค่าต่อพรบ.` }, { width: 100, text: `${newF2.act_renewal_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `รวมค่าใช้จ่าย` }, { width: 100, text: `` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `ยอดเงินที่จะได้รับ` }, { width: 100, text: `` }, { width: 25, text: `บาท` }, ``] },
        { text: `\n` },
        { columns: [{ width: 100, text: `1]	จ่ายเป็นเงินสดให้` }, ``, { alignment: 'right', text: `บาท` }] },
        { columns: [{ width: 100, text: `2]	ทำเช็คจ่ายให้` }, ``, { alignment: 'right', text: `บาท` }] },
        { columns: [{ width: 100, text: `3]	มัดจำจ่ายให้ ` }, ``, { alignment: 'right', text: `บาท` }] },
        `\n`,
        { text: `หมายเหตุ : เงื่อนไขการมัดจำเช็ค ลูกค้าต้องนำรถยนต์เข้าตรวจสภาพภายใน 3 วัน เมื่อเจ้าหน้าที่หรือบริษัทฯ ร้องขอ มิเช่นนั้น ทางบริษัทฯ ขอหักเงินมัดจำเป็นจำนวน 50% ของยอดเงินที่มัดจำไว้ และหากลูกค้าไม่ดำเนินการให้ตามที่บริษัทร้องขอภายใน 5 วัน บริษัทฯ ขอสงวนสิทธิ์ในการคืนเงินมัดจำทั้งหมด` },
        { fontSize: 16, text: `ปั๊ม A/C PAYEE ONLY ด้วย` },
        { alignment: 'center', text: `เงื่อนไขยอดจัด,ดอกเบี้ยและค่าใช้จ่ายอาจมีการเปลี่ยนแปลง หากไม่ตรงตามตามเกณฑ์มาตรฐานที่แจ้งไว้ โดยทางบริษัทไม่ต้องแจ้งให้ท่านทราบล่วงหน้า` },
        { alignment: 'center', text: `สอบถามรายละเอียดเพิ่มเติมได้ที่ 02-276-5765 ได้ทุกวันจันทร์-ศุกร์ เวลา 09.00-18.00 น.` },
        `\n`,
        { text: `ข้าพเจ้า.................................................... ได้อ่านรายละเอียดเกี่ยวกับค่าใช้จ่ายต่างๆข้างต้นเรียบร้อยแล้ว และยอมรับในเงื่อนไขของค่าใช้จ่ายทั้งหมด	` },
        `\n`,
        { alignment: 'right', text: `ลงชื่อ.................................................................................วันที่............................................` }
      ],// end content 
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
    pdfMake.createPdf(docDefinition).download(`f2`)

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
            value={newCase.check_pay || ""}
            name="check_pay"
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
          value={newCase.pledge_pay || ""}
          name="pledge_pay"
          onChange={handleChange}
        />
      </div>

      );
      result.push(<div className="col s6 m4 l4 content">
        <label >ชื่อผู้รับเช็ค </label>
        <input
          type="text"
          value={newCase.check_reciever_name || ""}
          name="check_reciever_name"
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

          value={newCase.pledge_reciever_name || ""}
          name="pledge_reciever_name"
          onChange={handleChange}
        />
      </div>);

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
      act_renewal_fee: "0",
    })
  }

  return (
    <div>
      <div id="modalAddContractInfo" className="modal modal-fixed-footer">

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
                <h4>Case : {singleCase.job_id}</h4>
              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}

        <div className="cotent-field">
        <div className="row content">
    
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
      
    }

        </div>

        <div className="modal-footer">

          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >close</button>
          {/* <button className="waves-effect btn orange black-text right " onClick={ resetForm } style={ { marginRight: '10px' ,marginLeft: '10px' } }>reset</button> */}
          <button className="waves-effect btn blue lighten right " onClick={() => printPDF()}>Save</button>

        </div>
      </div>

    </div >
  )
}

export default ModalContractInfo