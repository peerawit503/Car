import React, { useState, useEffect } from 'react'
import Navbar from './../layout/Navbar';
// import ModalView1 from './ModalView1';
import 'rsuite/dist/styles/rsuite-default.css'

import ModalAddCase from './ModalAddCase';
import ModalAddNote from './ModalAddNote';
import ModalAddSummary from './ModalSummary';
import ModalFastTrack from './ModalFastTrack';
import ModalDeleteCase from './ModalDeleteCase';
import TheadCase from './TheadCase';
import url from '../../Utility/url'
import axios from 'axios';
import uuid from "uuid"
import M from 'materialize-css/dist/js/materialize.min.js'

/* modify*/
import '../table.css';
import './style.css';

/* image */

import alert from '../../img/alert.png';
import alertYellow from '../../img/alert-yellow.png';

import confirm from '../../img/confirm.png';
import sumary from '../../img/report.png';
import plus from '../../img/plus-white.png';


/* Mockdata */

// import caseData from './data.json';
const useId = 'mohexc'



const Cases = () => {

  const [customers, setCustomers] = useState([])
  const [cases, setCases] = useState([])
  const [kpi, setKpi] = useState([])
  const [singleCase, setSingleCase] = useState([])
  const [stateSearch, setStateSearch] = useState({
    starDate: '',
    endDate: ""
  })

  const [textSearch, setTextSearch] = useState('')

  // page
  const [currPage, setCurrPage] = useState(1)
  const [limitPage, setLimitPage] = useState(20)
  const [totalCase, setTotalCase] = useState(0)
  const [totalPage, setTotalPage] = useState(Math.ceil(totalCase / limitPage))


  useEffect(() => {
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
      coverTrigger: false,
      autoTrigger: true,
      constrainWidth: true
    });
    M.Modal.init(document.querySelectorAll('.modal'), {})
    M.Modal.init(document.querySelectorAll('#ModalDeleteCase'), {})
    M.FormSelect.init(document.querySelectorAll('select'), {});
    //   M.Datepicker.init(document.querySelectorAll('#startDate'), {});
    //   M.Datepicker.init(document.querySelectorAll('#endDate'), {});
  }, [])

  useEffect(() => {
    getAllCase()
    getKpi()
    getAllCustomers()
  }, [])

  const getAllCase = () => {


    axios.get(`${url}/case_limit?size=${50}&page=${1}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))


  }
  const setKpiForUse = (kpiData) => {
    var result = [];
    var result = new Object();
    var red;
    var orange;
    for (var x of kpiData) {
      var element = {};
      red = x.case_type + '_red';
      orange = x.case_type + '_orange';
      result[red] = x.red;

      result[orange] = x.orange;

    }

    setKpi(result);

  }
  const getKpi = () => {
    axios.get(`${url}/date`)
      .then(res => {
        setKpiForUse(res.data.message);

      })
      .catch(err => console.log(err))
  }

  const getCaseLimit = () => {
    axios.get(`${url}/case_limit?size=${limitPage}&page=${currPage}`)

  }

  const deleteCase = (caseId) => {
    axios.delete(`${url}/delete_case?case_id=${caseId}`)
      .then(res => {
        M.toast({ html: `${res.data.message}` })
        getAllCase()
      })
      .then(err => console.log(err))
  }

  const handleSingleCase = (caseInRow) => {

    setSingleCase(caseInRow)
  }

  const prevPage = () => {
    setCurrPage(currPage - 1)

  }

  const nextPage = () => {
    setCurrPage(currPage + 1)
  }

  const getAllCustomers = () => {
    // setCustomers(fackeCustomer)

    axios.get(`${url}/customer_limit?size=50&page=2`)
      .then(res => {
        setCustomers(res.data.message)
      })
      .catch(err => { console.log(err) })
    // setCustomers(customerData.message);
  }

  function previousDate(state){
    var prevDate = '';
    if(state === 'receive'){ prevDate = 'date_update';}
    else if(state === 'contact_customer'){prevDate = 'receive_date'}
    else if(state === 'account_closing'){prevDate = 'contact_customer_date'}
    else if(state === 'transfer_doc_received'){prevDate = 'transfer_doc_received_date'}
    else if(state === 'transfer_doc_submitted'){prevDate = 'transfer_doc_submitted'}
    else if(state === 'book_received'){prevDate = 'book_received_date'}
    else if(state === 'submit_book_transfer'){prevDate = 'book_received_date'}
    else if(state === 'car_check_up'){prevDate = 'submit_book_transfer_date'}
    else if(state === 'book_transfer'){prevDate = 'car_check_up_date'}
    else if(state === 'book_copy_received'){prevDate = 'book_transfer_date'}
    else if(state === 'deposit_doc_to_new_bank'){prevDate = 'book_copy_received_date'}
    else if(state === 'submit_book_deposit_return'){prevDate = 'deposit_doc_to_new_bank_date'}
    else if(state === 'book_received_back'){prevDate = 'submit_book_deposit_return_date'}
    else if(state === 'cash_received'){prevDate = 'book_received_back_date'}
    else if(state === 'book_deposit_received'){prevDate = 'cash_received_date'}
    else if(state === 'submit_book_to_new_finance'){prevDate = 'book_deposit_received_date'}
    
    return prevDate;
  }

  function dateToNow(caseDate) {
    if(caseDate == null){
      return 0;
    }else{
      var mountCaracterString = caseDate.split(" ")[2];
      var dayString = caseDate.split(" ")[1];
      var yearString = caseDate.split(" ")[3];
      var month;
      if (mountCaracterString === 'Jan') {
        month = 0;
      }
      else if (mountCaracterString === 'Feb') {
        month = 1;
      }
      else if (mountCaracterString === 'Mar') {
        month = 2;
      }
      else if (mountCaracterString === 'Apr') {
        month = 3;
      }
      else if (mountCaracterString === 'May') {
        month = 4;
      }
      else if (mountCaracterString === 'Jun') {
        month = 5;
      }
      else if (mountCaracterString === 'Jul') {
        month = 6;
      }
      else if (mountCaracterString === 'Aug') {
        month = 7;
      }
      else if (mountCaracterString === 'Sep') {
        month = 8;
      }
      else if (mountCaracterString === 'Oct') {
        month = 9;
      }
      else if (mountCaracterString === 'Nov') {
        month = 10;
      }
      else if (mountCaracterString === 'Dec') {
        month = 11;
      }
      // var month = parseInt(mountString) - 1;
      var day = parseInt(dayString);
      var year = parseInt(yearString);
  
      var date2 = new Date(year, month, day);
      var date1 = new Date();
  
      return (Math.floor((date1 - date2) / (24 * 3600 * 1000)));
      // console.log(Math.floor((date1-date2)/(24*3600*1000)));
    }
    

  }

  function displayStarRating(caseInRow) {
    // console.log(caseInRow.date_update)
    var result = [];
    var stausDate = previousDate(caseInRow.status);
    var datetomow = dateToNow(caseInRow[stausDate]);
    var noteDateString = caseInRow.status + "_note";
    var alertRed = caseInRow.status + "_red";
    var alertOrange = caseInRow.status + "_orange";
    // console.log(datetomow);

    // console.log(caseInRow[statusString])
    // console.log(caseInRow['receive_date']);
    if (datetomow >= kpi[alertOrange] && datetomow < kpi[alertRed]) {
      if (caseInRow[noteDateString] == null) {
        result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)} ><img src={alertYellow} className="alert-icon blink-image" alt="fireSpot" /></a>);
      }else {
        result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)} ><img src={alertYellow} className="alert-icon" alt="fireSpot" /></a>);
      }
    }

    else if (datetomow >= kpi[alertRed] ) {
      if(caseInRow[noteDateString] == null){
        result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)}><img src={alert} className="alert-icon blink-image" alt="fireSpot" /></a>);
      }else{
        result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)}><img src={alert} className="alert-icon " alt="fireSpot" /></a>);
      }
    }
    

    return result;
  }



  return (
    <>
      <Navbar />
      <main>
        <div className="nContainer">



          {/* SEARCH */}
          <div className="row">
            <div className="col s12 m6">
              <h3>Cases : <span className="chip  orange">{totalCase}</span></h3>
            </div>
            <div className="new-button col m3">
              <div className="new-button-iner">
                <a className="btn modal-trigger tde" href="#modalAddCase" ><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="fireSpot" />Add Case</a>
              </div>

            </div>
            <div className="input-field col s12 m3">
              <div className="search">
                <input placeholder="Search term" />
                <span className="fa fa-search"></span>
              </div>
            </div>

          </div>


          {/* TABALE */}
          <div className="row">
            <table className="responsive-table">
              <TheadCase />
              <tbody className="no-padding">
                {cases.map(c => (
                  <tr key={uuid.v4()}>
                    <td>{displayStarRating(c)}</td>
                    <td className="tale-caseId" >{c.id}</td>
                    <td >{c.name}</td>
                    <td >{c.date_update.split(" ")[0] + ' ' + c.date_update.split(" ")[1] + ' ' + c.date_update.split(" ")[2] + ' ' + c.date_update.split(" ")[3]} <br /> {c.date_update.split(" ")[4]} </td>
                    <td>{c.status}</td>
                    <td >{c.case_source}</td>
                    <td>{c.job_id}</td>
                    <td>{c.car_license}</td>
                    <td >{c.new_bank}</td>

                    <td >
                      {/* <a href="#modalTracking"  className="modal-trigger" onClick={ () => handleSingleCase(c) }> <img  src={sumary} className="png-icon" alt="sumary-icon"/></a> */}
                      <a href="#modalSummary" className="modal-trigger" onClick={() => handleSingleCase(c)}> <img src={sumary} className="png-icon" alt="sumary-icon" /></a>

                      <a href="#modalFastTrack" className="modal-trigger" onClick={() => handleSingleCase(c)}><img src={confirm} className="png-icon" alt="confirm-icon" /></a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <div>
              <ul className="pagination">
                <li className={'disabled'}><a href="#!"><i className="material-icons" onClick={prevPage}>chevron_left</i></a></li>
                <li className="active waves-effect"><a href="#!">1</a></li>

                <li className={'disabled'}><a href="#!"><i className="material-icons" onClick={nextPage}>chevron_right</i></a></li>
              </ul>
            </div>
          </div>

          <ModalAddNote singleCase={singleCase} />
          <ModalFastTrack singleCase={singleCase} />
          <ModalAddSummary singleCase={singleCase} kpi={kpi} />
          <ModalAddCase customers={customers} />
          <ModalDeleteCase singleCase={singleCase} deleteCase={deleteCase} />



        </div>
      </main>
    </>
  )
}

export default Cases
