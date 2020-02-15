import React, { useEffect, useState } from 'react'
import { Steps } from 'rsuite';
import { statusTacking } from '../../Utility/statusCase'
import { actCase, provinceAll, conditionCheckCar, conditionKeppDocument, staffOperOartrust, marginAccount } from '../../Utility/dataCase'
import 'rsuite/dist/styles/rsuite-default.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import axios from 'axios';
import uuid from 'uuid';
import url from '../../Utility/url'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'
import cartrustLogo from '../../img/cartrustLogo.png'

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


const initialValueTracking = {
  tracking: "",
  note_status: "",
  date: "",
  user_id: "",
  F2_picture: "",
  take_car_picture: "",
  approve_amount: "",
  job_id: "",
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
  yes_no: null,
  car_license_book_picture: "",
  close_amount: "",
  deposit: "",
  downPayment: "",
  hirePurchase: '',
  phoneHirePurchase: '',
  condiCheckCar: '',
  condiKeppDoc: "",
  addressCustomer: "",
  staffCartrust: "",
  accFreeMargin: "",
  refinanceF2: false,
  tradingThemselF2: false,
  pledgeF2: false,
  cameraF2: false,

}

const userId = "mohexc"

const ModalTracking = ({ singleCase }) => {


  // data
  const [caseId, setCaseId] = useState('')
  const [aCase, setACase] = useState({})
  const [valueTrack, setValueTrack] = useState(initialValueTracking)
  const [aCustomer, setACustomer] = useState({})
  const [page, setPage] = useState(1)


  // ui
  const [step, setStep] = useState(0)
  const [readCase, setReadCase] = useState([])
  const [prove, setProve] = useState('no')
  const [completTracking, setCompletTracking] = useState('')

  useEffect(() => {
    setStep(0)
    setCaseId(singleCase.case_id)
    setACase(singleCase)
    setReadCase(actCase(step, aCase))
    oneCustomer(singleCase.customer_id)

  }, [singleCase])

  useEffect(() => {

  }, [page])

  useEffect(() => {
    M.Modal.init(document.querySelectorAll('#modalF2'), {})
  }, [])

  useEffect(() => {
    refechData()
    setValueTrack(initialValueTracking)
    setValueTrack({ ...valueTrack, tracking: statusTacking(step) })
    setReadCase(actCase(step, aCase))

  }, [step])

  useEffect(() => {
    cartrustTotalCost()
  }, [valueTrack.old_finance_closing_fee, valueTrack.old_finance_transfer_fee, valueTrack.vat7_fee, valueTrack.transfer_fee, valueTrack.duty_fee, valueTrack.discount_fee])

  const oneCustomer = (customerId) => {
    axios.get(`${url}/customer?customer_id=${customerId}`)
      .then(res => {
        setACustomer(res.data.message)
        console.log(res.data.message)
      }).catch(err => { console.log(err) })
  }

  const refechData = () => {
    axios.get(`${url}/case?case_id=${caseId}`)
      .then(res => {
        setACase(res.data.message)
        setReadCase(actCase(step, aCase))
      })
      .catch(err => { console.log(err) })
  }

  const setValueProve = () => {
    if (prove === 'yes') { setProve('no') }
    if (prove === 'no') { setProve('yes') }
  }

  const nextStep = () => setStep(step + 1)

  const prevStep = () => setStep(step - 1)

  const handleChangeTracking = (e) => {
    setValueTrack({ ...valueTrack, [e.target.name]: e.target.value })

  }

  const beforSaveTracking = () => {
    setValueTrack({ ...valueTrack, user_id: userId })
    saveTracking(valueTrack)
  }
  const handleChangeCheack = (e) => {
    setValueTrack({ ...valueTrack, [e.target.name]: e.target.checked })
  }

  const handleChangefilePicture = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setValueTrack({ ...valueTrack, file: reader.result });
  }

  const cartrustTotalCost = () => {
    let arr = [parseInt(valueTrack.old_finance_closing_fee), parseInt(valueTrack.old_finance_transfer_fee), parseInt(valueTrack.vat7_fee), parseInt(valueTrack.transfer_fee), parseInt(valueTrack.duty_fee), parseInt(valueTrack.discount_fee)]
    let reducer = (acc, curr) => acc + curr
    let total = arr.reduce(reducer)
    setValueTrack({ ...valueTrack, cartrust_total_cost: total })

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
            JOB Number: ${aCase.job_id}
            รีไฟแนนซ์  ซื้อขายกันเอง  จำนำ  กล้อง`
          },
          ],
        },
        { text: `เรื่อง ขอเสนอการจัดไฟแนนซ์` },
        { columns: [{ width: 100, text: `ผู้เช่าซื้อ  ${aCase.name}` }, { text: `โทร` }, { text: `ผู้ขาย` }, { text: `โทร` }] },
        { columns: [{ text: `รุ่น  ${aCase.car_brand}` }, { text: `ทะเบียน ${aCase.car_license}` }, { text: `ปี  ` }, { text: `จังหวัด ${aCase.province} ` }, { text: `เครื่อง   cc` }] },
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
              `${valueTrack.condiCheckCar}`,
              `${valueTrack.condiKeppDoc}`,
              `${valueTrack.staffCartrust}`,
              `${valueTrack.addressCustomer}`,
              `${valueTrack.accFreeMargin}`,
            ]],

          }]
        },
        `\n`,
        { columns: [`ค่าใช้จ่ายcartrust`, `หมายเหตุ`] },
        { columns: [{ width: 100, text: `1.ค่าปิดไฟแนนซ์เก่า` }, { width: 100, text: `${valueTrack.old_finance_closing_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `2.ค่าโอนไฟแนนซ์เก่า` }, { width: 100, text: `${valueTrack.old_finance_transfer_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `3.ค่าบริการปิดเล่ม` }, { width: 100, text: `${valueTrack.book_closing_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `4.ภาษีมูลค่าเพิ่ม 7%` }, { width: 100, text: `${valueTrack.vat7_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `5.ค่าธรรมเนียมโอน` }, { width: 100, text: `${valueTrack.transfer_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `6.ค่าอากร` }, { width: 100, text: `${valueTrack.duty_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `ส่วนลดพิเศษ` }, { width: 100, text: `${valueTrack.discount_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `รวมค่าใช้จ่าย` }, { width: 100, text: `${valueTrack.cartrust_total_cost}` }, { width: 25, text: `บาท` }, ``] },
        `\n`,
        { columns: [`ค่าใช้จ่าย ไฟแนนซ์ใหม่`, `หมายเหตุ`] },

        { columns: [{ width: 100, text: `1.Car Shield` }, { width: 100, text: `${valueTrack.car_shield_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `2.ค่าประกันภัยรถยนต์` }, { width: 100, text: `${valueTrack.car_insurance_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `3.ค่าริการจัดชุดโอน` }, { width: 100, text: `${valueTrack.transfer_service_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `4.ค่าทำสัญญา` }, { width: 100, text: `${valueTrack.contract_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `5.ค่าโอนนอก` }, { width: 100, text: `${valueTrack.outside_transfer_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `6.ค่าต่อภาษี` }, { width: 100, text: `${valueTrack.tax_renewal_fee}` }, { width: 25, text: `บาท` }, ``] },
        { columns: [{ width: 100, text: `7.ค่าต่อพรบ.` }, { width: 100, text: `${valueTrack.act_renewal_fee}` }, { width: 25, text: `บาท` }, ``] },
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

  const saveTracking = (body) => {

    if (valueTrack.date === "") {
      setCompletTracking('check date tracking')
    }
    if (step === 2) {
      console.log(`tracking case level 3`)
      axios.put(`${url}/tracking_case3?case_id=${caseId}`, body)
        .then(res => {
          M.toast({ html: `${res.data.message}` })
          console.log(res.data.message)
          setCompletTracking('save tracking case ขั้นที่ 3 สำเร็จแล้ว')
          // setCompletTracking('save tracking case ขั้นที่ 3 สำเร็จแล้ว')
        })
        .catch(err => { console.log(err) })

    }

    if (step === 8) {
      console.log(`tracking case level 9`)

      axios.put(`${url}/tracking_case9?case_id=${caseId}`, body)
        .then(res => {
          console.log(res.data.message)
          M.toast({ html: `${res.data.message}` })
          setCompletTracking('save tracking case ขั้นที่ 9 สำเร็จแล้ว')
        })
        .catch(err => { console.log(err) })
    }

    if (step === 10) {
      console.log(`tracking case level 11`)
      axios.put(`${url}/tracking_case10?case_id=${caseId}`, body)
        .then(res => {
          M.toast({ html: `${res.data.message}` })
          console.log(res.data.message)
          setCompletTracking('save tracking case ขั้นที่ 11 สำเร็จแล้ว')
        })
        .catch(err => { console.log(err) })
    }

    if (step === 14) {

      axios.put(`${url}/tracking_case15?case_id=${caseId}`, body)
        .then(res => {
          console.log(res.data)
          M.toast({ html: `${res.data.message}` })
          setCompletTracking('save tracking case ขั้นที่ 15 สำเร็จแล้ว')
        })
        .catch(err => { console.log(err) })

    }
    else {
      axios.put(`${url}/tracking_case?case_id=${caseId}`, body)
        .then(res => {
          console.log(res.data)
          M.toast({ html: `${res.data.message}` })
          setCompletTracking(`save tracking case ขั้นที่ ${step + 1} สำเร็จแล้ว`)
        })
        .catch(err => { console.log(err) })

    }
    setTimeout(() => { setCompletTracking('') }, 3000)
  }

  return (
    <div>
      <div id="modalTracking" className="modal modal-fixed-footer">
        <div className="modal-content">

          <div className="row">
            <div className="col s12">
              <div className='ballStep'>
                <Steps current={ step } >
                  {/* currentStatus="" */ }
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                  <Steps.Item />
                </Steps>
              </div>
            </div>
          </div>
          <h5 className="center-align">INFO CASE ID : <span className="chip blue white-text">{ aCase.case_id }</span></h5>

          <table className="centered" >
            <thead>
              <tr>
                <th>Team :</th>
                <th>Doc No. / เลขที่ใบคำขอ :</th>
                <th>Contract Officer / เจ้าหน้าที่ทำสัญญา :</th>
                <th>JOB No</th>
                <th>Customer Name / ชื่อลูกค้า</th>
                <th>LP No. / หมายเลขป้ายทะเบียน</th>
                <th>Province / จังหวัด</th>
                <th>Case Status/สถานะเคส</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> { aCase.team } </td>
                <td> { aCase.document_id } </td>
                <td> { aCase.contract_officer } </td>
                <td> { aCase.job_id } </td>
                <td> { aCase.name } </td>
                <td> { aCase.car_license } </td>
                <td> { aCase.province } </td>
                <td> { aCase.status } </td>
              </tr>
            </tbody>
          </table>

          {/* Tracking System */ }

          <h5 className="center-align"><span className="green-text">Tracking</span></h5>

          { completTracking && (<h6 className="red-text center-align ">{ completTracking }</h6>) }

          <div className="row">
            <div className="col s12 m6 l3">
              Tracking Case
              <input
                type="text"
                name="tracking"
                value={ readCase[0] || "" }
                className="browser default"
                readOnly
              />
            </div>
            <div className="col s12 m6 l3">
              { readCase[1]
                ? <><span className="red-text" >Old Date : </span>{ readCase[1] }</>
                : 'Date Tracking' }
              <input
                type="date"
                id=""
                name="date"
                disabled={ step === 0 }
                value={ valueTrack.date || '' }
                onChange={ handleChangeTracking }
              />

            </div>
            <div className="col s12 m6 l4">
              { readCase[2]
                ? <> <span className="red-text" >Old Note : </span>{ readCase[2] }</>
                : `Note Tracking` }
              <input
                type="text"
                id=""
                name="note_status"
                disabled={ step === 0 }
                value={ valueTrack.note_status || '' }
                onChange={ handleChangeTracking }

              />
            </div>
            <div className="col s12 m6 l2">
              การอนุมัติ : { readCase[3] }
              <input
                className="btn pink col s12"
                type="button"
                id=""
                name="note_status"
                disabled={ step === 0 }
                value={ prove }
                onClick={ setValueProve }
              />
            </div>

          </div>

          {/* Document F2 */ }

          { step === 2 && (
            <>
              <h5 className="center-align pink-text ">เอกสาร <span className="chip red white-text">F2</span> </h5>
              <div className="row">
                <div className="col s12 m6 l2">
                  ผู้เช่าซื้อ : { singleCase.name }
                </div>
                <div className="col s12 m6 l2">
                  เบอร์โทร :
                </div>
              </div>

              <div className="row">
                <div className="col s12 m6 l2">
                  รถ : { singleCase.car_brand }
                </div>
                <div className="col s12 m6 l2">
                  รุ่น : { singleCase.car_model }
                </div>

                <div className="col s12 m6 l2">
                  ทะเบียน : { singleCase.car_license }
                </div>
                <div className="col s12 m6 l2">
                  ปี :
                </div>
              </div>

              <div className="row">
                <div className="col s12 m6 l2">
                  เงื่อนไขตรวจรถ
                  <select
                    className="browser-default"
                    name="condiCheckCar"
                    value={ valueTrack.condiCheckCar || 'DEFAULT' }
                    onChange={ handleChangeTracking }
                  >
                    <option value="DEFAULT" disabled>เงื่อนไขตรวจรถ </option>
                    { conditionCheckCar.map(c => <option key={ uuid.v4() }>{ c }</option>) }
                  </select>
                </div>
                <div className="col s12 m6 l2">
                  เงื่อนไขการเก็บเอกสาร
                  <select
                    className="browser-default"
                    name="condiKeppDoc"
                    value={ valueTrack.condiKeppDoc || 'DEFAULT' }
                    onChange={ handleChangeTracking }
                  >
                    <option value="DEFAULT" disabled>เงื่อนไขการเก็บเอกสาร </option>
                    { conditionKeppDocument.map(c => <option key={ uuid.v4() }>{ c }</option>) }
                  </select>
                </div>
                <div className="col s12 m6 l2">
                  จนท. oper Cartrst
                  <select
                    className="browser-default"
                    name="staffCartrust"
                    value={ valueTrack.staffCartrust || 'DEFAULT' }
                    onChange={ handleChangeTracking }
                  >
                    <option value="DEFAULT" disabled>จนท. oper Cartrst </option>
                    { staffOperOartrust.map(c => <option key={ uuid.v4() }>{ c }</option>) }
                  </select>
                </div>
                <div className="col s12 m6 l2">
                  จังหวัดที่อยู่
                  <select
                    className="browser-default"
                    name="addressCustomer"
                    value={ valueTrack.addressCustomer || 'DEFALT' }
                    onChange={ handleChangeTracking }
                  >
                    <option value="DEFALT" disabled>เลือก จังหวัดที่อยู่</option>
                    { provinceAll.map(province => <option key={ uuid.v4() } value={ province }>{ province }</option>) }
                  </select>
                </div>
                <div className="col s12 m6 l2">
                  บัญชีรับเงินส่วนต่าง
                  <select
                    className="browser-default"
                    name="accFreeMargin"
                    value={ valueTrack.accFreeMargin || 'DEFALT' }
                    onChange={ handleChangeTracking }
                  >
                    <option value="DEFALT" disabled>เลือก บัญชีรับเงินส่วนต่าง</option>
                    { marginAccount.map(ma => <option key={ uuid.v4() } value={ ma }>{ ma }</option>) }
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col s12 m6 l2 mb-3" style={ { display: "flex" } }  >
                  <input
                    type="checkbox"
                    name="refinanceF2"
                    checked={ valueTrack.refinanceF2 }
                    onChange={ handleChangeCheack }
                  />
                  <span>รีไฟแนนซ์</span>
                  <input
                    type="checkbox"
                    name="tradingThemselF2"
                    checked={ valueTrack.tradingThemselF2 }
                    onChange={ handleChangeCheack }
                  />
                  <span>ซื้อขายกันเอง</span>
                  <input
                    type="checkbox"
                    name="pledgeF2"
                    checked={ valueTrack.pledgeF2 }
                    onChange={ handleChangeCheack }
                  />
                  <span>จำนำ</span>
                  <input
                    type="checkbox"
                    name="cameraF2"
                    checked={ valueTrack.cameraF2 }
                    onChange={ handleChangeCheack }
                  />
                  <span>กล้อง</span>
                </div>
              </div>

              <div className="row">
                <div className="col s12 m12 l4  blue lighten-5">
                  <h6>สรุปค่าใช้จ่าย CarTrust</h6>
                  <div className="col s6">
                    ค่าปิดไฟแนนซ์เก่า**
                    <input
                      type="number"
                      min="0"
                      name="old_finance_closing_fee"
                      value={ valueTrack.old_finance_closing_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                    <input type="text" />
                  </div>

                  <div className="col s6">
                    ค่าโอนไฟแนนเก่า**
                    <input
                      type="number"
                      min="0"
                      name="old_finance_transfer_fee"
                      value={ valueTrack.old_finance_transfer_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input type="text" />
                  </div>

                  <div className="col s6">
                    ค่าบริการปิดเล่ม
                    <input
                      type="number"
                      min="0"
                      name="book_closing_fee"
                      value={ valueTrack.book_closing_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input type="text" />
                  </div>

                  <div className="col s6">
                    ภาษีมูลค่าเพิ่ม 7%**
                <input
                      type="number"
                      min="0"
                      name="vat7_fee"
                      value={ valueTrack.vat7_fee }
                      onChange={ handleChangeTracking }

                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าธรรมเนียมการโอน**
                <input
                      type="number"
                      min="0"
                      name="transfer_fee"
                      value={ valueTrack.transfer_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าอากร
                <input
                      type="number"
                      min="0"
                      name="duty_fee"
                      value={ valueTrack.duty_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    สวดลดพิเศษ**
                <input
                      type="number"
                      min="0"
                      name="discount_fee"
                      value={ valueTrack.discount_fee }
                      onChange={ handleChangeTracking }

                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>
                  <div className="col s6">
                    รวมค่าใช้จ่าย Cartrust**
                <input
                      type="number"
                      min="0"
                      name="cartrust_total_cost"
                      value={ valueTrack.cartrust_total_cost }
                      onChange={ cartrustTotalCost }
                    />
                  </div>

                </div>
                <div className="col s12 m12 l4  blue lighten-4">
                  <h6>สรุปค่าใช้จ่าย ไฟแนนซ์</h6>
                  <div className="col s6">
                    car shield**
                <input
                      type="number"
                      min="0"
                      name="car_shield_fee"
                      value={ valueTrack.car_shield_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าประกันภัยรถยนต์**
                <input
                      type="number"
                      min="0"
                      name="car_insurance_fee"
                      value={ valueTrack.car_insurance_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าบริการจัดชุดโอน**
                <input
                      type="number"
                      min="0"
                      name="transfer_service_fee"
                      value={ valueTrack.transfer_service_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าทำสัญญา**
                <input
                      type="number"
                      min="0"
                      name="contract_fee"
                      value={ valueTrack.contract_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าโอนนอก**
                <input
                      type="number"
                      min="0"
                      name="outside_transfer_fee"
                      value={ valueTrack.outside_transfer_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>

                  <div className="col s6">
                    ค่าต่อภาษี**
                <input
                      type="number"
                      min="0"
                      name="tax_renewal_fee"
                      value={ valueTrack.tax_renewal_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>
                  <div className="col s6">
                    ค่าต่อพรบ**
                <input
                      type="number"
                      min="0"
                      name="act_renewal_fee"
                      value={ valueTrack.act_renewal_fee }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                  <div className="col s6">
                    หมายเหตุ
                <input
                      type="text"
                    />
                  </div>
                  <div className="col s6">
                    รวมค่าใช้จ่ายไฟแนนใหม่**
                <input
                      type="number"
                      min="0"
                      name="new_finance_total_cost"
                      value={ valueTrack.new_finance_total_cost }
                      onChange={ handleChangeTracking }
                    />
                  </div>
                </div>  {/*finish ค่าใช้จ่ายcartrust */ }

                <div className="col s12 m12 l4  blue lighten-3">
                  <h6 >สรุปการจ่ายเงินให้ลูกค้า F2</h6>
                  <div className="col s6">
                    จ่ายเงินสด
                <input
                      type="number"
                      min="0"
                    />
                  </div>
                  <div className="col s6">
                    โอนเงินเข้าธนาคาร
                <input
                      type="text"
                    />
                  </div>
                  <div className="col s6">
                    จ่ายเป็นเช็ค
                <input
                      type="text"
                    />
                  </div>
                  <div className="col s6">
                    ชื่อผู้รับเช็ค
                  <input type="text"
                    />
                  </div>
                  <div className="col s6">
                    จ่ายมัดจำ
                    <input type="text"
                    />
                  </div>
                  <div className="col s6">
                    ชื่อผู้รับเงินมัดจำ
                      <input type="text" />
                  </div>
                  <div className="col s6">
                    <button className="col s12 btn green my-3" onClick={ printPDF }>print pdf</button>
                  </div>
                </div>
              </div>
            </>
          ) }

          { step === 8 && (
            <>
              <div className="row">
                <div className="col s12 m6 l3">
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>รูป ทะเบียนเล่มรถ</span>
                      <input
                        type="file"
                        name='car_license_book_picture'
                        value={ valueTrack.car_license_book_picture }
                        onChange={ handleChangefilePicture }
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" placeholder="Upload one " />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) }

          { step === 10 && (
            <>

              <div className="row">
                <div className="col s12 m6 l3">
                  ยอดเงินเข้าบริษัท
                  <input
                    type="text"
                    name="close_amount"
                    value={ valueTrack.close_amount }
                  />
                </div>
              </div>
            </>
          ) }

          {/* { step === 13 && (
            <>
              <div className="row">
                <div className="col s12 m6 l3">
                  <p>รsearh field ยอดเงินเข้าบริษัท :????????</p>

                </div>
              </div>
            </>
          ) } */}

          { step === 14 && (
            <>
              <div className="row">
                <div className="col s12 m6 l3">
                  เงินมัดจำ
                  <input
                    type="number"
                    name="deposit"
                    value={ valueTrack.deposit }
                    onChange={ handleChangeTracking }
                  />
                </div>
              </div>
            </>
          ) }

        </div >
        <div className="modal-footer btnModalView ">
          <button className="btn wave-effect blue  lighten waves-green  " disabled={ step === 0 } onClick={ prevStep }>Prev</button>
          <button className="btn wave-effect green   waves-green  " onClick={ beforSaveTracking } disabled={ step === 0 }>Save Trangking</button>

          <div>
            <button className="btn wave-effect blue lighten  waves-green" style={ { marginRight: '40px' } } disabled={ step === 15 } onClick={ nextStep } >Next</button>
            <a href="#!" className="modal-close waves-effect waves-green btn white black-text">Close</a>
          </div>
        </div>
      </div >
    </div >
  )
}

export default ModalTracking
