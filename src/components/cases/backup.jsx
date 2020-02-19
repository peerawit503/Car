import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';

/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddCase = () => {
  const [newCase, setNewCase] = useState({})

  useEffect(() => {
    console.log('new case' , newCase);
  })

  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setNewCase({})
  }

  return (
    <div>
      <div id="modalAddCase" className="modal modal-fixed-footer">

      <div className="navbar-fixed">
        <nav className="no-padding-left nav-noclor">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo left"><img src={ cartrustLogo } alt="cartrust logo" style={ { width: "150px", height: 'auto', marginLeft: '50px' } } /></a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right " >
              <li ><Link to="/"><i className="material-icons" >exit_to_app</i></Link></li>
            </ul>
          </div>
        </nav>
      </div>

        <div className="modal-content modal-content-override">
          <h6>ADD NEW CASE  ยังไม่มีapi</h6>
          <div className="row">

            <div className="col s12 m6 l2">
              <label >Case Status / สถานะเคส</label>
              <select
                name="caseStatus"
                className='browser-default'
                value={ newCase.caseStatus || "DEFAULT" }
                onChange={ handleChange }
              >
                <option value="DEFAULT" disabled>เลือกสถานะเคส </option>
                { caseStatus.map((c) => <option key={ uuid.v4() } value={ c }>{ c }</option>) }
              </select>
            </div>

            <div className=" col s12 m6 l2 ">
              <label >JOB No.</label>
              <input
                type="text"
                name="jobNum"
                value={ newCase.jobId }
                onChange={ handleChange }
                className="validate"

              />
            </div>

            <div className=" col s12 m6 l2 ">
              <label >Receiver Date/ วันที่รับเคส</label>
              <input
                type="date"
                value={ newCase.date }
                name='dateAddCase'
                onChange={ handleChange }

              />
            </div>

            <div className="col s12 m6 l2 ">
              <label >Case Receiver/ ผู้ลงข้อมูล</label>
              <input
                name='receiver'
                value={ newCase.receiver || '' }
                onChange={ handleChange }
                type="text"
                className="validate" />
            </div>

            <div className="col s12 m6 l2 ">
              <label >Case Type / ประเภทเคส</label>
              <select
                name='caseType'
                value={ newCase.caseType || 'DEFAULT' }
                onChange={ handleChange }
                className='browser-default'
              >
                <option value="DEFAULT" disabled>เลือกประเภทเคส </option>
                { caseTypeAll.map((ct) => <option key={ uuid.v4() } value={ ct }>{ ct }</option>) }
              </select>
            </div>

            <div className="col s12 m6 l2 ">
              <label >Case Soure/รับเคสจาก</label>
              <select
                name='caseSource'
                value={ newCase.caseSource || 'DEFAULT' }
                onChange={ handleChange }
                className='browser-default'
              >
                <option value="DEFAULT" disabled>เลือก รับเคสจาก </option>
                { caseSourceAll.map((cS) => <option key={ uuid.v4() } value={ cS }>{ cS }</option>) }
              </select>
            </div>
          </div>

          <h6>INFO. CASE</h6>
          <div className="row">

            <div className="row">
              <div className="col s12 m6 l2 ">
                <label>First Name</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label>Last Name</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label>Phone 1</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label>Phone 2</label>
                <input type="text" />
              </div>
            </div>

            <div className="row">
              <div className="col s12 m6 l2 ">
                <label>Licence Plate No. หมายเลขป้ายทะเบียน</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label >Province / ป้ายทะเบียนจังหวัด</label>
                <select
                  name='province'
                  value={ newCase.province || "DEFAULT" }
                  className='browser-default'
                  onChange={ handleChange }
                >
                  <option value="DEFAULT" disabled>เลือกป้ายทะเบียนจังหวัด </option>
                  { provinceAll.map((pv) => <option key={ uuid.v4() } value={ pv }>{ pv }</option>) }
                </select>
              </div>
              <div className="col s12 m6 l2 ">
                <label>Brand / ยี่ห้อ</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label>Model / รุ่นรถ</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label>Sub-model / รุ่นย่อย</label>
                <input type="text" />
              </div>
              <div className="col s12 m6 l2 ">
                <label>Car Year / ปีรถ</label>
                <input type="text" />
              </div>
            </div>
            <div className="col s12 m6 l3 ">
              <label>Current Finance ไฟแนนซ์เดิม</label>
              <select
                name="oldFinance"
                value={ newCase.oldFinance || "DEFAULT" }
                className='browser-default'
                onChange={ handleChange }
              >
                <option value="DEFAULT" disabled>เลือกไฟแนนซ์เดิม </option>
                { financeInstitution.map((ct) => <option key={ uuid.v4() } value={ ct }>{ ct }</option>) }

              </select>
            </div>
            <div className="col s12 m6 l3 ">
              <label>Finance Institution / สถาบันการเงิน</label>
              <select
                name="newFinance"
                value={ newCase.newFinance || "DEFAULT" }
                className='browser-default'
                onChange={ handleChange }
              >
                <option value="DEFAULT" disabled>เลือกสถาบันการเงิน </option>
                { financeInstitution.map((ct) => <option key={ uuid.v4() } value={ ct }>{ ct }</option>) }
              </select>
            </div>
            <div className="col s12 m6 l2 ">
              <label>Approved Amount / ยอดจัด </label>
              <input type="text" />
            </div>
            <div className="col s12 m6 l2 ">
              <label>Close Amount / ยอดปิด </label>
              <input type="text" />
            </div>
            <div className="col s12 m6 l2 ">
              <label>Down Payment / ยอดดาวน์</label>
              <input type="text" />
            </div>

          </div>{/* finish row info */ }
        </div>{/* finish modal content */ }
        <div className="modal-footer ">
          <button className="waves-effect btn blue lighten left ">Save</button>
          <button className="waves-effect btn orange black-text left " onClick={ resetForm } style={ { marginLeft: '10px' } }>reset</button>
          <button className="modal-close waves-effect btn white black-text right">close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalAddCase
