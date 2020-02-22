import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalExcel = ({ }) => {

  return (
    <div>
      <div id="modalExcel" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>Excel</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">

          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=team&value=Team1&date=${Date()}`  } target="_blank">Team1</a>
          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=team&value=Team2&date=${Date()}`} target="_blank" >Team2</a>
          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=team&value=Team3&date=${Date()}`} target="_blank" >Team3</a>
          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=team&value=Team4&date=${Date()}`} target="_blank" >Team4</a>
          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=team&value=TeamA&date=${Date()}`} target="_blank" >ทีมใหญ่</a>
          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=case_source&value=Thanachart&date=${Date()}` }  target="_blank">thanachart Bank</a>
          <a className="btn modal-trigger tde-g" href={`${url}/case_excel_file?parameter=all&value=all&date=${Date()}`}  target="_blank">All</a>
               
          </div>
        </div>





        <div className="modal-footer">


          <button className="modal-close waves-effect btn white black-text right" >close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalExcel
