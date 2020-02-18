import React, { useEffect, useState } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import M from 'materialize-css/dist/js/materialize.min.js'
import url from '../../Utility/url'
import axios from 'axios'
import uuid from 'uuid';

const userId = "mohexc"

const initailNewCase = {
  user_id: userId,
  customer_id: "",

  document_id: "",
  old_bank: "",
  new_bank: "",
  status: "",
  note_status: "",
  team: "",
  contract_officer: "",
  finance_staff: "",
  case_type: "",
  case_receiver: "",
  case_source: "",
  job_id: "",
  down_amount: "",

  case_status: "",
  car_name: "",
  car_brand: "",
  car_model: "",
  car_sub_model: "",
  car_year: "",
  car_license: "",
  province: "",
  car_detail: "",
}

const ModalAddCaseCustomer = ({ customer }) => {


  const [newCase, setNewCase] = useState(initailNewCase)
  const [baseCustomer, setBaseCustomer] = useState({})
  const [listTeam2, setListTeam2] = useState([])
  const [complete, setComplete] = useState('')

  useEffect(() => {
    setLisTeam()

  }, [])

  useEffect(() => {
    if (customer.customer_id) {
      setBaseCustomer(customer)
      setNewCase({ ...newCase, customer_id: customer.customer_id })
    }

  }, [customer])

  const setLisTeam = () => {
    axios.get(`${url}/team_all`)
      .then(res => { setListTeam2(res.data.message) })
      .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
  }

  const prevAddCase = (e) => {
    e.preventDefault()
    if (newCase.case_status) {
      axios.post(`${url}/add_case`, newCase)
        .then(res => {
          M.toast({ html: `${res.data.message}` })
          setComplete(`Add new case สมบูรณ์`)
          alert(`Add new case สมบูรณ์`)
        })
        .catch(err => console.log(err))
    }
  }



  // modal - fixed - footer
  return (
    <div id="modalAddCaseCustomer" className="modal modal-fixed-footer" >
      <div className="modal-content">
        <div style={ { display: 'flex', justifyContent: "space-between" } }>
          <h6>ADD NEW CASE</h6>
          <h6 className="green-text">{ complete }</h6>
        </div>
        <div className="row">
          <div className="col s12 m6 l2">ชื่อ : { baseCustomer.firstname }</div>
          <div className="col s12 m6 l2">นามสกุล : { baseCustomer.lastname }</div>
          <div className="col s12 m6 l2"> id : { baseCustomer.id }</div>
          <div className="col s12 m6 l2">เบอร์โทร : { baseCustomer.tel }</div>
          <div className="col s12 m6 l2"> email : { baseCustomer.email }</div>
          <div className="col s12 m6 l2"> line : { baseCustomer.line }</div>
        </div>
        <div className="row">
          <div className="col s6 m6 l1">
            <label >Brand / ยี่ห้อ</label>
            <input type="text" name="car_brand" value={ newCase.car_brand } onChange={ handleChange } />
          </div>
          <div className="col s6 m6 l1">
            <label >Model / รุ่นรถ</label>
            <input type="text" name="car_mode" value={ newCase.car_mode } onChange={ handleChange } />
          </div>
          <div className="col s6 m6 l2">
            <label >Sub-model /  รุ่นย่อย</label>
            <input type="text" name="car_sub_model" value={ newCase.car_sub_model } onChange={ handleChange } />
          </div>
          <div className="col s6 m6 l1">
            <label >Car Year / ปีรถ</label>
            <input type="text" name="car_year" value={ newCase.car_year } onChange={ handleChange } />
          </div>
          <div className="col s6 m6 l2">
            <label >LP No. หมายเลขป้ายทะเบียน</label>
            <input type="text" name="car_license" value={ newCase.car_license } onChange={ handleChange } />
          </div>
          <div className="col s6 m6 l2">
            <label >Province / จังหวัด</label>
            <select
              className='browser-default'
              name='province'
              value={ newCase.province || "DEFAULT" }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือกจังหวัด </option>
              { provinceAll.map((pv) => <option key={ uuid.v4() } value={ pv }>{ pv }</option>) }
            </select>
          </div>
          <div className="col s12 m6 l3">
            <label >Detail car / รายละเอียดรถ</label>
            <input type="text" name="car_detail" value={ newCase.car_detail } onChange={ handleChange } />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6 l2">
            <label >Team</label>
            <select
              className='browser-default'
              name='team'
              value={ newCase.team }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือกTeam </option>
              { listTeam2.map((t) => <option key={ uuid.v4() } value={ t.team_id }>{ t.team_name }</option>) }
            </select>

          </div>

          <div className="col s12 m6 l2">
            <label >Document No. / เลขที่ใบคำขอ</label>
            <input
              type="text" name="document_id" value={ newCase.document_id } onChange={ handleChange } />
          </div>

          <div className="col s12 m6 l2">
            <label >Contract Officer / เจ้าหน้าที่ทำสัญญา</label>
            <input type="text" name="contract_officer" value={ newCase.contract_officer } onChange={ handleChange } />
          </div>

          <div className="col s12 m6 l2">
            <label >JOB No.</label>
            <input
              type="text"

              name="job_id"
              value={ newCase.job_id }
              onChange={ handleChange } />
          </div>

          <div className="col s12 m6 l2">
            <label >Case Type / ประเภทเคส</label>
            <select
              className='browser-default'
              name='caseType'
              value={ newCase.caseType }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือกประเภทเคส </option>
              { caseTypeAll.map((ct) => <option key={ uuid.v4() } value={ ct }>{ ct }</option>) }
            </select>
          </div>

          <div className="col s12 m6 l2">
            <label >Case Receiver / ผู้ลงข้อมูล</label>
            <input
              type="text"

              name="case_receiver"
              value={ newCase.case_receiver }
              onChange={ handleChange }
            />
          </div>

          <div className="col s12 m6 l2">
            <label >Case Source / รับเคสจาก</label>
            <select
              className='browser-default'
              name='case_sorce'
              value={ newCase.case_sorce || "DEFAULT" }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือก รับเคสจาก </option>
              { caseSourceAll.map((cS) => <option key={ uuid.v4() } value={ cS }>{ cS }</option>) }
            </select>
          </div>

          <div className="col s12 m6 l2">
            <label >Finance Staff</label>
            <input
              type="text"

              name="finance_staff"
              value={ newCase.finance_staff }
              onChange={ handleChange }
            />
          </div>

          <div className="col s12 m6 l2">
            <label >Old Bank</label>
            <select
              className='browser-default'
              name="old_bank"
              value={ newCase.old_bank || "DEFAULT" }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือกไฟแนนซ์เดิม </option>
              { financeInstitution.map((ct) => <option key={ uuid.v4() } value={ ct }>{ ct }</option>) }
            </select>
          </div>

          <div className="col s12 m6 l2">
            <label >New Bank</label>
            <select
              className='browser-default'
              name="new_bank"
              value={ newCase.new_bank || "DEFAULT" }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือกไฟแนนซ์ใหม่ </option>
              { financeInstitution.map((ct) => <option key={ uuid.v4() } value={ ct }>{ ct }</option>) }
            </select>
          </div>

          <div className="col s12 m6 l2">
            <label >Case status</label>
            <select
              className='browser-default'
              name="case_status"
              value={ newCase.case_status || "DEFAULT" }
              onChange={ handleChange }
            >
              <option value="DEFAULT" disabled>เลือกสถานะเคส </option>
              { caseStatus.map((c) => <option key={ uuid.v4() } value={ c }>{ c }</option>) }
            </select>
          </div>

          <div className="col s12 m6 l2">
            <label >Approved Amount / ยอดจัด</label>
            <input
              type="number"
              name="down_amount"
              value={ newCase.down_amount }
              onChange={ handleChange }
            />
          </div>

          <div className="col s12 m12 l12">
            <label >Note</label>
            <input
              type="text"
              name="note_status"
              value={ newCase.note_status }
              onChange={ handleChange }
            />
          </div>
        </div>

      </div>{/* finish modal-content */ }
      <div className="modal-footer">
        <a href="#!" className=" waves-effect waves-green btn blue linghten left" onClick={ prevAddCase }>Add Case</a>
        <a href="#!" className="modal-close waves-effect waves-green btn white black-text">Close</a>
      </div>
    </div>
  )
}

export default ModalAddCaseCustomer
