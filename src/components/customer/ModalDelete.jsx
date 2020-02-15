import React from 'react'

const ModalDelete = ({ customer, deleteCustomer }) => {

  return (
    <div>
      <div id="modalDelete" className="modal">
        <div className="modal-content">
          <h4>DELETE CUSTOMER</h4>
          <h6> คุณแน่ใจไหมที่ลบ : { customer.firstname } { customer.lastname }</h6>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect  btn pink left " onClick={ () => deleteCustomer(customer.customer_id) }>delete</a>
          <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
        </div>
      </div>

    </div >
  )
}

export default ModalDelete
