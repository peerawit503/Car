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

  useEffect(() => {
    getAllCustomers()
    M.Modal.init(document.querySelectorAll('.modal'), {});
  }, [])

  useEffect(() => {

  }, [customers])

  const getAllCustomers = () => {
    // setCustomers(fackeCustomer)

    axios.get(`${url}/customer_limit?size=50&page=1`)
      .then(res => { setCustomers(res.data.message) })
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
      
       })
      .catch(err => { console.log(err) })

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
              <div class="search">
                <input placeholder="Search term"/>
                <span class="fa fa-search"></span>
              </div>
            </div>
           
          </div>
         <br/>
        <div className="row">
          <table className="centered responsive-table">
            <TableHead />
            <tbody>
              { customers.map(cust => (
                <tr key={ cust.customer_id ? cust.customer_id : uuid.v4() }>
                  <td>{ cust.id }</td>
                  <td>{ cust.firstname }</td>
                  <td>{ cust.lastname }</td>
                  <td>{ cust.tel }</td>
                  <td>{ cust.line }</td>
                  <td>{ cust.email }</td>
                  
                  
                  <td>
                    <a href="#modalRead" className="modal-trigger" onClick={ () => readCustermer(cust) } ><img  src={viewicon} className="png-icon" alt="print"/></a>
                    <a href="#modalEdit" className="modal-trigger" onClick={ () => readCustermer(cust) }  ><img  src={editicon} className="png-icon" alt="edit-icon"/></a>
                    <a href="#modalDelete" className="modal-trigger" onClick={ () => readCustermer(cust) }  ><img  src={deleteicon} className="png-icon" alt="sumary-icon"/></a>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
          <br/>
          <div>
          <ul className="pagination">
                <li className={ 'disabled' }><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active waves-effect"><a href="#!">1</a></li>
                <li className={'disabled'}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
              </ul>
          </div>  
          </div>      
          <ModalAddCaseCustomer customer={ customer } />
          <ModalCreate addCustomer={ addCustomer } />
          <ModalRead customer={ customer } />
          <ModalEdit customer={ customer } editCustomer={ editCustomer } />
          <ModalDelete customer={ customer } deleteCustomer={ deleteCustomer } />
        </div>
      </main>

    </>
  )
}

export default Customers
