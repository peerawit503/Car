import React from 'react'

const ModalRead = ({ customer }) => (
  <>
    <div id="modalRead" className="modal modal-fixed-footer">
      <div className="modal-content">
        <h4>INFO. CUSTOMER</h4>
        <hr className="line1" />
        <div className="row">
          <div className="col s12 m5 mdRead">
            <i className="material-icons prefix pt-2" >account_circle</i>{ ' ' }
            <span className="pl-1"> { customer.firstname }</span>
          </div>
          <div className="col s12 m5 offset-m1 mdRead">
            <i className="material-icons prefix pt-2" >account_box</i>{ ' ' }
            <span className="pl-1"> { customer.lastname }</span>
          </div>
          <div className="col s12 m5 mdRead">
            <i className="material-icons prefix pt-2" >phone</i>{ ' ' }
            <span className="pl-1"> { customer.tel }</span>
          </div>
          <div className="col s12 m5 offset-m1 mdRead">
            <i className="material-icons prefix pt-2" >LINE</i>{ ' ' }
            <span className="pl-1"> { customer.line }</span>
          </div>
          <div className="col s12 m5 mdRead">
            <i className="material-icons prefix pt-2" >mail</i>{ ' ' }
            <span className="pl-1"> { customer.email }</span>
          </div>
          <div className="col s12   mdRead">
            <i className="material-icons prefix pt-2" >home_work</i>{ ' ' }
            <span className="pl-1"> { customer.address }</span>
          </div>


        </div>

      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
      </div>
    </div>
  </>
)


export default ModalRead
