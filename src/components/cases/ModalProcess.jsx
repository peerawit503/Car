import React, { useState, useEffect } from 'react'



import axios from 'axios';
import url from '../../Utility/url'
/* img */



const ModalProcess = ({ currentProcess ,saveProcess , singleCase}) => {

   const [date, setDate] = useState()

  const handleChange = (e) => {
    setDate( e.target.value )
  }
 

  function currentDateFormat(caseDate) {
    if (caseDate == null) {
      return 0;
    } else {
      var mountCaracterString = caseDate.split(" ")[2];
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

  function close() {
    setDate()
  }
  const save = () => {
    let data = {
      case_id : singleCase.case_id,
      date:date,
      tracking:currentProcess.process
    }

    saveProcess(data)
  }

  return (
    <div>
      <div id="modalProcess" className="modal modal-fixed-footer">

        <div className="modal-content modal-content-override">
          <div className="row">
            <div className="header-title">
              <div className="col s12 m12 no-col-padding">
              <h4>  Process : {currentProcess.processThai} </h4>
              
              
               
              </div>
            </div>
          </div>
          {/* process bar */}

          {/* body */}



          <div className="cotent-field">
            <div className="row">
             <div className="col m6 content-radonly">
             <div className="col s6 m6 l6 content-radonly">
                Process Recorder / ชื่อผู้ดำเนินการ
                <input
                thousandSeparator={true}
                value={currentProcess.processTracker}
                name="approve_amount"
                suffix =" บาท"
                readOnly />
              </div>
             </div>

             {/* <div className="col m6">
             Process Date : {currentProcess.processDate}
             </div> */}

             <div className="col m6 content">
             Date / วันที่
             <input
                  type="date"
                  value={date || currentDateFormat(currentProcess.processDate)}
                  name="date"
                  onChange={handleChange}
                />
             
             </div>

            </div>
          </div>
        </div>


        <div className="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => save() }>Save</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()}>close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalProcess
