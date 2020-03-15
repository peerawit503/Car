import React, { useState, useEffect } from 'react'



import axios from 'axios';
import url from '../../Utility/url'
/* img */



const ModalProcess = ({ singleCase}) => {

  const [newNote, setNewNote] = useState({})

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value })
  }
  function getnote(CaseStatus){
    let status_note = CaseStatus + "_note";
    return status_note;
  }

  function close() {
    setNewNote({});
  }

  return (
    <div>
      <div id="modalProcess" className="modal modal-fixed-footer">

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
               Header
              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}



          <div className="cotent-field">
            <div className="row content">
              Content

            </div>
          </div>
        </div>


        <div className="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left ">Save</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()}>close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalProcess
