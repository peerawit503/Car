import React, { useState, useEffect } from 'react'
import { financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll } from '../../Utility/dataCase'
import uuid from "uuid"
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utility/url'
/* img */
import cartrustLogo from '../../img/cartrustLogo.svg'


const ModalAddNote = ({ singleCase, translate , caseStatusShift }) => {

  const [newNote, setNewNote] = useState({})

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value })
  }

  function save() {
    // setNewNote({note : newNote.note, tracking: singleCase.status , user_id : 'mock'})
    var data = JSON.stringify({note_status:newNote.note ,tracking: singleCase.status , user_id : 'mock' });
    console.log('###### data ########');
    console.log(data);
    axios.post(`${url}/note?case_id=${singleCase.case_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('#####  RES  ######');
      console.log('Case', res.data.message);
    })
      .catch(err => console.log(err))
  }
  function close() {
    setNewNote({});
  }

  return (
    <div>
      <div id="modalAddNote" className="modal modal-fixed-footer">

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
                <h5>Add Note For : {singleCase.job_id}</h5><br/>
                <h5>Add Note For : {singleCase.case_id}</h5><br/>
                <h5>สถานะปัจจุบัน : {translate(singleCase.status)}</h5><br/>
                <h5>สถานะถัดไป : {translate(caseStatusShift(singleCase.status))}</h5><br/>

              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}



          <div className="cotent-field">
            <div className="row content">
              <input
                type="text"
                name="note"
                value={newNote.note || ""}
                className="validate"
                onChange={handleChange}
                placeholder="Note" />

            </div>
          </div>
        </div>


        <div className="modal-footer">
          <button className="waves-effect btn blue lighten left " onClick={() => save()}>Save</button>

          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()}>close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalAddNote
