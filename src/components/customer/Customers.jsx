import React, { useEffect, useState } from 'react'
import Navbar from './../layout/Navbar';
import Search from './Search';
import ModalCreate from './ModalCreate';
import ModalRead from './ModalRead';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import ModalAddCaseCustomer from './ModalAddCaseCustomer';
import TableHead from './TableHead';
import axios from 'axios'
import uuid from "uuid"
import M from 'materialize-css/dist/js/materialize.min.js'
import url from '../../Utility/url'
import MaterialTable from 'material-table'
// import fackeCustomer from '../../Utility/fackeCustomer'


/* modify */
import '../table.css';

// import customerData from './data.json';
/* image */ 


import viewicon from '../../img/eye.png';
import editicon from '../../img/edit.png';
import deleteicon from '../../img/bin.png';

import plusicon from '../../img/plus-white.png';
/* end modify */
const Customers = () => {

  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState({})
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    getAllCustomers()
    M.Modal.init(document.querySelectorAll('.modal'), {});
  }, [])

  useEffect(() => {

  }, [customers])

  const getAllCustomers = () => {
    // setCustomers(fackeCustomer)
    setisLoading(true);
    axios.get(`${url}/customer_all`)
      .then(res => { 
        setCustomers(res.data.message)
        setisLoading(false);
       })
      .catch(err => { console.log(err) })
    // setCustomers(customerData.message);
  }

  const searchCustomer = (text) => {
    axios.get(`${url}/search_customer?value=${text}&parameter=firstname`)
      .then(res => {
        console.log(res.data.message)
        setCustomers(res.data.message)
      })
      .catch(err => console.log(err))
  }

  const addCustomer = (c) => {
    console.log(c);
    axios.post(`${url}/add_customer`, c)
      .then(res => {
        M.toast({ html: `${res.data.message}` })
        console.log(res.data.message);
        getAllCustomers()
      })
      .catch(err => { console.log(err) })
  }

  const readCustermer = (c) => setCustomer(c)

  const deleteCustomer = (id) => {
    // console.log('sdasdasdasd')
    axios.delete(`${url}/delete_customer?customer_id=${id}`)
      .then(res => {
        M.toast({ html: `${res.data.message}` })
        console.log(res.data.message)
        getAllCustomers()
      })
  }

  

  const editCustomer = (id, newCustomer) => {
   
    var data = JSON.stringify(newCustomer) ;
    console.log(data);
    axios.put(`${url}/edit_customer?customer_id=${id}`, newCustomer )
      .then(res => { 
        console.log(res.data.message)
        M.toast({ html: `${res.data.message}` })
       })
      .catch(err => {
        M.toast({ html: `fail to edit customer` }) 
        console.log(err)
       })

  }

  let columnObject = useState([{ title: 'ID', field: 'id' },
  { title: 'firstname', field: 'firstname' },
  { title: 'lastname', field: 'lastname' },
  { title: 'tel', field: 'tel' },
  { title: 'line', field: 'line' },
  { title: 'email', field: 'email' },
  { title: ',' ,
  render: rowData => 
    <div>
    <a href="#modalRead" className="modal-trigger" onClick={ () => readCustermer(rowData) } ><img  src={viewicon} className="png-icon" alt="print"/></a>
    <a href="#modalEdit" className="modal-trigger" onClick={ () => readCustermer(rowData) }  ><img  src={editicon} className="png-icon" alt="edit-icon"/></a>
    <a href="#modalDelete" className="modal-trigger" onClick={ () => readCustermer(rowData) }  ><img  src={deleteicon} className="png-icon" alt="sumary-icon"/></a>
    </div>
}]);

function dateFormat(caseDate) {
  if(caseDate == null){
    return 0;
  }else{
    var mountCaracterString = caseDate.split(" ")[2];
    var dayString = caseDate.split(" ")[1];
    var yearString = caseDate.split(" ")[3];
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

    return (caseDate.split(" ")[3]+'-'+month+'-'+caseDate.split(" ")[1]);
   
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="nContainer">
          {/* SEARCH */ }
          <div className="row">
            <div className="col s12 m6">
            <h3>Customer : <span className="chip  orange">{ customers.length }</span></h3>
            </div>
            <div className="new-button col m3">
              <div className="new-button-iner">
              {/* <a className="btn modal-trigger tde" href="#modalCreate" ><img  src={plusicon} style={{marginBottom:'3px'}} className="alert-icon" alt="fireSpot"/>Add CCustomer</a> */}
              </div>
            
            </div>
            <div className="input-field col s12 m3">
              {/* <div class="search">
                <input placeholder="Search term"/>
                <span class="fa fa-search"></span>
              </div> */}
            </div>
           
          </div>
         <br/>
        <div className="row" class="input-table">
       
                <MaterialTable
                columns={columnObject[0]}
                isLoading={isLoading}
                data={customers}
                title="Customer"
                options={{
                  filtering: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                }}
              />
          <br/>
          {/* <div>
          <ul className="pagination">
                <li className={ 'disabled' }><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active waves-effect"><a href="#!">1</a></li>
                <li className={'disabled'}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
              </ul>
          </div>   */}
          </div>      
          <ModalAddCaseCustomer customer={ customer } />
          <ModalCreate addCustomer={ addCustomer } />
          <ModalRead customer={ customer } dateFormat={dateFormat}/>
          <ModalEdit customer={ customer } editCustomer={ editCustomer } dateFormat={dateFormat}/>
          <ModalDelete customer={ customer } deleteCustomer={ deleteCustomer } />
        </div>
      </main>

    </>
  )
}

export default Customers
