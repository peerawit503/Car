import React from 'react'

const ModalDetail = ({ user }) => (
  <div id="modal1" className="modal modal-fixed-footer">
    <div className="modal-content">
      <h4>INFO. USER</h4>
      <div className="row">
        <div className="col s12 m5 mdRead">
          <i className="material-icons prefix pt-2" >account_circle</i>{ ' ' }
          <span className="pl-1"> { user.firstname }</span>
        </div>
        <div className="col s12 m5 offset-m1 mdRead">
          <i className="material-icons prefix pt-2" >account_box</i>{ ' ' }
          <span className="pl-1"> { user.lastname }</span>
        </div>
        <div className="col s12 m5 mdRead">
          <i className="material-icons prefix pt-2">people_outline</i>{ ' ' }
          <span className="pl-1"> { user.team_name }</span>
        </div>
        <div className="col s12 m5 offset-m1 mdRead">
          <i className="material-icons prefix pt-2">format_shapes</i>{ ' ' }
          <span className="pl-1"> { user.position }</span>
        </div>
        <div className="col s12 m5 mdRead">
          <i className="material-icons prefix pt-2">local_library</i>{ ' ' }
          <span className="pl-1"> { user.authority }</span>
        </div>
        <div className="col s12 m5 offset-m1 mdRead">
          <i className="material-icons prefix pt-2">phone</i>{ ' ' }
          <span className="pl-1">  { user.tel }</span>
        </div>
        <div className="col s12 m5 mdRead">
          <i className="material-icons prefix pt-2">mail</i>{ ' ' }
          <span className="pl-1"> { user.email }</span>
        </div>
        <div className="col s12  mdRead">
          <i className="material-icons prefix pt-2">home</i>{ ' ' }
          <span className="pl-1"> { user.address }</span>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text ">close</a>
    </div>
  </div>
)


export default ModalDetail
